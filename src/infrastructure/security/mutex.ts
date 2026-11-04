/**
 * Keyed Mutex Utility
 * Standard #2: Race Condition & Critical Section Serialization
 *
 * Enforces per-key serialized async execution to eliminate race conditions
 * on concurrent requests operating on the same business entity or idempotency key.
 */

export class KeyedMutex {
  private activeLocks: Map<string, Promise<void>> = new Map();

  /**
   * Acquires a lock for a specific key. Resolves to a release callback function
   * that MUST be called in a finally block.
   */
  public async acquire(key: string): Promise<() => void> {
    let releaseCurrent: () => void = () => {};

    const nextLock = new Promise<void>((resolve) => {
      releaseCurrent = resolve;
    });

    const previousLock = this.activeLocks.get(key) || Promise.resolve();
    this.activeLocks.set(key, previousLock.then(() => nextLock));

    await previousLock;

    let isReleased = false;
    return () => {
      if (!isReleased) {
        isReleased = true;
        releaseCurrent();
        if (this.activeLocks.get(key) === nextLock) {
          this.activeLocks.delete(key);
        }
      }
    };
  }

  /**
   * Executes an async operation exclusively for the given key.
   */
  public async runExclusive<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const release = await this.acquire(key);
    try {
      return await fn();
    } finally {
      release();
    }
  }

  /**
   * Checks if a key currently has active waiters.
   */
  public isLocked(key: string): boolean {
    return this.activeLocks.has(key);
  }
}

export const keyedMutex = new KeyedMutex();
