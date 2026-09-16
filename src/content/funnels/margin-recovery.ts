import { FunnelConfig } from './types';
import { DEFAULT_FUNNEL } from './default';

export const MARGIN_RECOVERY_FUNNEL: FunnelConfig = {
  ...DEFAULT_FUNNEL,
  meta: {
    slug: 'margin-recovery',
    title: 'BRANDMANIA | Margin Recovery Diagnostic',
    description:
      'Stop incinerating ad capital on broken machinery. Discover where your business is silently leaking margin and fix the breaking points.',
    targetAudience: 'E-commerce Founders & Brand Executives seeking profit restoration',
    campaignTag: 'margin-recovery-v1',
  },
  hero: {
    badge: 'MARGIN RECOVERY DIAGNOSTIC',
    headline: 'Fix The Machine Before Buying More Traffic.',
    subheadline:
      'Every business is in the business of making money. We identify where existing revenue is leaking across your operations, sales, and fulfillment.',
    primaryCta: 'Request Margin Audit',
    secondaryCta: 'Explore Diagnostic Vectors',
    supportingText: 'Consult an Expert for Free — Discover What Is Breaking Your Net Profit',
  },
};
