'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

export const WorldviewSection: React.FC = () => {
  return (
    <Section
      id="manifesto"
      spacing="none"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
      }}
    >
      <Container>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          {/* Subtle Datum Marker */}
          <div
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-light-violet)',
              marginBottom: 'var(--space-12)',
            }}
          >
            THE BRANDMANIA PHILOSOPHY
          </div>

          {/* Monumental Core Statement */}
          <div style={{ marginBottom: 'var(--space-20)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.75rem, 6vw, 5.8rem)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '1020px',
              }}
            >
              Branding is not what it looks like.
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)', fontStyle: 'italic' }}>
                It is how you communicate.
              </span>
            </h2>
          </div>

          {/* Asymmetric Editorial Essay Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
              gap: 'var(--space-16)',
              alignItems: 'flex-start',
              marginBottom: 'var(--space-20)',
            }}
          >
            {/* Left Primary Editorial Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                    fontWeight: 600,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  How the message is communicated is as important as what the message is.
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1.1rem, 1.35vw, 1.25rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  There is often a vast, fatal chasm between what executive leadership believes the
                  brand stands for and what the market actually perceives. When market perception
                  lags behind product craftsmanship, your price point is capped and you are forced to
                  compete on discounting. Perception dictates pricing power.
                </p>
              </div>

              <div
                style={{
                  paddingTop: 'var(--space-10)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)',
                    fontWeight: 600,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Attention does not mean revenue.
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1.1rem, 1.35vw, 1.25rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Buying advertising impressions into an uncalibrated business model does not create
                  growth; it accelerates capital destruction. Before spending capital to amplify
                  noise, you must locate and seal the breaking points where customer trust, sales
                  pipelines, fulfillment, and operating margins silently dissolve. Fix the machine
                  before buying more traffic.
                </p>
              </div>
            </div>

            {/* Right Strategic Commentary & Synthesis */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-8)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                paddingLeft: 'var(--space-10)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-light-violet)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Perception & Economics
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                  }}
                >
                  Perception dictates pricing power.
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginTop: 'var(--space-2)',
                    margin: 0,
                  }}
                >
                  Customers do not pay for your cost of goods or your internal hours. They pay for the
                  status, certainty, and value they perceive. Control perception, and you control the
                  terms of trade.
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-light-violet)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Systemic Integration
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                  }}
                >
                  Silos destroy enterprise momentum.
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginTop: 'var(--space-2)',
                    margin: 0,
                  }}
                >
                  Brand, marketing, business, and management cannot be treated as disconnected
                  departments. When the brand promise outpaces fulfillment reality, churn spikes.
                  When marketing ignores unit economics, profit vanishes.
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-light-violet)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Market Evolution
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                  }}
                >
                  Adapt or enter unnoticed decline.
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginTop: 'var(--space-2)',
                    margin: 0,
                  }}
                >
                  Consumer behavior shifts rapidly beneath legacy businesses. Organizations that fail
                  to adapt to market expectations find themselves defending obsolete assumptions while
                  agile leaders capture the market.
                </p>
              </div>
            </div>
          </div>

          {/* Full-Bleed Manifesto Anchor Quote */}
          <div
            style={{
              paddingTop: 'var(--space-12)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(1.85rem, 3.8vw, 3.2rem)',
                fontStyle: 'italic',
                lineHeight: 1.18,
                color: '#ffffff',
                margin: 0,
                maxWidth: '960px',
              }}
            >
              &ldquo;Let people applaud your second to greatest work, because you&rsquo;re creating
              your greatest.&rdquo;
            </blockquote>
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-light-violet)',
              }}
            >
              BRANDMANIA Creative Standard • Decyphering the Dilemma of Branding
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
