import { getChatConfig } from "@/lib/chat/config";
import { ChatServiceError } from "@/lib/chat/errors";
import { chatRequestSchema, type ChatEvent } from "@/lib/chat/protocol";
import { checkChatRateLimit } from "@/lib/chat/rate-limit";
import {
  requestCloudflareAnswer,
  readCloudflareAnswer,
} from "@/lib/chat/cloudflare";

export const runtime = "nodejs";
export const maxDuration = 40;

async function readChatRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    throw new ChatServiceError(
      "INVALID_ORIGIN",
      "This chat request is not allowed.",
      403,
    );
  }
  if (
    !request.headers.get("content-type")?.startsWith("application/json") ||
    !request.body
  ) {
    throw new ChatServiceError(
      "INVALID_REQUEST",
      "Please send a valid chat question.",
      400,
    );
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let requestText = "";
  let byteCount = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      byteCount += chunk.value.byteLength;
      if (byteCount > 32768) {
        await reader.cancel();
        throw new ChatServiceError(
          "REQUEST_TOO_LARGE",
          "Please shorten your question or start a new conversation.",
          413,
        );
      }
      requestText += decoder.decode(chunk.value, { stream: true });
    }
    requestText += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  let requestBody: unknown;
  try {
    requestBody = JSON.parse(requestText);
  } catch (error) {
    if (error instanceof SyntaxError)
      throw new ChatServiceError(
        "INVALID_REQUEST",
        "Please send a valid chat question.",
        400,
      );
    throw error;
  }
  const result = chatRequestSchema.safeParse(requestBody);
  if (!result.success)
    throw new ChatServiceError(
      "INVALID_REQUEST",
      "Please send a question of up to 1,000 characters with valid conversation history.",
      400,
    );
  return result.data.messages;
}

function getClientIp(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  if (ip) return ip;
  if (process.env.NODE_ENV === "development") return "127.0.0.1";
  throw new ChatServiceError(
    "LIMIT_SERVICE_UNAVAILABLE",
    "AI chat cannot check its request limit. Please contact Atakan instead.",
  );
}

export async function POST(request: Request) {
  const answerController = new AbortController();
  const answerSignal = AbortSignal.any([
    request.signal,
    answerController.signal,
  ]);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    const messages = await readChatRequest(request);
    const config = getChatConfig();
    await checkChatRateLimit(getClientIp(request), config);
    timeout = setTimeout(() => answerController.abort(), 30000);
    const cloudflareStream = await requestCloudflareAnswer(
      messages,
      config,
      answerSignal,
    );
    const encoder = new TextEncoder();
    let cancelled = false;

    const responseStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const sendEvent = (event: ChatEvent) =>
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
          );
        try {
          for await (const text of readCloudflareAnswer(cloudflareStream)) {
            if (cancelled) return;
            sendEvent({ type: "delta", text });
          }
          if (!cancelled) {
            sendEvent({ type: "done" });
            controller.close();
          }
        } catch (error) {
          if (cancelled || request.signal.aborted) return;
          if (
            error instanceof ChatServiceError ||
            answerSignal.aborted ||
            error instanceof TypeError
          ) {
            const chatError =
              error instanceof ChatServiceError
                ? error
                : new ChatServiceError(
                    answerSignal.aborted ? "TIMEOUT" : "INTERRUPTED",
                    answerSignal.aborted
                      ? "The answer took too long. Please try again."
                      : "The connection was interrupted. Please try again.",
                  );
            sendEvent({
              type: "error",
              code: chatError.code,
              message: chatError.message,
              retryAfter: chatError.retryAfter,
            });
            controller.close();
          } else {
            controller.error(error);
          }
        } finally {
          clearTimeout(timeout);
          answerController.abort();
        }
      },
      cancel() {
        cancelled = true;
        clearTimeout(timeout);
        answerController.abort();
      },
    });

    return new Response(responseStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-store, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    clearTimeout(timeout);
    answerController.abort();
    if (!(error instanceof ChatServiceError)) throw error;
    return Response.json(
      {
        code: error.code,
        message: error.message,
        retryAfter: error.retryAfter,
      },
      {
        status: error.status,
        headers: {
          "Cache-Control": "no-store",
          ...(error.retryAfter
            ? { "Retry-After": String(error.retryAfter) }
            : {}),
        },
      },
    );
  }
}
