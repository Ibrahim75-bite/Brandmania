export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
  retryAfterSeconds: number;
}

export interface IRateLimiter {
  checkLimit(key: string, maxRequests?: number, windowMs?: number): Promise<RateLimitResult>;
  reset(key: string): Promise<void>;
}
