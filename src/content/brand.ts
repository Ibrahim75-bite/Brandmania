
export interface BrandConfig {
  name: string;
  tagline: string;
  internalPhilosophy: string;
  mottos: {
    primary: string;
    secondary: string;
  };
  commercialPhilosophy: string;
  positioning: string[];
  flagshipDisciplines: {
    marginRecovery: {
      id: string;
      code: string;
      title: string;
      tagline: string;
      coreIdea: string;
      philosophy: string;
      auditVectors: string[];
    };
    brandDirection: {
      id: string;
      code: string;
      title: string;
      tagline: string;
      coreIdea: string;
      philosophy: string;
      deliverables: string[];
    };
    consumerScope: {
      id: string;
      code: string;
      title: string;
      tagline: string;
      coreIdea: string;
      philosophy: string;
      mechanisms: string[];
    };
  };
  aiPhilosophy: {
    headline: string;
    humanResponsibilities: string[];
    aiLeveragePoints: string[];
  };
  targetClient: {
    primaryMarkets: string[];
    expansionMarkets: string[];
    currencies: string[];
    minimumAnnualRevenueUsd: number;
    authorityIndustries: string[];
  };
  persona: {
    aesthetic: string;
    comparison: string;
    keywords: string[];
  };
}

export const BRAND: BrandConfig = {
  name: 'BRANDMANIA',
  tagline: 'Branded for the best',
  internalPhilosophy:
    "Let people applaud your second to greatest work, because you're creating your greatest.",
  mottos: {
    primary: 'Commanding Category Leadership',
    secondary: 'Taking over minds',
  },
  commercialPhilosophy: "Let's make you a market leader.",
  positioning: [
    'Strategic Premium Agency',
    'Boutique Consultancy',
    'Brand + Business Consultancy',
    'Executive-Level Strategic Partner',
    'Performance-Oriented Growth Partner',
  ],
  flagshipDisciplines: {
    marginRecovery: {
      id: 'margin-recovery',
      code: 'MARGIN_RECOVERY',
      title: 'Margin Recovery',
      tagline: 'Fix the machine before buying more traffic.',
      coreIdea:
        'Every business is in the business of making money. Before escalating ad spend, identify and repair the breaking points where revenue and margin are silently leaking.',
      philosophy: 'Attention does not automatically mean revenue.',
      auditVectors: [
        'Planning & Financial Floors',
        'Marketing & Traffic Quality',
        'Sales & Offer Architecture',
        'Fulfillment & Delivery Velocity',
        'Customer Service & Dispute Prevention',
        'Post-Purchase Relationships & LTV',
      ],
    },
    brandDirection: {
      id: 'brand-direction',
      code: 'BRAND_DIRECTION',
      title: 'Brand Direction',
      tagline: 'How the message is communicated is at least as important as what the message is.',
      coreIdea:
        'Strategic perception and market positioning. We establish optimal brand presence, executive trust, tone of voice, narrative clarity, and commercial differentiation.',
      philosophy: 'Perception dictates pricing power.',
      deliverables: [
        'Strategic Market Positioning',
        'Brand Personality & Voice Definition',
        'Executive Narrative & Trust Frameworks',
        'Commercial Differentiation',
        'Visual Direction & Art Direction',
        'Offer Architecture & Value Framing',
      ],
    },
    consumerScope: {
      id: 'consumer-scope',
      code: 'CONSUMER_SCOPE',
      title: 'Consumer Scope',
      tagline: 'Engineering customer perception, experience, and cognitive attachment.',
      coreIdea:
        'Designing customer touchpoints through psychology, behavioral economics, perceived value, and customer loyalty. What happens in the customer mind throughout the lifecycle.',
      philosophy: 'Understand the mind before asking for the capital.',
      mechanisms: [
        'Behavioral Economics Application',
        'Cognitive Value Perception',
        'Psychological Pricing Engineering',
        'Identity Attachment & Tribal Alignment',
        'Frictionless Experience Design',
        'Habit-Forming Purchase Loops',
      ],
    },
  },
  aiPhilosophy: {
    headline: 'AI as strategic leverage, not human creative substitution',
    humanResponsibilities: [
      'Strategic Vision & Judgment',
      'Cognitive Psychology & Consumer Insight',
      'High-Level Creative Storytelling',
      'Experience Architecture',
      'Executive Cultural Understanding',
    ],
    aiLeveragePoints: [
      'Elimination of Repetitive Operational Overhead',
      'Systemic Process Acceleration',
      'Real-Time Margin Diagnostics',
      'Automated Data Synthesis & Intelligence',
      'Connected Workflow Scalability',
    ],
  },
  targetClient: {
    primaryMarkets: ['United Kingdom', 'North America'],
    expansionMarkets: ['Europe', 'GCC'],
    currencies: ['USD', 'EUR', 'GBP'],
    minimumAnnualRevenueUsd: 700000,
    authorityIndustries: [
      'Jewelry & Gemstones',
      'Designer Boutiques',
      'Luxury Interior Design',
      'High-End Hospitality & Resorts',
      'High-Performance Wellness & Nutrition',
      'Cosmetics & Haute Fragrance',
      'Premium Lifestyle Goods',
      'Specialized Medical Devices',
    ],
  },
  persona: {
    aesthetic: 'An Exhibition of Contemporary Luxury and Strategic Intelligence',
    comparison: 'Bugatti, not Toyota. Rare, engineered, confident, deliberate.',
    keywords: [
      'Sophisticated',
      'Provocative',
      'Luxurious',
      'Analytical',
      'Strategic',
      'Editorial',
      'Futuristic',
      'Exclusive',
      'Clinical',
      'Rebellious',
    ],
  },
};
