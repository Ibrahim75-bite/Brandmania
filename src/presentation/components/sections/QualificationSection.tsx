'use client';

import React from 'react';
import { LockKey, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { Container } from '@/presentation/components/layout/Container';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';
import styles from './QualificationSection.module.css';

export const QualificationSection: React.FC = () => {
  const faqs = [
    {
      q: 'What types of businesses does BRANDMANIA work with?',
      a: 'Established businesses generating $700,000+ in annual revenue and high-ticket international brands across design, jewelry, interior design, luxury construction, hospitality, fitness, supplements, software/apps, cosmetics, e-commerce, medical devices, and more.',
    },
    {
      q: "What are BRANDMANIA's three core disciplines?",
      a: 'Brand Direction, Margin Recovery, and Consumer Scope.',
    },
    {
      q: 'Does BRANDMANIA offer consultancy if we are not ready for a full engagement?',
      a: 'Yes, BRANDMANIA offers strategic consultancy for businesses not yet ready for a full rebuild or when full-engagement capacity is full.',
    },
  ];

  return (
    <section id="qualification" className={styles.section}>
      <Container size="full">
        <div className={styles.grid}>
          {}
          <div className={styles.leftCol}>
            <div>
              <div className={styles.marker}>
                Executive Qualification
              </div>
              <h2 className={styles.headline}>
                Request a Strategic Consultation
              </h2>
              <p className={styles.subhead}>
                A selective Strategic Consultation Dossier for established enterprises generating $700,000+ in annual revenue. We review commercial and perceptual context before the meeting.
              </p>
            </div>

            {}
            <div className={styles.protocolsList}>
              <div className={styles.protocolItem}>
                <ShieldCheck size={20} weight="duotone" className={styles.protocolIcon} />
                <span>Direct Consultation with Strategic Brand &amp; Commercial Leadership</span>
              </div>

              <div className={styles.protocolItem}>
                <Sparkle size={20} weight="duotone" className={styles.protocolIcon} />
                <span>Preliminary Commercial Audit Prepared Prior to Meeting</span>
              </div>
            </div>

            {}
            <div className={styles.ndaBox}>
              <LockKey size={20} weight="duotone" color="#FFFFFF" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span className={styles.ndaTitle}>Strict Non-Disclosure Protocol</span>
                <p className={styles.ndaText}>
                  All commercial metrics, positioning notes, and proprietary operational discussions are governed under standard executive non-disclosure confidentiality.
                </p>
              </div>
            </div>

            {}
            <div id="faq" className={styles.faqContainer}>
              <div className={styles.faqHeading}>
                VERIFIED DIRECTIVES &bull; FAQ
              </div>
              {faqs.map((faq, idx) => (
                <details key={idx} open className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.q}</span>
                    <span className={styles.faqIndex}>[0{idx + 1}]</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {}
          <div className={styles.rightCol}>
            <QualificationForm />
          </div>
        </div>
      </Container>
    </section>
  );
};
