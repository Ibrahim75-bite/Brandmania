'use client';

import React, { useState, useEffect } from 'react';
import { analytics } from '@/presentation/analytics/analytics.service';

const COOKIE_CONSENT_KEY = 'brandmania_cookie_consent';

export function CookiePreferenceManager() {
  const [status, setStatus] = useState<'GRANTED' | 'DENIED' | 'NOT_SET'>('NOT_SET');
  const [isLoaded, setIsLoaded] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored === 'GRANTED') {
        setStatus('GRANTED');
      } else if (stored === 'DENIED') {
        setStatus('DENIED');
      } else {
        setStatus('NOT_SET');
      }
    } catch {
      setStatus('NOT_SET');
    }
    setIsLoaded(true);

    const handleConsentEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ consent: string }>;
      const nextConsent = customEvent.detail?.consent;
      if (nextConsent === 'GRANTED') {
        setStatus('GRANTED');
      } else if (nextConsent === 'DENIED') {
        setStatus('DENIED');
      }
    };

    window.addEventListener('brandmania_consent_changed', handleConsentEvent);
    return () => {
      window.removeEventListener('brandmania_consent_changed', handleConsentEvent);
    };
  }, []);

  const handleUpdateConsent = (choice: 'GRANTED' | 'DENIED') => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, choice);
      analytics.setConsent(choice);
      window.dispatchEvent(
        new CustomEvent('brandmania_consent_changed', { detail: { consent: choice } })
      );
      setStatus(choice);
      setFeedbackMessage(
        choice === 'GRANTED'
          ? 'Consent updated: Optional analytics telemetry enabled.'
          : 'Consent updated: Optional analytics strictly disabled (Essential Only).'
      );
      setTimeout(() => setFeedbackMessage(null), 4000);
    } catch {
      setFeedbackMessage('Unable to update local storage preference.');
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      analytics.setConsent('DENIED');
      window.dispatchEvent(
        new CustomEvent('brandmania_consent_changed', { detail: { consent: 'DENIED' } })
      );
      setStatus('NOT_SET');
      setFeedbackMessage('Preference reset. The consent banner will display on your next session.');
      setTimeout(() => setFeedbackMessage(null), 4000);
    } catch {
      setFeedbackMessage('Unable to clear local storage.');
    }
  };

  return (
    <div
      style={{
        border: '1px solid rgba(255, 255, 255, 0.14)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
        margin: 'var(--space-8) 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1rem',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.75rem',
              color: '#C882FF',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            INTERACTIVE PREFERENCE CONTROL
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(1.25rem, 2vw, 1.65rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Live Storage &amp; Telemetry Status
          </h3>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.85rem',
            backgroundColor:
              status === 'GRANTED'
                ? 'rgba(16, 185, 129, 0.12)'
                : status === 'DENIED'
                ? 'rgba(200, 130, 255, 0.12)'
                : 'rgba(255, 255, 255, 0.06)',
            border: `1px solid ${
              status === 'GRANTED'
                ? 'rgba(16, 185, 129, 0.4)'
                : status === 'DENIED'
                ? 'rgba(200, 130, 255, 0.35)'
                : 'rgba(255, 255, 255, 0.16)'
            }`,
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            color:
              status === 'GRANTED'
                ? '#34D399'
                : status === 'DENIED'
                ? '#D8B4FE'
                : '#A8A0B8',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor:
                status === 'GRANTED'
                  ? '#10B981'
                  : status === 'DENIED'
                  ? '#C882FF'
                  : '#888888',
              boxShadow:
                status === 'GRANTED'
                  ? '0 0 8px #10B981'
                  : status === 'DENIED'
                  ? '0 0 8px #C882FF'
                  : 'none',
            }}
          />
          STATUS:{' '}
          {!isLoaded
            ? 'READING...'
            : status === 'GRANTED'
            ? 'ANALYTICS GRANTED'
            : status === 'DENIED'
            ? 'ESSENTIAL ONLY (DENIED)'
            : 'DEFAULT: ESSENTIAL ONLY'}
        </div>
      </div>

      <p
        style={{
          fontSize: '0.925rem',
          lineHeight: 1.6,
          color: '#C5BFCF',
          maxWidth: '750px',
          marginBottom: '1.5rem',
        }}
      >
        {status === 'GRANTED'
          ? 'You have opted in to aggregate analytics (Google Analytics 4 with IP anonymization). You may withdraw consent at any time without impacting any website capability or qualification intake features.'
          : status === 'DENIED'
          ? 'You are operating in Essential Only mode. Non-essential tracking scripts and analytics cookies are strictly blocked and never injected into the document.'
          : 'No explicit choice has been recorded yet. The platform defaults to Essential Only protection until affirmative consent is provided.'}
      </p>

      {/* Action Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignItems: 'center',
        }}
      >
        <button
          type="button"
          onClick={() => handleUpdateConsent('DENIED')}
          disabled={status === 'DENIED'}
          style={{
            minHeight: '44px',
            padding: '0.65rem 1.25rem',
            backgroundColor: status === 'DENIED' ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF',
            color: status === 'DENIED' ? '#888888' : '#070709',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: status === 'DENIED' ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
            letterSpacing: '0.02em',
          }}
        >
          {status === 'DENIED' ? '✓ Essential Only Active' : 'Switch to Essential Only (Withdraw Consent)'}
        </button>

        <button
          type="button"
          onClick={() => handleUpdateConsent('GRANTED')}
          disabled={status === 'GRANTED'}
          style={{
            minHeight: '44px',
            padding: '0.65rem 1.25rem',
            backgroundColor: status === 'GRANTED' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
            color: status === 'GRANTED' ? '#888888' : '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: status === 'GRANTED' ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
            letterSpacing: '0.02em',
          }}
        >
          {status === 'GRANTED' ? '✓ Analytics Active' : 'Allow Optional Analytics'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          style={{
            minHeight: '44px',
            padding: '0.65rem 1rem',
            backgroundColor: 'transparent',
            color: '#A8A0B8',
            border: '1px dashed rgba(255, 255, 255, 0.15)',
            fontSize: '0.785rem',
            fontFamily: 'var(--font-mono), monospace',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          Reset Cookie Preference
        </button>
      </div>

      {feedbackMessage && (
        <div
          role="status"
          style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.785rem',
            color: '#C882FF',
            padding: '0.5rem 0.75rem',
            backgroundColor: 'rgba(200, 130, 255, 0.08)',
            borderLeft: '2px solid #C882FF',
          }}
        >
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}
