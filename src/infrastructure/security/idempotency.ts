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
  private readonly maxRecords = 5000;

  constructor(ttlMs: number = 24 * 60 * 60 * 1000) {
    this.ttlMs = ttlMs;
  }

  private sweepExpired(): void {
    const now = Date.now();
    for (const [key, record] of this.store) {
      if (now - record.createdAt > this.ttlMs) {
        this.store.delete(key);
      }
    }
  }

  private evictIfNeeded(): void {
    if (this.store.size < this.maxRecords) return;
    let oldestKey = '';
    let oldestTime = Infinity;
    for (const [key, record] of this.store) {
      if (record.createdAt < oldestTime) {
        oldestTime = record.createdAt;
        oldestKey = key;
      }
    }
    if (oldestKey) {
      this.store.delete(oldestKey);
    }
  }

  public get<T>(key: string): IdempotencyRecord<T> | undefined {
    const record = this.store.get(key) as IdempotencyRecord<T> | undefined;
    if (!record) return undefined;
    if (Date.now() - record.createdAt > this.ttlMs) {
      this.store.delete(key);
      return undefined;
    }
    return record;
  }

  public set<T>(key: string, record: Omit<IdempotencyRecord<T>, 'key' | 'createdAt'>): void {
    this.evictIfNeeded();
    this.store.set(key, {
      ...record,
      key,
      createdAt: Date.now(),
    });
  }

  public markInFlight(key: string): boolean {
    const existing = this.get(key);
    if (existing) {
      return false;
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

export const idempotencyStore = new IdempotencyStore();
