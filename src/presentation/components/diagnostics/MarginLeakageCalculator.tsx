'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArchitecturalGlyph, GlyphName } from '@/presentation/components/primitives/ArchitecturalGlyph';
import styles from './MarginLeakageCalculator.module.css';

interface RevenueTier {
  id: string;
  label: string;
  desc: string;
  baselineRevenue: number;
}

interface StageConfig {
  id: string;
  name: string;
  glyph: GlyphName;
  description: string;
  defaultFriction: number;
}

const REVENUE_TIERS: RevenueTier[] = [
  { id: 'tier-1', label: '$700K – $2M', desc: 'Emerging Enterprise', baselineRevenue: 1350000 },
  { id: 'tier-2', label: '$2M – $5M', desc: 'Mid-Market Scale', baselineRevenue: 3500000 },
  { id: 'tier-3', label: '$5M – $15M', desc: 'Category Competitor', baselineRevenue: 9000000 },
  { id: 'tier-4', label: '$15M+', desc: 'Enterprise Heavyweight', baselineRevenue: 22000000 },
];

const AUDIT_STAGES: StageConfig[] = [
  {
    id: 'planning',
    name: 'Planning & Unit Economics',
    glyph: 'stage-planning',
    description: 'Contribution profit floor miscalibration and unmodeled inventory capital friction.',
    defaultFriction: 3.5,
  },
  {
    id: 'marketing',
    name: 'Marketing & Audience Alignment',
    glyph: 'stage-marketing',
    description: 'Targeting non-qualified buyers and deploying paid ad spend into uncalibrated funnels.',
    defaultFriction: 4.5,
  },
  {
    id: 'sales',
    name: 'Sales & Conversion Architecture',
    glyph: 'stage-sales',
    description: 'Discount concession habits, price resistance, and offer hesitations at checkout.',
    defaultFriction: 4.0,
  },
  {
    id: 'fulfillment',
    name: 'Fulfillment & Velocity',
    glyph: 'stage-fulfillment',
    description: 'Operational friction, scope slippage, and supply-chain margin erosion under volume.',
    defaultFriction: 2.5,
  },
  {
    id: 'customer-service',
    name: 'Customer Support & Triage',
    glyph: 'stage-customer-service',
    description: 'Reactive support triage triggering preventable refund demands and chargebacks.',
    defaultFriction: 2.0,
  },
  {
    id: 'post-purchase',
    name: 'Post-Purchase Relationships',
    glyph: 'stage-post-purchase',
    description: 'Post-purchase buyer remorse, unengineered repurchase loops, and zero referral equity.',
    defaultFriction: 4.5,
  },
];

export const MarginLeakageCalculator: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-2');
  const [frictions, setFrictions] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const stg of AUDIT_STAGES) {
      initial[stg.id] = stg.defaultFriction;
    }
    return initial;
  });

  const currentTier = useMemo(
    () => REVENUE_TIERS.find((t) => t.id === selectedTierId) || REVENUE_TIERS[1],
    [selectedTierId]
  );

  const handleSliderChange = (stageId: string, val: number) => {
    setFrictions((prev) => ({
      ...prev,
      [stageId]: val,
    }));
  };

  const { totalLeakagePct, totalRecoverableDollars, primaryBottleneck, recommendedTrack } = useMemo(() => {
    let sumPct = 0;
    let maxPct = -1;
    let bottleneck = AUDIT_STAGES[0];

    for (const stg of AUDIT_STAGES) {
      const val = frictions[stg.id] ?? 0;
      sumPct += val;
      if (val > maxPct) {
        maxPct = val;
        bottleneck = stg;
      }
    }

    const dollars = Math.round((currentTier.baselineRevenue * sumPct) / 100);
    const track =
      dollars >= 300000 || currentTier.baselineRevenue >= 3500000
        ? 'Track I: Full Strategic & Performance Engagement'
        : 'Track II: Strategic Consultancy Diagnostic';

    return {
      totalLeakagePct: sumPct.toFixed(1),
      totalRecoverableDollars: dollars.toLocaleString('en-US'),
      primaryBottleneck: bottleneck,
      recommendedTrack: track,
    };
  }, [currentTier, frictions]);

  return (
    <div className={styles.calculatorCard}>
      <div className={styles.headerBlock}>
        <span className={styles.eyebrow}>
          Commercial Audit Simulator &bull; 6 Canonical Stages
        </span>
        <h3 className={styles.title}>
          Estimate Your Recoverable Contribution Margin
        </h3>
        <p className={styles.subtitle}>
          Before deploying additional capital into media acquisition, identify where operational and conversion friction is bleeding commercial value across your customer lifecycle.
        </p>
      </div>

      <div className={styles.tierSection}>
        <span className={styles.tierLabel}>Select Enterprise Annual Revenue Tier</span>
        <div className={styles.tierGrid}>
          {REVENUE_TIERS.map((tier) => {
            const isActive = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`${styles.tierBtn} ${isActive ? styles.tierBtnActive : ''}`}
                aria-pressed={isActive}
              >
                <span className={styles.tierVal}>{tier.label}</span>
                <span className={styles.tierDesc}>{tier.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.stagesGrid}>
        {AUDIT_STAGES.map((stage, idx) => {
          const val = frictions[stage.id] ?? stage.defaultFriction;
          const isBottleneck = stage.id === primaryBottleneck.id;
          return (
            <div
              key={stage.id}
              className={`${styles.stageRow} ${isBottleneck ? styles.stageRowHighlighted : ''}`}
            >
              <div className={styles.stageMeta}>
                <div className={styles.stageTitleGroup}>
                  <ArchitecturalGlyph name={stage.glyph} size={18} color="#C882FF" />
                  <span className={styles.stageIndex}>0{idx + 1}</span>
                  <span className={styles.stageName}>{stage.name}</span>
                </div>
                <span className={styles.stageLeakVal}>{val.toFixed(1)}% leakage</span>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={val}
                onChange={(e) => handleSliderChange(stage.id, parseFloat(e.target.value))}
                className={styles.sliderInput}
                aria-label={`${stage.name} friction slider`}
              />

              <p className={styles.stageDescription}>{stage.description}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.resultsPanel}>
        <div className={styles.resultsMetrics}>
          <span className={styles.resultsLabel}>Estimated Annual Recoverable Margin</span>
          <div className={styles.resultsRecoverable}>${totalRecoverableDollars}</div>
          <span className={styles.resultsSub}>
            ~{totalLeakagePct}% net commercial recovery on {currentTier.label} baseline
          </span>
        </div>

        <div className={styles.bottleneckCard}>
          <span className={styles.bottleneckBadge}>Primary Detected Bottleneck</span>
          <span className={styles.bottleneckName}>{primaryBottleneck.name}</span>
          <span className={styles.bottleneckTrack}>{recommendedTrack}</span>
        </div>
      </div>

      <div className={styles.ctaRow}>
        <p className={styles.footnote}>
          Illustrative unit-economic diagnostic model based on commercial advisory benchmarks; exact recovery scope is established during a confidential 6-stage audit.
        </p>

        <Link
          href={`/consultation?bottleneck=${primaryBottleneck.id}&tier=${selectedTierId}`}
          className={styles.ctaBtn}
        >
          <span>Schedule 30-Min Strategic Briefing under NDA</span>
          <ArchitecturalGlyph name="arrow-right" size={16} color="#0D0118" />
        </Link>
      </div>
    </div>
  );
};

