/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Works well for serverless environments where a single instance handles
 * the request. For multi-region / high-traffic apps consider Upstash Redis.
 *
 * Default: 5 requests per IP per hour.
 */

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
}

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

// Module-level store — persists across requests within the same cold-start.
const store = new Map<string, number[]>();

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  // Prune timestamps outside the current window.
  const timestamps = (store.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    return {
      allowed: false,
      remaining: 0,
      resetInMs: WINDOW_MS - (now - oldest),
    };
  }

  timestamps.push(now);
  store.set(ip, timestamps);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - timestamps.length,
    resetInMs: 0,
  };
}
