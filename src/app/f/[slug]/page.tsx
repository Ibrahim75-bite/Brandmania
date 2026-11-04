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
    <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0D0118', color: '#FAF7FF' }}>
      <Section spacing="lg" style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)', backgroundColor: '#160429', borderBottom: '1px solid rgba(200, 130, 255, 0.16)' }}>
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
              gap: '1.5rem',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                {funnel.hero.badge}
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: '#FAF7FF',
              }}
            >
              {funnel.hero.headline}
            </h1>

            <p
              style={{
                fontSize: '1.2rem',
                color: '#C4B8D8',
                lineHeight: 1.65,
                maxWidth: '780px',
              }}
            >
              {funnel.hero.subheadline}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <a href="#consultation" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  {funnel.hero.primaryCta} &rarr;
                </Button>
              </a>
              <a href="#briefing" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="lg">
                  {funnel.hero.secondaryCta}
                </Button>
              </a>
            </div>

            <p
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono), monospace',
                color: '#A8A0B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {funnel.hero.supportingText}
            </p>
          </div>
        </Container>
      </Section>

      <Section id="briefing" spacing="lg" style={{ backgroundColor: '#0D0118', borderBottom: '1px solid rgba(200, 130, 255, 0.16)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: '1rem' }}>
              STRATEGIC BRIEFING DOSSIER
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#FAF7FF',
                marginBottom: '0.75rem',
                fontWeight: 400,
              }}
            >
              Executive Diagnostic Briefing
            </h2>
            <p style={{ color: '#C4B8D8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Architectural analysis of market positioning, capital efficiency, and customer acquisition mechanics.
            </p>
          </div>

          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              border: '1px solid rgba(200, 130, 255, 0.2)',
              backgroundColor: '#160429',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(200, 130, 255, 0.16)',
                backgroundColor: 'rgba(13, 1, 24, 0.6)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: '#A8A0B8',
                textTransform: 'uppercase',
              }}
            >
              <span>Dossier: BMD-EXEC-DIAGNOSTIC</span>
              <span style={{ color: '#C882FF' }}>Classification: Privileged advisory</span>
              <span>Floor: $700,000+ Annual Revenue</span>
            </div>

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
                    padding: '2rem',
                    borderRight: i % 2 === 0 ? '1px solid rgba(200, 130, 255, 0.12)' : 'none',
                    borderBottom: i < 2 ? '1px solid rgba(200, 130, 255, 0.12)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#C882FF',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                    className="tabular-nums"
                  >
                    Executive Directive 0{i + 1}
                  </div>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#FAF7FF',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid rgba(200, 130, 255, 0.16)',
                backgroundColor: 'rgba(13, 1, 24, 0.6)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#A8A0B8', letterSpacing: '0.04em' }}>
                Commercial architecture audit framework deployed across luxury jewelry, fine retail, and high-ticket commerce.
              </div>
              <a href="#consultation" style={{ color: '#C882FF', textDecoration: 'none', fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Request Intake &rarr;
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="xl" style={{ backgroundColor: '#160429', borderBottom: '1px solid rgba(200, 130, 255, 0.16)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: '1rem' }}>
              COMMERCIAL FRICTION POINTS
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#FAF7FF',
                fontWeight: 400,
              }}
            >
              Where Value Leaks in Enterprise Growth
            </h2>
            <p style={{ color: '#C4B8D8', marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Three recurring structural failures destroying contribution margins before traffic scales.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {funnel.painPoints.map((item, idx) => (
              <PainPointCard
                key={idx}
                category={item.category}
                question={item.question}
                elaboration={item.elaboration}
                impact={item.impact}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="xl" style={{ backgroundColor: '#0D0118', borderBottom: '1px solid rgba(200, 130, 255, 0.16)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: '1rem' }}>
              CONTINUOUS CAUSAL SYSTEM
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#FAF7FF',
                fontWeight: 400,
              }}
            >
              {funnel.mechanism.title}
            </h2>
            <p style={{ color: '#C4B8D8', marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {funnel.mechanism.tagline}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {funnel.mechanism.stages.map((stage) => (
              <Card
                key={stage.number}
                variant="elevated"
                style={{
                  backgroundColor: '#160429',
                  border: '1px solid rgba(200, 130, 255, 0.16)',
                  padding: '1.75rem',
                  borderRadius: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#C882FF', fontWeight: 600 }}>
                    [{stage.number}]
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '1.35rem', color: '#FAF7FF', margin: 0, fontWeight: 400 }}>
                    {stage.name}
                  </h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#C4B8D8', lineHeight: 1.55, margin: 0 }}>
                  {stage.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" style={{ backgroundColor: '#160429', borderBottom: '1px solid rgba(200, 130, 255, 0.16)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: '1rem' }}>
              PROOF OF EXECUTION
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#FAF7FF',
                fontWeight: 400,
              }}
            >
              {funnel.proof.headline}
            </h2>
            <p style={{ color: '#C4B8D8', marginTop: '0.5rem' }}>
              {funnel.proof.subheadline}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem',
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
              gap: '1.5rem',
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

      <Section spacing="lg" style={{ backgroundColor: '#0D0118', borderBottom: '1px solid rgba(200, 130, 255, 0.16)' }}>
        <Container>
          <div
            style={{
              maxWidth: '880px',
              margin: '0 auto',
              backgroundColor: '#160429',
              border: '1px solid rgba(200, 130, 255, 0.2)',
              borderRadius: 0,
              padding: 'clamp(2rem, 4vw, 3rem)',
              textAlign: 'center',
            }}
          >
            <Badge variant="purple" size="md" style={{ marginBottom: '1rem' }}>
              {funnel.selectivity.badge}
            </Badge>

            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                color: '#FAF7FF',
                marginBottom: '1rem',
                fontWeight: 400,
              }}
            >
              {funnel.selectivity.headline}
            </h2>

            <p
              style={{
                fontSize: '1rem',
                color: '#C4B8D8',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              {funnel.selectivity.description}
            </p>

            <div
              style={{
                textAlign: 'left',
                backgroundColor: '#0D0118',
                border: '1px solid rgba(200, 130, 255, 0.14)',
                borderRadius: 0,
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: '#C882FF',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Intended Commercial Profile
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {funnel.selectivity.criteria.map((crit, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: '0.92rem',
                      color: '#FAF7FF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <Check size={16} weight="bold" color="#C882FF" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono), monospace', color: '#A8A0B8', letterSpacing: '0.04em' }}>
              {funnel.selectivity.disclaimer}
            </p>
          </div>
        </Container>
      </Section>

      <Section id="consultation" spacing="xl" style={{ backgroundColor: '#160429' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
            <Badge variant="purple" size="md" style={{ marginBottom: '1rem' }}>
              EXECUTIVE QUALIFICATION
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#FAF7FF',
                marginBottom: '0.75rem',
                fontWeight: 400,
              }}
            >
              {funnel.finalCta.headline}
            </h2>
            <p style={{ color: '#C4B8D8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {funnel.finalCta.subheadline}
            </p>
          </div>

          <QualificationForm />
        </Container>
      </Section>
    </div>
  );
}
