export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  category: 'FLAGSHIP' | 'SUPPORTING';
  headline: string;
  summary: string;
  strategicPremise: string;
  points: string[];
  ctaLabel: string;
  faqs?: { question: string; answer: string }[];
}

export const FLAGSHIP_SERVICES: Record<string, ServiceDetail> = {
  'margin-recovery': {
    id: 'margin-recovery',
    slug: 'margin-recovery',
    title: 'Margin Recovery',
    category: 'FLAGSHIP',
    headline: 'Fix The Machine Before Buying More Traffic',
    summary:
      'Every business is in the business of making money. Before escalating customer acquisition spend, we diagnose and seal the breaking points destroying margin.',
    strategicPremise:
      'Attention does not equal revenue. Pouring paid traffic into a leaky commercial system only accelerates capital destruction.',
    points: [
      'Verified 6-stage commercial audit chain (Planning, Marketing, Sales, Fulfillment, Customer Service, Post-Purchase Relationships)',
      'Diagnostic breakdown of fulfillment, acquisition, and post-purchase costs',
      'Elimination of high-friction conversion drop-offs',
      'Restructuring sales pipeline economics for maximum margin retention',
      'Operational workflow stabilization before scaling ad capital',
    ],
    ctaLabel: 'Request Margin Recovery Diagnostic',
    faqs: [
      {
        question: 'When should an enterprise initiate a Margin Recovery audit?',
        answer: 'When revenue growth stalls despite increasing ad spend, or when top-line scale fails to expand net contribution profit.'
      },
      {
        question: 'How does this differ from traditional media agency audits?',
        answer: 'Media agencies audit ad accounts to spend more ad dollars. We audit the complete commercial unit economics across the entire fulfillment and conversion chain.'
      },
      {
        question: 'What is the required qualification threshold?',
        answer: 'Our Margin Recovery engagement requires established operations with $700,000+ in annual revenue.'
      }
    ]
  },
  'brand-direction': {
    id: 'brand-direction',
    slug: 'brand-direction',
    title: 'Brand Direction',
    category: 'FLAGSHIP',
    headline: 'How The Message Is Communicated Is As Critical As The Message Itself',
    summary:
      'Brand Direction is not merely a logo, font palette, or guideline document. It is strategic market perception, narrative authority, and pricing power.',
    strategicPremise:
      'When your market perceives ordinary execution, you are forced to compete on price. When your brand communicates undeniable rarity, you dictate the terms.',
    points: [
      'Market perception repositioning for high-ticket buyers',
      'Executive tone of voice, linguistic precision, and narrative structure',
      'Distinctive commercial identity engineered for category authority',
      'Realigning brand presence with ideal high-LTV clientele',
      'Creation of bespoke digital brand assets with controlled visual tension',
    ],
    ctaLabel: 'Explore Brand Direction Architecture',
    faqs: [
      {
        question: 'How does Brand Direction directly influence commercial margins?',
        answer: 'Perceptual authority creates price inelasticity. Premium positioning shields the enterprise from discounting pressure and lowers CAC across high-intent cohorts.'
      },
      {
        question: 'What deliverables are included in Brand Direction?',
        answer: 'Full visual identity systems, uncropped master deliverable blueprints, executive tone-of-voice governance, trust architecture, and physical monograph designs.'
      }
    ]
  },
  'consumer-scope': {
    id: 'consumer-scope',
    slug: 'consumer-scope',
    title: 'Consumer Scope',
    category: 'FLAGSHIP',
    headline: 'Engineering Customer Perception, Experience, and Behavioral Attachment',
    summary:
      'Going far beyond standard analytics. Consumer Scope explores cognitive touchpoints through behavioral economics, perceived value, and customer psychology.',
    strategicPremise:
      'Brand Direction defines who you are. Consumer Scope dictates how the customer mind feels, interprets, values, and behaves toward you at every single touchpoint.',
    points: [
      'Behavioral economics applied to high-ticket customer journeys',
      'Perceived value enhancement to support premium price points',
      'Psychological pricing frameworks and decision architecture',
      'Customer attachment loops that convert first-time buyers into brand advocates',
      'Systematic elimination of cognitive friction across the entire funnel',
    ],
    ctaLabel: 'Consult on Consumer Scope',
    faqs: [
      {
        question: 'How does Consumer Scope differ from basic UX research?',
        answer: 'UX focuses on interface usability. Consumer Scope engineers the psychological valuation, status perception, and decision momentum of the high-ticket buyer.'
      },
      {
        question: 'What behavioral frameworks are deployed?',
        answer: 'We analyze the 7 behavioral dimensions of buyer psychology: status signaling, perceived risk insulation, decision friction, endowment perception, price anchoring, social proof architecture, and post-purchase affirmation.'
      }
    ]
  },
};

export const SUPPORTING_CAPABILITIES = [
  {
    group: 'Marketing & Creative Authority',
    items: [
      'Digital Marketing',
      'Growth Marketing',
      'Performance Marketing',
      'Content Creation',
      'Performance Content Creation',
    ],
  },
  {
    group: 'Commercial & Operational Architecture',
    items: [
      'Finance & Operations',
      'Strategic Management',
      'Team Management',
      'Project Management',
    ],
  },
  {
    group: 'Cognitive & Technological Leverage',
    items: [
      'AI Automation',
      'AI Connected Systems',
    ],
  },
];
