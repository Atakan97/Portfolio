import { ChatServiceError } from "./errors";
import { readEventData, parseEventJson } from "./event-stream";
import {
  chatEventSchema,
  chatErrorSchema,
  type ChatRequestMessage,
} from "./protocol";

export async function* streamChatAnswer(
  messages: ChatRequestMessage[],
  signal: AbortSignal,
) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal,
    });

    if (!response.ok) {
      const errorDetails = chatErrorSchema.safeParse(
        parseEventJson(await response.text()),
      );
      if (!errorDetails.success)
        throw new ChatServiceError(
          "INVALID_RESPONSE",
          "AI chat could not respond. Please try again later or contact Atakan.",
        );
      throw new ChatServiceError(
        errorDetails.data.code,
        errorDetails.data.message,
        response.status,
        errorDetails.data.retryAfter,
      );
    }
    if (
      !response.body ||
      !response.headers.get("content-type")?.includes("text/event-stream")
    ) {
      throw new ChatServiceError(
        "INVALID_RESPONSE",
        "The answer could not be read. Please try again.",
      );
    }

    for await (const eventData of readEventData(response.body)) {
      const event = chatEventSchema.safeParse(parseEventJson(eventData));
      if (!event.success)
        throw new ChatServiceError(
          "INVALID_RESPONSE",
          "The answer could not be read. Please try again.",
        );
      if (event.data.type === "delta") yield event.data.text;
      if (event.data.type === "done") return;
      if (event.data.type === "error")
        throw new ChatServiceError(
          event.data.code,
          event.data.message,
          503,
          event.data.retryAfter,
        );
    }
    throw new ChatServiceError(
      "INTERRUPTED",
      "The answer was interrupted. Please try again.",
    );
  } catch (error) {
    if (
      signal.aborted &&
      signal.reason instanceof Error &&
      signal.reason.name === "TimeoutError"
    ) {
      throw new ChatServiceError(
        "TIMEOUT",
        "The answer took too long. Please try again or contact Atakan.",
      );
    }
    if (!signal.aborted && error instanceof TypeError) {
      throw new ChatServiceError(
        "CONNECTION_LOST",
        "The connection was lost. Please check your connection and try again.",
      );
    }
    throw error;
  }
}
