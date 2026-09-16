'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../primitives/Button';
import { analytics } from '@/presentation/analytics/analytics.service';
import { LEGAL_CONTENT } from '@/content/legal';
import styles from './CookieConsent.module.css';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if consent has not yet been resolved
    if (analytics.getConsent() === 'PENDING') {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    analytics.setConsent('GRANTED');
    setIsVisible(false);
    analytics.track({ type: 'cta_click', payload: { action: 'cookie_consent_accepted' } });
  };

  const handleEssentialOnly = () => {
    analytics.setConsent('DENIED');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner} role="region" aria-label="Cookie Consent Banner">
      <h4 className={styles.title}>{LEGAL_CONTENT.cookieConsent.bannerTitle}</h4>
      <p className={styles.text}>{LEGAL_CONTENT.cookieConsent.bannerText}</p>
      <div className={styles.buttonRow}>
        <Button variant="primary" size="sm" onClick={handleAcceptAll}>
          {LEGAL_CONTENT.cookieConsent.acceptAllLabel}
        </Button>
        <Button variant="outline" size="sm" onClick={handleEssentialOnly}>
          {LEGAL_CONTENT.cookieConsent.essentialOnlyLabel}
        </Button>
      </div>
    </div>
  );
}
