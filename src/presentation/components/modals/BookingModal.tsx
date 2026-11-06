'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { BrandEye } from '../primitives/BrandEye';
import { Button } from '../primitives/Button';
import { Badge } from '../primitives/Badge';
import styles from './BookingModal.module.css';

const MODAL_BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl?: string;
  clientName?: string;
  inquiryId?: string;
  engagementTrack?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  bookingUrl,
  clientName,
  inquiryId,
  engagementTrack,
}: BookingModalProps) {
  const [copied, setCopied] = useState(false);
  const [timestamp] = useState(() => new Date().toUTCString());
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const dossierId = inquiryId || 'BMD-EXEC-RECORDED';

  const handleCopyId = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(dossierId);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      const focusTimer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      }, 50);

      return () => {
        clearTimeout(focusTimer);
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
        if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
          triggerRef.current.focus();
        }
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const effectiveBookingUrl = bookingUrl || MODAL_BOOKING_URL;
  const hasExternalBooking = Boolean(effectiveBookingUrl);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className={`${styles.closeButton} hit-slop`}
          onClick={onClose}
          aria-label="Close Confirmation Dialog"
        >
          ✕
        </button>

        <div className={styles.header}>
          <BrandEye size="md" />
          <Badge variant="neutral" size="sm" style={{ marginTop: 'var(--space-3)' }}>
            Transmission confirmed
          </Badge>
          <h3 id="booking-modal-title" className={styles.title}>
            Executive Dossier Received
          </h3>
          <p className={styles.subtitle}>
            {clientName ? `Thank you, ${clientName}. ` : ''}Your strategic qualification dossier has been securely encrypted and delivered to BRANDMANIA executive leadership.
          </p>
        </div>

        <div className={styles.content}>
          {}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              textAlign: 'left',
              padding: 'var(--space-4)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                Executive Dossier Transmission Receipt
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono), monospace',
                  color: 'var(--color-status-success)',
                }}
              >
                SECURE
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
                Reference Dossier ID:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 'var(--font-size-xs)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                  }}
                  className="tabular-nums"
                >
                  {dossierId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="hit-slop"
                  style={{
                    background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.18)'}`,
                    color: copied ? '#10b981' : '#FFFFFF',
                    padding: '2px 8px',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono), monospace',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  aria-label="Copy Reference Dossier ID to clipboard"
                >
                  {copied ? 'Copied to Clipboard ✓' : 'Copy ID'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
                Transmission Timestamp:
              </span>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#FFFFFF' }} className="tabular-nums">
                {timestamp}
              </span>
            </div>

            {engagementTrack && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
                  Selected Engagement Track:
                </span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: '#FFFFFF', fontWeight: 500 }}>
                  {engagementTrack}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
                Legal &amp; NDA Status:
              </span>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-status-success)' }}>
                Under Executive Review (Mutual NDA Protocol)
              </span>
            </div>
          </div>

          <p
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-height-relaxed)',
              margin: 0,
              textAlign: 'left',
            }}
          >
            Senior leadership will review your commercial profile under strict non-disclosure. We will evaluate your unit economics and positioning architecture, then reach out directly via your corporate contact coordinates within 24–48 business hours.
          </p>

          <div style={{ marginTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {hasExternalBooking ? (
              <>
                <a
                  href={effectiveBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="primary" size="lg" style={{ width: '100%' }} className="hit-slop">
                    Open Executive Calendar ↗
                  </Button>
                </a>
                <Button variant="ghost" size="sm" onClick={onClose} className="hit-slop">
                  Acknowledge &amp; Close
                </Button>
              </>
            ) : (
              <Button variant="primary" size="lg" style={{ width: '100%' }} onClick={onClose} className="hit-slop">
                Acknowledge Transmission →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
