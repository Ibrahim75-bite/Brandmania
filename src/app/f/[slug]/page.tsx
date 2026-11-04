import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFunnelBySlug, getAllFunnelSlugs } from '@/content/funnels';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { PainPointCard } from '@/presentation/components/primitives/PainPointCard';
import { StatBlock } from '@/presentation/components/primitives/StatBlock';
import { ProofQuote } from '@/presentation/components/primitives/ProofQuote';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';
import { constructMetadata } from '@/infrastructure/seo/metadata';

interface FunnelPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllFunnelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FunnelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const funnel = getFunnelBySlug(slug);

  if (!funnel) {
    return constructMetadata({
      title: 'Funnel Not Found | BRANDMANIA',
      canonicalPath: `/f/${slug}`,
    });
  }

  return constructMetadata({
    title: `${funnel.meta.title}`,
    description: funnel.meta.description,
    canonicalPath: `/f/${slug}`,
  });
}

export default async function FunnelPage({ params }: FunnelPageProps) {
  const { slug } = await params;
  const funnel = getFunnelBySlug(slug);

  if (!funnel) {
    notFound();
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 1. Hero Section */}
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-20)' }}>
        <Container>
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '960px',
              margin: '0 auto',
              gap: 'var(--space-6)',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="neutral" size="md">
                {funnel.hero.badge}
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-hero)',
                fontWeight: 400,
                lineHeight: 'var(--line-height-tight)',
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              {funnel.hero.headline}
            </h1>

            <p
              style={{
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '780px',
              }}
            >
              {funnel.hero.subheadline}
            </p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 'var(--space-4)',
              }}
            >
              <a href="#consultation" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  {funnel.hero.primaryCta}
                </Button>
              </a>
              <a href="#briefing" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="lg">
                  {funnel.hero.secondaryCta}
                </Button>
              </a>
            </div>

            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {funnel.hero.supportingText}
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. Executive Diagnostic Briefing Dossier */}
      <Section id="briefing" spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-10)' }}>
            <Badge variant="neutral" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              Strategic briefing dossier
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
                marginBottom: 'var(--space-3)',
                fontWeight: 400,
              }}
            >
              Executive Diagnostic Briefing
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
              Architectural analysis of market positioning, capital efficiency, and customer acquisition mechanics.
            </p>
          </div>

          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: '#0A0A0E',
            }}
          >
            {/* Dossier Header Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-6)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.02em',
                color: 'var(--color-text-muted)',
              }}
            >
              <span>Dossier: BMD-EXEC-DIAGNOSTIC</span>
              <span style={{ color: '#ffffff' }}>Classification: Privileged advisory</span>
              <span>Triage: 72-hour cycle</span>
            </div>

            {/* 4 Takeaways Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              }}
            >
              {funnel.vsl.keyTakeaways.map((point, i) => (
                <div
                  key={i}
                  style={{
                    padding: 'var(--space-8)',
                    borderRight: i % 2 === 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    borderBottom: i < 2 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      letterSpacing: '0.02em',
                      fontWeight: 500,
                    }}
                    className="tabular-nums"
                  >
                    Executive directive 0{i + 1}
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--font-size-base)',
                      color: '#FFFFFF',
                      lineHeight: 'var(--line-height-relaxed)',
                      margin: 0,
                    }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Dossier Footer Action */}
            <div
              style={{
                padding: 'var(--space-5) var(--space-6)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
              }}
            >
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                Commercial architecture audit framework deployed across luxury jewelry, fine retail, and high-ticket commerce.
              </div>
              <a href="#consultation" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm">
                  Request Strategic Intake →
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. The Three Pain Points */}
      <Section spacing="lg">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', letterSpacing: '0.02em', color: 'var(--color-text-secondary)' }}>
              Problem recognition
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
                marginTop: 'var(--space-2)',
              }}
            >
              The Dilemma of Modern Growth
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
              Why established businesses burn capital without compounding enterprise value.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {funnel.painPoints.map((item) => (
              <PainPointCard
                key={item.id}
                category={item.category}
                question={item.question}
                elaboration={item.elaboration}
                impact={item.impact}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. The Commercial Progression Mechanism */}
      <Section spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            <Badge variant="neutral" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              Core mechanism
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
              }}
            >
              {funnel.mechanism.title}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
              {funnel.mechanism.tagline}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {funnel.mechanism.stages.map((stage) => (
              <Card key={stage.number} variant="elevated">
                <div
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'var(--font-size-2xl)',
                    color: '#ffffff',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {stage.number}
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', marginBottom: 'var(--space-2)' }}>
                  {stage.name}
                </h3>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-normal)' }}>
                  {stage.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. AI Philosophy */}
      <Section spacing="md">
        <Container>
          <Card
            variant="glass"
            style={{
              padding: 'var(--space-10)',
              border: '1px solid var(--color-border-active)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ maxWidth: '800px' }}>
              <Badge variant="neutral" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
                Strategic operating system
              </Badge>
              <h3
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-3xl)',
                  color: '#fff',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {funnel.aiPhilosophy.headline}
              </h3>
              <p
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-height-relaxed)',
                }}
              >
                {funnel.aiPhilosophy.body}
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      {/* 6. Proof & Selected Case Highlights */}
      <Section spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            <Badge variant="neutral" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              Proof of execution
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
              }}
            >
              {funnel.proof.headline}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
              {funnel.proof.subheadline}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-10)',
            }}
          >
            {funnel.proof.metrics.map((stat, idx) => (
              <StatBlock
                key={idx}
                value={stat.value}
                label={stat.label}
                context={stat.context}
              />
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {funnel.proof.quotes.map((q, idx) => (
              <ProofQuote
                key={idx}
                quote={q.text}
                author={q.author}
                title={q.title}
                industry={q.industry}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Selectivity / "Those Who Dare" */}
      <Section spacing="lg">
        <Container>
          <div
            style={{
              maxWidth: '880px',
              margin: '0 auto',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 0,
              padding: 'var(--space-10)',
              textAlign: 'center',
            }}
          >
            <Badge variant="neutral" size="md" style={{ marginBottom: 'var(--space-4)' }}>
              {funnel.selectivity.badge}
            </Badge>

            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-3xl)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
                fontWeight: 400,
              }}
            >
              {funnel.selectivity.headline}
            </h2>

            <p
              style={{
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
                marginBottom: 'var(--space-6)',
              }}
            >
              {funnel.selectivity.description}
            </p>

            <div
              style={{
                textAlign: 'left',
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 0,
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <h4
                style={{
                  fontSize: 'var(--font-size-xs)',
                  letterSpacing: '0.02em',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Intended commercial profile
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {funnel.selectivity.criteria.map((crit, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <Check size={16} weight="bold" color="var(--color-status-success)" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              {funnel.selectivity.disclaimer}
            </p>
          </div>
        </Container>
      </Section>

      {/* 8. Qualification & Strategic Intake */}
      <Section id="consultation" spacing="xl" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <Badge variant="neutral" size="md" style={{ marginBottom: 'var(--space-3)' }}>
              Executive qualification
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
                marginBottom: 'var(--space-2)',
              }}
            >
              {funnel.finalCta.headline}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {funnel.finalCta.subheadline}
            </p>
          </div>

          {/* Connected Qualification Intake Form */}
          <QualificationForm />
        </Container>
      </Section>

      {/* 9. Final Brand Statement */}
      <Section spacing="md" style={{ borderTop: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <BrandEye size="sm" />
            <span style={{ fontSize: 'var(--font-size-xs)', letterSpacing: '0.02em', color: 'var(--color-text-muted)' }}>
              Executive directive
            </span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'var(--font-size-2xl)',
              color: '#fff',
              letterSpacing: '-0.01em',
            }}
          >
            Bugatti, Not Toyota
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
            Rare • Engineered • Controlled • Category dominant
          </p>
        </Container>
      </Section>
    </div>
  );
}
