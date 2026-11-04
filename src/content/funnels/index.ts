import { FunnelConfig } from './types';
import { DEFAULT_FUNNEL } from './default';
import { MARGIN_RECOVERY_FUNNEL } from './margin-recovery';
import { BRAND_DIRECTION_FUNNEL } from './brand-direction';
import { CONSUMER_SCOPE_FUNNEL } from './consumer-scope';

export * from './types';
export { DEFAULT_FUNNEL } from './default';
export { MARGIN_RECOVERY_FUNNEL } from './margin-recovery';
export { BRAND_DIRECTION_FUNNEL } from './brand-direction';
export { CONSUMER_SCOPE_FUNNEL } from './consumer-scope';

const FUNNEL_MAP: Record<string, FunnelConfig> = {
  default: DEFAULT_FUNNEL,
  'margin-recovery': MARGIN_RECOVERY_FUNNEL,
  'brand-direction': BRAND_DIRECTION_FUNNEL,
  'consumer-scope': CONSUMER_SCOPE_FUNNEL,
  jewelry: {
    ...DEFAULT_FUNNEL,
    meta: {
      ...DEFAULT_FUNNEL.meta,
      slug: 'jewelry',
      title: 'BRANDMANIA | High Jewelry & Gemstones Strategic Practice',
      targetAudience: 'Fine Jewelry & Gemstone Brand Founders',
      campaignTag: 'vertical-jewelry-v1',
    },
    hero: {
      ...DEFAULT_FUNNEL.hero,
      badge: 'Fine jewelry & gemstone authority',
      headline: 'Rarity Engineered For Category Dominance',
      subheadline:
        'We help jewelry and gemstone houses eliminate operational leaks, elevate perceived value, and command uncontested international market presence.',
    },
  },
  'designer-boutiques': {
    ...DEFAULT_FUNNEL,
    meta: {
      ...DEFAULT_FUNNEL.meta,
      slug: 'designer-boutiques',
      title: 'BRANDMANIA | Designer Boutiques & Fashion Houses',
      targetAudience: 'Designer Boutique Principals & Luxury Fashion Founders',
      campaignTag: 'vertical-designer-boutiques-v1',
    },
    hero: {
      ...DEFAULT_FUNNEL.hero,
      badge: 'Designer boutique architecture',
      headline: 'Transforming High-End Design Into Commercial Authority',
      subheadline:
        'Bridge the gap between pure artistic vision and commercial margin retention. Fix the machine and establish undeniable brand pull.',
    },
  },
};

export function getFunnelBySlug(slug: string): FunnelConfig | null {
  return FUNNEL_MAP[slug] || null;
}

export function getAllFunnelSlugs(): string[] {
  return Object.keys(FUNNEL_MAP);
}
