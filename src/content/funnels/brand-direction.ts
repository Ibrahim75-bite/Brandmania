import { FunnelConfig } from './types';
import { DEFAULT_FUNNEL } from './default';

export const BRAND_DIRECTION_FUNNEL: FunnelConfig = {
  ...DEFAULT_FUNNEL,
  meta: {
    slug: 'brand-direction',
    title: 'BRANDMANIA | Brand Direction & Strategic Perception',
    description:
      'Elevate your brand presence to command premium pricing. How the message is communicated is as important as the message itself.',
    targetAudience: 'Founders of Luxury, Jewelry, and Designer Boutiques',
    campaignTag: 'brand-direction-v1',
  },
  hero: {
    badge: 'Brand direction executive briefing',
    headline: 'Perception Dictates Pricing Power',
    subheadline:
      'We help brands establish optimal market perception, executive trust, tone of voice, narrative clarity, and category dominance.',
    primaryCta: 'Explore Brand Direction',
    secondaryCta: 'View Case Studies',
    supportingText: 'Consult an Expert for Free — Redefine Your Market Authority',
  },
};
