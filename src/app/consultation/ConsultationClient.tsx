'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Consultation.module.css';

export const CONSULTATION_COPY = {
  eyebrow: '★★★★★ Proven across the UK, US & UAE • $700K+/yr brands',
  headline: 'In 30 minutes, see the 2–3 hidden leaks costing you sales—without spending a dollar more on ads',
  subheadline:
    'I already reviewed your business and recorded a short video on where buyers hesitate. On this free 1-on-1 call, we will walk through those findings and show you how to use the custom checklist I sent to your inbox.',
  founderName: 'Ibrahim Badreldin',
  founderRole: 'Brand Growth Strategist • Online Sales, Marketing & Advertising',
  founderGeography: 'UK · US · UAE',
  founderTrackRecord:
    '7 Years Leading Online Sales, Marketing & Advertising — James Allen Jewellery & Silvia Tcherassi',
  heroCta: 'Discover what is holding you back →',
  heroMicrocopy: [
    '✓ Free 30-Min 1-on-1 Working Session',
    '✓ Google Meet or Zoom (US ET)',
    '✓ Strictly Unrecorded',
    '✓ Zero Sales Pitch',
  ],
  agendaEyebrow: 'Working Agenda',
  agendaHeading: 'What happens on our 30-minute call',
  agendaPillars: [
    {
      num: '01',
      tag: 'Your 2–3 Video Findings',
      title: 'Unpacking Your Business Teardown',
      desc: 'We walk directly through the 2–3 positioning, ad performance, or conversion issues I flagged in your personalized video and what they mean for your revenue.',
    },
    {
      num: '02',
      tag: 'Unspoken Stress Points',
      title: 'Naming Hidden Industry Bottlenecks',
      desc: 'We isolate the day-to-day friction points you feel—like rising ad costs, buyer hesitation, or discount pressure—and pinpoint their actual root cause.',
    },
    {
      num: '03',
      tag: 'Your Custom Checklist',
      title: 'Applying Your Email Action Material',
      desc: 'I show you step-by-step how to implement the custom templates and checklists named in my email so your team gets immediate value from this meeting.',
    },
  ],
  qualificationNote:
    'Built for established online and high-ticket brands doing $700,000+ in annual sales looking to increase profit—not businesses struggling to survive.',
  proofEyebrow: 'Verified Track Record',
  proofHeading: 'Tested across market-leading retail, luxury fashion, and high-ticket services',
  caseDossiers: [
    {
      brand: 'James Allen Jewellery',
      role: 'Brand Growth Strategist • Online Sales, Marketing & Advertising',
      scope: 'Scope: Online Retail • Luxury Consumer Goods • Full-Funnel Growth',
      metrics: [
        { label: 'Average Order Value', value: '+$2,400' },
        { label: 'Monthly Off-Season Sales', value: '$780,000+' },
      ],
      summary:
        'Helped lead the online jewellery market with a +$2,400 average order value and over $780,000 in monthly off-season sales by fixing how buyers perceived trust and value before checkout.',
    },
    {
      brand: 'Silvia Tcherassi',
      role: 'Brand Positioning & Commercial Growth Strategy',
      scope: 'Scope: Luxury Positioning • Full-Price Conversion Flow',
      metrics: [],
      summary:
        'Clarified luxury brand positioning and online buying flow so high-ticket shoppers bought at full price without waiting for markdowns.',
    },
    {
      brand: 'High-Ticket Service & E-Commerce Brands',
      role: 'Commercial & Brand Positioning Advisor',
      scope: 'Scope: D2C Stores ($700K+/yr) • Affluent-Market Service Businesses',
      metrics: [],
      summary:
        'Built clear market positioning and lead systems for established D2C stores and high-ticket service companies targeting affluent demographics.',
    },
  ],
  bookingHeading: 'Select a 30-Minute Time Slot',
  bookingMeta:
    'Default Timezone: US Eastern Time (ET) • Conferencing: Google Meet or Zoom • Strictly Unrecorded',
  customFallbackHeading:
    "Can't find a time that fits your schedule? Request a custom slot",
  customFallbackNote:
    'Submitting this form requests a manual calendar invitation for one of your preferred times—it is not an instant automated booking.',
  customFallbackCta:
    'Discover what is holding you back – Request Custom Time →',
  stickyPrompt:
    'Ready to unpack the 2–3 findings from your business review?',
  stickyCta: 'Discover what is holding you back →',
};

