/**
 * BRANDMANIA Services Architecture
 *
 * Distinctly articulates the 3 Flagship Disciplines supported by targeted
 * operational, marketing, and technological capabilities.
 */

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
    ctaLabel: 'Request Margin Diagnostic',
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
    ctaLabel: 'Explore Brand Direction',
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
