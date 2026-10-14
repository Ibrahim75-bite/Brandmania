'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';

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
        overflow: 'hidden',
      }}
    >
      {/* Restrained Corner Arcs Framing */}
      <CornerArcs position="bottom-left" size={320} opacity={0.12} color="#8E00FA" />

      <Container>
        <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section Indicator */}
          <div
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-light-violet)',
              marginBottom: 'var(--space-10)',
            }}
          >
            02 / THE MANIFESTO OF COMMUNICATION
          </div>

          {/* Monumental Core Statement */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.75rem, 5.8vw, 5.6rem)',
                fontWeight: 700,
                lineHeight: 1.04,
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

          {/* Asymmetric Editorial Spread */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
              gap: 'var(--space-16)',
              alignItems: 'flex-start',
              marginBottom: 'var(--space-16)',
            }}
          >
            {/* Primary Editorial Truths */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
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
                    fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  There is often a critical disconnect between what leadership intends and what the
                  market actually perceives. When market perception lags behind product craftsmanship,
                  your price point is capped and you are forced to compete on discounting. Perception
                  dictates pricing power.
                </p>
              </div>

              <div
                style={{
                  paddingTop: 'var(--space-8)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
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
                    fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Purchasing advertising impressions into an uncalibrated business model does not
                  produce durable enterprise value. Before allocating capital to amplify reach, you
                  must locate and seal the points where customer trust, sales pipelines, fulfillment,
                  and operating margins silently dissolve. Fix the machine before buying more traffic.
                </p>
              </div>
            </div>

            {/* Strategic Synthesis Column */}
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
                    fontSize: 'var(--font-size-md)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.35,
                  }}
                >
                  Perception dictates pricing power.
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginTop: 'var(--space-2)',
                    margin: 0,
                  }}
                >
                  Customers do not pay for your cost of goods or your internal hours. They pay for
                  the status, certainty, and value they perceive. Control perception, and you control
                  the terms of trade.
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
                    fontSize: 'var(--font-size-md)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.35,
                  }}
                >
                  Silos destroy enterprise momentum.
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginTop: 'var(--space-2)',
                    margin: 0,
                  }}
                >
                  Brand, marketing, business operations, and customer experience operate as a single
                  organism. When brand promises outpace operational delivery, retention collapses.
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
                    fontSize: 'var(--font-size-md)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.35,
                  }}
                >
                  Adapt or enter unnoticed decline.
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginTop: 'var(--space-2)',
                    margin: 0,
                  }}
                >
                  Consumer behavior evolves rapidly beneath established categories. Organizations
                  that fail to adapt to modern perception expectations defend obsolete assumptions
                  while agile competitors capture the market.
                </p>
              </div>
            </div>
          </div>

          {/* Full-Bleed Manifesto Anchor Quote */}
          <div
            style={{
              paddingTop: 'var(--space-10)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(1.75rem, 3.4vw, 2.9rem)',
                fontStyle: 'italic',
                lineHeight: 1.2,
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
              BRANDMANIA Creative Standard
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
