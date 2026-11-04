'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface UndoToastProps {
  isVisible: boolean;
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  durationMs?: number;
}

export const UndoToast: React.FC<UndoToastProps> = ({
  isVisible,
  message,
  onUndo,
  onDismiss,
  durationMs = 5000,
}) => {
  // Listen for Cmd+Z / Ctrl+Z
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isVisible) return;

      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        if (!isInput) {
          e.preventDefault();
          onUndo();
          onDismiss();
        }
      }
    },
    [isVisible, onUndo, onDismiss]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Auto-dismiss timer
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isVisible, durationMs, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
          className="squircle-surface"
          style={{
            position: 'fixed',
            bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
            right: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))',
            zIndex: 9999,
            backgroundColor: 'rgba(7, 7, 9, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-sans), -apple-system, sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#ffffff',
              }}
            />
            <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{message}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => {
                onUndo();
                onDismiss();
              }}
              className="hit-slop"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '4px',
                color: '#fff',
                padding: '0.25rem 0.6rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'background 0.15s ease',
              }}
            >
              Undo
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>⌘Z</kbd>
            </button>

            <button
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="hit-slop"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                padding: '0.2rem',
                lineHeight: 1,
                fontSize: '1rem',
              }}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
