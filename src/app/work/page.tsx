import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { CASE_STUDIES } from '@/content/case-studies';

import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Selected Artifacts & Diagnostic Architecture Exhibition | BRANDMANIA',
  description:
    'Visual identity systems, executive artboards, and commercial diagnostic interventions engineered for absolute category leadership.',
  canonicalPath: '/work',
});

interface ExhibitionArtifact {
  id: string;
  catalogNumber: string;
  title: string;
  medium: string;
  flagship: string;
  description: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

const EXHIBITION_ARTIFACTS: ExhibitionArtifact[] = [
  {
    id: 'poster',
    catalogNumber: 'ART-01',
    title: 'BRANDMANIA® Primary Brand Poster & Monolith System',
    medium: 'High-Fidelity Visual Identity & Manifesto Architecture',
    flagship: 'Flagship I • Brand Direction',
    description:
      'The foundational aesthetic statement defining imperial rarity, typographic hierarchy, and obsidian tone. Designed to establish category sovereignty before a word of copy is read.',
    src: '/brand/graphics/brandmania-poster.jpg',
    width: 1200,
    height: 1800,
    alt: 'BRANDMANIA Primary Brand Poster & Monolith System',
  },
  {
    id: 'artboard-1',
    catalogNumber: 'ART-02',
    title: 'Strategic Commercial Directive & Flagship Hierarchy',
    medium: 'Commercial Artboard & Systems Architecture',
    flagship: 'Flagship II • Margin Recovery',
    description:
      'Architectural blueprint mapping customer perception upstream to retained cash flow downstream. Eliminates vanity metrics in favor of structural capital retention.',
    src: '/brand/graphics/artboard-1-our.jpg',
    width: 1400,
    height: 900,
    alt: 'Strategic Commercial Directive & Flagship Hierarchy Artboard',
  },
  {
    id: 'artboard-2',
    catalogNumber: 'ART-03',
    title: 'Brand Direction & Corporate Identity Engineering',
    medium: 'Enterprise Identity & Editorial Collateral',
    flagship: 'Flagship I • Brand Direction',
    description:
      'Comprehensive brand guidelines and visual positioning engineered to eliminate discounting and replace commoditized sales pitches with magnetic brand authority.',
    src: '/brand/graphics/artboard-2-services-branding.jpg',
    width: 1400,
    height: 900,
    alt: 'Brand Direction & Corporate Identity Engineering Artboard',
  },
  {
    id: 'artboard-3',
    catalogNumber: 'ART-04',
    title: 'Performance Content & Neuro-Marketing Architecture',
    medium: 'Cognitive Touchpoint Systems & Campaign Design',
    flagship: 'Flagship III • Consumer Scope',
    description:
      'Every customer touchpoint structured through behavioral economics and decision psychology, driving customer lifetime value and organic brand allegiance.',
    src: '/brand/graphics/artboard-3-services-social.jpg',
    width: 1400,
    height: 900,
    alt: 'Performance Content & Neuro-Marketing Architecture Artboard',
  },
  {
    id: 'artboard-4',
    catalogNumber: 'ART-05',
    title: 'The Brand Eye • Category Rarity & Perception Emblem',
    medium: 'Parametric Vector Iconography & Status Symbol',
    flagship: 'Flagship I • Brand Direction',
    description:
      'The definitive heraldic mark of BRANDMANIA. Engineered with golden-ratio circular geometry to signal absolute focus, vigilance, and uncompromising standards.',
    src: '/brand/graphics/artboard-4-brand-eye.jpg',
    width: 1200,
    height: 1200,
    alt: 'The Brand Eye Category Rarity & Perception Emblem',
  },
  {
    id: 'banner',
    catalogNumber: 'ART-06',
    title: 'High-Ticket Commercial Advisory Campaign System',
    medium: 'Large-Format Campaign Display & Digital Billboard',
    flagship: 'Unified Commercial Architecture',
    description:
      'Multi-channel institutional campaign banner communicating our central commercial doctrine: "Branded for the best. Let’s make you a market leader."',
    src: '/brand/graphics/brandmania-ad-agency-banner.jpg',
    width: 1800,
    height: 1000,
    alt: 'High-Ticket Commercial Advisory Campaign System',
  },
];

export default function WorkPage() {
  return (
    <div>
      {/* Exhibition Header */}
      <Section
        spacing="lg"
        style={{
          paddingTop: 'var(--space-16)',
          backgroundColor: 'var(--color-bg-surface)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <Container>
          <div style={{ maxWidth: '880px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="neutral" size="md">
                (08) / Selected artifacts &amp; architecture
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                fontWeight: 400,
                color: '#fff',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.1,
              }}
            >
              Selected Artifacts &amp; Diagnostic Architecture Exhibition
            </h1>
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              Visual identity systems, high-ticket artboards, and commercial diagnostic interventions engineered for absolute category leadership.
            </p>
          </div>
        </Container>
      </Section>

      {/* Real Visual Assets Exhibition Grid */}
      <Section spacing="xl">
        <Container>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-16)',
            }}
          >
            {EXHIBITION_ARTIFACTS.map((artifact, index) => (
              <div
                key={artifact.id}
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: '#0A0A0E',
                  padding: 'var(--space-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-6)',
                }}
              >
                {/* Top Metadata Bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: 'var(--space-3)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-primary)',
                        letterSpacing: '0.02em',
                        fontWeight: 600,
                      }}
                      className="tabular-nums"
                    >
                      [{artifact.catalogNumber}] / 0{index + 1}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
                      {artifact.flagship}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {artifact.medium}
                  </span>
                </div>

                {/* Natural Uncropped Image Presentation */}
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#050507',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 'var(--space-4)',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={artifact.src}
                    alt={artifact.alt}
                    width={artifact.width}
                    height={artifact.height}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '76vh',
                      objectFit: 'contain',
                      display: 'block',
                      borderRadius: 0,
                    }}
                    priority={index < 2}
                  />
                </div>

