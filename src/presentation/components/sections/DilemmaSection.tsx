'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { Container } from '@/presentation/components/layout/Container';
import styles from './DilemmaSection.module.css';

export const DilemmaSection: React.FC = () => {
  const turningPoints = [
    {
      num: '01',
      symptom: 'Scaling paid traffic, but net contribution margin is eroding',
      remedy: 'Explore Margin Recovery',
      code: '[02]',
      href: '/#margin-recovery',
    },
    {
      num: '02',
      symptom: 'Product quality is category-leading, but market perception looks average',
      remedy: 'Explore Brand Direction',
      code: '[01]',
      href: '/#disciplines',
    },
    {
      num: '03',
      symptom: 'High-ticket buyers hesitate at checkout or demand price discounts',
      remedy: 'Explore Consumer Scope',
      code: '[03]',
      href: '/#consumer-scope',
    },
    {
      num: '04',
      symptom: 'Preparing for international expansion, new product tier, or category takeover',
      remedy: 'Initiate Full Rebuild',
      code: '[04]',
      href: '/#qualification',
    },
  ];

  return (
    <section id="dilemma" className={styles.section}>
      <Container size="full">
        {}
        <div className={styles.tableGrid}>
          {}
          <div className={styles.trapCol}>
            <div>
              <div className={styles.trapMarker}>
                02.A &mdash; COMMODITY GROWTH (TRAFFIC WITHOUT AUTHORITY)
              </div>
              <h2 className={styles.trapTitle}>
                Traffic buys attention. It does not buy loyalty.
              </h2>
            </div>

            <p className={styles.trapBody}>
              Pouring ad spend into an uncalibrated business model creates an exhausting discount treadmill. Without differentiated brand perception, buyers default strictly to price comparison.
            </p>

            <div className={styles.trapList}>
              {[
                'Purchasing impressions into an uncalibrated commercial funnel',
                'Commodity positioning forcing constant discount dependency',
                'Rising customer acquisition costs with declining unit economics',
                'High top-of-funnel churn without organic brand attachment',
              ].map((item, idx) => (
                <div key={idx} className={styles.trapItem}>
                  <span className={styles.trapDash}>&mdash;</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {}
          <div className={styles.archCol}>
            <div>
              <div className={styles.archMarker}>
                02.B &mdash; ENGINEERED CATEGORY LEADERSHIP (PRICING POWER)
              </div>
              <h2 className={styles.archTitle}>
                Brand architecture commands margin.
              </h2>
            </div>

            <p className={styles.archBody}>
              When Brand Direction, Margin Recovery, and Consumer Scope operate as a unified system, advertising amplifies an already profitable machine. Market perception commands premium pricing.
            </p>

            <div className={styles.archList}>
              {[
                'Brand direction establishes category prestige & pricing power',
                'Commanding price inelasticity where customers buy at full value',
                'Operational audits sealing leakage across the entire commercial chain',
                'Enduring identity attachment driving high-retention customer loops',
              ].map((item, idx) => (
                <div key={idx} className={styles.archItem}>
                  <CheckCircle size={18} weight="bold" className={styles.archCheck} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className={styles.turningPointBlock}>
          <div className={styles.turningPointHeader}>
            <div>
              <div className={styles.turningPointEyebrow}>
                TURNING-POINT DIAGNOSTIC &bull; COMMERCIAL ADVISORY ROUTER
              </div>
              <h3 className={styles.turningPointTitle}>
                Where Is Your Brand Losing Leverage?
              </h3>
            </div>
            <p className={styles.turningPointSubtitle}>
              Built for ambitious leadership teams navigating critical inflection points in market scale and margin expansion.
            </p>
          </div>

          <div className={styles.routerGrid} role="navigation" aria-label="Brand Leverage Diagnostic Router">
            {turningPoints.map((tp) => (
              <Link
                key={tp.num}
                href={tp.href}
                className={`${styles.routerRow} hit-slop`}
              >
                <span className={styles.routerIndex}>({tp.num})</span>
                <span className={styles.routerSymptom}>&ldquo;{tp.symptom}&rdquo;</span>
                <div className={styles.routerRemedy}>
                  <span>{tp.remedy}</span>
                  <span className={styles.remedyPill}>{tp.code}</span>
                </div>
                <ArrowRight size={18} weight="bold" className={styles.routerArrow} />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
