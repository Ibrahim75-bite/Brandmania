
export class KeyedMutex {
  private activeLocks: Map<string, Promise<void>> = new Map();

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

  public async runExclusive<T>(key: string, fn: () => Promise<T>): Promise<T> {
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
