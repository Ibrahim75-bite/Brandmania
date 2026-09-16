import { describe, it, expect, vi } from 'vitest';
import { ok, err, isOk, isErr, retryWithBackoff } from '@/application/ports/result';

describe('Result Pattern & Retry Utility', () => {
  it('should create and identify Ok results', () => {
    const res = ok({ id: 'inq_123' });
    expect(isOk(res)).toBe(true);
    expect(isErr(res)).toBe(false);
    if (isOk(res)) {
      expect(res.value.id).toBe('inq_123');
    }
  });

  it('should create and identify Err results', () => {
    const errorObj = new Error('Resource missing');
    const res = err(errorObj);
    expect(isOk(res)).toBe(false);
    expect(isErr(res)).toBe(true);
    if (isErr(res)) {
      expect(res.error.message).toBe('Resource missing');
    }
  });

  it('should retry failing operations up to maxAttempts', async () => {
    let callCount = 0;
    const flakyFn = vi.fn(async () => {
      callCount++;
      if (callCount < 3) {
        throw new Error('Temporary glitch');
      }
      return 'success';
    });

    const result = await retryWithBackoff(flakyFn, {
      maxAttempts: 3,
      initialDelayMs: 10,
      backoffFactor: 1.5,
    });

    expect(result).toBe('success');
    expect(callCount).toBe(3);
  });

  it('should throw if retry attempts are exhausted', async () => {
    const alwaysFail = vi.fn(async () => {
      throw new Error('Permanent failure');
    });

    await expect(
      retryWithBackoff(alwaysFail, { maxAttempts: 2, initialDelayMs: 10 })
    ).rejects.toThrow('Permanent failure');
  });
});
