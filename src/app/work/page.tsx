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
import { CASE_STUDIES } from '@/content/caseStudies';
import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Selected Artifacts & Commercial Architectural Dossiers | BRANDMANIA',
  description:
    'Visual identity systems, uncropped master deliverables, and commercial diagnostic architectural dossiers engineered for verified category leadership.',
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
  caseStudySlug?: string;
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
    caseStudySlug: 'brand-mission-and-ethos-architecture',
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
    caseStudySlug: 'services-and-commercial-branding-blueprint',
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
    caseStudySlug: 'social-and-conversion-campaign-system',
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
    caseStudySlug: 'the-brand-eye-identity-monograph',
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
    <div style={{ backgroundColor: '#0D0118', minHeight: '100vh', color: '#FAF7FF' }}>
      <Section
        spacing="lg"
        style={{
          paddingTop: 'calc(var(--space-16) + 2rem)',
          backgroundColor: '#160429',
          borderBottom: '1px solid rgba(200, 130, 255, 0.16)',
        }}
      >
        <Container>
          <div style={{ maxWidth: '920px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="neutral" size="md">
                (08) / SELECTED ARTIFACTS &amp; DOSSIERS
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 400,
                color: '#FAF7FF',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.1,
              }}
            >
              Selected Artifacts &amp; Commercial Architectural Dossiers
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                color: '#C4B8D8',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '760px',
              }}
            >
              Master visual identity systems, uncropped physical artboards, and verified architectural dossiers engineered for sovereign pricing power.
            </p>
          </div>
        </Container>
      </Section>

      <Section
        spacing="xl"
        style={{
          backgroundColor: '#0D0118',
          borderBottom: '1px solid rgba(200, 130, 255, 0.16)',
        }}
      >
        <Container>
          <div style={{ maxWidth: '820px', marginBottom: 'var(--space-10)' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                letterSpacing: '0.08em',
                color: '#C882FF',
                fontFamily: 'var(--font-mono), monospace',
                textTransform: 'uppercase',
              }}
            >
              Architectural Dossiers &bull; Strategic Verification
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
                color: '#FAF7FF',
                marginTop: 'var(--space-2)',
              }}
            >
              Documented Client Interventions
            </h2>
            <p style={{ color: '#C4B8D8', marginTop: 'var(--space-3)', fontSize: 'var(--font-size-base)' }}>
              Select an architectural dossier to inspect the mandate, challenge diagnostic, execution comparison matrix, and empirical commercial outcome.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-16)',
            }}
          >
            {CASE_STUDIES.map((cs) => (
              <Card
                key={cs.id}
                variant="elevated"
                style={{
                  padding: 'var(--space-8)',
                  backgroundColor: '#160429',
                  border: '1px solid rgba(200, 130, 255, 0.2)',
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'var(--space-6)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 'var(--font-size-xs)',
                        color: '#C882FF',
                        letterSpacing: '0.06em',
                        fontWeight: 600,
                      }}
                    >
                      [{cs.catalogNumber}]
                    </span>
                    <Badge variant="neutral" size="sm">
                      {cs.confidentialityStatus}
                    </Badge>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 400,
                      color: '#FAF7FF',
                      lineHeight: 1.2,
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {cs.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#A8A0B8',
                      letterSpacing: '0.04em',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {cs.flagship} &bull; {cs.clientSector}
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: '#C4B8D8',
                      lineHeight: 'var(--line-height-relaxed)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {cs.executiveSummary}
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 'var(--space-3)',
                      backgroundColor: 'rgba(13, 1, 24, 0.6)',
                      border: '1px solid rgba(200, 130, 255, 0.12)',
                      padding: 'var(--space-3)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {cs.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: '10px', color: '#A8A0B8', textTransform: 'uppercase' }}>
                          {m.label}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--font-size-lg)',
                            fontFamily: 'var(--font-family-serif)',
                            color: '#C882FF',
                            marginTop: '2px',
                          }}
                        >
                          {m.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/work/${cs.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    backgroundColor: 'rgba(200, 130, 255, 0.08)',
                    border: '1px solid rgba(200, 130, 255, 0.28)',
                    color: '#FAF7FF',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 'var(--font-size-xs)',
                    letterSpacing: '0.04em',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>Explore Architectural Dossier</span>
                  <span style={{ color: '#C882FF' }}>→</span>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="xl" style={{ backgroundColor: '#0D0118' }}>
        <Container>
          <div style={{ maxWidth: '820px', marginBottom: 'var(--space-10)' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                letterSpacing: '0.08em',
                color: '#C882FF',
                fontFamily: 'var(--font-mono), monospace',
                textTransform: 'uppercase',
              }}
            >
              Gallery &bull; Physical Artboards &amp; Brand Monoliths
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
                color: '#FAF7FF',
                marginTop: 'var(--space-2)',
              }}
            >
              Master Deliverables Exhibition
            </h2>
            <p style={{ color: '#C4B8D8', marginTop: 'var(--space-3)', fontSize: 'var(--font-size-base)' }}>
              Complete high-resolution deliverables displayed uncropped with 100% geometric fidelity.
            </p>
          </div>

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
                  border: '1px solid rgba(200, 130, 255, 0.2)',
                  backgroundColor: '#160429',
                  padding: 'var(--space-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-6)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: 'var(--space-3)',
                    borderBottom: '1px solid rgba(200, 130, 255, 0.12)',
                    paddingBottom: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 'var(--font-size-xs)',
                        color: '#C882FF',
                        letterSpacing: '0.04em',
                        fontWeight: 600,
                      }}
                      className="tabular-nums"
                    >
                      [{artifact.catalogNumber}] / 0{index + 1}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: '#C4B8D8', letterSpacing: '0.02em' }}>
                      {artifact.flagship}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#A8A0B8',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {artifact.medium}
                  </span>
                </div>

                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#0D0118',
                    border: '1px solid rgba(200, 130, 255, 0.12)',
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

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 'var(--space-4)',
                  }}
                >
                  <div style={{ maxWidth: '840px' }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 400,
                        color: '#FAF7FF',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {artifact.title}
                    </h2>
                    <p
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        color: '#C4B8D8',
                        lineHeight: 'var(--line-height-relaxed)',
                        margin: 0,
                      }}
                    >
                      {artifact.description}
                    </p>
                  </div>
                  {artifact.caseStudySlug && (
                    <Link
                      href={`/work/${artifact.caseStudySlug}`}
                      style={{
                        padding: '10px 16px',
                        border: '1px solid rgba(200, 130, 255, 0.3)',
                        backgroundColor: 'rgba(200, 130, 255, 0.08)',
                        color: '#FAF7FF',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 'var(--font-size-xs)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Inspect Dossier →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
            <Link href="/#qualification" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Request Diagnostic for Your Enterprise →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
