import { z } from "zod";
import { CHAT_MODEL, type ChatConfig } from "./config";
import { buildSystemPrompt } from "./knowledge";
import type { ChatRequestMessage } from "./protocol";
import { ChatServiceError } from "./errors";
import { readEventData, parseEventJson } from "./event-stream";
import { AnswerFilter } from "./answer-filter";
import { getQuestionLanguage } from "./language";

const replyInstructions = {
  English: "Reply in English unless this question asks for another language.",
  Turkish: "Bu soruya Türkçe yanıt ver. Soru başka bir dil istiyorsa o dili kullan.",
  German: "Antworte auf Deutsch, außer wenn diese Frage eine andere Sprache verlangt.",
};

const cloudflareChunkSchema = z.object({
  choices: z
    .array(
      z.object({
        delta: z.object({
          content: z.union([z.string(), z.number()]).nullable().optional(),
        }),
        finish_reason: z.string().nullable().optional(),
      }),
    )
    .min(1),
});

export async function requestCloudflareAnswer(
  messages: ChatRequestMessage[],
  config: ChatConfig,
  signal: AbortSignal,
) {
  const questionLanguage = getQuestionLanguage(
    messages[messages.length - 1].content,
  );
  const modelMessages = messages.map((message, index) => ({
    ...message,
    content:
      index === messages.length - 1
        ? `${replyInstructions[questionLanguage]}
Do not continue the language of earlier replies.
Visitor question:
${message.content}
/no_think`
        : message.content,
  }));

  let response: Response;
  try {
    response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/ai/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: CHAT_MODEL,
          messages: [
            { role: "system", content: buildSystemPrompt(questionLanguage) },
            ...modelMessages,
          ],
          stream: true,
          max_tokens: 512,
          temperature: 0.3,
        }),
        signal,
        cache: "no-store",
      },
    );
  } catch (error) {
    if (signal.aborted) {
      throw new ChatServiceError(
        "TIMEOUT",
        "The answer took too long. Please try again or contact Atakan.",
      );
    }
    if (error instanceof TypeError) {
      throw new ChatServiceError(
        "MODEL_UNAVAILABLE",
        "AI chat could not connect. Please try again later or contact Atakan.",
      );
    }
    throw error;
  }

  if (response.status === 429) {
    throw new ChatServiceError(
      "MODEL_LIMITED",
      "AI chat has reached its current limit. Please try again later or contact Atakan.",
      429,
    );
  }
  if (
    !response.ok ||
    !response.body ||
    !response.headers.get("content-type")?.includes("text/event-stream")
  ) {
    throw new ChatServiceError(
      "MODEL_UNAVAILABLE",
      "AI chat is temporarily unavailable. Please try again later or contact Atakan.",
    );
  }
  return response.body;
}

export async function* readCloudflareAnswer(
  stream: ReadableStream<Uint8Array>,
) {
  const answerFilter = new AnswerFilter();
  let answerLength = 0;
  let hasVisibleAnswer = false;

  for await (const eventData of readEventData(stream)) {
    if (eventData === "[DONE]") {
      const remainingText = answerFilter.finish();
      if (remainingText) yield remainingText;
      if (!hasVisibleAnswer && !remainingText.trim()) {
        throw new ChatServiceError(
          "EMPTY_ANSWER",
          "No answer was received. Please try again or contact Atakan.",
        );
      }
      return;
    }

    const parsedChunk = cloudflareChunkSchema.safeParse(
      parseEventJson(eventData),
    );
    if (!parsedChunk.success) {
      throw new ChatServiceError(
        "INVALID_RESPONSE",
        "The answer could not be read. Please try again.",
      );
    }
    const choice = parsedChunk.data.choices[0];
    if (choice.finish_reason === "length") {
      throw new ChatServiceError(
        "ANSWER_LIMITED",
        "The answer reached its length limit. Please ask a more specific question.",
      );
    }
    if (choice.delta.content !== undefined && choice.delta.content !== null) {
      const answerText = answerFilter.push(String(choice.delta.content));
      answerLength += answerText.length;
      if (answerLength > 4000) {
        throw new ChatServiceError(
          "ANSWER_LIMITED",
          "The answer reached its length limit. Please ask a more specific question.",
        );
      }
      if (answerText.trim()) hasVisibleAnswer = true;
      if (answerText) yield answerText;
    }
  }

  throw new ChatServiceError(
    "INTERRUPTED",
    "The answer was interrupted. Please try again.",
  );
}
