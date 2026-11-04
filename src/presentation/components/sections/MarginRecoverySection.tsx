'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import styles from './MarginRecoverySection.module.css';

interface AuditRow {
  step: string;
  stage: string;
  leakage: string;
  repair: string;
}

export const MarginRecoverySection: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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
    <section id="margin-recovery" className={styles.section}>
      <Container size="full">
        {/* Header Block */}
        <div className={styles.headerBlock}>
          <div className={styles.marker}>
            05 &mdash; FLAGSHIP II &bull; MARGIN RECOVERY &bull; 6-STAGE AUDIT
          </div>
          <h2 className={styles.headline}>
            Fix the commercial machine{' '}
            <span className={styles.headlineUnderline}>
              before buying more traffic
            </span>
          </h2>
        </div>

        {/* 6-Row Diagnostic Ledger */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div>Index</div>
            <div>Operational Stage</div>
            <div>Where Commercial Value Leaks</div>
            <div>Strategic &amp; Operational Repair</div>
          </div>

          {auditRows.map((row, idx) => (
            <div
              key={row.step}
              onMouseEnter={() => setHoveredRow(idx)}
              onMouseLeave={() => setHoveredRow(null)}
              className={styles.tableRow}
              style={{
                backgroundColor: hoveredRow === idx ? 'rgba(255, 255, 255, 0.03)' : undefined,
                borderLeft: hoveredRow === idx ? '2px solid #FFFFFF' : '2px solid transparent',
              }}
            >
              <div className={styles.rowStep}>{row.step}</div>
              <div className={styles.rowStage}>{row.stage}</div>
              <div className={styles.rowLeakage}>{row.leakage}</div>
              <div className={styles.rowRepair}>{row.repair}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
