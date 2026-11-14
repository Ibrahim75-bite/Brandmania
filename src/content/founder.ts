
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
  name: 'Ibrahim Badreldin',
  role: 'Principal Strategic Architect',
  portraitUrl: '/brand/graphics/artboard-4-brand-eye.jpg',
  biography:
    'Principal Strategic Architect directing BRANDMANIA. Dedicated to engineering category leadership, contribution margin recovery, and behavioral pricing power for ambitious $700,000+ international enterprises.',
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
