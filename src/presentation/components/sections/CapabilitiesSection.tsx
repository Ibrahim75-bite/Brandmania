'use client';

import React, { useState, useRef } from 'react';
import {
  MegaphoneSimple,
  TrendUp,
  Target,
  PenNib,
  VideoCamera,
  Coins,
  Buildings,
  UsersThree,
  Kanban,
  Robot,
  Cpu,
  type Icon,
} from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';
import { useSafeTriangle } from '@/presentation/hooks/useSafeTriangle';

interface CapabilityItem {
  name: string;
  desc: string;
  icon: Icon;
}

interface CapabilityCluster {
  roman: string;
  name: string;
  subtitle: string;
  items: CapabilityItem[];
}

export const CapabilitiesSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const { handleRowHover } = useSafeTriangle({
    detailRef: detailPanelRef,
    suppressionDelayMs: 180,
  });

  const clusters: CapabilityCluster[] = [
    {
      roman: 'I',
      name: 'Communication & Growth Execution',
      subtitle: 'Digital reach, growth, and performance creative',
      items: [
        {
          name: 'Digital Marketing',
          desc: 'High-status multi-channel communication calibrated to executive and high-ticket consumer psychology.',
          icon: MegaphoneSimple,
        },
        {
          name: 'Growth Marketing',
          desc: 'Data-driven funnel engineering expanding market footprint without discounting brand prestige.',
          icon: TrendUp,
        },
        {
          name: 'Performance Marketing',
          desc: 'Paid media acquisition governed strictly by contribution profit and verified customer lifetime value.',
          icon: Target,
        },
        {
          name: 'Content Creation',
          desc: 'Editorial-grade narrative and visual assets articulating craftsmanship and institutional certainty.',
          icon: PenNib,
        },
        {
          name: 'Performance Content Creation',
          desc: 'High-converting creative assets built for rapid algorithmic arrest and verified buyer action.',
          icon: VideoCamera,
        },
      ],
    },
    {
      roman: 'II',
      name: 'Commercial & Operational Architecture',
      subtitle: 'Finance, strategic management, teams, and delivery',
      items: [
        {
          name: 'Finance & Operations',
          desc: 'Gross margin governance, unit contribution modeling, and capital allocation frameworks.',
          icon: Coins,
        },
        {
          name: 'Strategic Management',
          desc: 'Executive roadmap alignment, category positioning defenses, and market expansion planning.',
          icon: Buildings,
        },
        {
          name: 'Team Management',
          desc: 'High-performance team orchestration, operational accountability, and cross-functional standards.',
          icon: UsersThree,
        },
        {
          name: 'Project Management',
          desc: 'Surgical delivery velocity, milestone governance, and multi-disciplinary operational execution.',
          icon: Kanban,
        },
      ],
    },
    {
      roman: 'III',
      name: 'Operational Leverage Systems',
      subtitle: 'Connected automation and intelligence',
      items: [
        {
          name: 'AI Automation',
          desc: 'Streamlining repetitive operational handoffs, customer workflows, and operational fulfillment friction.',
          icon: Robot,
        },
        {
          name: 'AI Connected Systems',
          desc: 'Unified real-time data pipelines linking marketing inputs, operational handoffs, and financial outputs.',
          icon: Cpu,
        },
      ],
    },
  ];

  return (
    <Section
      id="capabilities"
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
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(09)</span> / FULL-SPECTRUM EXECUTION
        </div>
        <div>SUPPORTING ARCHITECTURE</div>
        <div>MARKETING • OPERATIONS • AI</div>
        <div style={{ textAlign: 'right' }}>11 SPECIALIZED DISCIPLINES</div>
      </div>

      {/* Tier 2: Editorial Monumental Display Header */}
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            margin: 0,
            maxWidth: '1200px',
          }}
        >
          Integrated capabilities{' '}
          <span
            style={{
              fontStyle: 'italic',
              color: 'var(--color-brand-light-violet, #C882FF)',
            }}
          >
            across marketing, operations, and AI.
          </span>
        </h2>
      </div>

      {/* Tier 3: Edge-to-Edge 3-Cluster Swiss Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.12)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {clusters.map((cluster) => (
          <div
            key={cluster.roman}
            style={{
              background: '#070709',
              padding: 'clamp(2rem, 3vh, 3rem) clamp(1.5rem, 2vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Cluster Top Metadata */}
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '1.5rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#C882FF',
                  letterSpacing: '0.12em',
                  marginBottom: '0.5rem',
                }}
              >
                CLUSTER {cluster.roman}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                  fontSize: 'clamp(1.75rem, 2.2vw, 2.2rem)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  margin: '0 0 0.5rem 0',
                }}
              >
                {cluster.name}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.45)',
                  letterSpacing: '0.04em',
                }}
              >
                {cluster.subtitle}
              </div>
            </div>

            {/* Cluster Capability Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cluster.items.map((item) => {
                const Icon = item.icon;
                const isHovered = hoveredItem === item.name;
                return (
                  <div
                    key={item.name}
                    ref={isHovered ? detailPanelRef : undefined}
                    onMouseEnter={() => handleRowHover(() => setHoveredItem(item.name))}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      padding: '1rem',
                      border: isHovered
                        ? '1px solid rgba(200, 130, 255, 0.35)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      background: isHovered ? 'rgba(142, 0, 250, 0.08)' : 'rgba(255, 255, 255, 0.015)',
                      borderRadius: '2px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                      <Icon size={18} weight="duotone" color={isHovered ? '#C882FF' : 'rgba(255, 255, 255, 0.5)'} />
                      <div
                        style={{
                          fontFamily: 'var(--font-serif), Georgia, serif',
                          fontSize: '1.15rem',
                          color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
