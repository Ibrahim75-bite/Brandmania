'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

export const BriefingSection: React.FC = () => {
  return (
    <Section
      id="briefing"
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
            CINEMATIC INTERLUDE &bull; STRATEGIC BRIEFING
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '960px',
              }}
            >
              Decyphering The Dilemma.
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '740px',
                marginTop: 'var(--space-4)',
                margin: 0,
              }}
            >
              An executive analysis of why traditional agency retainers fail, how uncalibrated
              perception caps enterprise valuation, and what is required to command category
              leadership.
            </p>
          </div>

          {/* Full-Width 21:9 Anamorphic Cinema Frame (Zero fake play buttons) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '21 / 9',
              minHeight: '380px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              marginBottom: 'var(--space-12)',
              backgroundColor: '#07050a',
            }}
          >
            <Image
              src="/brand/textures/brandmania-cover.jpg"
              alt="BRANDMANIA Cinematic Artwork"
              fill
              style={{ objectFit: 'cover', opacity: 0.85 }}
              sizes="(max-width: 1200px) 100vw, 1120px"
              priority={false}
            />
            {/* Cinematic Gradient Mask */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(7, 7, 9, 0.25) 0%, rgba(7, 7, 9, 0.88) 100%)',
              }}
            />

            {/* Overlaid Cinema Credits & Title */}
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-8)',
                left: 'var(--space-8)',
                right: 'var(--space-8)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-light-violet)',
                  }}
                >
                  FOUNDER EXECUTIVE BRIEFING
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.6rem, 2.7vw, 2.6rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginTop: '4px',
                  }}
                >
                  The Anatomy of Market Leadership
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                Confidential Strategic Review
              </div>
            </div>
          </div>

          {/* Three Thesis Takeaways (Cinematic Subtitles Layout) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-10)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 'var(--space-8)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 01 &bull; PERCEPTION
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                Perception Sets The Valuation Ceiling
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                If the market views your brand as interchangeable, no sales force can defend margins.
                Status must be engineered across every single customer touchpoint.
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 02 &bull; CAPITAL INTEGRITY
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                The Trap of Media Scaling
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Pumping paid traffic into uncalibrated commercial funnels accelerates capital burn.
                Fix the machine before spending capital to buy more traffic.
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 03 &bull; IDENTITY
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                Cognitive Attachment Outlasts Utility
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                High-ticket loyalty is created when customer identity bonds with the brand. Behavioral
                heuristics convert transactional purchasers into permanent brand champions.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
