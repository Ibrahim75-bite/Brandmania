/**
 * Server-Side Idempotency Store
 * Deduplicates repeated consultation requests with identical Idempotency-Key,
 * preventing race-conditions, duplicate billing/notifications, and multiple records.
 */

export interface IdempotencyRecord<T = unknown> {
  key: string;
  status: 'IN_FLIGHT' | 'RESOLVED';
  response?: {
    statusCode: number;
    body: T;
    headers?: Record<string, string>;
  };
  createdAt: number;
}

export class IdempotencyStore {
  private store: Map<string, IdempotencyRecord> = new Map();
  private readonly ttlMs: number;

  constructor(ttlMs: number = 24 * 60 * 60 * 1000) {
    this.ttlMs = ttlMs;
  }

  public get<T>(key: string): IdempotencyRecord<T> | undefined {
    const record = this.store.get(key) as IdempotencyRecord<T> | undefined;
    if (!record) return undefined;

    // Check expiration
    if (Date.now() - record.createdAt > this.ttlMs) {
      this.store.delete(key);
      return undefined;
    }

    return record;
  }

  public set<T>(key: string, record: Omit<IdempotencyRecord<T>, 'key' | 'createdAt'>): void {
    this.store.set(key, {
      ...record,
      key,
      createdAt: Date.now(),
    });
  }

  public markInFlight(key: string): boolean {
    const existing = this.get(key);
    if (existing) {
      return false; // Already exists (in-flight or resolved)
    }
    this.set(key, { status: 'IN_FLIGHT' });
    return true;
  }

  public resolve<T>(key: string, statusCode: number, body: T, headers?: Record<string, string>): void {
    this.set(key, {
      status: 'RESOLVED',
      response: {
        statusCode,
        body,
        headers,
      },
    });
  }

  /**
   * Releases an in-flight key if execution failed, permitting legitimate client retries.
   * Standard #2 & #3
   */
  public release(key: string): void {
    const existing = this.store.get(key);
    if (existing && existing.status === 'IN_FLIGHT') {
      this.store.delete(key);
    }
  }

  public clear(): void {
    this.store.clear();
  }

  public size(): number {
    return this.store.size;
  }
}

// Singleton instance for server runtime
export const idempotencyStore = new IdempotencyStore();
