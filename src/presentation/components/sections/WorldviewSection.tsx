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
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
        overflow: 'hidden',
      }}
    >
      {/* Restrained Corner Arcs Framing */}
      <CornerArcs position="bottom-left" size={320} opacity={0.12} color="#8E00FA" />

      <Container>
        <div
          style={{
            maxWidth: '1020px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-10)',
          }}
        >
          {/* Section Indicator */}
          <div
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-light-violet)',
            }}
          >
            02 / THE MANIFESTO OF COMMUNICATION
          </div>

          {/* Monumental Centered Typographic Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Branding is not what it looks like.
            <br />
            <span
              style={{
                color: 'var(--color-brand-light-violet)',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              It is how you communicate.
            </span>
          </h2>

          {/* Central Editorial Truth */}
          <div
            style={{
              maxWidth: '780px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              marginTop: 'var(--space-4)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(1.35rem, 2.2vw, 2rem)',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              How the message is communicated is as important as what the message is.
              <br />
              Attention does not equal revenue.
            </p>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Purchasing advertising into an uncalibrated business model accelerates capital
              destruction. When perception lags behind product craftsmanship, pricing power is
              destroyed and you are forced to compete on discounts. Fix the machine before buying
              more traffic.
            </p>
          </div>

          {/* Monumental Anchor Quote */}
          <div
            style={{
              marginTop: 'var(--space-10)',
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '820px',
            }}
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(1.75rem, 3.2vw, 2.8rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.25,
                color: '#ffffff',
                margin: 0,
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
                marginTop: 'var(--space-4)',
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
