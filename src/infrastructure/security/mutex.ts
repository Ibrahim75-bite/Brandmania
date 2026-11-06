export class KeyedMutex {
  private activeLocks: Map<string, Promise<void>> = new Map();
  private lockTimestamps: Map<string, number> = new Map();
  private readonly maxLocks = 5000;
  private readonly lockTtlMs = 30000;

  public async acquire(key: string): Promise<() => void> {
    let releaseCurrent: () => void = () => {};

    const nextLock = new Promise<void>((resolve) => {
      releaseCurrent = resolve;
    });

    const previousLock = this.activeLocks.get(key) || Promise.resolve();
    this.activeLocks.set(key, previousLock.then(() => nextLock));
    this.lockTimestamps.set(key, Date.now());

    await previousLock;

    let isReleased = false;
    return () => {
      if (!isReleased) {
        isReleased = true;
        releaseCurrent();
        if (this.activeLocks.get(key) === nextLock) {
          this.activeLocks.delete(key);
          this.lockTimestamps.delete(key);
        }
      }
    };
  }

  private sweepStaleLocks(): void {
    const now = Date.now();
    for (const [key, timestamp] of this.lockTimestamps) {
      if (now - timestamp > this.lockTtlMs) {
        this.activeLocks.delete(key);
        this.lockTimestamps.delete(key);
      }
    }
  }

  private evictIfNeeded(): void {
    if (this.activeLocks.size < this.maxLocks) return;
    this.sweepStaleLocks();
    if (this.activeLocks.size >= this.maxLocks) {
      let oldestKey = '';
      let oldestTime = Infinity;
      for (const [key, timestamp] of this.lockTimestamps) {
        if (timestamp < oldestTime) {
          oldestTime = timestamp;
          oldestKey = key;
        }
      }
      if (oldestKey) {
        this.activeLocks.delete(oldestKey);
        this.lockTimestamps.delete(oldestKey);
      }
    }
  }

  public async runExclusive<T>(key: string, fn: () => Promise<T>): Promise<T> {
    this.evictIfNeeded();
    const release = await this.acquire(key);
    try {
      return await fn();
    } finally {
      release();
    }
  }

  public isLocked(key: string): boolean {
    return this.activeLocks.has(key);
  }
}

export const keyedMutex = new KeyedMutex();
