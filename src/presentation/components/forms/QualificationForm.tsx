'use client';

import React, { useState, useRef, useEffect, useCallback, useOptimistic, useTransition } from 'react';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import { Alert } from '../primitives/Alert';
import { BookingModal } from '../modals/BookingModal';
import { UndoToast } from '../primitives/UndoToast';
import Link from 'next/link';
import {
  ENGAGEMENT_TRACKS,
  REVENUE_TIERS,
  PRIMARY_INDUSTRIES,
  CORE_CHALLENGES,
} from '@/content/qualification';
import { normalizeWebsiteUrl, normalizePhoneNumber, normalizeEmailAddress } from '@/domain/validation/inquiry.schema';
import { analytics } from '@/presentation/analytics/analytics.service';
import { runViewTransition } from '@/presentation/utils/viewTransition';
import styles from './QualificationForm.module.css';

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

interface FormSnapshot {
  engagementTrack: string;
  coreChallenge: string;
  companyName: string;
  website: string;
  country: string;
  industry: string;
  revenueTier: string;
  clientName: string;
  roleTitle: string;
  email: string;
  phone: string;
  message: string;
}

export function QualificationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [, startTransition] = useTransition();

  const [optimisticStep, setOptimisticStep] = useOptimistic(
    currentStep,
    (_, next: number) => next
  );

  const idempotencyKeyRef = useRef<string>(
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `idemp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  );

  const formMountedAt = useRef(Date.now());
  useEffect(() => {
    formMountedAt.current = Date.now();
  }, []);

  const [companyFaxNumber, setCompanyFaxNumber] = useState('');

  const [engagementTrack, setEngagementTrack] = useState(ENGAGEMENT_TRACKS[0].value);
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState(PRIMARY_INDUSTRIES[0].value);
  const [revenueTier, setRevenueTier] = useState(REVENUE_TIERS[1].value);

  const [coreChallenge, setCoreChallenge] = useState(CORE_CHALLENGES[0].value);
  const [message, setMessage] = useState('');

  const [clientName, setClientName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationCode, setShowVerificationCode] = useState(false);

  const companyNameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const clientNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const prevSnapshotRef = useRef<FormSnapshot | null>(null);

  const captureSnapshot = useCallback((): FormSnapshot => {
    return {
      engagementTrack,
      coreChallenge,
      companyName,
      website,
      country,
      industry,
      revenueTier,
      clientName,
      roleTitle,
      email,
      phone,
      message,
    };
  }, [
    engagementTrack,
    coreChallenge,
    companyName,
    website,
    country,
    industry,
    revenueTier,
    clientName,
    roleTitle,
    email,
    phone,
    message,
  ]);

  const restoreSnapshot = useCallback((snapshot: FormSnapshot) => {
    setEngagementTrack(snapshot.engagementTrack);
    setCoreChallenge(snapshot.coreChallenge);
    setCompanyName(snapshot.companyName);
    setWebsite(snapshot.website);
    setCountry(snapshot.country);
    setIndustry(snapshot.industry);
    setRevenueTier(snapshot.revenueTier);
    setClientName(snapshot.clientName);
    setRoleTitle(snapshot.roleTitle);
    setEmail(snapshot.email);
    setPhone(snapshot.phone);
    setMessage(snapshot.message);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = sessionStorage.getItem('brandmania_consultation_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.companyName) setCompanyName(parsed.companyName);
        if (parsed.website) setWebsite(parsed.website);
        if (parsed.country) setCountry(parsed.country);
        if (parsed.clientName) setClientName(parsed.clientName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.roleTitle) setRoleTitle(parsed.roleTitle);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.message) setMessage(parsed.message);
        if (parsed.engagementTrack) setEngagementTrack(parsed.engagementTrack);
        if (parsed.coreChallenge) setCoreChallenge(parsed.coreChallenge);
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const draft = captureSnapshot();
      sessionStorage.setItem('brandmania_consultation_draft', JSON.stringify(draft));
    } catch {
    }
  }, [captureSnapshot]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.formStep === 'number') {
        runViewTransition(() => {
          setCurrentStep(e.state.formStep);
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmedInquiryId, setConfirmedInquiryId] = useState<string | undefined>();
  const [bookingUrl, setBookingUrl] = useState<string | undefined>(BOOKING_URL);

  const mapRevenueTierToCompanyTier = (tier: string) => {
    switch (tier) {
      case 'TIER_5M_PLUS':
        return 'HAUTE_LUXURY';
      case 'TIER_1_5M_5M':
        return 'GLOBAL_ENTERPRISE';
      case 'TIER_700K_1_5M':
        return 'MID_MARKET';
      default:
        return 'EMERGING_ENTERPRISE';
    }
  };

  const mapChallengeToServices = (challenge: string): string[] => {
    switch (challenge) {
      case 'MARGIN_LEAKS':
        return ['MARGIN_RECOVERY', 'GROWTH_MARKETING'];
      case 'BRAND_PERCEPTION':
        return ['BRAND_DIRECTION', 'PERFORMANCE_CONTENT'];
      case 'CONSUMER_ATTACHMENT':
        return ['NEUROMARKETING', 'BRAND_DIRECTION'];
      default:
        return ['MARGIN_RECOVERY', 'BRAND_DIRECTION', 'NEUROMARKETING'];
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!companyName.trim() || companyName.trim().length < 2) {
      newErrors.companyName = 'Company or brand name must be at least 2 characters.';
    }

    if (website.trim()) {
      const normalized = normalizeWebsiteUrl(website);
      try {
        const parsed = new URL(normalized);
        if (!parsed.hostname.includes('.')) {
          newErrors.website = 'Please provide a valid website address (e.g. brand.com or https://brand.com).';
        }
      } catch {
        newErrors.website = 'Please provide a valid website address (e.g. brand.com or https://brand.com).';
      }
    }

    setErrors(newErrors);
    if (newErrors.companyName) {
      setFormError(newErrors.companyName);
      companyNameRef.current?.focus();
      return false;
    }
    if (newErrors.website) {
      setFormError(newErrors.website);
      websiteRef.current?.focus();
      return false;
    }

    setFormError(null);
    return true;
  };

  const validateStep2 = () => {
    setFormError(null);
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;

    const nextStep = Math.min(currentStep + 1, 3);

    analytics.track({
      type: 'qualification_step_completed',
      payload: { step: currentStep, action: `qualification_step_${currentStep}_completed` },
    });

    if (typeof window !== 'undefined') {
      window.history.pushState({ formStep: nextStep }, '');
    }

    runViewTransition(() => {
      startTransition(() => {
        setOptimisticStep(nextStep);
      });
      setCurrentStep(nextStep);
    });
  };

  const handleBack = () => {
    setFormError(null);
    setErrors({});
    const prevStep = Math.max(currentStep - 1, 1);

    if (typeof window !== 'undefined') {
      window.history.pushState({ formStep: prevStep }, '');
    }

    runViewTransition(() => {
      startTransition(() => {
        setOptimisticStep(prevStep);
      });
      setCurrentStep(prevStep);
    });
  };

  const handleTrackChange = (newTrack: string) => {
    if (newTrack !== engagementTrack) {
      prevSnapshotRef.current = captureSnapshot();
      setEngagementTrack(newTrack);
      setToastMessage('Engagement track updated.');
      setIsToastVisible(true);
    }
  };

  const handleChallengeChange = (newChallenge: string) => {
    if (newChallenge !== coreChallenge) {
      prevSnapshotRef.current = captureSnapshot();
      setCoreChallenge(newChallenge);
      setToastMessage('Diagnostic challenge focus updated.');
      setIsToastVisible(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!clientName.trim() || clientName.trim().length < 2) {
      newErrors.clientName = 'Please provide your full executive name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid corporate email address.';
    }

    if (!consentAccepted) {
      newErrors.consent = 'You must confirm corporate authorization (18+) and accept the Privacy Policy and Terms of Engagement.';
    }

    setErrors(newErrors);

    if (newErrors.clientName) {
      setFormError(newErrors.clientName);
      clientNameRef.current?.focus();
      return;
    }
    if (newErrors.email) {
      setFormError(newErrors.email);
      emailRef.current?.focus();
      return;
    }
    if (newErrors.consent) {
      setFormError(newErrors.consent);
      consentRef.current?.focus();
      return;
    }

    const submissionDurationMs = Date.now() - formMountedAt.current;

    setIsSubmitting(true);
    setFormError(null);

    const normalizedWebsite = website.trim() ? normalizeWebsiteUrl(website) : undefined;
    const normalizedPhone = phone.trim() ? normalizePhoneNumber(phone) : 'N/A';

    const payload = {
      clientName: clientName.trim(),
      companyName: companyName.trim(),
      email: normalizeEmailAddress(email),
      website: normalizedWebsite,
      companyTier: mapRevenueTierToCompanyTier(revenueTier),
      budgetRange: 'TIER_100K_250K',
      services: mapChallengeToServices(coreChallenge),
      message: `[Track: ${engagementTrack}] [Role: ${roleTitle.trim() || 'Executive'}] [Country: ${country.trim() || 'International'}] [Industry: ${industry}] [Phone: ${normalizedPhone}] — ${message.trim() || 'Initial strategic advisory consultation request.'}`,
      company_fax_number: companyFaxNumber,
      submissionDurationMs,
      consentAccepted: true,
    };

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKeyRef.current,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error?.message || 'Inquiry submission was rejected by the server.');
      }

      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('brandmania_consultation_draft');
      }

      const inquiryId = json.data?.inquiryId;
      setConfirmedInquiryId(inquiryId);

      analytics.track({
        type: 'consultation_submitted',
        payload: { action: 'consultation_submitted', inquiryId },
      });

      const baseBookingUrl = BOOKING_URL;
      if (baseBookingUrl) {
        const params = new URLSearchParams({
          name: clientName,
          email: email,
          a1: companyName,
          ...(inquiryId ? { a2: inquiryId } : {}),
        });
        setBookingUrl(`${baseBookingUrl}?${params.toString()}`);
      } else {
        setBookingUrl(undefined);
      }
      setIsBookingModalOpen(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Network error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const completionPercent = optimisticStep === 1 ? 33 : optimisticStep === 2 ? 66 : 100;

  return (
    <>
      <div className={styles.formArchitectural}>
        {}
        <div className={styles.goalGradientContainer} aria-hidden="true">
          <div className={styles.goalGradientHeader}>
            <span className="tabular-nums">STEP 0{optimisticStep} OF 03 &bull; {completionPercent}% COMPLETE</span>
            <span className={`${styles.goalGradientPercentage} tabular-nums`}>{completionPercent}%</span>
          </div>
          <div className={styles.goalGradientTrack}>
            <div
              className={styles.goalGradientFill}
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        {}
        <div className={styles.stepIndicator} role="navigation" aria-label="Consultation form steps">
          <div className={`${styles.stepPill} ${optimisticStep === 1 ? styles.activeStepPill : ''}`}>
            <span className={`${styles.stepNumber} tabular-nums`}>01</span>
            <span>Profile &amp; Engagement Track</span>
          </div>
          <div className={`${styles.stepPill} ${optimisticStep === 2 ? styles.activeStepPill : ''}`}>
            <span className={`${styles.stepNumber} tabular-nums`}>02</span>
            <span>Diagnostic Focus</span>
          </div>
          <div className={`${styles.stepPill} ${optimisticStep === 3 ? styles.activeStepPill : ''}`}>
            <span className={`${styles.stepNumber} tabular-nums`}>03</span>
            <span>Executive Contact</span>
          </div>
        </div>

        {formError && (
          <Alert variant="error" title="Validation Notice" style={{ marginBottom: 'var(--space-6)' }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {}
          <div
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
            aria-hidden="true"
          >
            <label htmlFor="company_fax_number">Company Fax Number (Leave Blank)</label>
            <input
              id="company_fax_number"
              name="company_fax_number"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={companyFaxNumber}
              onChange={(e) => setCompanyFaxNumber(e.target.value)}
            />
          </div>

          {}
          {optimisticStep === 1 && (
            <div className={styles.stepContainer}>
              {}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Select Preferred Engagement Track</label>
                <div className={styles.trackSelector} role="radiogroup" aria-label="Engagement Track">
                  {ENGAGEMENT_TRACKS.map((track) => {
                    const isSelected = engagementTrack === track.value;
                    return (
                      <button
                        key={track.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => handleTrackChange(track.value)}
                        className={`${styles.trackButton} ${isSelected ? styles.trackButtonActive : ''} hit-slop`}
                      >
                        <span className={styles.trackTitle}>{track.label}</span>
                        <span className={styles.trackDesc}>{track.sublabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.grid2}>
                <Input
                  ref={companyNameRef}
                  id="company-name"
                  label="Company / Brand Name *"
                  placeholder="e.g. Vance Luxury Group"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: '' }));
                  }}
                  error={errors.companyName}
                  required
                />
                <Input
                  ref={websiteRef}
                  id="website"
                  label="Website / Digital Presence"
                  placeholder="e.g. brand.com or https://brand.com"
                  type="url"
                  autoComplete="url"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                    if (errors.website) setErrors((prev) => ({ ...prev, website: '' }));
                  }}
                  error={errors.website}
                  helperText="Accepts brand.com or https://brand.com"
                />
              </div>

              <div className={styles.grid2}>
                <Input
                  id="country"
                  label="Primary Market / Country"
                  placeholder="e.g. United States, United Kingdom, UAE"
                  autoComplete="country-name"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />

                <div className={styles.fieldGroup}>
                  <label htmlFor="industry-select" className={styles.fieldLabel}>Commercial Industry</label>
                  <select
                    id="industry-select"
                    className={styles.selectInput}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    {PRIMARY_INDUSTRIES.map((ind) => (
                      <option key={ind.value} value={ind.value}>
                        {ind.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="revenue-select" className={styles.fieldLabel}>Annual Commercial Revenue Band</label>
                <select
                  id="revenue-select"
                  className={styles.selectInput}
                  value={revenueTier}
                  onChange={(e) => setRevenueTier(e.target.value)}
                >
                  {REVENUE_TIERS.map((tier) => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label} ({tier.sublabel})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.actions}>
                <Button type="button" variant="primary" onClick={handleNext} className="hit-slop">
                  <span>Next: Diagnostic Focus →</span>
                </Button>
              </div>
            </div>
          )}

          {}
          {optimisticStep === 2 && (
            <div className={styles.stepContainer}>
              <div className={styles.fieldGroup}>
                <label htmlFor="challenge-select" className={styles.fieldLabel}>Primary Strategic Discipline Needed</label>
                <select
                  id="challenge-select"
                  className={styles.selectInput}
                  value={coreChallenge}
                  onChange={(e) => handleChallengeChange(e.target.value)}
                >
                  {CORE_CHALLENGES.map((ch) => (
                    <option key={ch.value} value={ch.value}>
                      {ch.label} — {ch.sublabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="strategic-context" className={styles.fieldLabel}>Current Commercial Context or Specific Bottleneck</label>
                <textarea
                  id="strategic-context"
                  className={styles.textareaInput}
                  placeholder="Briefly describe your current brand position, pricing resistance, or operational margin leakage..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className={styles.actions}>
                <Button type="button" variant="ghost" onClick={handleBack} className="hit-slop">
                  ← Back
                </Button>
                <Button type="button" variant="primary" onClick={handleNext} className="hit-slop">
                  <span>Next: Executive Details →</span>
                </Button>
              </div>
            </div>
          )}

          {}
          {optimisticStep === 3 && (
            <div className={styles.stepContainer}>
              <div className={styles.grid2}>
                <Input
                  ref={clientNameRef}
                  id="client-name"
                  label="Executive Full Name *"
                  placeholder="e.g. Alexander Vance"
                  autoComplete="name"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (errors.clientName) setErrors((prev) => ({ ...prev, clientName: '' }));
                  }}
                  error={errors.clientName}
                  required
                />
                <Input
                  id="role-title"
                  label="Executive Role / Title"
                  placeholder="e.g. Founder, CEO, Managing Director"
                  autoComplete="organization-title"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                />
              </div>

              <div className={styles.grid2}>
                <Input
                  ref={emailRef}
                  id="client-email"
                  label="Direct Corporate Email *"
                  placeholder="e.g. a.vance@vancegroup.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  error={errors.email}
                  required
                />
                <Input
                  id="client-phone"
                  label="Direct Phone / Mobile (Optional)"
                  placeholder="e.g. +1 555 019 2834"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {}
              <div style={{ marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => setShowVerificationCode((prev) => !prev)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono), monospace',
                    color: 'rgba(255, 255, 255, 0.45)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {showVerificationCode ? '− Hide priority VIP clearance code' : '+ Have a private invite or VIP clearance code?'}
                </button>

                {showVerificationCode && (
                  <div style={{ marginTop: '0.75rem', maxWidth: '320px' }}>
                    <Input
                      id="verification-code"
                      label="VIP Clearance Code"
                      placeholder="6-digit verification code"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      helperText="Supports one-time SMS/email autofill"
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.02em',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: 'var(--space-3)',
                }}
              >
                Confidentiality Notice: All submitted details are handled under strict executive confidentiality.
              </div>

              {}
              <div className={`${styles.consentWrapper} ${errors.consent ? styles.consentError : ''}`}>
                <input
                  ref={consentRef}
                  id="consent-checkbox"
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => {
                    setConsentAccepted(e.target.checked);
                    if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
                  }}
                  className={styles.consentCheckbox}
                  required
                />
                <label htmlFor="consent-checkbox" className={styles.consentText}>
                  I confirm that I am at least 18 years of age, an authorized representative of this enterprise, and I agree to BRANDMANIA&apos;s{' '}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                  ,{' '}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Use
                  </Link>
                  , and Confidential Intake Protocol.
                </label>
              </div>
              {errors.consent && (
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-status-error)',
                    fontFamily: 'var(--font-mono), monospace',
                    marginTop: '-4px',
                    display: 'block',
                  }}
                  role="alert"
                >
                  {errors.consent}
                </span>
              )}

              <div className={styles.actions}>
                <Button type="button" variant="ghost" onClick={handleBack} disabled={isSubmitting} className="hit-slop">
                  &larr; Back
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting} className="hit-slop">
                  {isSubmitting ? 'Transmitting Request...' : 'Submit Strategic Request \u2192'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>

      {}
      <UndoToast
        isVisible={isToastVisible}
        message={toastMessage}
        onUndo={() => {
          if (prevSnapshotRef.current) {
            restoreSnapshot(prevSnapshotRef.current);
          }
        }}
        onDismiss={() => setIsToastVisible(false)}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingUrl={bookingUrl}
        clientName={clientName}
        inquiryId={confirmedInquiryId}
        engagementTrack={engagementTrack}
      />
    </>
  );
}
