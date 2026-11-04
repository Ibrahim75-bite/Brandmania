'use client';

import React from 'react';
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
import { Container } from '@/presentation/components/layout/Container';
import styles from './CapabilitiesSection.module.css';

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
      name: 'Artificial Intelligence & Automation',
      subtitle: 'Cognitive agent infrastructure, workflow pipelines, and intelligence systems',
      items: [
        {
          name: 'AI Automation & Agents',
          desc: 'Deploying autonomous multi-agent operational loops that eliminate repetitive commercial overhead.',
          icon: Robot,
        },
        {
          name: 'AI Engineering & Development',
          desc: 'Architecting bespoke machine learning models, retrieval systems, and cognitive intelligence infrastructure.',
          icon: Cpu,
        },
      ],
    },
  ];

  return (
    <section id="capabilities" className={styles.section}>
      <Container size="full">
        {/* Header Block */}
        <div className={styles.headerBlock}>
          <div className={styles.marker}>
            08 &mdash; SUPPORTING CAPABILITIES &bull; FULL-SPECTRUM ARCHITECTURE
          </div>
          <h2 className={styles.headline}>
            Integrated capabilities across marketing, operations, and AI
          </h2>
        </div>

        {/* 3-Column Clean Architectural Index (Hairlines per item, Zero nested boxed cards) */}
        <div className={styles.clustersGrid}>
          {clusters.map((cluster) => (
            <div key={cluster.roman} className={styles.clusterCol}>
              <div className={styles.clusterHeader}>
                <div className={styles.clusterRoman}>CLUSTER {cluster.roman}</div>
                <h3 className={styles.clusterName}>{cluster.name}</h3>
                <div className={styles.clusterSubtitle}>{cluster.subtitle}</div>
              </div>

              <div className={styles.itemsList}>
                {cluster.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className={styles.capabilityItem}>
                      <div className={styles.itemTop}>
                        <Icon size={18} weight="duotone" className={styles.itemIcon} />
                        <h4 className={styles.itemName}>{item.name}</h4>
                      </div>
                      <p className={styles.itemDesc}>{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
