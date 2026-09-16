import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryCacheStore } from '@/infrastructure/cache/memory-cache';

describe('MemoryCacheStore', () => {
  let cache: MemoryCacheStore;

  beforeEach(() => {
    cache = new MemoryCacheStore(500, 'test:');
  });

  it('should store and retrieve cached values', async () => {
    await cache.set('profile:1', { name: 'Vance' });
    const val = await cache.get<{ name: string }>('profile:1');
    expect(val).toEqual({ name: 'Vance' });
  });

  it('should return null for expired entries', async () => {
    await cache.set('temp', 'value', 10); // 10ms TTL
    await new Promise((r) => setTimeout(r, 20));
    const val = await cache.get('temp');
    expect(val).toBeNull();
  });

  it('should correctly delete cached keys', async () => {
    await cache.set('item', 123);
    const deleted = await cache.delete('item');
    expect(deleted).toBe(true);

    const val = await cache.get('item');
    expect(val).toBeNull();
  });
});
