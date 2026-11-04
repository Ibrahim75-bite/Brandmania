/**
 * In-Memory Cache Store with Tag-Based and Prefix-Based Invalidation
 * Standard #16: Cache Invalidation & Cache Stampede Prevention
 */

import { ICache } from '../../application/ports/cache.port';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  tags: string[];
}

export class MemoryCacheStore implements ICache {
  private readonly store = new Map<string, CacheEntry<unknown>>();
  private readonly tagMap = new Map<string, Set<string>>();

  constructor(
    private readonly defaultTtlMs = 300000,
    private readonly keyPrefix = 'brandmania_cache:'
  ) {}

  private getFullKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  public async get<T>(key: string): Promise<T | null> {
    const fullKey = this.getFullKey(key);
    const entry = this.store.get(fullKey);

    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.deleteInternal(fullKey, entry.tags);
      return null;
    }

    return entry.value as T;
  }

  public async set<T>(
    key: string,
    value: T,
    ttlMs = this.defaultTtlMs,
    tags: string[] = []
  ): Promise<void> {
    const fullKey = this.getFullKey(key);

    // If key already existed with old tags, clean them up
    const existing = this.store.get(fullKey);
    if (existing) {
      this.removeFromTagIndex(fullKey, existing.tags);
    }

    this.store.set(fullKey, {
      value,
      expiresAt: Date.now() + ttlMs,
      tags,
    });

    for (const tag of tags) {
      if (!this.tagMap.has(tag)) {
        this.tagMap.set(tag, new Set());
      }
      this.tagMap.get(tag)!.add(fullKey);
    }
  }

  private removeFromTagIndex(fullKey: string, tags: string[]): void {
    for (const tag of tags) {
      const keys = this.tagMap.get(tag);
      if (keys) {
        keys.delete(fullKey);
        if (keys.size === 0) {
          this.tagMap.delete(tag);
        }
      }
    }
  }

  private deleteInternal(fullKey: string, tags: string[]): boolean {
    this.removeFromTagIndex(fullKey, tags);
    return this.store.delete(fullKey);
  }

  public async delete(key: string): Promise<boolean> {
    const fullKey = this.getFullKey(key);
    const entry = this.store.get(fullKey);
    if (!entry) return false;
    return this.deleteInternal(fullKey, entry.tags);
  }

  /**
   * Invalidates all cache entries linked to a specific tag.
   * Standard #16: Tag-based cache invalidation
   */
  public async invalidateByTag(tag: string): Promise<number> {
    const keys = this.tagMap.get(tag);
    if (!keys || keys.size === 0) return 0;

    const fullKeysToDelete = Array.from(keys);
    let count = 0;

    for (const fullKey of fullKeysToDelete) {
      const entry = this.store.get(fullKey);
      if (entry) {
        this.deleteInternal(fullKey, entry.tags);
        count++;
      }
    }

    this.tagMap.delete(tag);
    return count;
  }

  /**
   * Invalidates all cache entries starting with the specified prefix.
   * Standard #16: Prefix-based cache invalidation
   */
  public async invalidateByPrefix(prefix: string): Promise<number> {
    const targetPrefix = `${this.keyPrefix}${prefix}`;
    let count = 0;

    for (const [fullKey, entry] of Array.from(this.store.entries())) {
      if (fullKey.startsWith(targetPrefix)) {
        this.deleteInternal(fullKey, entry.tags);
        count++;
      }
    }

    return count;
  }

  public async clear(): Promise<void> {
    this.store.clear();
    this.tagMap.clear();
  }

  public async has(key: string): Promise<boolean> {
    const val = await this.get(key);
    return val !== null;
  }
}
