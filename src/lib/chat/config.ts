import { ChatServiceError } from "./errors";

export const CHAT_MODEL = "@cf/qwen/qwen3-30b-a3b-fp8";

export function getChatConfig() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const rateLimitSecret = process.env.CHAT_RATE_LIMIT_SECRET;

  if (
    process.env.CHAT_ENABLED !== "true" ||
    !accountId ||
    !apiToken ||
    !redisUrl ||
    !redisToken ||
    !rateLimitSecret
  ) {
    throw new ChatServiceError(
      "NOT_READY",
      "AI chat is not available yet. Please contact Atakan instead.",
    );
  }

  if (
    !/^[a-f0-9]{32}$/i.test(accountId) ||
    !redisUrl.startsWith("https://") ||
    rateLimitSecret.length < 32
  ) {
    throw new ChatServiceError(
      "NOT_READY",
      "AI chat needs a configuration update. Please contact Atakan instead.",
    );
  }

  return { accountId, apiToken, redisUrl, redisToken, rateLimitSecret };
}

export type ChatConfig = ReturnType<typeof getChatConfig>;
