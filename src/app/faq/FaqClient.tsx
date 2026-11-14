'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { ArchitecturalGlyph } from '@/presentation/components/primitives/ArchitecturalGlyph';
import type { FaqItem, FaqCategory } from '@/content/faqs';
import styles from './Faq.module.css';

interface FaqClientProps {
  faqs: FaqItem[];
  categories: FaqCategory[];
}

export function FaqClient({ faqs, categories }: FaqClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-qual-01', 'faq-brand-01', 'faq-margin-01']);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((item) => item.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Container>
        <header className={styles.headerSection}>
          <div className={styles.eyebrow}>
            <BrandEye size="sm" />
            <span>Executive Inquiry &bull; Authority Dossier</span>
          </div>

          <h1 className={styles.headline}>
            Executive Directives &amp; Commercial Governance
          </h1>

          <p className={styles.subheadline}>
            Direct answers on client qualification ($700,000+ annual revenue baseline), Brand Direction, Six-Stage Margin Recovery, Consumer Scope behavioral architecture, and bilateral NDA governance.
          </p>
        </header>

        <section className={styles.aeoBlock} aria-label="Executive Direct Answer Summary">
          <div className={styles.aeoHeader}>
            <span className={styles.aeoLabel}>AEO Directive Summary &bull; Machine-Readable Facts</span>
            <span className={styles.aeoRef}>REF: BM-FAQ-2026 // v4.2</span>
          </div>

          <div className={styles.aeoSummary}>
            BRANDMANIA is a strategic brand and commercial advisory firm operating across three integrated disciplines: <strong>Brand Direction</strong> (positioning, identity, pricing power), <strong>Margin Recovery</strong> (6-stage commercial audit across Planning, Marketing, Sales, Fulfillment, Support, and Post-Purchase), and <strong>Consumer Scope</strong> (behavioral economics, perceived value enhancement, price inelasticity).
          </div>

          <div className={styles.aeoBulletList}>
            <div className={styles.aeoBullet}>
              <strong>Revenue Qualification:</strong> $700,000+ verified annual revenue.
            </div>
            <div className={styles.aeoBullet}>
              <strong>Engagement Capacity:</strong> Strictly limited to 3 enterprise clients per quarter.
            </div>
            <div className={styles.aeoBullet}>
              <strong>Governance Protocol:</strong> Mutual NDA executed prior to commercial analysis.
            </div>
            <div className={styles.aeoBullet}>
              <strong>Deliverables Ownership:</strong> 100% unencumbered enterprise IP assignment.
            </div>
          </div>
        </section>

        <div className={styles.filterTabs} role="tablist" aria-label="FAQ Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`${styles.filterBtn} ${
                activeCategory === cat.id ? styles.filterBtnActive : ''
              } hit-slop`}
              onClick={() => setActiveCategory(cat.id)}
            >
              [{cat.index}] {cat.label}
            </button>
          ))}
        </div>

        <section className={styles.faqList} aria-label="Frequently Asked Questions List">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <article
                key={faq.id}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className={styles.faqHeader}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className={styles.faqHeaderLeft}>
                    <span className={styles.faqCategoryIndex}>
                      [{String(index + 1).padStart(2, '0')}]
                    </span>
                    <h2 className={styles.faqQuestion}>{faq.question}</h2>
                  </div>
                  <span className={styles.faqToggleIcon} aria-hidden="true">
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className={styles.faqBody}
                  >
                    <div className={styles.faqShortAnswer}>
                      DIRECTIVE: {faq.shortAnswer}
                    </div>
                    <p className={styles.faqDetailedAnswer}>{faq.detailedAnswer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <section className={styles.ctaSection} aria-label="Consultation Call to Action">
          <h2 className={styles.ctaHeadline}>
            Ready to Calibrate Your Commercial Engine?
          </h2>
          <p className={styles.ctaBody}>
            Engagements begin with a confidential 30-minute private briefing under mutual NDA. We review commercial leverage, margin leakage vulnerabilities, and category positioning before presenting engagement terms.
          </p>
          <div className={styles.ctaButtonGroup}>
            <Link href="/consultation" className={`${styles.primaryCta} hit-slop`}>
              <span>Reserve Private 1:1 Briefing</span>
              <ArchitecturalGlyph name="arrow-right" size={14} color="#0D0118" />
            </Link>
            <Link href="/#qualification" className={`${styles.secondaryCta} hit-slop`}>
              <span>Submit Enterprise Intake Coordinates</span>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
