import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRateLimiter } from '@/infrastructure/security/rate-limiter';
import { IdempotencyStore } from '@/infrastructure/security/idempotency';
import {
  generateUnsubscribeToken,
  verifyUnsubscribeToken,
  extractEmailFromToken,
} from '@/infrastructure/email/email-templates';

describe('Phase E: LRU Eviction Verification', () => {
  describe('MemoryRateLimiter bounded buckets', () => {
    let rateLimiter: MemoryRateLimiter;

    beforeEach(() => {
      rateLimiter = new MemoryRateLimiter(100, 60000);
      (rateLimiter as any).maxBuckets = 3;
    });

    it('evicts oldest bucket when capacity is reached', async () => {
      await rateLimiter.checkLimit('key-1', 100, 60000);
      await rateLimiter.checkLimit('key-2', 100, 60000);
      await rateLimiter.checkLimit('key-3', 100, 60000);

      const sizeBefore = (rateLimiter as any).buckets.size;
      expect(sizeBefore).toBe(3);

      await rateLimiter.checkLimit('key-4', 100, 60000);

      const sizeAfter = (rateLimiter as any).buckets.size;
      expect(sizeAfter).toBe(3);

      const key1Result = await rateLimiter.checkLimit('key-1', 100, 60000);
      expect(key1Result.allowed).toBe(true);

      const key4Result = await rateLimiter.checkLimit('key-4', 100, 60000);
      expect(key4Result.allowed).toBe(true);
    });
  });

  describe('IdempotencyStore bounded records', () => {
    let store: IdempotencyStore;

    beforeEach(() => {
      store = new IdempotencyStore(24 * 60 * 60 * 1000);
      (store as any).maxRecords = 3;
    });

    it('evicts oldest record when capacity is reached', async () => {
      store.set('key-1', { status: 'RESOLVED', response: { statusCode: 200, body: {} } });
      store.set('key-2', { status: 'RESOLVED', response: { statusCode: 200, body: {} } });
      store.set('key-3', { status: 'RESOLVED', response: { statusCode: 200, body: {} } });

      const sizeBefore = store.size();
      expect(sizeBefore).toBe(3);

      store.set('key-4', { status: 'RESOLVED', response: { statusCode: 200, body: {} } });

      const sizeAfter = store.size();
      expect(sizeAfter).toBe(3);

      const record1 = store.get('key-1');
      expect(record1).toBeUndefined();

      const record4 = store.get('key-4');
      expect(record4).not.toBeUndefined();
    });
  });

  describe('Unsubscribe token does not contain raw email in URL', () => {
    const testEmail = 'executive@enterprise-client.com';

    it('token contains base64url encoded email, not raw email', () => {
      const token = generateUnsubscribeToken(testEmail);
      const parts = token.split('.');
      expect(parts.length).toBe(2);

      const decodedEmail = Buffer.from(parts[0], 'base64url').toString('utf-8');
      expect(decodedEmail).toBe(testEmail.toLowerCase().trim());

      expect(token).not.toContain(testEmail);
    });

    it('extractEmailFromToken recovers email from token', () => {
      const token = generateUnsubscribeToken(testEmail);
      const extracted = extractEmailFromToken(token);
      expect(extracted).toBe(testEmail.toLowerCase().trim());
    });

    it('extractEmailFromToken rejects tampered token', () => {
      const token = generateUnsubscribeToken(testEmail);
      const tampered = token.substring(0, token.length - 1) + 'x';
      const extracted = extractEmailFromToken(tampered);
      expect(extracted).toBeNull();
    });

    it('verifyUnsubscribeToken rejects mismatched email', () => {
      const token = generateUnsubscribeToken(testEmail);
      expect(verifyUnsubscribeToken(testEmail, token)).toBe(true);
      expect(verifyUnsubscribeToken('different@client.com', token)).toBe(false);
    });
  });
});
