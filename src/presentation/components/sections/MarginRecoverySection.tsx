'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface AuditLink {
  step: string;
  stage: string;
  leakage: string;
  auditDiagnostic: string;
  remedy: string;
}

export const MarginRecoverySection: React.FC = () => {
  const [selectedLink, setSelectedLink] = useState<number>(0);

  const auditChain: AuditLink[] = [
    {
      step: '01',
      stage: 'Planning',
      leakage: 'Flawed unit economic models, inaccurate margin forecasting, and misaligned cost-per-acquisition thresholds.',
      auditDiagnostic: 'Auditing baseline financial models, gross contribution margins, and capital allocation assumptions.',
      remedy: 'Recalibrating financial unit economics so every marketing dollar is backed by verified profit margins.',
    },
    {
      step: '02',
      stage: 'Marketing',
      leakage: 'Targeting unfocused audiences, creating creative fatigue, and driving traffic that has zero commercial intent.',
      auditDiagnostic: 'Analyzing audience intent, attribution integrity, creative fatigue curves, and acquisition efficiency.',
      remedy: 'Aligning message communication strictly with high-intent buyers, eliminating unproductive media spend.',
    },
    {
      step: '03',
      stage: 'Sales',
      leakage: 'Friction in the conversion architecture, weak objection handling, and sales teams defaulting to price discounting.',
      auditDiagnostic: 'Reviewing pipeline conversion drop-offs, checkout cognitive friction, and discount frequency data.',
      remedy: 'Hardening the conversion pipeline and offer structure so buyers complete purchases at full price without resistance.',
    },
    {
      step: '04',
      stage: 'Fulfillment',
      leakage: 'Delivery delays, operational handoff errors, packaging failures, and inventory bottlenecks eating operating margin.',
      auditDiagnostic: 'Auditing fulfillment velocity, delivery error rates, rework costs, and operational handoff latency.',
      remedy: 'Streamlining fulfillment handoffs and operational capacity so volume expansion does not dilute margins.',
    },
    {
      step: '05',
      stage: 'Customer Service',
      leakage: 'Slow response times, unresolved customer frustrations, and reactive complaint handling that triggers refunds.',
      auditDiagnostic: 'Evaluating ticket resolution times, root causes of refund requests, and customer sentiment signals.',
      remedy: 'Transforming customer service from a cost-center apology desk into a proactive brand trust protector.',
    },
    {
      step: '06',
      stage: 'Post-Purchase Relationships',
      leakage: 'Treating transactions as terminal events, abandoning buyers after purchase, and failing to nurture lifetime value.',
      auditDiagnostic: 'Tracking churn curves, repeat purchase lag, post-purchase communication timing, and referral behavior.',
      remedy: 'Designing structured post-purchase relationship loops that maximize retention, repeat margin, and organic loyalty.',
    },
  ];

  return (
    <Section
      id="margin-recovery"
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
            06 / FLAGSHIP II &bull; MARGIN RECOVERY
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.8rem, 6vw, 5.4rem)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Fix the machine
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)', fontStyle: 'italic' }}>
                before buying more traffic.
              </span>
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.25rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
                maxWidth: '820px',
                marginTop: 'var(--space-6)',
                margin: 0,
              }}
            >
              Scaling advertising spend into an uncalibrated commercial chain does not create growth—it
              accelerates capital destruction. We conduct exhaustive data audits across your entire
              commercial chain to identify, quantify, and repair silent revenue leakage before allocating
              further marketing capital.
            </p>
          </div>

          {/* The Operational Audit Chain Stepper */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 'var(--space-3)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: 'var(--space-8)',
              marginBottom: 'var(--space-10)',
            }}
          >
            {auditChain.map((link, idx) => {
              const isSelected = selectedLink === idx;
              return (
                <button
                  key={link.step}
                  type="button"
                  onClick={() => setSelectedLink(idx)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 'var(--space-2) 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: isSelected ? 'var(--color-brand-light-violet)' : 'rgba(255, 255, 255, 0.25)',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: isSelected ? 'var(--color-brand-light-violet)' : 'var(--color-text-muted)',
                      }}
                    >
                      {link.step}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'clamp(1.05rem, 1.3vw, 1.35rem)',
                      fontWeight: 600,
                      color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                      lineHeight: 1.2,
                      transition: 'color var(--transition-fast)',
                    }}
                  >
                    {link.stage}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Chain Link Diagnostic Ledger (Zero Cards, Architectural Grid) */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 'var(--space-10)',
              paddingBottom: 'var(--space-10)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
              gap: 'var(--space-12)',
            }}
          >
            {/* Left Column: Stage Name & Identified Leakage */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: 'var(--color-brand-light-violet)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Commercial Audit Stage &bull; {auditChain[selectedLink].step}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  marginBottom: 'var(--space-6)',
                }}
              >
                {auditChain[selectedLink].stage}
              </h3>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#ff6b6b',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Identified Revenue Leakage
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {auditChain[selectedLink].leakage}
                </p>
              </div>
            </div>

            {/* Right Column: Audit Diagnostic & Strategic Remedy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-light-violet)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Commercial Data Audit Procedure
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: '#ffffff',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {auditChain[selectedLink].auditDiagnostic}
                </p>
              </div>

              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Strategic Recovery Action
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {auditChain[selectedLink].remedy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
