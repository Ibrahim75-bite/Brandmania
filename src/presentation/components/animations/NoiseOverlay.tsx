'use client';

import React, { useRef, useEffect } from 'react';

interface NoiseOverlayProps {
  patternAlpha?: number;
}

export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  patternAlpha = 11,
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
    const canvasSize = 128;

    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.scale(dpr, dpr);

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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            requestIdleCallback(drawGrain, { timeout: 1500 });
            observer.disconnect();
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(canvas);
    document.addEventListener('visibilitychange', () => {});

    return () => {
      document.removeEventListener('visibilitychange', () => {});
      observer.disconnect();
    };
  }, [patternAlpha]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
