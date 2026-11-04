export interface ICache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlMs?: number, tags?: string[]): Promise<void>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
  invalidateByTag(tag: string): Promise<number>;
  invalidateByPrefix(prefix: string): Promise<number>;
}
