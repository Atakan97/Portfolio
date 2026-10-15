import { createHmac } from "node:crypto";
import { z } from "zod";
import type { ChatConfig } from "./config";
import { ChatServiceError } from "./errors";

export const CHAT_RATE_LIMITS = { perMinute: 5, perHour: 20, perDay: 150 };

// Check and update all counters in one operation.
const rateLimitScript = `
for index = 1, 3 do
  local count = tonumber(redis.call('GET', KEYS[index]) or '0')
  if count >= tonumber(ARGV[index]) then
    return {0, tonumber(ARGV[index + 3])}
  end
end
for index = 1, 3 do
  local count = redis.call('INCR', KEYS[index])
  if count == 1 then
    redis.call('EXPIRE', KEYS[index], tonumber(ARGV[index + 3]))
  end
end
return {1, 0}
`;

export async function checkChatRateLimit(ip: string, config: ChatConfig) {
  const ipHash = createHmac("sha256", config.rateLimitSecret)
    .update(ip)
    .digest("hex");
  const currentSecond = Math.floor(Date.now() / 1000);
  const windowLengths = [60, 3600, 86400];
  const windowIds = windowLengths.map((length) =>
    Math.floor(currentSecond / length),
  );
  const resetTimes = windowLengths.map(
    (length) => length - (currentSecond % length),
  );
  const keys = [
    `chat:minute:${ipHash}:${windowIds[0]}`,
    `chat:hour:${ipHash}:${windowIds[1]}`,
    `chat:day:${windowIds[2]}`,
  ];

  let response: Response;
  try {
    response = await fetch(config.redisUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        rateLimitScript,
        3,
        ...keys,
        CHAT_RATE_LIMITS.perMinute,
        CHAT_RATE_LIMITS.perHour,
        CHAT_RATE_LIMITS.perDay,
        ...resetTimes,
      ]),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
  } catch (error) {
    if (
      error instanceof TypeError ||
      (error instanceof Error &&
        ["TimeoutError", "AbortError"].includes(error.name))
    ) {
      throw new ChatServiceError(
        "LIMIT_SERVICE_UNAVAILABLE",
        "AI chat is temporarily unavailable. Please try again later or contact Atakan.",
      );
    }
    throw error;
  }

  if (!response.ok) {
    throw new ChatServiceError(
      "LIMIT_SERVICE_UNAVAILABLE",
      "AI chat is temporarily unavailable. Please try again later or contact Atakan.",
    );
  }

  let responseBody: unknown;
  try {
    responseBody = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ChatServiceError(
        "LIMIT_SERVICE_UNAVAILABLE",
        "AI chat is temporarily unavailable. Please contact Atakan instead.",
      );
    }
    throw error;
  }

  const result = z
    .object({
      result: z.tuple([
        z.union([z.literal(0), z.literal(1)]),
        z.number().nonnegative(),
      ]),
    })
    .safeParse(responseBody);
  if (!result.success) {
    throw new ChatServiceError(
      "LIMIT_SERVICE_UNAVAILABLE",
      "AI chat is temporarily unavailable. Please contact Atakan instead.",
    );
  }
  const [allowed, retryAfter] = result.data.result;
  if (allowed === 0) {
    throw new ChatServiceError(
      "RATE_LIMITED",
      "The chat limit has been reached. Please wait before trying again, or contact Atakan.",
      429,
      retryAfter,
    );
  }
}
