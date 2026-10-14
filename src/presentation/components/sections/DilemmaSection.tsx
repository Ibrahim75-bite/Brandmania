'use client';

import React from 'react';
import { Section } from '@/presentation/components/layout/Section';

export const DilemmaSection: React.FC = () => {
  return (
    <Section
      id="dilemma"
      spacing="none"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {/* Full-Bleed Split Canvas */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        }}
      >
        {/* Left Half: The Attention Illusion (Stark Matte Obsidian) */}
        <div
          style={{
            backgroundColor: '#070709',
            padding: 'clamp(var(--space-12), 7vw, var(--space-24)) clamp(var(--space-8), 5vw, var(--space-16))',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--space-8)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-4)',
              }}
            >
              03 / THE STRUCTURAL DIVIDE &bull; THE VULNERABLE MODEL
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              The Attention Illusion.
            </h2>
          </div>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '560px',
            }}
          >
            Purchasing ad impressions into an uncalibrated business model creates an exhausting
            treadmill. Without distinct brand perception, buyers default immediately to price
            comparison, customer acquisition costs accelerate, and profit vanishes before orders are
            fulfilled.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '520px' }}>
            {[
              'Buying impressions into an uncalibrated commercial vehicle',
              'Commodity positioning forcing frequent discount promotions',
              'Rising customer acquisition costs with declining unit economics',
              'High top-of-funnel churn without organic brand attachment',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '14px' }}>&times;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Half: The Architectural Advantage (Rich Imperial Violet Surface) */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E0038 0%, #0D001A 100%)',
            padding: 'clamp(var(--space-12), 7vw, var(--space-24)) clamp(var(--space-8), 5vw, var(--space-16))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--space-8)',
            position: 'relative',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-light-violet)',
                marginBottom: 'var(--space-4)',
              }}
            >
              CATEGORY LEADERSHIP &bull; THE BRANDMANIA STANDARD
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              The Architectural Advantage.
            </h2>
          </div>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '560px',
            }}
          >
            When Brand Direction, Margin Recovery, and Consumer Scope operate as a single unified
            system, advertising amplifies an already profitable machine. Market perception commands
            pricing power, gross margins are insulated, and customer loyalty compounds enterprise
            equity.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '520px' }}>
            {[
              'Brand direction establishes unmatched category perception',
              'Inelastic demand commanding premium pricing and healthy margins',
              'Operational data audits sealing leaks across the entire commercial chain',
              'Enduring identity attachment driving high-retention customer loops',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                  fontSize: 'var(--font-size-sm)',
                  color: '#ffffff',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: 'var(--color-brand-light-violet)', fontWeight: 700, fontSize: '14px' }}>
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
