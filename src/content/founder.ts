/**
 * Founder-Led Experience Configuration
 *
 * Articulates the executive leadership behind BRANDMANIA.
 * Maintains institutional authority without devolving into a personal blog.
 */

export interface FounderConfig {
  name: string;
  role: string;
  portraitUrl: string;
  biography: string;
  personalMotto: string;
  experienceHighlights: {
    year: string;
    milestone: string;
  }[];
  credentials: string[];
}

export const FOUNDER: FounderConfig = {
  name: 'Executive Leadership & Advisory Board',
  role: 'Strategic Principals & Commercial Architects',
  portraitUrl: '/brand/graphics/artboard-4-brand-eye.jpg',
  biography:
    'BRANDMANIA is directed by senior commercial strategists, brand directors, and behavioral economists dedicated to engineering market leadership and margin sovereignty for high-ticket brands.',
  personalMotto:
    "Branded for the best. Let's make you a market leader.",
  experienceHighlights: [
    {
      year: 'Institutional',
      milestone: 'Established BRANDMANIA strategic commercial advisory practice',
    },
    {
      year: 'Global',
      milestone: 'Directed enterprise margin recovery and pricing power architectures across international markets',
    },
    {
      year: 'Proprietary',
      milestone: 'Architected proprietary Consumer Scope neuro-marketing and commercial value-chain frameworks',
    },
  ],
  credentials: [
    'Strategic Brand Direction & Identity Systems',
    'Enterprise Commercial Margin & Leakage Auditing',
    'Consumer Behavioral Economics & Pricing Architecture',
  ],
};
