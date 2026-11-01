'use client';

import React from 'react';
import { LockKey, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';

export const QualificationSection: React.FC = () => {
  return (
    <Section
      id="qualification"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      <CornerArcs position="top-right" size={320} opacity={0.08} color="#C882FF" />

      {/* Tier 1: Swiss Architectural Index Strip */}
      <div
        className="tabular-nums"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.85rem 0',
          marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
        }}
      >
        <div>
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(10)</span> / STRATEGIC INTAKE
        </div>
        <div>EXECUTIVE QUALIFICATION</div>
        <div>THRESHOLD: $700,000+ ANNUAL REVENUE</div>
        <div style={{ textAlign: 'right' }}>STRICT NON-DISCLOSURE PROTOCOL</div>
      </div>

      {/* Tier 2: Split Architectural Plane */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column: Criteria & Directives */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Request a private{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--color-brand-light-violet, #C882FF)',
                }}
              >
                briefing.
              </span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
                marginTop: '1.25rem',
                margin: '1.25rem 0 0 0',
                maxWidth: '520px',
              }}
            >
              A selective Strategic Consultation Dossier for established enterprises generating $700,000+
              in annual revenue. We review commercial and perceptual context before the meeting.
            </p>
          </div>

          {/* Consultation Protocols */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={20} weight="duotone" color="#C882FF" />
              <span
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '13.5px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 500,
                }}
              >
                Direct Consultation with Strategic Brand &amp; Commercial Leadership
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkle size={20} weight="duotone" color="#C882FF" />
              <span
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '13.5px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 500,
                }}
              >
                Preliminary Commercial Audit Prepared Prior to Meeting
              </span>
            </div>
          </div>

          {/* Strict Non-Disclosure Protocol */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <LockKey size={20} weight="duotone" color="#C882FF" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                Strict Non-Disclosure Protocol
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.55)',
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: '460px',
                }}
              >
                All commercial metrics, positioning notes, and proprietary operational discussions
                are governed under standard executive non-disclosure confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Intake Form */}
        <div
          style={{
            borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
            paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <QualificationForm />
        </div>
      </div>

      {/* Tier 3: Verified Architectural FAQ Accordion */}
      <div
        id="faq"
        style={{
          marginTop: 'clamp(4rem, 8vw, 7rem)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* FAQ Column Header */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#C882FF',
                marginBottom: '1rem',
              }}
            >
              (08) / VERIFIED DIRECTIVES &bull; FAQ
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Frequently Clarified{' '}
              <span style={{ fontStyle: 'italic', color: '#C882FF' }}>
                Principles.
              </span>
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: '13.5px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6,
                marginTop: '1rem',
                maxWidth: '440px',
              }}
            >
              Truthful, strictly verified facts regarding engagement parameters, core disciplines, and advisory models.
            </p>
          </div>

          {/* FAQ Accordion List (100% Rendered in SSR DOM) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {[
              {
                q: 'What types of businesses does BRANDMANIA work with?',
                a: 'Established businesses generating $700,000+ in annual revenue and high-ticket international brands across design, jewelry, interior design, luxury construction, hospitality, fitness, supplements, software/apps, cosmetics, e-commerce, medical devices, and more.',
              },
              {
                q: "What are BRANDMANIA's three core disciplines?",
                a: 'Brand Direction, Margin Recovery, and Consumer Scope.',
              },
              {
                q: 'Does BRANDMANIA offer consultancy if we are not ready for a full engagement?',
                a: 'Yes, BRANDMANIA offers strategic consultancy for businesses not yet ready for a full rebuild or when full-engagement capacity is full.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                open
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '1.25rem 0',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                    fontSize: 'clamp(1.2rem, 1.6vw, 1.45rem)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      color: '#C882FF',
                    }}
                  >
                    [0{idx + 1}]
                  </span>
                </summary>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '13.5px',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: 1.65,
                    margin: '0.85rem 0 0 0',
                    maxWidth: '680px',
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
