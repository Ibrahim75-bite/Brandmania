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

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Use & Commercial Engagement Governance',
  description: LEGAL_CONTENT.termsOfEngagement.subtitle,
  canonicalPath: '/terms',
});

export default function TermsPage() {
  const terms = LEGAL_CONTENT.termsOfEngagement;
  const schedules = LEGAL_CONTENT.b2bSchedules;
  const faqs = LEGAL_CONTENT.legalFaqs;

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
      {}
      <CornerArcs position="top-right" size={260} opacity={0.06} color="#FFFFFF" />
      <CornerArcs position="bottom-left" size={200} opacity={0.04} color="#FFFFFF" />

      {}
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
        {}
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
              Legal architecture
            </Badge>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Document Ref: {terms.protocolRef}
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
            {terms.title}
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
            {terms.subtitle}
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
            <span>LAST REVISED: {terms.lastUpdated}</span>
            <span>GOVERNANCE: B2B MSA / NDA / DPA FRAMEWORK</span>
          </div>
        </div>

        {}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-12)',
          }}
        >
          {}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {terms.sections.map((sec) => (
              <article
                key={sec.heading}
                id={sec.index === '11' ? 'refund-policy' : `sec-${sec.index}`}
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingTop: 'var(--space-6)',
                  position: 'relative',
                }}
              >
                {sec.index === '11' && (
                  <span id="sec-11" className="sr-only" aria-hidden="true" />
                )}
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

            {}
            <div
              style={{
                marginTop: 'var(--space-12)',
                borderTop: '1px solid rgba(255, 255, 255, 0.16)',
                paddingTop: 'var(--space-10)',
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
                CONTRACTUAL ARCHITECTURE
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-2)',
                }}
              >
                B2B Commercial Schedules &amp; Governance
              </h2>
              <p
                style={{
                  color: '#A8A0B8',
                  fontSize: '0.925rem',
                  maxWidth: '720px',
                  marginBottom: 'var(--space-6)',
                }}
              >
                The binding legal schedules governing exploratory NDA reviews, enterprise Master Services Agreements, and bilateral data processing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {schedules.map((schedule) => (
                  <div
                    key={schedule.code}
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      padding: 'var(--space-6)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.75rem',
                        color: '#C882FF',
                        letterSpacing: '0.06em',
                        display: 'block',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {schedule.code}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif), serif',
                        fontSize: '1.45rem',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {schedule.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.925rem',
                        lineHeight: 1.65,
                        color: '#C5BFCF',
                      }}
                    >
                      {schedule.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {}
            <div
              style={{
                marginTop: 'var(--space-12)',
                borderTop: '1px solid rgba(255, 255, 255, 0.16)',
                paddingTop: 'var(--space-10)',
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
                EXECUTIVE DILIGENCE
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Legal, Privacy, Confidentiality &amp; Engagement FAQs
              </h2>
              <p
                style={{
                  color: '#A8A0B8',
                  fontSize: '0.925rem',
                  maxWidth: '720px',
                  marginBottom: 'var(--space-6)',
                }}
              >
                Comprehensive legal answers covering intake confidentiality, Mutual NDAs, engagement thresholds, IP ownership, and statutory data rights.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {faqs.map((faq) => (
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '0.7rem',
                            color: '#C882FF',
                            border: '1px solid rgba(200, 130, 255, 0.3)',
                            padding: '0.15rem 0.4rem',
                          }}
                        >
                          {faq.category}
                        </span>
                        <span>{faq.question}</span>
                      </div>
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
          </div>

          {}
          <aside aria-label="Commercial Advisory Notice and Cross Links">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
                position: 'sticky',
                top: '6rem',
              }}
            >
              {}
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
                  <Link
                    href="/privacy"
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '0.825rem',
                      color: '#C5BFCF',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono), monospace',
                    }}
                  >
                    01. Privacy Policy ↗
                  </Link>
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
                    → 02. Terms of Use &amp; Engagement (Active)
                  </div>
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

              {}
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
                  ENGAGEMENT THRESHOLD
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
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.75rem',
                      color: '#A8A0B8',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    PRE-ENGAGEMENT SCOPE:
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
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
                    backgroundColor: '#FFFFFF',
                    color: '#070709',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  Submit Strategic Inquiry ↗
                </Link>
              </div>

              {}
              <CorporateEntityCard />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
