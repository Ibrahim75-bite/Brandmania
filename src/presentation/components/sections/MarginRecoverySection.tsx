'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
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
        <div className={styles.headerBlock}>
          <div className={styles.marker}>
            06 &mdash; FLAGSHIP II &bull; MARGIN RECOVERY &bull; 6-STAGE AUDIT
          </div>
          <h2 className={styles.headline}>
            Fix the commercial machine{' '}
            <span className={styles.headlineItalic}>
              before buying more traffic.
            </span>
          </h2>
          <p className={styles.subhead}>
            Deploying ad spend into an uncalibrated business model amplifies waste. Our six-stage audit identifies where margin silently degrades across the entire commercial chain and executes strategic and operational repairs.
          </p>
        </div>

        <div className={styles.desktopLedger}>
          <div className={styles.tableHeader}>
            <div>Index</div>
            <div>Operational Stage</div>
            <div>Where Commercial Value Leaks</div>
            <div>Strategic &amp; Operational Repair</div>
          </div>

          <div className={styles.tableBody}>
            {auditRows.map((row, idx) => (
              <div
                key={row.step}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`${styles.ledgerRow} ${hoveredRow === idx ? styles.ledgerRowHover : ''}`}
              >
                <div className={styles.rowStep}>{row.step}</div>
                <div className={styles.rowStage}>{row.stage}</div>
                <div className={styles.rowLeakage}>
                  <span className={styles.leakageTag}>VALUE LEAKAGE &mdash; </span>
                  {row.leakage}
                </div>
                <div className={styles.rowRepair}>
                  <span className={styles.repairIndicator}>&rarr;</span>
                  <span>{row.repair}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mobileCards}>
          {auditRows.map((row) => (
            <div key={row.step} className={styles.mobileCard}>
              <div className={styles.mobileCardHeader}>
                <span className={styles.mobileStep}>[{row.step}]</span>
                <span className={styles.mobileStageName}>{row.stage}</span>
              </div>

              <div className={styles.mobileLeakageBlock}>
                <div className={styles.mobileBlockLabel}>WHERE VALUE LEAKS</div>
                <p className={styles.mobileBlockText}>{row.leakage}</p>
              </div>

              <div className={styles.mobileRepairBlock}>
                <div className={styles.mobileBlockLabelRepair}>STRATEGIC &amp; OPERATIONAL REPAIR</div>
                <p className={styles.mobileBlockTextRepair}>
                  <span className={styles.repairArrow}>&rarr; </span>
                  {row.repair}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summaryBar}>
          <div className={styles.summaryText}>
            STATUS: <strong>AVAILABLE FOR $700,000+ ANNUAL REVENUE BRANDS</strong>
          </div>
          <Link href="/#qualification" className={`${styles.auditCta} hit-slop`}>
            <span>Request Margin Recovery Diagnostic</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </Container>
    </section>
  );
};
