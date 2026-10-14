'use client';

import React, { useState } from 'react';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import { Alert } from '../primitives/Alert';
import { BookingModal } from '../modals/BookingModal';
import {
  ENGAGEMENT_TRACKS,
  REVENUE_TIERS,
  PRIMARY_INDUSTRIES,
  CORE_CHALLENGES,
} from '@/content/qualification';
import styles from './QualificationForm.module.css';

export function QualificationForm() {
  const [currentStep, setCurrentStep] = useState(1);

  // Engagement Track
  const [engagementTrack, setEngagementTrack] = useState(ENGAGEMENT_TRACKS[0].value);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState(PRIMARY_INDUSTRIES[0].value);
  const [revenueTier, setRevenueTier] = useState(REVENUE_TIERS[1].value);

  // Step 2 State
  const [coreChallenge, setCoreChallenge] = useState(CORE_CHALLENGES[0].value);
  const [message, setMessage] = useState('');

  // Step 3 Decision-Maker State
  const [clientName, setClientName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmedInquiryId, setConfirmedInquiryId] = useState<string | undefined>();
  const [bookingUrl, setBookingUrl] = useState('https://calendly.com/brandmania/executive-briefing');

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
    if (!companyName.trim()) {
      setFormError('Company or brand name is required.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const validateStep2 = () => {
    setFormError(null);
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setFormError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || clientName.length < 2) {
      setFormError('Please provide your full executive name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const payload = {
      clientName: clientName.trim(),
      companyName: companyName.trim(),
      email: email.trim(),
      companyTier: mapRevenueTierToCompanyTier(revenueTier),
      budgetRange: 'TIER_100K_250K',
      services: mapChallengeToServices(coreChallenge),
      message: `[Track: ${engagementTrack}] [Role: ${roleTitle.trim() || 'Executive'}] [Country: ${country.trim() || 'International'}] [Industry: ${industry}] [Website: ${website.trim() || 'N/A'}] [Phone: ${phone.trim() || 'N/A'}] — ${message.trim() || 'Initial strategic advisory consultation request.'}`,
    };

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error?.message || 'Inquiry submission was rejected by the server.');
      }

      const inquiryId = json.data?.inquiryId;

      const params = new URLSearchParams({
        name: clientName,
        email: email,
        a1: companyName,
        ...(inquiryId ? { a2: inquiryId } : {}),
      });
      setBookingUrl(`https://calendly.com/brandmania/executive-briefing?${params.toString()}`);
      setIsBookingModalOpen(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Network error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.formArchitectural}>
        {/* Step Indicator */}
        <div className={styles.stepIndicator} role="navigation" aria-label="Consultation form steps">
          <div className={`${styles.stepPill} ${currentStep === 1 ? styles.activeStepPill : ''}`}>
            <span className={styles.stepNumber}>01</span>
            <span>Profile &amp; Engagement Track</span>
          </div>
          <div className={`${styles.stepPill} ${currentStep === 2 ? styles.activeStepPill : ''}`}>
            <span className={styles.stepNumber}>02</span>
            <span>Diagnostic Focus</span>
          </div>
          <div className={`${styles.stepPill} ${currentStep === 3 ? styles.activeStepPill : ''}`}>
            <span className={styles.stepNumber}>03</span>
            <span>Executive Coordinates</span>
          </div>
        </div>

        {formError && (
          <Alert variant="error" title="Validation Notice" style={{ marginBottom: 'var(--space-6)' }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* STEP 1: Profile & Track */}
          {currentStep === 1 && (
            <div className={styles.stepContainer}>
              {/* Engagement Track Selection */}
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
                        onClick={() => setEngagementTrack(track.value)}
                        className={`${styles.trackButton} ${isSelected ? styles.trackButtonActive : ''}`}
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
                  label="Company / Brand Name *"
                  placeholder="e.g. Vance Luxury Group"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
                <Input
                  label="Website / Digital Presence"
                  placeholder="e.g. www.vancegroup.com"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className={styles.grid2}>
                <Input
                  label="Primary Market / Country"
                  placeholder="e.g. United States, United Kingdom, UAE"
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
                <Button type="button" variant="primary" onClick={handleNext}>
                  Next: Diagnostic Focus &rarr;
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Diagnostic Focus */}
          {currentStep === 2 && (
            <div className={styles.stepContainer}>
              <div className={styles.fieldGroup}>
                <label htmlFor="challenge-select" className={styles.fieldLabel}>Primary Strategic Discipline Needed</label>
                <select
                  id="challenge-select"
                  className={styles.selectInput}
                  value={coreChallenge}
                  onChange={(e) => setCoreChallenge(e.target.value)}
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
                <Button type="button" variant="ghost" onClick={handleBack}>
                  &larr; Back
                </Button>
                <Button type="button" variant="primary" onClick={handleNext}>
                  Next: Executive Details &rarr;
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Executive Coordinates */}
          {currentStep === 3 && (
            <div className={styles.stepContainer}>
              <div className={styles.grid2}>
                <Input
                  label="Executive Full Name *"
                  placeholder="e.g. Alexander Vance"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
                <Input
                  label="Executive Role / Title"
                  placeholder="e.g. Founder, CEO, Managing Director"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                />
              </div>

              <div className={styles.grid2}>
                <Input
                  label="Direct Corporate Email *"
                  placeholder="e.g. a.vance@vancegroup.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Direct Phone / Mobile (Optional)"
                  placeholder="e.g. +1 555 019 2834"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-family-mono)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: 'var(--space-3)',
                }}
              >
                Confidentiality Notice: All submitted details are handled under strict executive confidentiality.
              </div>

              <div className={styles.actions}>
                <Button type="button" variant="ghost" onClick={handleBack} disabled={isSubmitting}>
                  &larr; Back
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Transmitting Request...' : 'Submit Strategic Request &rarr;'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingUrl={bookingUrl}
        clientName={clientName}
        inquiryId={confirmedInquiryId}
      />
    </>
  );
}
