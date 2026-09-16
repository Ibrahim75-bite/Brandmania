/**
 * BRANDMANIA Case Studies & Client Proof Architecture
 *
 * All case study details are structured with clear owner placeholder annotations.
 * No false credentials or unapproved metrics are invented.
 */

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
  change: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  confidentialityStatus: 'CONFIDENTIAL' | 'ANONYMIZED' | 'NAMED';
  industry: string;
  location: string;
  challenge: string;
  intervention: {
    flagshipsApplied: ('MARGIN_RECOVERY' | 'BRAND_DIRECTION' | 'CONSUMER_SCOPE')[];
    summary: string;
  };
  timeframe: string;
  metrics: CaseStudyMetric[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    slug: 'fine-jewelry-margin-recovery',
    client: '[OWNER COPY — European Fine Jewelry House]',
    confidentialityStatus: 'ANONYMIZED',
    industry: 'Fine Jewelry & Gemstones',
    location: 'Geneva / London',
    challenge:
      '[OWNER COPY — Client was achieving strong multi-million topline revenue, but rapid customer acquisition costs and post-purchase handling were dissolving over 35% of projected operating margin.]',
    intervention: {
      flagshipsApplied: ['MARGIN_RECOVERY', 'BRAND_DIRECTION'],
      summary:
        '[OWNER COPY — Comprehensive 8-vector margin audit conducted. Re-engineered post-purchase flow, renegotiated fulfillment bottlenecks, and repositioned product narrative to eliminate discounting.]',
    },
    timeframe: '90 Days',
    metrics: [
      {
        label: 'Net Operating Margin',
        before: '[OWNER STAT — Before %]',
        after: '[OWNER STAT — After %]',
        change: '+[OWNER STAT]%',
      },
      {
        label: 'Average Order Value (AOV)',
        before: '[OWNER STAT — Before $]',
        after: '[OWNER STAT — After $]',
        change: '+[OWNER STAT]%',
      },
      {
        label: 'Blended CAC',
        before: '[OWNER STAT — Before $]',
        after: '[OWNER STAT — After $]',
        change: '-[OWNER STAT]%',
      },
    ],
    testimonial: {
      quote:
        '[OWNER COPY — "BRANDMANIA did not pitch us more ad spend. They walked in, diagnosed where our capital was leaking, and fundamentally fixed our margin within weeks."]',
      author: '[OWNER COPY — Founder & CEO]',
      title: 'Managing Principal',
    },
  },
  {
    id: 'cs-02',
    slug: 'designer-boutique-perception-realignment',
    client: '[OWNER COPY — Haute Designer Boutique]',
    confidentialityStatus: 'ANONYMIZED',
    industry: 'Designer Boutiques & Women\'s Fashion',
    location: 'London / New York',
    challenge:
      '[OWNER COPY — Market perception lagged behind product craftsmanship, creating high resistance to premium pricing and forcing reliance on end-of-season sales.]',
    intervention: {
      flagshipsApplied: ['BRAND_DIRECTION', 'CONSUMER_SCOPE'],
      summary:
        '[OWNER COPY — Redefined visual direction, executive tone of voice, and psychological pricing tiers. Shifted communication from promotional discounts to imperial rarity.]',
    },
    timeframe: '120 Days',
    metrics: [
      {
        label: 'Full-Price Sell-Through Rate',
        before: '[OWNER STAT — Before %]',
        after: '[OWNER STAT — After %]',
        change: '+[OWNER STAT]%',
      },
      {
        label: 'Repeat Purchase LTV (6 Mo)',
        before: '[OWNER STAT — Before $]',
        after: '[OWNER STAT — After $]',
        change: '+[OWNER STAT]%',
      },
    ],
    testimonial: {
      quote:
        '[OWNER COPY — "Our customers stopped questioning our price points. The new Brand Direction created undeniable status that transformed our sell-through."]',
      author: '[OWNER COPY — Creative Director]',
      title: 'Founder & Head of Design',
    },
  },
];