                {/* Bottom Architectural Caption */}
                <div style={{ maxWidth: '840px' }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {artifact.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 'var(--line-height-relaxed)',
                      margin: 0,
                    }}
                  >
                    {artifact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Verified Diagnostic Case Studies Section */}
      <Section
        spacing="xl"
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderTop: '1px solid var(--color-border-subtle)',
        }}
      >
        <Container>
          <div style={{ maxWidth: '800px', marginBottom: 'var(--space-12)' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                letterSpacing: '0.02em',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-mono), monospace',
              }}
            >
              Proof of intervention &bull; Empirical evidence
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 400,
                color: '#fff',
                marginTop: 'var(--space-2)',
              }}
            >
              Enterprise Commercial Case Studies
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
              Rigorous diagnostic interventions across high-ticket jewelry houses, designer boutiques, and luxury commerce.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {CASE_STUDIES.map((cs) => (
              <Card
                key={cs.id}
                variant="elevated"
                style={{
                  padding: 'var(--space-10)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 'var(--space-3)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        letterSpacing: '0.02em',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-mono), monospace',
                      }}
                    >
                      {cs.industry} • {cs.location}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: 400,
                        color: '#fff',
                        marginTop: 'var(--space-1)',
                      }}
                    >
                      {cs.client}
                    </h3>
                  </div>
                  <Badge variant="neutral" size="sm">
                    {cs.confidentialityStatus}
                  </Badge>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--space-6)',
                    margin: 'var(--space-6) 0',
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-muted)',
                        marginBottom: 'var(--space-2)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      Diagnostic challenge
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', margin: 0 }}>
                      {cs.challenge}
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--space-2)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      Strategic intervention
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', margin: 0 }}>
                      {cs.intervention.summary}
                    </p>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--space-4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: 'var(--space-6)',
                    borderRadius: 0,
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {cs.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
                        {m.label}
                      </span>
                      <div
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 400,
                          fontFamily: 'var(--font-family-serif)',
                          color: '#ffffff',
                          marginTop: 'var(--space-1)',
                        }}
                        className="tabular-nums"
                      >
                        {m.change}
                      </div>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono), monospace' }} className="tabular-nums">
                        {m.before} → {m.after}
                      </span>
                    </div>
                  ))}
                </div>

                <blockquote
                  style={{
                    margin: 0,
                    borderLeft: '2px solid rgba(255, 255, 255, 0.28)',
                    paddingLeft: 'var(--space-4)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 'var(--line-height-relaxed)',
                  }}
                >
                  &ldquo;{cs.testimonial.quote}&rdquo;
                  <footer style={{ marginTop: 'var(--space-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    &mdash; {cs.testimonial.author}, {cs.testimonial.title}
                  </footer>
                </blockquote>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
            <Link href="/#consultation" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Request Diagnostic for Your Brand →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
