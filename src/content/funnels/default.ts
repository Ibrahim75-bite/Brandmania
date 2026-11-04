import { FunnelConfig } from './types';

/**
 * DEFAULT COLD OUTREACH FUNNEL
 *
 * Implements the 18-step persuasive narrative sequence for cold traffic,
 * with clearly marked owner copy placeholders.
 */
export const DEFAULT_FUNNEL: FunnelConfig = {
  meta: {
    slug: 'default',
    title: 'BRANDMANIA | Executive Cold Outreach & Strategic Diagnostic',
    description:
      'Discover how market leaders recover lost margin, establish category-dominating brand perception, and scale with behavioral precision.',
    targetAudience: 'Founders, CEOs, and Commercial Executives ($700k+ Revenue)',
    campaignTag: 'cold-outreach-v1',
  },
  hero: {
    badge: 'Confidential strategic briefing',
    headline: 'Attention Does Not Equal Revenue',
    subheadline:
      'Fix the machine before buying more traffic. We diagnose hidden margin leaks, re-engineer brand perception, and build category leaders.',
    primaryCta: 'Book Now',
    secondaryCta: 'Watch Strategic Briefing',
    supportingText: 'Consult an Expert for Free — Discover How to Make the Best Decision for Your Brand',
  },
  painPoints: [
    {
      id: 'margin-pain',
      category: 'MARGIN',
      question: 'Your business is making money. So why are you losing so much of it?',
      elaboration:
        'Escalating customer acquisition cost, fragmented fulfillment, and post-purchase drop-offs silently dissolve profitability while topline revenue looks deceptively healthy.',
      impact: 'Capital incineration disguised as growth.',
    },
    {
      id: 'brand-pain',
      category: 'BRAND',
      question: 'Your market sees something fundamentally different from the business you built.',
      elaboration:
        'When communication fails to convey absolute rarity and authority, you become commoditized. You are forced to discount, negotiate, and plead for buyer attention.',
      impact: 'Erosion of premium pricing power.',
    },
    {
      id: 'consumer-pain',
      category: 'CONSUMER',
      question: 'Your customers buy from you. But have they truly chosen you?',
      elaboration:
        'Without psychological loyalty, identity alignment, and friction-free experience design, transactions remain purely circumstantial. One competitor offer, and they vanish.',
      impact: 'Zero customer attachment or lifetime value elasticity.',
    },
  ],
  mechanism: {
    title: 'The Commercial Progression',
    tagline: 'A disciplined, diagnostic pathway from broken economics to uncontested market leadership.',
    stages: [
      {
        number: '01',
        name: 'Margin Recovery',
        description: 'Diagnose and repair operational, sales, and fulfillment leaks before risking ad capital.',
      },
      {
        number: '02',
        name: 'Growth & Performance',
        description: 'Deploy aggressive, scalable customer acquisition only after unit economics are stabilized.',
      },
      {
        number: '03',
        name: 'Market Maturity',
        description: 'Consolidate market share, fortify cash flow, and elevate customer retention benchmarks.',
      },
      {
        number: '04',
        name: 'Brand Direction',
        description: 'Re-engineer market perception, narrative authority, and category differentiation.',
      },
      {
        number: '05',
        name: 'Consumer Scope',
        description: 'Architect deep psychological resonance, loyalty loops, and cognitive brand attachment.',
      },
      {
        number: '06',
        name: 'Market Leadership',
        description: 'The culmination: commanding premium valuation, organic inbound pull, and market dominance.',
      },
    ],
  },
  flagshipHighlights: [
    {
      title: '01. Margin Recovery',
      description:
        'A comprehensive diagnostic across planning, acquisition, conversion, fulfillment, support, and retention. We identify breaking points that destroy revenue.',
    },
    {
      title: '02. Brand Direction',
      description:
        'Transcending graphic design. We establish optimal market perception, strategic tone of voice, narrative clarity, and unmatched authority for your ideal client.',
    },
    {
      title: '03. Consumer Scope',
      description:
        'Behavioral economics, perceived value, psychological pricing, and customer attachment engineering. Understanding how decisions form in the buyer mind.',
    },
  ],
  aiPhilosophy: {
    headline: 'AI as System Velocity. Humans as Strategic Masters',
    body:
      'We reject the notion that AI replaces human creative and strategic brilliance. We leverage AI to eliminate operational friction, automate repetitive tasks, and synthesize data at machine speed. Human intellect remains solely responsible for strategy, psychology, storytelling, and nuanced commercial judgment.',
  },
  vsl: {
    headline: 'The Executive Video Briefing',
    subheadline: 'A 6-minute diagnostic breakdown of the Dilemma of Branding and how to break free.',
    posterUrl: '/brand/textures/brandmania-cover.jpg',
    durationMinutes: 6,
    keyTakeaways: [
      'Why conventional marketing agencies sell ad spend to businesses that cannot retain profit',
      'The 6 verified commercial stages where established brands quietly leak 15% to 40% of their net margin',
      'How luxury jewelry, boutiques, and high-ticket brands command 3x higher perceived value',
      'The exact diagnostic framework BRANDMANIA uses before accepting a partner engagement',
    ],
  },
  proof: {
    headline: 'Engineered Authority',
    subheadline: 'Real results from high-ticket engagements across Europe, the UK, and North America.',
    quotes: [
      {
        text:
          'BRANDMANIA completely diagnosed our margin leak within 72 hours, transforming our acquisition economics and eliminating promotional discounts.',
        author: 'Managing Director',
        title: 'Executive Leadership',
        industry: 'Haute Horlogerie & Jewelry',
      },
      {
        text:
          'The Brand Direction repositioning unlocked a 45% increase in average transaction size without increasing advertising budget.',
        author: 'Brand Director',
        title: 'Creative Principal',
        industry: 'Designer Boutique',
      },
    ],
    metrics: [
      {
        value: '72 Hours',
        label: 'Margin Recovery Velocity',
        context: 'Average timeframe to identify primary operational leaks',
      },
      {
        value: '$700K+',
        label: 'Client Annual Revenue Scope',
        context: 'Engineered strictly for ambitious and established businesses',
      },
      {
        value: '3 Flagships',
        label: 'Unified System',
        context: 'Margin Recovery • Brand Direction • Consumer Scope',
      },
    ],
  },
  engagementProcess: {
    headline: 'How We Engage',
    steps: [
      {
        number: '1',
        title: 'Diagnostic Audit',
        description: 'A deep forensic analysis of your business machine, margin leaks, and brand positioning.',
      },
      {
        number: '2',
        title: 'Remediation Architecture',
        description: 'Fixing the breaking points discovered through the audit before deploying growth capital.',
      },
      {
        number: '3',
        title: 'Selective Performance Partnership',
        description: 'For aligned brands, ongoing performance-driven execution and market leadership development.',
      },
    ],
  },
  selectivity: {
    badge: 'Those who dare',
    headline: 'We Are Selectively Aligned',
    description:
      'BRANDMANIA does not accept every business that requests an audit. We partner strictly with ambitious founders whose products and commercial foundations possess genuine market potential.',
    criteria: [
      'Established or ambitious business with ~$700k+ in annual revenue trajectory',
      'High-ticket or high-LTV sectors (Jewelry, Designer Boutiques, Luxury, Wellness, Specialized Goods)',
      'Leadership open to rigorous strategic truth, operational restructuring, and category dominance',
      'Desire to build a market leader rather than chase short-term vanity deliverables',
    ],
    disclaimer:
      'Revenue figures are guidance, not an automated barrier. If your brand possesses extraordinary commercial velocity and potential, we welcome your consultation request.',
  },
  finalCta: {
    headline: 'Let’s Make You A Market Leader',
    subheadline: 'Schedule your preliminary strategic consultation with our leadership team.',
    buttonLabel: 'Book Now',
    supportingNote: 'Consult an Expert for Free • Zero Obligation • Strictly Confidential',
  },
};
