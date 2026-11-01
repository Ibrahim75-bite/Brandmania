import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { LEGAL_CONTENT } from '@/content/legal';
import { seoConfig } from '@/content/seoConfig';
import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Engagement & Advisory Notice',
  description:
    'BRANDMANIA terms of engagement, intellectual property rights, non-binding preliminary diagnostic disclosures, and commercial advisory conditions.',
  canonicalPath: '/terms',
});

export default function TermsPage() {
  const terms = LEGAL_CONTENT.termsOfEngagement;

  return (
    <Section
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        color: '#EAE6F0',
        minHeight: '85vh',
        padding: 'clamp(5rem, 8vw, 8rem) 0 clamp(4rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Precision Corner Arcs */}
      <CornerArcs position="top-right" size={260} opacity={0.12} color="#8E00FA" />
      <CornerArcs position="bottom-left" size={200} opacity={0.08} color="#C882FF" />

      {/* Background Watermark */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '15%',
          width: '550px',
          height: '550px',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <BrandEye size="xl" glow={false} idSuffix="termsWatermark" />
      </div>

      <Container size="lg">
        {/* Editorial Masthead */}
        <div
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: 'var(--space-8)',
            marginBottom: 'var(--space-10)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <Badge variant="purple" size="sm">
              LEGAL ARCHITECTURE
            </Badge>
            <span
              style={{
                fontFamily: 'var(--font-Mono)',
                fontSize: '0.75rem',
                color: '#A8A0B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Document Ref: BM-ENG-2026 // v3.1
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-Editorial), serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-4)',
              maxWidth: '900px',
            }}
          >
            {terms.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: '#A8A0B8',
              lineHeight: 1.6,
              maxWidth: '750px',
              marginBottom: 'var(--space-6)',
            }}
          >
            {terms.subtitle}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              fontFamily: 'var(--font-Mono)',
              fontSize: '0.75rem',
              color: '#A8A0B8',
              paddingTop: 'var(--space-4)',
              borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>STATUS: ACTIVE GOVERNANCE</span>
            <span>LAST REVISED: {terms.lastUpdated}</span>
            <span>GOVERNANCE: INTERNATIONAL COMMERCIAL ADVISORY</span>
          </div>
        </div>

        {/* 2-Column Swiss Grid: Sticky Index + Content Blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-12)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {terms.sections.map((sec) => (
              <article
                key={sec.heading}
                id={`sec-${sec.index}`}
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingTop: 'var(--space-6)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-Mono)',
                      fontSize: '0.85rem',
                      color: '#C882FF',
                      fontWeight: 600,
                    }}
                  >
                    § {sec.index}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-Sans)',
                      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {sec.heading}
                  </h2>
                </div>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: '#EAE6F0',
                    maxWidth: '680px',
                  }}
                >
                  {sec.content}
                </p>
              </article>
            ))}
          </div>

          {/* Sticky Advisory Notice Panel */}
          <aside aria-label="Commercial Advisory Notice">
            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                padding: 'var(--space-8)',
                position: 'sticky',
                top: '6rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-Mono)',
                  fontSize: '0.75rem',
                  color: '#C882FF',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: 'var(--space-3)',
                }}
              >
                ENGAGEMENT THRESHOLD
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-Editorial)',
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Qualification Protocol
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#A8A0B8',
                  marginBottom: 'var(--space-6)',
                }}
              >
                BRANDMANIA provides strategic advisory and margin recovery exclusively for established commercial enterprises ({seoConfig.revenueThreshold}). Submitting an inquiry initiates preliminary qualification review.
              </p>

              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-Mono)',
                    fontSize: '0.75rem',
                    color: '#A8A0B8',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  PRE-ENGAGEMENT SCOPE:
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-Mono)',
                    fontSize: '0.85rem',
                    color: '#FFFFFF',
                  }}
                >
                  Non-Binding Diagnostic Intake
                </div>
              </div>

              <Link
                href="/#qualification"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  minHeight: '44px',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: '#8E00FA',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'background-color 0.2s ease',
                }}
              >
                Submit Strategic Inquiry ↗
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
