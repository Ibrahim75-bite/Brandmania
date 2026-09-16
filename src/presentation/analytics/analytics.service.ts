'use client';

import { IAnalyticsTracker, AnalyticsEvent, ConsentState } from './analytics.port';

const CONSENT_STORAGE_KEY = 'brandmania_cookie_consent';

export class AnalyticsService implements IAnalyticsTracker {
  private consent: ConsentState = 'PENDING';

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentState | null;
      if (stored === 'GRANTED' || stored === 'DENIED') {
        this.consent = stored;
      }
    }
  }

  public setConsent(state: ConsentState): void {
    this.consent = state;
    if (typeof window !== 'undefined') {
      localStorage.setItem(CONSENT_STORAGE_KEY, state);
    }
  }

  public getConsent(): ConsentState {
    return this.consent;
  }

  public track(event: AnalyticsEvent): void {
    // Strictly gate non-essential analytics tracking if consent is not granted
    if (this.consent !== 'GRANTED') {
      return;
    }

    const eventWithTimestamp = {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
    };

    // Development & testing console observer
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`[ANALYTICS] [${eventWithTimestamp.type}]`, eventWithTimestamp.payload);
    }

    // Adaptable integration point: dispatch to window.dataLayer, Meta Pixel, or custom endpoint
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.dataLayer && Array.isArray(win.dataLayer)) {
        win.dataLayer.push({
          event: eventWithTimestamp.type,
          ...eventWithTimestamp.payload,
        });
      }
    }
  }
}

export const analytics = new AnalyticsService();
