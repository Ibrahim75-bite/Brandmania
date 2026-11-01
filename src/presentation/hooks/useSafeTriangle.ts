import { useRef, useCallback, useEffect } from 'react';

export interface Point {
  x: number;
  y: number;
}

/**
 * 2D vector cross-product sign test for point-in-triangle inclusion
 */
export function sign(p1: Point, p2: Point, p3: Point): number {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

/**
 * Mathematical test: checks if point pt is inside triangle formed by vertices v1, v2, v3
 */
export function isPointInTriangle(pt: Point, v1: Point, v2: Point, v3: Point): boolean {
  const d1 = sign(pt, v1, v2);
  const d2 = sign(pt, v2, v3);
  const d3 = sign(pt, v3, v1);

  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(hasNeg && hasPos);
}

export interface UseSafeTriangleOptions {
  detailRef: React.RefObject<HTMLElement | null>;
  suppressionDelayMs?: number;
}

export function useSafeTriangle({
  detailRef,
  suppressionDelayMs = 180,
}: UseSafeTriangleOptions) {
  const currentCursorRef = useRef<Point>({ x: 0, y: 0 });
  const prevCursorRef = useRef<Point>({ x: 0, y: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      prevCursorRef.current = currentCursorRef.current;
      currentCursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const isCursorInSafeTriangle = useCallback((): boolean => {
    if (!detailRef.current) return false;
    const rect = detailRef.current.getBoundingClientRect();
    
    // Triangle vertices:
    // v1: starting cursor position
    // v2: top-left corner of active detail pane
    // v3: bottom-left corner of active detail pane
    // (or right corners if detail pane is to the left of the cursor)
    const isDetailToLeft = rect.right < currentCursorRef.current.x;
    const targetX = isDetailToLeft ? rect.right : rect.left;

    const v1: Point = prevCursorRef.current.x === 0 ? currentCursorRef.current : prevCursorRef.current;
    const v2: Point = { x: targetX, y: rect.top };
    const v3: Point = { x: targetX, y: rect.bottom };

    return isPointInTriangle(currentCursorRef.current, v1, v2, v3);
  }, [detailRef]);

  const handleRowHover = useCallback(
    (onActivate: () => void) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (isCursorInSafeTriangle()) {
        // Suppress accidental switch while diagonal movement to detail panel is underway
        timerRef.current = setTimeout(() => {
          onActivate();
        }, suppressionDelayMs);
      } else {
        // Immediate switch
        onActivate();
      }
    },
    [isCursorInSafeTriangle, suppressionDelayMs]
  );

  return {
    handleRowHover,
    isCursorInSafeTriangle,
  };
}
