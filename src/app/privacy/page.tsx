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
import { CorporateEntityCard } from '@/presentation/components/compliance/CorporateEntityCard';
import { DataDeletionRequestForm } from '@/presentation/components/compliance/DataDeletionRequestForm';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy & Global Data Protection Notice',
  description: LEGAL_CONTENT.privacyPolicy.subtitle,
  canonicalPath: '/privacy',
});

export default function PrivacyPage() {
  const policy = LEGAL_CONTENT.privacyPolicy;
  const dpaSchedule = LEGAL_CONTENT.b2bSchedules.find((s) => s.code.includes('SCHEDULE C'));
  const privacyFaqs = LEGAL_CONTENT.legalFaqs.filter(
    (faq) => faq.category === 'Privacy & Data Rights'
  );

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
      <CornerArcs position="top-right" size={260} opacity={0.06} color="#FFFFFF" />
      <CornerArcs position="bottom-left" size={200} opacity={0.04} color="#FFFFFF" />

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
        <BrandEye size="xl" glow={false} idSuffix="privacyWatermark" />
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <Badge variant="neutral" size="sm">
              Governance architecture
            </Badge>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Protocol Ref: {policy.protocolRef}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-4)',
              maxWidth: '920px',
            }}
          >
            {policy.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: '#A8A0B8',
              lineHeight: 1.6,
              maxWidth: '780px',
              marginBottom: 'var(--space-6)',
            }}
          >
            {policy.subtitle}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.75rem',
              color: '#A8A0B8',
              paddingTop: 'var(--space-4)',
              borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>STATUS: ACTIVE GOVERNANCE</span>
            <span>LAST REVISED: {policy.lastUpdated}</span>
            <span>COMPLIANCE: EU &amp; UK GDPR / U.S. CCPA &amp; CPRA</span>
          </div>
        </div>

        {/* 2-Column Swiss Grid: Content Blocks + Sticky Aside */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-12)',
          }}
        >
          {/* Main Legal Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {policy.sections.map((sec) => (
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
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.85rem',
                      color: '#C882FF',
                      fontWeight: 600,
                    }}
                  >
                    § {sec.index}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-sans), sans-serif',
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
                    maxWidth: '720px',
                  }}
                >
                  {sec.content}
                </p>

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul
                    style={{
                      marginTop: 'var(--space-4)',
                      paddingLeft: 'var(--space-5)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                      color: '#D8D2E2',
                      fontSize: '0.925rem',
                      lineHeight: 1.65,
                      maxWidth: '720px',
                    }}
                  >
                    {sec.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ paddingLeft: '0.25rem' }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}

            {/* Schedule C: Data Processing Addendum (DPA) Summary */}
            {dpaSchedule && (
              <div
                style={{
                  borderTop: '2px solid rgba(200, 130, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  padding: 'var(--space-8)',
                  marginTop: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.75rem',
                    color: '#C882FF',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {dpaSchedule.code}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontSize: '1.65rem',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {dpaSchedule.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: '#C5BFCF',
                    maxWidth: '700px',
                  }}
                >
                  {dpaSchedule.summary}
                </p>
              </div>
            )}

            {/* Privacy & Data Protection FAQs */}
            {privacyFaqs.length > 0 && (
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingTop: 'var(--space-8)',
                  marginTop: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.75rem',
                    color: '#C882FF',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  STATUTORY REPUTATION &amp; RIGOR
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  Privacy &amp; Data Rights FAQs
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {privacyFaqs.map((faq) => (
                    <details
                      key={faq.id}
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        padding: 'var(--space-4) var(--space-5)',
                      }}
                    >
                      <summary
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          listStyle: 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <span>{faq.question}</span>
                        <span style={{ color: '#C882FF', fontSize: '0.8rem', flexShrink: 0 }}>
                          [+]
                        </span>
                      </summary>
                      <p
                        style={{
                          marginTop: 'var(--space-3)',
                          paddingTop: 'var(--space-3)',
                          borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
                          fontSize: '0.9rem',
                          lineHeight: 1.65,
                          color: '#C5BFCF',
                        }}
                      >
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Self-Serve GDPR Art. 17 / CCPA Data Deletion Form */}
            <DataDeletionRequestForm />
          </div>

          {/* Sticky Aside & Cross-Navigation */}
          <aside aria-label="Official Channel Inquiries and Cross Links">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
                position: 'sticky',
                top: '6rem',
              }}
            >
              {/* Quick Navigation Card */}
              <div
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  padding: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.725rem',
                    color: '#C882FF',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  LEGAL ARCHITECTURE
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'rgba(200, 130, 255, 0.12)',
                      borderLeft: '2px solid #C882FF',
                      fontSize: '0.825rem',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono), monospace',
                    }}
                  >
                    → 01. Privacy Policy (Active)
                  </div>
                  <Link
                    href="/terms"
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '0.825rem',
                      color: '#C5BFCF',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono), monospace',
                    }}
                  >
                    02. Terms of Use &amp; Engagement ↗
                  </Link>
                  <Link
                    href="/cookies"
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '0.825rem',
                      color: '#C5BFCF',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono), monospace',
                    }}
                  >
                    03. Cookie &amp; Storage Notice ↗
                  </Link>
                </div>
              </div>

              {/* Official Channel Panel */}
              <div
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  padding: 'var(--space-8)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.75rem',
                    color: '#C882FF',
                    letterSpacing: '0.1em',
                    display: 'block',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  OFFICIAL CHANNEL INQUIRY
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif), serif',
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Data Rights &amp; Verification
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: '#A8A0B8',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  To request data verification, update your intake coordinates, or submit an immediate erasure notice, connect directly through our official intake portal.
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
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.75rem',
                      color: '#A8A0B8',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    INTAKE PORTAL:
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.85rem',
                      color: '#FFFFFF',
                      wordBreak: 'break-all',
                    }}
                  >
                    {seoConfig.contactPoint.contactType}
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
                    backgroundColor: '#FFFFFF',
                    color: '#070709',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  Access Executive Intake Portal ↗
                </Link>
              </div>

              {/* Corporate & Legal Entity Disclosure Card */}
              <CorporateEntityCard />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
