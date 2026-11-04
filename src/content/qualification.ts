
export interface QualificationOption {
  value: string;
  label: string;
  sublabel?: string;
}

export interface QualificationField {
  id: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'url' | 'select' | 'radio' | 'textarea';
  required: boolean;
  options?: QualificationOption[];
  step: number;
}

export const ENGAGEMENT_TRACKS: QualificationOption[] = [
  {
    value: 'FULL_ENGAGEMENT',
    label: 'Full Strategic & Performance Engagement',
    sublabel: 'Comprehensive multi-quarter brand direction, commercial margin audit, and performance execution.',
  },
  {
    value: 'STRATEGIC_CONSULTANCY',
    label: 'Strategic Consultancy',
    sublabel: 'High-impact advisory and architectural diagnostic (for targeted interventions or before full rebuild).',
  },
];

export const REVENUE_TIERS: QualificationOption[] = [
  { value: 'TIER_SUB_700K', label: 'Under $700K Annual Revenue', sublabel: 'Emerging trajectory' },
  { value: 'TIER_700K_1_5M', label: '$700K – $2M Annual Revenue', sublabel: 'Established foundation' },
  { value: 'TIER_1_5M_5M', label: '$2M – $10M Annual Revenue', sublabel: 'Scaling market presence' },
  { value: 'TIER_5M_PLUS', label: '$10M+ Annual Revenue', sublabel: 'Category leader' },
];

export const PRIMARY_INDUSTRIES: QualificationOption[] = [
  { value: 'HIGH_END_ECOMMERCE', label: 'High-Ticket Consumer Brands & E-commerce' },
  { value: 'LUXURY_GOODS', label: 'Luxury Goods & Prestige Products' },
  { value: 'SPECIALIZED_DEVICES', label: 'Specialized Devices & Technology' },
  { value: 'DESIGNER_BOUTIQUE', label: 'Designer Fashion & Apparel' },
  { value: 'COSMETICS_PERFUME', label: 'Cosmetics, Skincare & Fragrance' },
  { value: 'LUXURY_INTERIOR', label: 'Architecture, Interior & Home' },
  { value: 'HOSPITALITY_RESORT', label: 'Hospitality, Travel & Resorts' },
  { value: 'JEWELRY_GEMSTONES', label: 'Fine Jewelry & Watches' },
  { value: 'SPECIALIZED_SERVICES', label: 'Specialized Commercial Services' },
  { value: 'OTHER', label: 'Other High-Ticket Commercial Vertical' },
];

export const CORE_CHALLENGES: QualificationOption[] = [
  { value: 'BRAND_PERCEPTION', label: 'Brand Direction & Market Perception', sublabel: 'Positioning ceiling; price resistance' },
  { value: 'MARGIN_LEAKS', label: 'Margin Recovery & Cash Flow Leakage', sublabel: 'High marketing spend with eroding net return' },
  { value: 'CONSUMER_ATTACHMENT', label: 'Consumer Scope & Retention', sublabel: 'Transactional churn; low lifetime attachment' },
  { value: 'COMPREHENSIVE_SYSTEM', label: 'Full System Integration', sublabel: 'Harmonizing brand, marketing, and operations' },
];

export const TIMELINES: QualificationOption[] = [
  { value: 'IMMEDIATE', label: 'Immediate (Next 14 Days)' },
  { value: 'WITHIN_30_DAYS', label: 'Within 30 Days' },
  { value: 'NEXT_QUARTER', label: 'Next Quarter' },
  { value: 'EXPLORATORY', label: 'Strategic Evaluation' },
];

export const QUALIFICATION_CONFIG = {
  title: 'Request Strategic Consultation',
  subtitle: 'Confidential Executive Diagnostic • Aligned for Established Businesses ($700K+ Annual Revenue)',
  steps: [
    {
      step: 1,
      title: 'Commercial Profile & Engagement Track',
      description: 'Your business baseline and preferred engagement structure.',
    },
    {
      step: 2,
      title: 'Primary Strategic Challenge',
      description: 'Identify where your commercial machine requires intervention.',
    },
    {
      step: 3,
      title: 'Executive Coordinates',
      description: 'Direct contact details for confidential scheduling.',
    },
  ],
};
