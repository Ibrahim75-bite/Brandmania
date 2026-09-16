'use client';

import React, { useState } from 'react';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import { Alert } from '../primitives/Alert';
import { BookingModal } from '../modals/BookingModal';
import {
  REVENUE_TIERS,
  PRIMARY_INDUSTRIES,
  CORE_CHALLENGES,
  TIMELINES,
} from '@/content/qualification';
import styles from './QualificationForm.module.css';

export function QualificationForm() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState(PRIMARY_INDUSTRIES[0].value);
  const [revenueTier, setRevenueTier] = useState(REVENUE_TIERS[1].value);

  const [coreChallenge, setCoreChallenge] = useState(CORE_CHALLENGES[0].value);
  const [timeline, setTimeline] = useState(TIMELINES[0].value);
  const [message, setMessage] = useState('');

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmedInquiryId, setConfirmedInquiryId] = useState<string | undefined>();
  const [bookingUrl, setBookingUrl] = useState('https://calendly.com/brandmania/executive-briefing');

  // Map qualification data to backend domain schema
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
      setFormError('Please enter a valid corporate or business email address.');
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
      message: message.trim()
        ? `[Country: ${country}] [Industry: ${industry}] [Timeline: ${timeline}] [Website: ${website}] — ${message.trim()}`
        : `[Country: ${country}] [Industry: ${industry}] [Timeline: ${timeline}] [Website: ${website}] — Initial strategic consultation inquiry for ${companyName}.`,
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
      setConfirmedInquiryId(inquiryId);

      // Pre-fill booking URL parameters
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
      <div className={styles.formCard}>
        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <div className={`${styles.stepPill} ${currentStep === 1 ? styles.activeStepPill : ''}`}>
            <span className={styles.stepNumber}>1</span>
            <span>Commercial Profile</span>
          </div>
          <div className={`${styles.stepPill} ${currentStep === 2 ? styles.activeStepPill : ''}`}>
            <span className={styles.stepNumber}>2</span>
            <span>Diagnostic Scope</span>
          </div>
          <div className={`${styles.stepPill} ${currentStep === 3 ? styles.activeStepPill : ''}`}>
            <span className={styles.stepNumber}>3</span>
            <span>Executive Coordinates</span>
          </div>
        </div>

        {formError && (
          <Alert variant="error" title="Submission Issue" style={{ marginBottom: 'var(--space-6)' }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Commercial Profile */}
          {currentStep === 1 && (
            <div className={styles.stepContainer}>
              <div className={styles.grid2}>
                <Input
                  label="Brand / Company Name"
                  placeholder="e.g. Vance Haute Horlogerie"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
                <Input
                  label="Website / Digital Presence"
                  placeholder="e.g. www.vance-horology.com"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className={styles.grid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Primary Industry</label>
                  <select
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

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Annual Revenue Trajectory</label>
                  <select
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
              </div>
            </div>
          )}

          {/* STEP 2: Diagnostic Scope */}
          {currentStep === 2 && (
            <div className={styles.stepContainer}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Core Operational or Strategic Challenge</label>
                <select
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
                <label className={styles.fieldLabel}>Implementation Horizon</label>
                <select
                  className={styles.selectInput}
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                >
                  {TIMELINES.map((tl) => (
                    <option key={tl.value} value={tl.value}>
                      {tl.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Specific Objectives or Bottlenecks (Optional)</label>
                <textarea
                  className={styles.textareaInput}
                  placeholder="Share any context regarding current ad spend, margin leakage, or positioning dilemmas..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Executive Coordinates */}
          {currentStep === 3 && (
            <div className={styles.stepContainer}>
              <div className={styles.grid2}>
                <Input
                  label="Executive Client Name"
                  placeholder="e.g. Julian Sterling"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
                <Input
                  label="Corporate Email Address"
                  type="email"
                  placeholder="e.g. julian@sterling-luxury.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.grid2}>
                <Input
                  label="Country / Operating Region"
                  placeholder="e.g. United Kingdom, United States"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    🔒 Strictly Confidential
                  </span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    Your commercial coordinates are routed directly to executive partners under non-disclosure standards.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className={styles.actions}>
            {currentStep > 1 ? (
              <Button type="button" variant="ghost" size="md" onClick={handleBack}>
                ← Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button type="button" variant="primary" size="md" onClick={handleNext}>
                Continue →
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                Submit &amp; Open Booking Calendar ↗
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Booking Calendar Modal Triggered on Success */}
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
