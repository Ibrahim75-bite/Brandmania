'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { COOKIE_CONSENT_KEY } from '../compliance/CookieConsentBanner';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored === 'GRANTED') {
        setHasConsent(true);
      }
    } catch {
      // Graceful fallback
    }

    const handleConsentEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ consent: string }>;
      if (customEvent.detail?.consent === 'GRANTED') {
        setHasConsent(true);
      } else {
        setHasConsent(false);
      }
    };

    window.addEventListener('brandmania_consent_changed', handleConsentEvent);
    return () => {
      window.removeEventListener('brandmania_consent_changed', handleConsentEvent);
    };
  }, []);

  return (
    <>
      {hasConsent && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}
      {children}
    </>
  );
}
