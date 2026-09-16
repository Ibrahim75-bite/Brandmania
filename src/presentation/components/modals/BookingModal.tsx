'use client';

import React, { useEffect, useCallback } from 'react';
import { BrandEye } from '../primitives/BrandEye';
import { Button } from '../primitives/Button';
import { Badge } from '../primitives/Badge';
import styles from './BookingModal.module.css';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
  clientName?: string;
  inquiryId?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  bookingUrl,
  clientName,
  inquiryId,
}: BookingModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Booking Dialog"
        >
          ✕
        </button>

        <div className={styles.header}>
          <BrandEye size="md" />
          <Badge variant="purple" size="sm" style={{ marginTop: 'var(--space-3)' }}>
            PRIORITY SCHEDULING
          </Badge>
          <h3 id="booking-modal-title" className={styles.title}>
            Reserve Your Strategic Consultation
          </h3>
          <p className={styles.subtitle}>
            {clientName ? `Welcome, ${clientName}. ` : ''}Your qualification submission has been verified. Choose your preferred executive briefing window below.
          </p>
        </div>

        <div className={styles.content}>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            CONFIDENTIAL SESSION DETAILS
          </div>

          <div style={{ fontSize: 'var(--font-size-sm)', color: '#fff', lineHeight: 'var(--line-height-normal)' }}>
            <strong>Session:</strong> Executive Diagnostic &amp; Margin Leakage Assessment<br />
            <strong>Duration:</strong> 30 Minutes • One-on-One with Strategic Leadership<br />
            {inquiryId && (
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-purple-bright)' }}>
                Reference Dossier ID: {inquiryId}
              </span>
            )}
          </div>

          <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="primary" size="lg" style={{ width: '100%' }}>
                Open Executive Calendar ↗
              </Button>
            </a>

            <Button variant="ghost" size="sm" onClick={onClose}>
              Dismiss &amp; Complete Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