const CALENDLY_URL =
  'https://calendly.com/brandmania-consultation/30min?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=120321&text_color=faf7ff&primary_color=c882ff';

export function ConsultationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTimes, setPreferredTimes] = useState('');
  const [topics, setTopics] = useState('');
  const [questions, setQuestions] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [companyFaxNumber, setCompanyFaxNumber] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  const heroCtaRef = useRef<HTMLAnchorElement | null>(null);
  const bookingStageRef = useRef<HTMLElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    let heroPast = false;
    let bookingIntersecting = false;

    const updateStickyState = () => {
      if (heroPast && !bookingIntersecting) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }
    };

    const heroObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        heroPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        updateStickyState();
      },
      { threshold: 0 }
    );

    const bookingObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        bookingIntersecting = entry.isIntersecting;
        updateStickyState();
      },
      { threshold: 0.1 }
    );

    if (heroCtaRef.current) heroObserver.observe(heroCtaRef.current);
    if (bookingStageRef.current) bookingObserver.observe(bookingStageRef.current);

    return () => {
      heroObserver.disconnect();
      bookingObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        router.push('/consultation/thank-you?type=booked');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (bookingStageRef.current) {
      bookingStageRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('booking-stage');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const loadCalendly = () => {
    setCalendlyLoaded(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = 'Please provide your name';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid corporate email address';
    }
    if (!phone.trim()) {
      errors.phone = 'Please provide a phone or WhatsApp number';
    }
    if (!preferredTimes.trim()) {
      errors.preferredTimes = 'Please share 2–3 preferred dates and times';
    }
    if (!consentAccepted) {
      errors.consent = 'You must confirm and accept the Privacy Policy to proceed';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCustomTimeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const submissionDurationMs = Date.now() - startTimeRef.current;
    const structuredMessage = [
      'CUSTOM CALENDAR TIME REQUEST:',
      `Client Name: ${name.trim()}`,
      `Phone/WhatsApp: ${phone.trim()}`,
      `Preferred 3 Dates & Times: ${preferredTimes.trim()}`,
      topics.trim() ? `Topics to Cover: ${topics.trim()}` : null,
      questions.trim() ? `Questions Ahead of Call: ${questions.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const formInitToken =
      typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find((row) => row.startsWith('bm_form_init='))
            ?.split('=')[1]
        : null;

    const payload = {
      clientName: name.trim(),
      companyName: `${name.trim()} (Custom Time)`,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      website: '',
      companyTier: 'MID_MARKET',
      budgetRange: 'TIER_100K_250K',
      services: ['BRAND_DIRECTION', 'MARGIN_RECOVERY', 'CONSUMER_SCOPE'],
      preferredTimes: preferredTimes.trim(),
      topics: topics.trim(),
      questions: questions.trim(),
      company_fax_number: companyFaxNumber,
      submissionDurationMs,
      consentAccepted: true,
      message: structuredMessage,
    };

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key':
            'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9),
          ...(formInitToken ? { 'x-form-token': formInitToken } : {}),
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || 'Failed to submit custom time request.');
      }

      router.push('/consultation/thank-you?type=custom-request');
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'An unexpected error occurred during submission.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <div className={styles.eyebrow}>
            {CONSULTATION_COPY.eyebrow}
          </div>

          <h1 className={styles.headline}>
            {CONSULTATION_COPY.headline}
          </h1>

          <p className={styles.subheadline}>
            {CONSULTATION_COPY.subheadline}
          </p>

          <div className={styles.founderBar}>
            <div className={styles.founderPortraitFrame}>
              <Image
                src="/brand/founder/ibrahim-portrait-bw.jpg"
                alt="Ibrahim Badreldin, Brand Growth Strategist"
                width={72}
                height={72}
                className={styles.founderPortrait}
                priority
              />
            </div>
            <div className={styles.founderInfo}>
              <div className={styles.founderName}>
                {CONSULTATION_COPY.founderName}
              </div>
              <div className={styles.founderRole}>
                {CONSULTATION_COPY.founderRole}
              </div>
              <div className={styles.founderTrack}>
                {CONSULTATION_COPY.founderTrackRecord}
              </div>
            </div>
          </div>

          <div className={styles.heroCtaWrap}>
            <a
              ref={heroCtaRef}
              href="#booking-stage"
              onClick={scrollToBooking}
              className={styles.heroCta}
            >
              {CONSULTATION_COPY.heroCta}
            </a>
            <div className={styles.heroMicrocopyStrip}>
              {CONSULTATION_COPY.heroMicrocopy.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.agendaSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>
              {CONSULTATION_COPY.agendaEyebrow}
            </span>
            <h2 className={styles.sectionHeading}>
              {CONSULTATION_COPY.agendaHeading}
            </h2>
          </div>

          <div className={styles.agendaGrid}>
            {CONSULTATION_COPY.agendaPillars.map((pillar) => (
              <div key={pillar.num} className={styles.agendaCard}>
                <span className={styles.agendaPillarTag}>
                  {pillar.tag}
                </span>
                <h3 className={styles.agendaPillarTitle}>
                  {pillar.title}
                </h3>
                <p className={styles.agendaPillarDesc}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.selectionProfileBar}>
            {CONSULTATION_COPY.qualificationNote}
          </div>
        </section>

        <section className={styles.proofSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>
              {CONSULTATION_COPY.proofEyebrow}
            </span>
            <h2 className={styles.sectionHeading}>
              {CONSULTATION_COPY.proofHeading}
            </h2>
          </div>

          <div className={styles.dossierGrid}>
            {CONSULTATION_COPY.caseDossiers.map((dossier) => (
              <div key={dossier.brand} className={styles.dossierCard}>
                <div>
                  <h3 className={styles.dossierBrand}>{dossier.brand}</h3>
                  <span className={styles.dossierRole}>{dossier.role}</span>
                </div>

                {dossier.metrics.length > 0 && (
                  <div className={styles.dossierMetricsGrid}>
                    {dossier.metrics.map((m) => (
                      <div key={m.label}>
                        <div className={styles.dossierMetricValue}>{m.value}</div>
                        <div className={styles.dossierMetricLabel}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {dossier.scope && (
                  <div className={styles.dossierScope}>{dossier.scope}</div>
                )}

                <p className={styles.dossierSummary}>{dossier.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="booking-stage"
          ref={bookingStageRef}
          className={styles.bookingStageSection}
        >
          <div className={styles.bookingStageHeader}>
            <span className={styles.sectionEyebrow}>
              Calendar Booking
            </span>
            <h2 className={styles.sectionHeading}>
              {CONSULTATION_COPY.bookingHeading}
            </h2>
            <div className={styles.bookingMetaBar}>
              {CONSULTATION_COPY.bookingMeta}
            </div>
          </div>

          {!calendlyLoaded ? (
            <button
              onClick={loadCalendly}
              className={styles.calendlyTrigger}
              aria-label="Initialize live calendar"
            >
              Initialize Live Calendar ↗
            </button>
          ) : (
            <iframe
              src={CALENDLY_URL}
              title="Schedule a 30-minute strategy call"
              className={styles.calendlyFrame}
              frameBorder={0}
            />
          )}

          <div className={styles.fallbackStageWrapper}>
            <h3 className={styles.fallbackHeading}>
              {CONSULTATION_COPY.customFallbackHeading}
            </h3>
            <p className={styles.fallbackNote}>
              {CONSULTATION_COPY.customFallbackNote}
            </p>

            <form onSubmit={handleCustomTimeSubmit}>
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  value={companyFaxNumber}
                  onChange={(e) => setCompanyFaxNumber(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="custom-name" className={styles.formLabel}>
                      Your Name *
                    </label>
                    <input
                      id="custom-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formErrors.name) {
                          setFormErrors((prev) => ({ ...prev, name: '' }));
                        }
                      }}
                      className={`${styles.input} ${formErrors.name ? styles.inputError : ''}`}
                      placeholder="e.g. Julian Sterling"
                      aria-invalid={!!formErrors.name}
                    />
                    {formErrors.name && (
                      <span className={styles.fieldError}>{formErrors.name}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="custom-email" className={styles.formLabel}>
                      Preferred Email Address *
                    </label>
                    <input
                      id="custom-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) {
                          setFormErrors((prev) => ({ ...prev, email: '' }));
                        }
                      }}
                      className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
                      placeholder="e.g. julian@company.com"
                      aria-invalid={!!formErrors.email}
                    />
                    {formErrors.email && (
                      <span className={styles.fieldError}>{formErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="custom-phone" className={styles.formLabel}>
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="custom-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (formErrors.phone) {
                        setFormErrors((prev) => ({ ...prev, phone: '' }));
                      }
                    }}
                    className={`${styles.input} ${formErrors.phone ? styles.inputError : ''}`}
                    placeholder="e.g. +1 (555) 019-2834 or +44 20 7946 0912"
                    aria-invalid={!!formErrors.phone}
                  />
                  {formErrors.phone && (
                    <span className={styles.fieldError}>{formErrors.phone}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="custom-times" className={styles.formLabel}>
                    Top 3 Preferred Dates &amp; Times (in your local timezone) *
                  </label>
                  <textarea
                    id="custom-times"
                    value={preferredTimes}
                    onChange={(e) => {
                      setPreferredTimes(e.target.value);
                      if (formErrors.preferredTimes) {
                        setFormErrors((prev) => ({ ...prev, preferredTimes: '' }));
                      }
                    }}
                    className={`${styles.textarea} ${formErrors.preferredTimes ? styles.textareaError : ''}`}
                    placeholder={`e.g. 1) Tuesday Nov 10 at 2pm EST\n2) Wednesday Nov 11 at 10am EST\n3) Thursday Nov 12 at 4pm EST`}
                    aria-invalid={!!formErrors.preferredTimes}
                  />
                  {formErrors.preferredTimes && (
                    <span className={styles.fieldError}>{formErrors.preferredTimes}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="custom-topics" className={styles.formLabel}>
                    Topics You Want to Cover (Optional)
                  </label>
                  <input
                    id="custom-topics"
                    type="text"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    className={styles.input}
                    placeholder="e.g. Teardown review, ROAS plateau, luxury checkout friction"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="custom-questions" className={styles.formLabel}>
                    Questions Ahead of the Call (Optional)
                  </label>
                  <input
                    id="custom-questions"
                    type="text"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    className={styles.input}
                    placeholder="Specific questions about our analysis or your funnel"
                  />
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    id="custom-consent"
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={(e) => {
                      setConsentAccepted(e.target.checked);
                      if (formErrors.consent) {
                        setFormErrors((prev) => ({ ...prev, consent: '' }));
                      }
                    }}
                    className={styles.checkbox}
                  />
                  <label htmlFor="custom-consent" className={styles.checkboxLabel}>
                    I confirm this is a genuine business inquiry and I have read and accept the{' '}
                    <a href="/privacy" className={styles.consentLink}>
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {formErrors.consent && (
                  <span className={styles.fieldError}>{formErrors.consent}</span>
                )}

                {submitError && (
                  <div className={styles.submitError} role="alert">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'Submitting Request…' : CONSULTATION_COPY.customFallbackCta}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {isStickyVisible && (
        <div className={styles.stickyBar} role="complementary" aria-label="Book a call">
          <a
            href="#booking-stage"
            onClick={scrollToBooking}
            className={styles.stickyCta}
          >
            {CONSULTATION_COPY.stickyCta}
          </a>
        </div>
      )}
    </div>
  );
}
