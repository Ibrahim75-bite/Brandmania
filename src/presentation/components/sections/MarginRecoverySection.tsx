'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface AuditRow {
  step: string;
  stage: string;
  leakage: string;
  repair: string;
}

export const MarginRecoverySection: React.FC = () => {
  const auditRows: AuditRow[] = [
    {
      step: '01',
      stage: 'Planning',
      leakage:
        'Flawed baseline unit economics, unrealistic margin forecasting, and lack of gross contribution modeling before ad spend allocation.',
      repair:
        'Recalibrating unit economic thresholds and contribution margin floors so every marketing dollar deployed is backed by verified profit.',
    },
    {
      step: '02',
      stage: 'Marketing',
      leakage:
        'Targeting uncalibrated audiences, creative fatigue, and spending capital to purchase low-intent impressions that cannot convert at full price.',
      repair:
        'Aligning creative messaging strictly with high-intent commercial buyers, filtering out unqualified traffic, and stopping ad spend bleed.',
    },
    {
      step: '03',
      stage: 'Sales',
      leakage:
        'Conversion architecture friction, hesitation during high-consideration touchpoints, and sales teams defaulting to price discounting.',
      repair:
        'Hardening the conversion pipeline, resolving cognitive doubt, and restructuring offer tiers so customers buy at full price without friction.',
    },
    {
      step: '04',
      stage: 'Fulfillment',
      leakage:
        'Delivery bottlenecks, supplier latency, operational handoff errors, and packaging failures that erode gross margin during volume expansion.',
      repair:
        'Streamlining operational fulfillment handoffs and delivery velocity under strict standards so growth never degrades margins.',
    },
    {
      step: '05',
      stage: 'Customer Service',
      leakage:
        'Slow ticket response times, reactive complaint handling, and unresolved customer friction that trigger chargebacks and refund spikes.',
      repair:
        'Transforming customer service from an apology cost-center into an active trust protector that resolves issues before refunds occur.',
    },
    {
      step: '06',
      stage: 'Post-Purchase Relationships',
      leakage:
        'Treating customer transactions as terminal events, abandoning buyers after purchase, and staying on an expensive new-acquisition treadmill.',
      repair:
        'Engineering post-purchase affirmation rituals and repeat engagement loops that maximize lifetime customer value and organic retention.',
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
              marginBottom: 'var(--space-8)',
            }}
          >
            06 / FLAGSHIP II &bull; MARGIN RECOVERY
          </div>

          {/* Section Headline */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '920px',
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
                fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
                maxWidth: '820px',
                marginTop: 'var(--space-4)',
                margin: 0,
              }}
            >
              We conduct comprehensive commercial audits across your operational chain to identify,
              quantify, and repair silent revenue leakage before allocating marketing capital.
            </p>
          </div>

          {/* Open Commercial Audit Diagnostic Ledger (Zero Tabs, All Rows Visible Side-by-Side) */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Table Header Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 1.15fr) minmax(0, 1.15fr)',
                gap: 'var(--space-6)',
                padding: 'var(--space-4) 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-family-mono)',
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              <div>Audit Stage</div>
              <div>Where Revenue Leaks</div>
              <div>Strategic &amp; Operational Repair</div>
            </div>

            {/* Audit Rows */}
            {auditRows.map((row) => (
              <div
                key={row.step}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 1.15fr) minmax(0, 1.15fr)',
                  gap: 'var(--space-6)',
                  padding: 'var(--space-6) 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  alignItems: 'start',
                }}
              >
                {/* Stage Column */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.12em',
                      fontWeight: 700,
                    }}
                  >
                    {row.step}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'clamp(1.15rem, 1.5vw, 1.4rem)',
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: 0,
                      marginTop: '4px',
                    }}
                  >
                    {row.stage}
                  </h3>
                </div>

                {/* Leakage Column */}
                <div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {row.leakage}
                  </p>
                </div>

                {/* Repair Column */}
                <div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {row.repair}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
