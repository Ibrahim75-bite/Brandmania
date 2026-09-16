/**
 * Lead Qualification Form Architecture
 *
 * Configurable question definitions, revenue tiers, and industry options.
 * Allows adding, removing, or reordering questions without restructuring components.
 */

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

export const REVENUE_TIERS: QualificationOption[] = [
  { value: 'TIER_SUB_700K', label: 'Under $700K ARR', sublabel: 'High growth trajectory' },
  { value: 'TIER_700K_1_5M', label: '$700K – $1.5M ARR', sublabel: 'Established foundation' },
  { value: 'TIER_1_5M_5M', label: '$1.5M – $5M ARR', sublabel: 'Scaling enterprise' },
  { value: 'TIER_5M_PLUS', label: '$5M+ ARR', sublabel: 'Market leader' },
];

export const PRIMARY_INDUSTRIES: QualificationOption[] = [
  { value: 'JEWELRY_GEMSTONES', label: 'Jewelry & Gemstones' },
  { value: 'DESIGNER_BOUTIQUE', label: 'Designer Boutiques & Fashion' },
  { value: 'LUXURY_INTERIOR', label: 'Luxury & Interior Design' },
  { value: 'HOSPITALITY_RESORT', label: 'Hospitality & Luxury Resorts' },
  { value: 'WELLNESS_NUTRITION', label: 'Fitness, Supplements & Nutrition' },
  { value: 'COSMETICS_PERFUME', label: 'Cosmetics, Skincare & Fragrance' },
  { value: 'HIGH_END_ECOMMERCE', label: 'High-Ticket E-commerce' },
  { value: 'SPECIALIZED_DEVICES', label: 'Medical Devices & Electronics' },
  { value: 'OTHER', label: 'Other Premium Vertical' },
];

export const CORE_CHALLENGES: QualificationOption[] = [
  { value: 'MARGIN_LEAKS', label: 'Margin & Profit Leakage', sublabel: 'High ad spend with eroding net return' },
  { value: 'BRAND_PERCEPTION', label: 'Market Perception & Positioning', sublabel: 'Seen as commodity; cannot raise prices' },
  { value: 'CONSUMER_ATTACHMENT', label: 'Customer Retention & LTV', sublabel: 'Buyers don’t return; low lifetime value' },
  { value: 'SYSTEMIC_SCALING', label: 'Operational & Growth Bottlenecks', sublabel: 'Machine cannot handle further scale' },
];

export const TIMELINES: QualificationOption[] = [
  { value: 'IMMEDIATE', label: 'Immediate (Next 14 Days)' },
  { value: 'WITHIN_30_DAYS', label: 'Within 30 Days' },
  { value: 'NEXT_QUARTER', label: 'Next Quarter' },
  { value: 'EXPLORATORY', label: 'Diagnostic Exploration' },
];

export const QUALIFICATION_CONFIG = {
  title: 'Request Strategic Consultation',
  subtitle: 'Confidential Executive Diagnostic • Aligned for $700K+ Annual Trajectory',
  steps: [
    {
      step: 1,
      title: 'Commercial Profile',
      description: 'Tell us about your brand and commercial baseline.',
    },
    {
      step: 2,
      title: 'Diagnostic Focus',
      description: 'Identify where your machine requires strategic intervention.',
    },
    {
      step: 3,
      title: 'Executive Details',
      description: 'Direct contact coordinates for confidential scheduling.',
    },
  ],
};
