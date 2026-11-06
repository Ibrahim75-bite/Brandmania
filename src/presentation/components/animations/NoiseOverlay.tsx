'use client';

import React, { useRef, useEffect } from 'react';

interface NoiseOverlayProps {
  patternAlpha?: number;
  patternRefreshInterval?: number;
}

export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  patternAlpha = 11,
  patternRefreshInterval = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasSize = 512;

    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.scale(dpr, dpr);

    let frame = 0;
    let animationId: number;
    let isPaused = false;

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        const val = (Math.random() * 255) | 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = patternAlpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (isPaused) {
        animationId = window.requestAnimationFrame(loop);
        return;
      }
      frame++;
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      animationId = window.requestAnimationFrame(loop);
    };

    const handleVisibilityChange = () => {
      isPaused = document.visibilityState === 'hidden';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isPaused = !entry.isIntersecting;
        }
      },
      { threshold: 0 }
    );

    observer.observe(canvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    drawGrain();
    animationId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [patternAlpha, patternRefreshInterval]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03, pointerEvents: 'none' }} aria-hidden="true" />;
}
