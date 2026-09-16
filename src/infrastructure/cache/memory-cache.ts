import { ICache } from '../../application/ports/cache.port';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class MemoryCacheStore implements ICache {
  private readonly store = new Map<string, CacheEntry<unknown>>();

  constructor(
    private readonly defaultTtlMs = 300000,
    private readonly keyPrefix = 'agy_cache:'
  ) {}

  private getFullKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  public async get<T>(key: string): Promise<T | null> {
    const fullKey = this.getFullKey(key);
    const entry = this.store.get(fullKey);

    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(fullKey);
      return null;
    }

    return entry.value as T;
  }

  public async set<T>(key: string, value: T, ttlMs = this.defaultTtlMs): Promise<void> {
    const fullKey = this.getFullKey(key);
    this.store.set(fullKey, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  public async delete(key: string): Promise<boolean> {
    return this.store.delete(this.getFullKey(key));
  }

  public async clear(): Promise<void> {
    this.store.clear();
  }

  public async has(key: string): Promise<boolean> {
    const val = await this.get(key);
    return val !== null;
  }
}
