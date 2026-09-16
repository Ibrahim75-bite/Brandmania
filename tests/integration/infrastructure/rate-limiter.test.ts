import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRateLimiter } from '@/infrastructure/security/rate-limiter';

describe('MemoryRateLimiter', () => {
  let rateLimiter: MemoryRateLimiter;

  beforeEach(() => {
    rateLimiter = new MemoryRateLimiter(3, 1000); // 3 requests per 1000ms
  });

  it('should allow requests within limit', async () => {
    const key = 'test-ip-1';
    const res1 = await rateLimiter.checkLimit(key, 3, 1000);
    const res2 = await rateLimiter.checkLimit(key, 3, 1000);
    const res3 = await rateLimiter.checkLimit(key, 3, 1000);

    expect(res1.allowed).toBe(true);
    expect(res2.allowed).toBe(true);
    expect(res3.allowed).toBe(true);
  });

  it('should block requests exceeding the limit', async () => {
    const key = 'test-ip-2';
    await rateLimiter.checkLimit(key, 3, 1000);
    await rateLimiter.checkLimit(key, 3, 1000);
    await rateLimiter.checkLimit(key, 3, 1000);

    const blocked = await rateLimiter.checkLimit(key, 3, 1000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('should reset bucket on explicit reset', async () => {
    const key = 'test-ip-3';
    await rateLimiter.checkLimit(key, 1, 1000);
    const blocked = await rateLimiter.checkLimit(key, 1, 1000);
    expect(blocked.allowed).toBe(false);

    await rateLimiter.reset(key);
    const allowedAgain = await rateLimiter.checkLimit(key, 1, 1000);
    expect(allowedAgain.allowed).toBe(true);
  });
});
