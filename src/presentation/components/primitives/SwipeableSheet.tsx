'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';

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

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 450) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 7, 9, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.6 }}
            onDragEnd={handleDragEnd}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
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
            }}
          >
            {}
            <div
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

            {}
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

            {}
            <div
              style={{
                padding: '1.5rem',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
