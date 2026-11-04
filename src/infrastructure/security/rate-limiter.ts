import { IRateLimiter, RateLimitResult } from '../../application/ports/rate-limiter.port';

interface RateLimitBucket {
  tokens: number;
  lastRefillMs: number;
}

export class MemoryRateLimiter implements IRateLimiter {
  private readonly buckets = new Map<string, RateLimitBucket>();

  constructor(
    private readonly defaultMaxRequests = 60,
    private readonly defaultWindowMs = 60000
  ) {}

  public async checkLimit(
    key: string,
    maxRequests = this.defaultMaxRequests,
    windowMs = this.defaultWindowMs
  ): Promise<RateLimitResult> {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = {
        tokens: maxRequests - 1,
        lastRefillMs: now,
      };
      this.buckets.set(key, bucket);
      return {
        allowed: true,
        limit: maxRequests,
        remaining: bucket.tokens,
        resetTimeMs: now + windowMs,
        retryAfterSeconds: 0,
      };
    }

    const elapsed = now - bucket.lastRefillMs;
    if (elapsed >= windowMs) {
      bucket.tokens = maxRequests;
      bucket.lastRefillMs = now;
    } else {
      const tokensToAdd = Math.floor((elapsed / windowMs) * maxRequests);
      if (tokensToAdd > 0) {
        bucket.tokens = Math.min(maxRequests, bucket.tokens + tokensToAdd);
        bucket.lastRefillMs = now;
      }
    }

    if (bucket.tokens > 0) {
      bucket.tokens -= 1;
      const resetTimeMs = bucket.lastRefillMs + windowMs;
      return {
        allowed: true,
        limit: maxRequests,
        remaining: bucket.tokens,
        resetTimeMs,
        retryAfterSeconds: 0,
      };
    }

    const resetTimeMs = bucket.lastRefillMs + windowMs;
    const retryAfterSeconds = Math.max(1, Math.ceil((resetTimeMs - now) / 1000));

    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      resetTimeMs,
      retryAfterSeconds,
    };
  }

  public async reset(key: string): Promise<void> {
    this.buckets.delete(key);
  }

  public clearAll(): void {
    this.buckets.clear();
  }
}
