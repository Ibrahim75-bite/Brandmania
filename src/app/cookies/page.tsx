import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { LEGAL_CONTENT } from '@/content/legal';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { CookiePreferenceManager } from '@/presentation/components/compliance/CookiePreferenceManager';
import { CorporateEntityCard } from '@/presentation/components/compliance/CorporateEntityCard';

export const metadata: Metadata = constructMetadata({
  title: 'Cookie Notice & Browser Storage Disclosure',
  description: LEGAL_CONTENT.cookieNotice.subtitle,
  canonicalPath: '/cookies',
});

export default function CookiesPage() {
  const notice = LEGAL_CONTENT.cookieNotice;

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
          top: '12%',
          width: '550px',
          height: '550px',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <BrandEye size="xl" glow={false} idSuffix="cookiesWatermark" />
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
              Telemetry governance
            </Badge>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Protocol Ref: {notice.protocolRef}
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
            {notice.title}
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
            {notice.subtitle}
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
            <span>STATUS: ACTIVE DISCLOSURE</span>
            <span>LAST REVISED: {notice.lastUpdated}</span>
            <span>GOVERNANCE: EU ePrivacy / GDPR / CCPA CPRA</span>
          </div>
        </div>

        {/* Quick Navigation Anchor Bar */}
        <nav
          aria-label="Legal document cross-links"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: 'var(--space-10)',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.8rem',
          }}
        >
          <span style={{ color: '#888888', alignSelf: 'center', marginRight: '0.5rem' }}>
            CROSS-REFERENCE:
          </span>
          <Link
            href="/privacy"
            style={{
              padding: '0.4rem 0.85rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#EAE6F0',
              textDecoration: 'none',
            }}
          >
            Privacy Policy ↗
          </Link>
          <Link
            href="/terms"
            style={{
              padding: '0.4rem 0.85rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#EAE6F0',
              textDecoration: 'none',
            }}
          >
            Terms of Use &amp; Engagement ↗
          </Link>
          <Link
            href="/#qualification"
            style={{
              padding: '0.4rem 0.85rem',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            Executive Intake Portal ↗
          </Link>
        </nav>

        {/* Introduction Narrative */}
        <div
          style={{
            borderLeft: '2px solid #C882FF',
            paddingLeft: 'var(--space-6)',
            marginBottom: 'var(--space-8)',
            maxWidth: '820px',
          }}
        >
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: '#EAE6F0',
            }}
          >
            {notice.intro}
          </p>
        </div>

        {/* Interactive Consent Preference Manager */}
        <CookiePreferenceManager />

        {/* Technical Storage & Cookie Inventory Table */}
        <div style={{ marginTop: 'var(--space-12)', marginBottom: 'var(--space-12)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                color: '#C882FF',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              TECHNICAL INVENTORY
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                marginTop: '0.25rem',
                marginBottom: 'var(--space-2)',
              }}
            >
              Active Storage Artifacts &amp; Keys
            </h2>
            <p style={{ color: '#A8A0B8', fontSize: '0.925rem', maxWidth: '720px' }}>
              Every client-side persistence key, anti-abuse header, and optional telemetry artifact utilized within the BRANDMANIA web application.
            </p>
          </div>

          <div
            style={{
              overflowX: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.875rem',
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    color: '#C882FF',
                  }}
                >
                  <th style={{ padding: '1rem', width: '22%' }}>ARTIFACT / KEY</th>
                  <th style={{ padding: '1rem', width: '18%' }}>CATEGORY &amp; TYPE</th>
                  <th style={{ padding: '1rem', width: '32%' }}>PURPOSE</th>
                  <th style={{ padding: '1rem', width: '14%' }}>DURATION</th>
                  <th style={{ padding: '1rem', width: '14%' }}>CONTROL</th>
                </tr>
              </thead>
              <tbody>
                {notice.storageTable.map((row) => (
                  <tr
                    key={row.name}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                      <code
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '0.8rem',
                          color: '#FFFFFF',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          padding: '0.2rem 0.4rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'inline-block',
                          wordBreak: 'break-all',
                        }}
                      >
                        {row.name}
                      </code>
                      <div
                        style={{
                          fontSize: '0.725rem',
                          color: '#8E889B',
                          marginTop: '0.35rem',
                          fontFamily: 'var(--font-mono), monospace',
                        }}
                      >
                        {row.provider}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color:
                            row.category === 'Essential Security'
                              ? '#34D399'
                              : row.category === 'Essential Session Draft'
                              ? '#60A5FA'
                              : '#D8B4FE',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {row.category}
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: '#A8A0B8',
                          fontFamily: 'var(--font-mono), monospace',
                        }}
                      >
                        {row.storageType}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: '1rem',
                        verticalAlign: 'top',
                        color: '#EAE6F0',
                        lineHeight: 1.55,
                      }}
                    >
                      {row.purpose}
                    </td>
                    <td
                      style={{
                        padding: '1rem',
                        verticalAlign: 'top',
                        color: '#A8A0B8',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.775rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {row.duration}
                    </td>
                    <td
                      style={{
                        padding: '1rem',
                        verticalAlign: 'top',
                        color: '#C5BFCF',
                        fontSize: '0.775rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {row.controlMechanism}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Third-Party SDK & External Resource Inventory Table */}
        <div style={{ marginTop: 'var(--space-12)', marginBottom: 'var(--space-12)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                color: '#C882FF',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              INFRASTRUCTURE AUDIT
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                marginTop: '0.25rem',
                marginBottom: 'var(--space-2)',
              }}
            >
              Third-Party SDK &amp; External Resource Inventory
            </h2>
            <p style={{ color: '#A8A0B8', fontSize: '0.925rem', maxWidth: '720px' }}>
              Exhaustive audit of external SDKs and libraries loaded by BRANDMANIA, detailing self-hosted zero-IP leakage typography and consent-gated telemetry.
            </p>
          </div>

          <div
            style={{
              overflowX: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.875rem',
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    color: '#C882FF',
                  }}
                >
                  <th style={{ padding: '1rem', width: '25%' }}>SDK / RESOURCE</th>
                  <th style={{ padding: '1rem', width: '20%' }}>CATEGORY &amp; PROVIDER</th>
                  <th style={{ padding: '1rem', width: '30%' }}>DATA HANDLING &amp; PRIVACY</th>
                  <th style={{ padding: '1rem', width: '25%' }}>TECHNICAL CONTROLS</th>
                </tr>
              </thead>
              <tbody>
                {notice.thirdPartySdks?.map((sdk) => (
                  <tr
                    key={sdk.name}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                      <code
                        style={{
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '0.8rem',
                          color: '#FFFFFF',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          padding: '0.2rem 0.4rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'inline-block',
                          wordBreak: 'break-all',
                        }}
                      >
                        {sdk.name}
                      </code>
                      <div
                        style={{
                          fontSize: '0.725rem',
                          color: '#8E889B',
                          marginTop: '0.35rem',
                          fontFamily: 'var(--font-mono), monospace',
                        }}
                      >
                        {sdk.source}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: sdk.category === 'Typography & Performance' ? '#34D399' : '#D8B4FE',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {sdk.category}
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: '#A8A0B8',
                          fontFamily: 'var(--font-mono), monospace',
                        }}
                      >
                        {sdk.provider}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: '1rem',
                        verticalAlign: 'top',
                        color: '#EAE6F0',
                        lineHeight: 1.55,
                      }}
                    >
                      {sdk.dataHandling}
                    </td>
                    <td
                      style={{
                        padding: '1rem',
                        verticalAlign: 'top',
                        color: '#C5BFCF',
                        fontSize: '0.8rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {sdk.privacyControls}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Narrative Policy Sections */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: 'var(--space-10)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {notice.sections.map((sec) => (
              <article
                key={sec.heading}
                id={`sec-${sec.index}`}
                style={{
                  borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
                  paddingTop: 'var(--space-6)',
                  maxWidth: '820px',
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
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans), sans-serif',
                      fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {sec.heading}
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: '#EAE6F0',
                  }}
                >
                  {sec.content}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Corporate & Legal Entity Disclosure Card */}
        <div style={{ marginTop: 'var(--space-12)', maxWidth: '540px' }}>
          <CorporateEntityCard />
        </div>
      </Container>
    </Section>
  );
}
