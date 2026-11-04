import { FunnelConfig } from './types';
import { DEFAULT_FUNNEL } from './default';

export const CONSUMER_SCOPE_FUNNEL: FunnelConfig = {
  ...DEFAULT_FUNNEL,
  meta: {
    slug: 'consumer-scope',
    title: 'BRANDMANIA | Consumer Scope & Behavioral Architecture',
    description:
      'Engineer customer touchpoints using behavioral economics, perceived value, psychological pricing, and customer loyalty.',
    targetAudience: 'Executives designing high-LTV customer journeys',
    campaignTag: 'consumer-scope-v1',
  },
  hero: {
    badge: 'Consumer scope architecture',
    headline: 'Taking Over Minds',
    subheadline:
      'We design how customers experience, interpret, value, and emotionally attach to your brand across every critical commercial touchpoint.',
    primaryCta: 'Consult on Consumer Scope',
    secondaryCta: 'Explore Behavioral Mechanisms',
    supportingText: 'Consult an Expert for Free — Understand the Mind Before Asking for Capital',
  },
};
