import { z } from "zod";

export const MAX_QUESTION_LENGTH = 1000;
export const MAX_HISTORY_PAIRS = 3;

const messageSchema = z.discriminatedUnion("role", [
  z
    .object({
      role: z.literal("user"),
      content: z.string().trim().min(1).max(MAX_QUESTION_LENGTH),
    })
    .strict(),
  z
    .object({
      role: z.literal("assistant"),
      content: z.string().trim().min(1).max(4000),
    })
    .strict(),
]);

export const chatRequestSchema = z
  .object({
    messages: z
      .array(messageSchema)
      .min(1)
      .max(MAX_HISTORY_PAIRS * 2 + 1)
      .refine(
        (messages) =>
          messages.length % 2 === 1 &&
          messages.every(
            (message, index) =>
              message.role === (index % 2 === 0 ? "user" : "assistant"),
          ),
        "Messages must contain complete pairs and end with a question.",
      ),
  })
  .strict();

export const chatErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  retryAfter: z.number().optional(),
});

export const chatEventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("delta"), text: z.string() }),
  z.object({ type: z.literal("done") }),
  z.object({ type: z.literal("error"), ...chatErrorSchema.shape }),
]);

export type ChatRequestMessage = z.infer<typeof messageSchema>;
export type ChatEvent = z.infer<typeof chatEventSchema>;
export type ChatErrorDetails = z.infer<typeof chatErrorSchema>;
