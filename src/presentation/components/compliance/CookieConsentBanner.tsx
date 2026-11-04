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
    } catch {
      // Gracefully handle storage disabled environments
    }
  }, []);

  const handleAcceptAnalytics = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'GRANTED');
    } catch {
      // Graceful fallback
    }
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
    } catch {
      // Graceful fallback
    }
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
        backgroundColor: 'rgba(7, 7, 9, 0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        padding: 'clamp(1rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 4rem)',
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
          gap: '1.25rem',
        }}
      >
        {/* Editorial Information */}
        <div style={{ maxWidth: '820px' }}>
          <div
            style={{
              fontFamily: 'var(--font-Mono)',
              fontSize: '0.7rem',
              color: '#ffffff',
              letterSpacing: '0.02em',
              marginBottom: '0.25rem',
            }}
          >
            {LEGAL_CONTENT.cookieConsent.bannerTitle}
          </div>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#EAE6F0',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {LEGAL_CONTENT.cookieConsent.bannerText}{' '}
            <Link
              href="/privacy"
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                fontWeight: 500,
              }}
            >
              Privacy Policy ↗
            </Link>
          </p>
        </div>

        {/* Action Buttons */}
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
              minHeight: '44px',
              padding: '0.65rem 1.4rem',
              backgroundColor: '#FFFFFF',
              color: '#070709',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
          >
            {LEGAL_CONTENT.cookieConsent.acceptAllLabel}
          </button>

          <button
            type="button"
            onClick={handleEssentialOnly}
            style={{
              minHeight: '44px',
              padding: '0.65rem 1.4rem',
              backgroundColor: 'transparent',
              color: '#A8A0B8',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
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
