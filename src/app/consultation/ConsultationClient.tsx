'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Input } from '@/presentation/components/primitives/Input';
import { Container } from '@/presentation/components/layout/Container';

export function ConsultationClient() {
  const [email, setEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [revenueTier, setRevenueTier] = useState('TIER_700K_1_5M');
  const [companyFaxNumber, setCompanyFaxNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [showFallbackForm, setShowFallbackForm] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const handleFallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    const submissionDurationMs = Date.now() - startTimeRef.current;
    const payload = {
      clientName: clientName.trim(),
      companyName: companyName.trim(),
      email: email.trim().toLowerCase(),
      website: website.trim() ? (website.trim().startsWith('http') ? website.trim() : 'https://' + website.trim()) : '',
      companyTier: revenueTier === 'TIER_5M_PLUS' ? 'HAUTE_LUXURY' : revenueTier === 'TIER_1_5M_5M' ? 'GLOBAL_ENTERPRISE' : 'MID_MARKET',
      budgetRange: 'TIER_100K_250K',
      services: ['BRAND_DIRECTION', 'MARGIN_RECOVERY', 'CONSUMER_SCOPE'],
      company_fax_number: companyFaxNumber,
      submissionDurationMs,
      consentAccepted: true,
      message: 'Direct consultation scheduling request.',
    };

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': 'consult_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9),
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || 'Inquiry submission was rejected.');
      }
      setSubmissionSuccess(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Network error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendlyUrl = `https://calendly.com/brandmania/30min-strategic-consultation?embed_domain=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'localhost'
  )}&embed_type=Inline`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0D0118', color: '#FAF7FF', padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <Container>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <BrandEye size="sm" />
            <Badge variant="purple" size="md">
              CONFIDENTIAL BRIEFING
            </Badge>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              marginBottom: '1rem',
              color: '#FAF7FF',
            }}
          >
            Private Executive Consultation
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#C4B8D8', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto' }}>
            Schedule a direct 30-minute diagnostic session with BRANDMANIA leadership under strict mutual non-disclosure.
          </p>
        </div>

        {!showFallbackForm ? (
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              background: '#160429',
              border: '1px solid rgba(200, 130, 255, 0.2)',
              padding: '1.5rem',
              position: 'relative',
              minHeight: '680px',
            }}
          >
            <iframe
              src={calendlyUrl}
              width="100%"
              height="650"
              frameBorder="0"
              title="Schedule Private Strategic Consultation"
              onLoad={() => setCalendarLoaded(true)}
              style={{
                display: 'block',
                border: 'none',
                minHeight: '650px',
                background: 'transparent',
              }}
            />

            {!calendarLoaded && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#160429',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#C882FF',
                  letterSpacing: '0.12em',
                }}
              >
                INITIALIZING SECURE ADVISORY CALENDAR...
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(200, 130, 255, 0.12)' }}>
              <button
                type="button"
                onClick={() => setShowFallbackForm(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#A8A0B8',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                }}
              >
                Having trouble with the calendar? Click here for the direct intake dossier &rarr;
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              background: '#160429',
              border: '1px solid rgba(200, 130, 255, 0.2)',
              padding: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            {submissionSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <BrandEye size="md" />
                <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '1.8rem', margin: '1.5rem 0 0.5rem 0' }}>
                  Qualification Dossier Transmitted
                </h3>
                <p style={{ color: '#C4B8D8', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Your consultation inquiry has been securely transmitted to BRANDMANIA leadership. This is a qualification request — not a confirmed calendar appointment. Our executive team will review your details and contact you directly to schedule if there is mutual fit.
                </p>
                <Link href="/" style={{ color: '#C882FF', textDecoration: 'none', fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.1em' }}>
                  &larr; Return to Brandmania Homepage
                </Link>
              </div>
            ) : (
              <form onSubmit={handleFallbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid rgba(200, 130, 255, 0.16)', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', letterSpacing: '0.16em', color: '#C882FF' }}>
                    DIRECT INTAKE DOSSIER
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '1.6rem', margin: '0.25rem 0 0 0' }}>
                    Executive Briefing Request
                  </h3>
                </div>

                {formError && (
                  <div style={{ padding: '0.75rem 1rem', background: 'rgba(212, 138, 158, 0.1)', border: '1px solid #D48A9E', color: '#D48A9E', fontSize: '12px' }}>
                    {formError}
                  </div>
                )}

                <input
                  type="text"
                  name="company_fax_number"
                  value={companyFaxNumber}
                  onChange={(e) => setCompanyFaxNumber(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                <Input
                  label="Executive Name"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Julian Sterling"
                />

                <Input
                  label="Corporate Entity"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Sterling Haute Horlogerie"
                />

                <Input
                  label="Corporate Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="j.sterling@sterling-haute.com"
                />

                <Input
                  label="Website URL"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="sterling-haute.com"
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#A8A0B8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Annual Revenue Tier
                  </label>
                  <select
                    value={revenueTier}
                    onChange={(e) => setRevenueTier(e.target.value)}
                    style={{
                      background: '#0D0118',
                      border: '1px solid rgba(200, 130, 255, 0.2)',
                      padding: '0.85rem 1rem',
                      color: '#FAF7FF',
                      fontFamily: 'var(--font-sans), sans-serif',
                      fontSize: '14px',
                      borderRadius: 0,
                    }}
                  >
                    <option value="TIER_700K_1_5M">$700,000 &ndash; $1,500,000 Annual Revenue</option>
                    <option value="TIER_1_5M_5M">$1,500,000 &ndash; $5,000,000 Annual Revenue</option>
                    <option value="TIER_5M_PLUS">$5,000,000+ Annual Revenue</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Transmitting...' : 'Submit Consultation Dossier'}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setShowFallbackForm(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#A8A0B8',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                    }}
                  >
                    &larr; Back to Calendar
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
