'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePresence, MOTION_EASE } from '@/presentation/hooks/usePresence';

export interface SwipeableSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  syncHistory?: boolean;
}

export const SwipeableSheet: React.FC<SwipeableSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  syncHistory = true,
}) => {
  const isPushedRef = useRef(false);
  const { mounted, visible } = usePresence(isOpen, 380);
  const [dragY, setDragY] = useState<number | null>(null);
  const dragStartRef = useRef({ y: 0, lastY: 0, lastT: 0, velocity: 0 });

  useEffect(() => {
    if (!isOpen) {
      setDragY(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!syncHistory || typeof window === 'undefined') return;

    if (isOpen) {
      window.history.pushState({ modal: 'swipeable-sheet' }, '');
      isPushedRef.current = true;

      const handlePopState = () => {
        isPushedRef.current = false;
        onClose();
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (isPushedRef.current && window.history.state?.modal === 'swipeable-sheet') {
          window.history.back();
          isPushedRef.current = false;
        }
      };
    }
  }, [isOpen, onClose, syncHistory]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      y: e.clientY,
      lastY: e.clientY,
      lastT: performance.now(),
      velocity: 0,
    };
    setDragY(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragY === null) return;
    const dy = e.clientY - dragStartRef.current.y;
    if (dy > 0) setDragY(dy);
    const now = performance.now();
    const dt = now - dragStartRef.current.lastT;
    if (dt > 0) {
      dragStartRef.current.velocity = ((e.clientY - dragStartRef.current.lastY) / dt) * 1000;
      dragStartRef.current.lastY = e.clientY;
      dragStartRef.current.lastT = now;
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragY === null) return;
    const dy = e.clientY - dragStartRef.current.y;
    setDragY(null);
    if (dy > 110 || dragStartRef.current.velocity > 450) {
      onClose();
    }
  };

  if (!mounted) return null;

  const dragging = dragY !== null;
  const sheetTransform = dragging
    ? `translateY(${dragY}px)`
    : visible
      ? 'translateY(0)'
      : 'translateY(100%)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        pointerEvents: 'auto',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(7, 7, 9, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: visible ? 1 : 0,
          transition: `opacity 200ms ${MOTION_EASE}`,
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxHeight: '90vh',
          backgroundColor: '#070709',
          borderTop: '1px solid rgba(255, 255, 255, 0.14)',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
          transform: sheetTransform,
          transition: dragging
            ? 'none'
            : `transform 380ms ${MOTION_EASE}`,
        }}
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          style={{
            width: '100%',
            padding: '0.75rem 0 0.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'grab',
            touchAction: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            }}
          />
        </div>

        {title && (
          <div
            style={{
              padding: '0.5rem 1.5rem 1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: '1.25rem',
                color: '#fff',
              }}
            >
              {title}
            </span>
            <button
              onClick={onClose}
              aria-label="Close sheet"
              className="hit-slop"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        )}

        <div
          style={{
            padding: '1.5rem',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
