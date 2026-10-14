'use client';

import React, { useRef, useEffect } from 'react';

interface NoiseOverlayProps {
  patternAlpha?: number;
  patternRefreshInterval?: number;
}

/**
 * NoiseOverlay - React Bits Adapted Tactile Film Grain Canvas
 * Imparts an authentic physical paper/editorial texture over the obsidian void.
 * Fixed, pointer-events: none, zero impact on interaction.
 */
export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  patternAlpha = 11,
  patternRefreshInterval = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable active canvas animation under reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId: number;
    const canvasSize = 512;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

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
      frame++;
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      animationId = window.requestAnimationFrame(loop);
    };

    drawGrain();
    animationId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [patternAlpha, patternRefreshInterval]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999,
        opacity: 0.85,
      }}
    />
  );
};
