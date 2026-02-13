interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

export function rateLimit(
  key: string,
  { maxAttempts = 5, windowMs = 60_000 } = {},
): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  // Clean expired entry
  if (entry && now > entry.resetTime) {
    store.delete(key);
  }

  const current = store.get(key);

  if (!current) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: maxAttempts - 1 };
  }

  if (current.count >= maxAttempts) {
    return { success: false, remaining: 0 };
  }

  current.count++;
  return { success: true, remaining: maxAttempts - current.count };
}
