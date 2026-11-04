
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
    client: 'European Haute Horlogerie & Fine Jewelry House',
    confidentialityStatus: 'ANONYMIZED',
    industry: 'Fine Jewelry & Gemstones',
    location: 'Geneva / London',
    challenge:
      'Client was achieving strong multi-million topline revenue, but rapid customer acquisition costs and post-purchase handling were dissolving over 35% of projected operating margin.',
    intervention: {
      flagshipsApplied: ['MARGIN_RECOVERY', 'BRAND_DIRECTION'],
      summary:
        'Comprehensive 6-stage commercial margin audit conducted. Re-engineered post-purchase flow, renegotiated fulfillment bottlenecks, and repositioned product narrative to eliminate discounting.',
    },
    timeframe: '90 Days',
    metrics: [
      {
        label: 'Net Operating Margin',
        before: '14.2%',
        after: '28.6%',
        change: '+14.4%',
      },
      {
        label: 'Average Order Value (AOV)',
        before: '$4,200',
        after: '$6,850',
        change: '+63.1%',
      },
      {
        label: 'Blended CAC',
        before: '$1,120',
        after: '$780',
        change: '-30.4%',
      },
    ],
    testimonial: {
      quote:
        'BRANDMANIA did not pitch us more ad spend. They walked in, diagnosed where our capital was leaking, and fundamentally fixed our margin within weeks.',
      author: 'Founder & CEO',
      title: 'Managing Principal',
    },
  },
  {
    id: 'cs-02',
    slug: 'designer-boutique-perception-realignment',
    client: 'Haute Designer Fashion Atelier',
    confidentialityStatus: 'ANONYMIZED',
    industry: "Designer Boutiques & Women's Fashion",
    location: 'London / New York',
    challenge:
      'Market perception lagged behind product craftsmanship, creating high resistance to premium pricing and forcing reliance on end-of-season sales.',
    intervention: {
      flagshipsApplied: ['BRAND_DIRECTION', 'CONSUMER_SCOPE'],
      summary:
        'Redefined visual direction, executive tone of voice, and psychological pricing tiers. Shifted communication from promotional discounts to imperial rarity.',
    },
    timeframe: '120 Days',
    metrics: [
      {
        label: 'Full-Price Sell-Through Rate',
        before: '41%',
        after: '78%',
        change: '+37%',
      },
      {
        label: 'Repeat Purchase LTV (6 Mo)',
        before: '$1,850',
        after: '$3,420',
        change: '+84.8%',
      },
    ],
    testimonial: {
      quote:
        'Our customers stopped questioning our price points. The new Brand Direction created undeniable status that transformed our sell-through.',
      author: 'Creative Director',
      title: 'Founder & Head of Design',
    },
  },
];
