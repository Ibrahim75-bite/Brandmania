'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Section } from '@/presentation/components/layout/Section';

interface SystemNode {
  step: string;
  title: string;
  discipline: string;
  description: string;
}

export const SystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 25%'],
  });

  const pathProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  const nodes: SystemNode[] = [
    {
      step: '01',
      title: 'Identity & Narrative',
      discipline: 'Brand Direction',
      description:
        'Defines positioning, USP, and authoritative tone of voice before capital enters the market.',
    },
    {
      step: '02',
      title: 'Market Perception',
      discipline: 'Strategic Alignment',
      description:
        'Harmonizes internal capability with external prestige, eliminating commodity discounting.',
    },
    {
      step: '03',
      title: 'Consumer Psychology',
      discipline: 'Consumer Scope',
      description:
        'Decodes behavioral biases, status cues, and identity attachment to create irrational loyalty.',
    },
    {
      step: '04',
      title: 'Pricing Power',
      discipline: 'Margin Architecture',
      description:
        'Commands premium price inelasticity where buyers choose certainty over low price.',
    },
    {
      step: '05',
      title: 'Commercial Performance',
      discipline: 'Margin Recovery',
      description:
        'Audits and repairs data leakage across the entire commercial chain before scaling ad spend.',
    },
    {
      step: '06',
      title: 'Category Dominance',
      discipline: 'Enduring Equity',
      description:
        'The cumulative commercial outcome: protected margin, compounding retention, and pricing leverage.',
    },
  ];

  return (
    <Section
      id="system"
      ref={sectionRef}
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
        className="tabular-nums"
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
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(04)</span> / THE SYSTEM
        </div>
        <div>CONTINUOUS CAUSAL VALUE CHAIN</div>
        <div>END-TO-END COMMERCIAL ENGINE</div>
        <div style={{ textAlign: 'right' }}>6 INTERLOCKED NODES</div>
      </div>

      {/* Tier 2: Editorial Monumental Display Header */}
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            margin: 0,
            maxWidth: '1100px',
          }}
        >
          From perception upstream{' '}
          <span
            style={{
              fontStyle: 'italic',
              color: 'var(--color-brand-light-violet, #C882FF)',
            }}
          >
            to cash flow downstream.
          </span>
        </h2>
      </div>

      {/* Connected SVG Pipeline Drawing Line */}
      <div style={{ position: 'relative', width: '100%', marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 1200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '28px', display: 'block' }}
        >
          <line x1="0" y1="20" x2="1200" y2="20" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
          <motion.line
            x1="0"
            y1="20"
            x2="1200"
            y2="20"
            stroke="#C882FF"
            strokeWidth="2"
            style={{ pathLength: pathProgress }}
          />
          {[100, 300, 500, 700, 900, 1100].map((cx, i) => (
            <circle
              key={i}
              cx={cx}
              cy="20"
              r="5"
              fill="#070709"
              stroke="#C882FF"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      {/* 6-Column Edge-to-Edge Swiss Architectural Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.12)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {nodes.map((node) => (
          <div
            key={node.step}
            style={{
              background: '#070709',
              padding: 'clamp(1.5rem, 3vh, 2.5rem) 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              transition: 'background 0.2s ease',
            }}
          >
            {/* Step Number in Instrument Serif */}
            <div
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.5rem, 3.5vw, 3.2rem)',
                fontWeight: 400,
                lineHeight: 1,
                color: '#C882FF',
                letterSpacing: '-0.02em',
              }}
            >
              {node.step}
            </div>

            {/* Discipline Tag */}
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.45)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {node.discipline}
            </div>

            {/* Stage Title */}
            <h3
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: '1.35rem',
                fontWeight: 400,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {node.title}
            </h3>

            {/* Concise Mechanism Description */}
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {node.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};
