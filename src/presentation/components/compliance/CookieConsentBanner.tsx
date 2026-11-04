'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { analytics } from '@/presentation/analytics/analytics.service';
import { LEGAL_CONTENT } from '@/content/legal';

export const COOKIE_CONSENT_KEY = 'brandmania_cookie_consent';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) {
        setIsVisible(true);
      }
    } catch {}
  }, []);

  const handleAcceptAnalytics = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'GRANTED');
    } catch {}
    analytics.setConsent('GRANTED');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('brandmania_consent_changed', { detail: { consent: 'GRANTED' } })
      );
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'DENIED');
    } catch {}
    analytics.setConsent('DENIED');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('brandmania_consent_changed', { detail: { consent: 'DENIED' } })
      );
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and Privacy Consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(13, 1, 24, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(200, 130, 255, 0.25)',
        padding: '0.85rem 2rem',
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ maxWidth: '840px', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              color: '#C882FF',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {LEGAL_CONTENT.cookieConsent.bannerTitle}
          </span>
          <p
            style={{
              fontSize: '0.8125rem',
              color: '#C4B8D8',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {LEGAL_CONTENT.cookieConsent.bannerText}{' '}
            <Link
              href="/privacy"
              style={{
                color: '#FAF7FF',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                fontWeight: 500,
              }}
            >
              Privacy Policy &rarr;
            </Link>
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={handleAcceptAnalytics}
            style={{
              minHeight: '38px',
              padding: '0.5rem 1.25rem',
              backgroundColor: '#C882FF',
              color: '#0D0118',
              border: '1px solid #C882FF',
              fontSize: '11px',
              fontFamily: 'var(--font-mono), monospace',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {LEGAL_CONTENT.cookieConsent.acceptAllLabel}
          </button>

          <button
            type="button"
            onClick={handleEssentialOnly}
            style={{
              minHeight: '38px',
              padding: '0.5rem 1.25rem',
              backgroundColor: 'transparent',
              color: '#FAF7FF',
              border: '1px solid rgba(200, 130, 255, 0.3)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono), monospace',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {LEGAL_CONTENT.cookieConsent.essentialOnlyLabel}
          </button>
        </div>
      </div>
    </aside>
  );
}
