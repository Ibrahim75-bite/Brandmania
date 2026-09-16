/**
 * Analytics Port & Telemetry Contracts
 *
 * Provides a vendor-agnostic abstraction for event tracking.
 * Strictly enforces consent gating prior to initializing third-party telemetry.
 */

export type ConsentState = 'PENDING' | 'GRANTED' | 'DENIED';

export type AnalyticsEventType =
  | 'page_view'
  | 'cta_click'
  | 'vsl_start'
  | 'vsl_progress'
  | 'vsl_complete'
  | 'form_start'
  | 'form_submit'
  | 'booking_initiated'
  | 'booking_completed'
  | 'outbound_contact_click';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  payload?: Record<string, unknown>;
  timestamp?: string;
}

export interface IAnalyticsTracker {
  track(event: AnalyticsEvent): void;
  setConsent(state: ConsentState): void;
  getConsent(): ConsentState;
}
