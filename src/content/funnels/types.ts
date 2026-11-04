
export interface FunnelMetadata {
  slug: string;
  title: string;
  description: string;
  targetAudience: string;
  campaignTag: string;
}

export interface PainPointEntry {
  id: string;
  category: 'MARGIN' | 'BRAND' | 'CONSUMER';
  question: string;
  elaboration: string;
  impact: string;
}

export interface FunnelStep {
  stepNumber: number;
  title: string;
  subtitle?: string;
  content: string;
  badge?: string;
}

export interface FunnelConfig {
  meta: FunnelMetadata;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    supportingText: string;
  };
  painPoints: PainPointEntry[];
  mechanism: {
    title: string;
    tagline: string;
    stages: {
      number: string;
      name: string;
      description: string;
    }[];
  };
  flagshipHighlights: {
    title: string;
    description: string;
  }[];
  aiPhilosophy: {
    headline: string;
    body: string;
  };
  vsl: {
    headline: string;
    subheadline: string;
    videoUrl?: string;
    posterUrl: string;
    durationMinutes: number;
    keyTakeaways: string[];
  };
  proof: {
    headline: string;
    subheadline: string;
    quotes: {
      text: string;
      author: string;
      title: string;
      industry: string;
    }[];
    metrics: {
      value: string;
      label: string;
      context: string;
    }[];
  };
  engagementProcess: {
    headline: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  selectivity: {
    badge: string;
    headline: string;
    description: string;
    criteria: string[];
    disclaimer: string;
  };
  finalCta: {
    headline: string;
    subheadline: string;
    buttonLabel: string;
    supportingNote: string;
  };
}
