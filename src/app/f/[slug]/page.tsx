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
import { VSLPlayer } from '@/presentation/components/primitives/VSLPlayer';
import { PainPointCard } from '@/presentation/components/primitives/PainPointCard';
import { StatBlock } from '@/presentation/components/primitives/StatBlock';
import { ProofQuote } from '@/presentation/components/primitives/ProofQuote';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';

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
    return {
      title: 'Funnel Not Found | BRANDMANIA',
    };
  }

  return {
    title: `${funnel.meta.title}`,
    description: funnel.meta.description,
  };
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
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '650px',
            background: 'var(--gradient-purple-obsidian)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

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
              <Badge variant="purple" size="md">
                {funnel.hero.badge}
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-hero)',
                fontWeight: 'var(--font-weight-bold)',
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

      {/* 2. Executive VSL Briefing */}
      <Section id="briefing" spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              STRATEGIC BRIEFING
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
                marginBottom: 'var(--space-3)',
              }}
            >
              {funnel.vsl.headline}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
              {funnel.vsl.subheadline}
            </p>
          </div>

          <VSLPlayer
            posterUrl={funnel.vsl.posterUrl}
            videoUrl={funnel.vsl.videoUrl}
            durationMinutes={funnel.vsl.durationMinutes}
            headline={funnel.vsl.headline}
          />

          <div
            style={{
              maxWidth: '860px',
              margin: 'var(--space-10) auto 0',
              padding: 'var(--space-6)',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h4
              style={{
                fontSize: 'var(--font-size-xs)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-purple-bright)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Key Diagnostic Briefing Points
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {funnel.vsl.keyTakeaways.map((point, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-3)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span style={{ color: 'var(--color-accent-purple-bright)', fontWeight: 'bold' }}>0{i + 1}.</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 3. The Three Pain Points */}
      <Section spacing="lg">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent-purple-bright)' }}>
              PROBLEM RECOGNITION
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
            <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              CORE MECHANISM
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
                    color: 'var(--color-accent-purple-bright)',
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
              <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
                STRATEGIC OPERATING SYSTEM
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
            <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              PROOF OF EXECUTION
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
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-10)',
              textAlign: 'center',
            }}
          >
            <Badge variant="purple" size="md" style={{ marginBottom: 'var(--space-4)' }}>
              {funnel.selectivity.badge}
            </Badge>

            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-3xl)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
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
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <h4
                style={{
                  fontSize: 'var(--font-size-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-accent-purple-bright)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Intended Commercial Profile
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

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              {funnel.selectivity.disclaimer}
            </p>
          </div>
        </Container>
      </Section>

      {/* 8. Qualification & Strategic Intake */}
      <Section id="consultation" spacing="xl" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <Badge variant="purple" size="md" style={{ marginBottom: 'var(--space-3)' }}>
              EXECUTIVE QUALIFICATION
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
            <span style={{ fontSize: 'var(--font-size-xs)', letterSpacing: '0.25em', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              EXECUTIVE DIRECTIVE
            </span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'var(--font-size-2xl)',
              color: '#fff',
              letterSpacing: '0.05em',
            }}
          >
            Bugatti, Not Toyota.
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
            Rare • Engineered • Controlled • Category Dominant
          </p>
        </Container>
      </Section>
    </div>
  );
}
