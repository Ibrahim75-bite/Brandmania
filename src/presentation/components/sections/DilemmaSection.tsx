'use client';

import React from 'react';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';

export const DilemmaSection: React.FC = () => {
  return (
    <Section
      id="dilemma"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        width: '100%',
        padding: 0,
      }}
    >
      {/* Full-Bleed Edge-to-Edge Split Plane */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          alignItems: 'stretch',
        }}
      >
        {/* Left Half: The Attention Trap (Matte Obsidian #09090C) */}
        <div
          style={{
            backgroundColor: '#09090C',
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 5rem)',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ff6b6b',
                marginBottom: '1rem',
              }}
            >
              (03) / THE ATTENTION TRAP &bull; COMMODITIZED CHURN
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.6rem, 4.5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Traffic buys attention.{' '}
              <span style={{ fontStyle: 'italic', color: '#ff6b6b' }}>
                It does not buy loyalty.
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '540px',
            }}
          >
            Pouring ad spend into an uncalibrated business model creates an exhausting discount treadmill.
            Without differentiated brand perception, buyers default strictly to price comparison.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '520px' }}>
            {[
              'Purchasing impressions into an uncalibrated commercial funnel',
              'Commodity positioning forcing constant discount dependency',
              'Rising customer acquisition costs with declining unit economics',
              'High top-of-funnel churn without organic brand attachment',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  lineHeight: 1.5,
                }}
              >
                <XCircle size={18} weight="duotone" color="#ff6b6b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Half: The Brandmania Architecture (Rich Imperial Violet Surface #190033) */}
        <div
          style={{
            background: 'linear-gradient(165deg, #1A0033 0%, #0A0015 100%)',
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5rem',
            position: 'relative',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-light-violet, #C882FF)',
                marginBottom: '1rem',
              }}
            >
              (04) / THE COMMERCIAL REMEDY &bull; BRAND ARCHITECTURE
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.6rem, 4.5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Brand architecture{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--color-brand-light-violet, #C882FF)',
                }}
              >
                commands margin.
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '540px',
            }}
          >
            When Brand Direction, Margin Recovery, and Consumer Scope operate as a unified system,
            advertising amplifies an already profitable machine. Market perception commands premium pricing.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '520px' }}>
            {[
              'Brand direction establishes category prestige & pricing power',
              'Commanding price inelasticity where customers buy at full value',
              'Operational audits sealing leakage across the entire commercial chain',
              'Enduring identity attachment driving high-retention customer loops',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '14px',
                  color: '#ffffff',
                  lineHeight: 1.5,
                }}
              >
                <CheckCircle size={18} weight="duotone" color="#C882FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
