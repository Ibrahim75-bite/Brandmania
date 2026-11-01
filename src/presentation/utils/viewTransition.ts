/**
 * Safe View Transition Wrapper
 * Integrates with document.startViewTransition when available,
 * respecting prefers-reduced-motion, with instantaneous callback fallback.
 */

export function runViewTransition(callback: () => void | Promise<void>): void {
  if (typeof window === 'undefined') {
    callback();
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion or startViewTransition is unsupported, execute immediately
  if (prefersReducedMotion || typeof document === 'undefined' || !('startViewTransition' in document)) {
    callback();
    return;
  }

  // Type-safe invocation of document.startViewTransition
  try {
    (document as unknown as { startViewTransition: (cb: () => void | Promise<void>) => unknown })
      .startViewTransition(() => {
        return callback();
      });
  } catch {
    callback();
  }
}
