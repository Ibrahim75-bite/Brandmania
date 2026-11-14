'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const initLenis = (): (() => void) | undefined => {
      if (lenisRef.current) return undefined;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
      lenisRef.current = lenis;

      let animationFrameId: number;
      let isPaused = false;

      function raf(time: number) {
        if (!isPaused) {
          lenis.raf(time);
        }
        animationFrameId = requestAnimationFrame(raf);
      }

      const handleVisibilityChange = () => {
        isPaused = document.visibilityState === 'hidden';
      };

      animationFrameId = requestAnimationFrame(raf);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    const cleanup = initLenis();

    if (cleanup) {
      window.addEventListener('wheel', cleanup, { once: true, passive: true });
      window.addEventListener('touchstart', cleanup, { once: true, passive: true });
      window.addEventListener('keydown', cleanup, { once: true, passive: true });
    }

    return () => {
      if (cleanup) {
        window.removeEventListener('wheel', cleanup);
        window.removeEventListener('touchstart', cleanup);
        window.removeEventListener('keydown', cleanup);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return null;
}
