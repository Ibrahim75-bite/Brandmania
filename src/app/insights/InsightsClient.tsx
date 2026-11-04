'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Card } from '@/presentation/components/primitives/Card';
import type { Article } from '@/content/articles';

interface InsightsClientProps {
  articles: Article[];
}

const CATEGORIES = [
  'All',
  'Brand Direction',
  'Margin Recovery',
  'Consumer Scope',
  'Operational Leverage',
] as const;

export function InsightsClient({ articles }: InsightsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredArticles =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <Section spacing="xl" style={{ backgroundColor: '#0D0118', minHeight: '60vh' }}>
      <Container>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-10)',
            borderBottom: '1px solid rgba(200, 130, 255, 0.16)',
            paddingBottom: 'var(--space-6)',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  backgroundColor: isActive ? '#C882FF' : '#160429',
                  color: isActive ? '#0D0118' : '#FAF7FF',
                  border: '1px solid',
                  borderColor: isActive ? '#C882FF' : 'rgba(200, 130, 255, 0.24)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 'var(--font-size-xs)',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'var(--space-8)',
          }}
        >
          {filteredArticles.map((article) => (
            <Card
              key={article.slug}
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
                  <Badge variant="neutral" size="sm">
                    {article.category}
                  </Badge>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      color: '#A8A0B8',
                    }}
                  >
                    {article.readingTimeMinutes} MIN READ
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 400,
                    color: '#FAF7FF',
                    lineHeight: 1.25,
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {article.title}
                </h2>

                <p
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono), monospace',
                    color: '#C882FF',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {article.subtitle}
                </p>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: '#C4B8D8',
                    lineHeight: 'var(--line-height-relaxed)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {article.tldrAnswer}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(200, 130, 255, 0.12)',
                  paddingTop: 'var(--space-4)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: '11px', color: '#A8A0B8', fontFamily: 'var(--font-mono), monospace' }}>
                  {article.publishedAt}
                </div>
                <Link
                  href={`/insights/${article.slug}`}
                  style={{
                    color: '#C882FF',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 'var(--font-size-xs)',
                    letterSpacing: '0.04em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Read Article</span>
                  <span>→</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

