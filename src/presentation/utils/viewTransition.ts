
export function runViewTransition(callback: () => void | Promise<void>): void {
  if (typeof window === 'undefined') {
    callback();
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || typeof document === 'undefined' || !('startViewTransition' in document)) {
    callback();
    return;
  }

  try {
    (document as unknown as { startViewTransition: (cb: () => void | Promise<void>) => unknown })
      .startViewTransition(() => {
        return callback();
      });
  } catch {
    callback();
  }
}
