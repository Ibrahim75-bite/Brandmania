'use client';

import React, { useState, useRef } from 'react';
import { Section } from '@/presentation/components/layout/Section';
import { useSafeTriangle } from '@/presentation/hooks/useSafeTriangle';

interface AuditRow {
  step: string;
  stage: string;
  leakage: string;
  repair: string;
}

export const MarginRecoverySection: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const { handleRowHover } = useSafeTriangle({
    detailRef: detailPanelRef,
    suppressionDelayMs: 180,
  });

  const auditRows: AuditRow[] = [
    {
      step: '01',
      stage: 'Planning',
      leakage:
        'Uncalibrated contribution margins and ad spend deployed without unit-economic floors.',
      repair:
        'Recalibrating contribution profit floors so every dollar deployed yields verified margin.',
    },
    {
      step: '02',
      stage: 'Marketing',
      leakage:
        'Purchasing low-intent traffic with commoditized messaging that attracts discount seekers.',
      repair:
        'Disciplined messaging aligned strictly with premium buyers, extinguishing media waste.',
    },
    {
      step: '03',
      stage: 'Sales',
      leakage:
        'Unresolved hesitation on high-ticket tiers causing reps to default to price cuts.',
      repair:
        'Hardening conversion architecture and offer framing so buyers purchase at full price.',
    },
    {
      step: '04',
      stage: 'Fulfillment',
      leakage:
        'Operational bottlenecks and handoff friction silently degrading margins as scale grows.',
      repair:
        'Optimizing fulfillment velocity and operational standards to preserve margin through scale.',
    },
    {
      step: '05',
      stage: 'Customer Service',
      leakage:
        'Reactive ticket handling triggering avoidable refund spikes and disputed charges.',
      repair:
        'Transforming support into an active trust protector that resolves doubt before refund demands.',
    },
    {
      step: '06',
      stage: 'Post-Purchase Relationships',
      leakage:
        'Treating transactions as terminal events, trapping the brand on the high-CAC acquisition wheel.',
      repair:
        'Engineering post-purchase affirmation rituals and recurring loyalty loops to maximize lifetime value.',
    },
  ];

  return (
    <Section
      id="margin-recovery"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Tier 1: Swiss Architectural Index Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.85rem 0',
          marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
        }}
      >
        <div>
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(03)</span> / FLAGSHIP II
        </div>
        <div>OPERATIONAL CHAIN AUDIT</div>
        <div>MARGIN RECOVERY ARCHITECTURE</div>
        <div style={{ textAlign: 'right' }}>6-STAGE COMMERCIAL DRAIN REPAIR</div>
      </div>

      {/* Tier 2: Editorial Monumental Display Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(1rem, 2vw, 2.5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'baseline',
        }}
      >
        <div style={{ gridColumn: 'span 12' }}>
          <h2
            style={{
              fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Fix the commercial machine{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-brand-light-violet, #C882FF)',
              }}
            >
              before buying more traffic.
            </span>
          </h2>
        </div>
      </div>

      {/* Tier 3: Full-Bleed 94vw Swiss Architectural Audit Table */}
      <div
        style={{
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Table Header Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '70px minmax(240px, 1.2fr) minmax(260px, 1.4fr) minmax(260px, 1.4fr)',
            gap: 'clamp(1rem, 2vw, 2.5rem)',
            padding: '1rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.45)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <div>Index</div>
          <div>Operational Stage</div>
          <div>Where Commercial Value Leaks</div>
          <div>Strategic &amp; Operational Repair</div>
        </div>

        {/* 6 Large Horizontal Rows */}
        {auditRows.map((row, idx) => {
          const isHovered = hoveredRow === idx;
          return (
            <div
              key={row.step}
              onMouseEnter={() => handleRowHover(() => setHoveredRow(idx))}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '70px minmax(240px, 1.2fr) minmax(260px, 1.4fr) minmax(260px, 1.4fr)',
                gap: 'clamp(1rem, 2vw, 2.5rem)',
                padding: 'clamp(1.5rem, 3vh, 2.5rem) 1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                alignItems: 'center',
                background: isHovered ? 'rgba(142, 0, 250, 0.06)' : 'transparent',
                borderLeft: isHovered ? '2px solid #C882FF' : '2px solid transparent',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
              }}
            >
              {/* Step Index */}
              <div
                className="tabular-nums"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isHovered ? '#C882FF' : 'rgba(255, 255, 255, 0.4)',
                  letterSpacing: '0.08em',
                  transition: 'color 0.2s ease',
                }}
              >
                {row.step}
              </div>

              {/* Stage Title in Instrument Serif 2.5rem */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.92)',
                    margin: 0,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {row.stage}
                </h3>
              </div>

              {/* Crisp 1-Line Commercial Leakage Statement */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {row.leakage}
                </p>
              </div>

              {/* Crisp 1-Line Strategic Repair Statement (Safe Triangle Detail Target) */}
              <div ref={isHovered ? detailPanelRef : undefined}>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '14px',
                    color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.5,
                    margin: 0,
                    padding: '8px 12px',
                    background: isHovered ? 'rgba(142, 0, 250, 0.16)' : 'rgba(255, 255, 255, 0.02)',
                    border: isHovered
                      ? '1px solid rgba(200, 130, 255, 0.35)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '2px',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {row.repair}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
