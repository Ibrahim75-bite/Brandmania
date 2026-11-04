export interface CaseStudyDeliverable {
  label: string;
  description: string;
}

export interface CaseStudyComparisonRow {
  dimension: string;
  standardAgencyApproach: string;
  brandmaniaArchitecture: string;
  commercialImpact: string;
}

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
  change: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  catalogNumber: string;
  title: string;
  subtitle: string;
  flagship: string;
  clientSector: string;
  confidentialityStatus: 'CONFIDENTIAL' | 'ANONYMIZED' | 'NAMED';
  location: string;
  timeframe: string;
  executiveSummary: string;
  challenge: string;
  strategicIntervention: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  deliverables: CaseStudyDeliverable[];
  executionTable: CaseStudyComparisonRow[];
  metrics: CaseStudyMetric[];
  publishedAt: string;
  updatedAt: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    slug: 'brand-mission-and-ethos-architecture',
    catalogNumber: 'ART-01',
    title: 'Brand Mission & Ethos System',
    subtitle: 'Aligning Internal Conviction with Category Prestige',
    flagship: 'Flagship I • Brand Direction',
    clientSector: 'High-End Strategic Enterprise & Luxury Goods',
    confidentialityStatus: 'CONFIDENTIAL',
    location: 'Geneva / London',
    timeframe: '90 Days',
    executiveSummary:
      'A comprehensive visual and philosophical realignment for high-ticket advisory and luxury goods, transforming disjointed marketing copy into a commanding, defensible brand manifesto that commands pricing power and repels commodity comparison across global markets.',
    challenge:
      'The enterprise was executing at a world-class technical tier, yet its external market posture resembled a generic transactional provider. Disconnected brand messaging and visual inconsistency were eroding perceived authority, forcing sales teams into margin-compressing negotiations.',
    strategicIntervention:
      'BRANDMANIA engineered a monolithic brand architecture: establishing the obsidian-and-lilac visual canon, authoring a defensible corporate worldview, and codifying internal conviction into an authoritative market manifesto that immediately re-established category sovereignty.',
    imageSrc: '/brand/graphics/brandmania-poster.jpg',
    imageAlt: 'BRANDMANIA Primary Brand Poster & Monolith System Artboard',
    imageWidth: 1200,
    imageHeight: 1800,
    deliverables: [
      {
        label: 'Physical Monolith Poster & Brand Canon',
        description: 'Large-format tactile brand monograph establishing visual weight and immutable typographic rules.',
      },
      {
        label: 'Executive Worldview & Tone Guide',
        description: 'Lexicon, cadence, and rhetoric standards engineered for senior C-suite decision-makers.',
      },
      {
        label: 'Corporate Trust Architecture',
        description: 'Bilateral governance markers, seal placements, and institutional credibility design.',
      },
    ],
    executionTable: [
      {
        dimension: 'Brand Narrative',
        standardAgencyApproach: 'Surface-level copywriting, generic buzzwords, and vague emotional appeals',
        brandmaniaArchitecture: 'Rigorous philosophical worldview establishing category sovereignty and immutable authority',
        commercialImpact: 'Elevates perceived status, rendering competitive comparisons irrelevant',
      },
      {
        dimension: 'Visual Identity',
        standardAgencyApproach: 'Trend-chasing gradients, generic stock vectors, and decorative rounded corners',
        brandmaniaArchitecture: '0px architectural hairline geometry, golden-ratio emblem seals, and high-contrast editorial typography',
        commercialImpact: 'Instant visual arrest and undeniable institutional stature across all enterprise touchpoints',
      },
      {
        dimension: 'Pricing Power',
        standardAgencyApproach: 'Promotional discounting, volume concessions, and commodity price-matching',
        brandmaniaArchitecture: 'Categorical rarity positioning anchoring fee structures to strategic business value',
        commercialImpact: 'Protects gross margins and eliminates downward price pressure during procurement',
      },
    ],
    metrics: [
      {
        label: 'Inbound Inelasticity',
        before: '18%',
        after: '72%',
        change: '+54%',
      },
      {
        label: 'Average Deal Size',
        before: '$65,000',
        after: '$180,000',
        change: '+176.9%',
      },
      {
        label: 'Sales Cycle Velocity',
        before: '120 Days',
        after: '42 Days',
        change: '-65.0%',
      },
    ],
    publishedAt: '2026-02-15',
    updatedAt: '2026-03-01',
  },
  {
    id: 'cs-02',
    slug: 'services-and-commercial-branding-blueprint',
    catalogNumber: 'ART-03',
    title: 'Full-Spectrum Brand & Commercial Architecture',
    subtitle: 'Positioning, USP, and Trust Systems',
    flagship: 'Flagship I • Brand Direction',
    clientSector: 'B2B Strategic Advisory & Professional Services',
    confidentialityStatus: 'ANONYMIZED',
    location: 'London / New York',
    timeframe: '120 Days',
    executiveSummary:
      'A complete commercial positioning blueprint mapping executive capability into distinct, high-margin service modules. Eliminates commoditized pitch decks by formalizing proprietary methodologies, clear commercial boundaries, and unequivocal trust architecture.',
    challenge:
      'Enterprise client offered elite cross-functional capabilities but packaged them as generic hourly consulting services. Prospective clients frequently requested commoditized rate cards, triggering prolonged sales cycles and eroding profitability.',
    strategicIntervention:
      'Restructured the advisory offering into 3 distinct, proprietary flagship disciplines. Re-engineered client proposals from time-and-materials quotes into fixed-investment strategic interventions governed by mutual non-disclosure and measurable commercial return.',
    imageSrc: '/brand/graphics/artboard-2-services-branding.jpg',
    imageAlt: 'Brand Direction & Corporate Identity Engineering Artboard',
    imageWidth: 1400,
    imageHeight: 900,
    deliverables: [
      {
        label: 'Service Packaging & Tiering Blueprint',
        description: 'Modular commercial framework transforming vague capabilities into discrete strategic engagements.',
      },
      {
        label: 'Proprietary Methodology Architecture',
        description: 'Patented visual diagrams and diagnostic workflows demonstrating unique intellectual property.',
      },
      {
        label: 'B2B Procurement Defense Kit',
        description: 'Institutional pitch decks, mutual NDA protocols, and bilateral governance documentation.',
      },
    ],
    executionTable: [
      {
        dimension: 'Offering Structure',
        standardAgencyApproach: 'Unbundled hourly rate cards, bespoke statements of work, and scope creep',
        brandmaniaArchitecture: 'Codified flagship disciplines with fixed institutional scope and explicit boundaries',
        commercialImpact: 'Eliminates billing friction and establishes clear operational delivery milestones',
      },
      {
        dimension: 'Value Articulation',
        standardAgencyApproach: 'Listing tactical deliverables, hours expended, and software toolsets used',
        brandmaniaArchitecture: 'Framing commercial return, strategic leverage, and long-term risk mitigation',
        commercialImpact: 'Positions advisory as an executive investment rather than an operational expense',
      },
      {
        dimension: 'Sales Enablement',
        standardAgencyApproach: 'Standard slide decks with endless feature bullet points and stock photography',
        brandmaniaArchitecture: 'Tactile diagnostic artboards and commercial proof dossiers with verified case studies',
        commercialImpact: 'Dramatically accelerates committee buy-in and bypasses junior procurement gatekeepers',
      },
    ],
    metrics: [
      {
        label: 'Blended Gross Margin',
        before: '32.4%',
        after: '68.2%',
        change: '+35.8%',
      },
      {
        label: 'Proposal Win Rate',
        before: '22%',
        after: '58%',
        change: '+36.0%',
      },
      {
        label: 'Client Retention (12 Mo)',
        before: '45%',
        after: '88%',
        change: '+43.0%',
      },
    ],
    publishedAt: '2026-02-20',
    updatedAt: '2026-03-05',
  },
  {
    id: 'cs-03',
    slug: 'social-and-conversion-campaign-system',
    catalogNumber: 'ART-04',
    title: 'High-Contrast Campaign & Social Architecture',
    subtitle: 'Visual Stop-Power Engineered for Margin',
    flagship: 'Flagship III • Consumer Scope',
    clientSector: 'Haute Designer Fashion & Luxury Retail',
    confidentialityStatus: 'CONFIDENTIAL',
    location: 'Paris / Milan',
    timeframe: '75 Days',
    executiveSummary:
      'A performance content and cognitive stop-power system engineered to arrest attention in saturated feeds without compromising luxury prestige. Replaces ephemeral social hype with disciplined visual pacing, neuro-marketing hierarchy, and conversion-engineered narrative tension.',
    challenge:
      'Rising paid acquisition costs were compressing net operating margins. Previous performance marketing campaigns relied on aggressive promotional discounts and sensationalist tactics that alienated high-net-worth clientele and degraded brand equity.',
    strategicIntervention:
      'Constructed an editorial-grade campaign engine combining cinematic visual contrast with cognitive decision architecture. Replaced discount-driven messaging with desire-inducing narrative tension, achieving category-leading ROAS without ever discounting product prices.',
    imageSrc: '/brand/graphics/artboard-3-services-social.jpg',
    imageAlt: 'Performance Content & Neuro-Marketing Architecture Artboard',
    imageWidth: 1400,
    imageHeight: 900,
    deliverables: [
      {
        label: 'High-Contrast Content Grid Canon',
        description: 'Multi-ratio visual framework optimized for instant thumb-stop across mobile feed environments.',
      },
      {
        label: 'Neuro-Marketing Copywriting Matrix',
        description: 'Direct-response narrative templates calibrated strictly for affluent consumer psychographics.',
      },
      {
        label: 'Conversion Funnel Pacing Framework',
        description: 'Structured visual journey transitioning cold attention into full-price checkout action.',
      },
    ],
    executionTable: [
      {
        dimension: 'Creative Direction',
        standardAgencyApproach: 'Frenetic short-form trends, flashing graphics, and algorithmic meme imitation',
        brandmaniaArchitecture: 'Cinematic visual tension, disciplined negative space, and architectural typography',
        commercialImpact: 'Commands immediate respect and separates brand from low-cost competitors',
      },
      {
        dimension: 'Conversion Mechanics',
        standardAgencyApproach: 'Aggressive countdown timers, exit-intent popups, and coupon code giveaways',
        brandmaniaArchitecture: 'Psychological scarcity, status affirmation, and seamless frictionless checkout paths',
        commercialImpact: 'Attracts affluent buyers who purchase at full price without waiting for seasonal sales',
      },
      {
        dimension: 'Media Efficiency',
        standardAgencyApproach: 'Broad untargeted ad spend relying on massive top-of-funnel waste to find buyers',
        brandmaniaArchitecture: 'Surgically targeted creative assets qualifying high-intent buyers through copy filters',
        commercialImpact: 'Reduces blended acquisition cost while increasing average order value and repeat rate',
      },
    ],
    metrics: [
      {
        label: 'Full-Price Sell-Through',
        before: '41%',
        after: '78%',
        change: '+37.0%',
      },
      {
        label: 'Blended CAC',
        before: '$1,120',
        after: '$780',
        change: '-30.4%',
      },
      {
        label: 'Average Order Value',
        before: '$4,200',
        after: '$6,850',
        change: '+63.1%',
      },
    ],
    publishedAt: '2026-03-01',
    updatedAt: '2026-03-12',
  },
  {
    id: 'cs-04',
    slug: 'the-brand-eye-identity-monograph',
    catalogNumber: 'ART-05',
    title: 'The BrandEye Cultural Seal',
    subtitle: 'Geometric Identity & Tactile Print Monograph',
    flagship: 'Flagship I • Brand Direction',
    clientSector: 'Fine Jewelry, Horlogerie & Heritage Brands',
    confidentialityStatus: 'ANONYMIZED',
    location: 'Zurich / Dubai',
    timeframe: '60 Days',
    executiveSummary:
      'The definitive heraldic mark and physical publication monograph engineered with golden-ratio circular geometry. Designed to serve as an immutable cultural seal, communicating uncompromising focus, perceptual authority, and architectural permanence across both digital and tactile mediums.',
    challenge:
      'The institution possessed decades of heritage craftsmanship but lacked an authoritative graphic emblem capable of functioning seamlessly as a digital app icon, high-jewelry hallmark, luxury packaging embossment, and corporate hallmark.',
    strategicIntervention:
      'Engineered the BrandEye vector emblem based on precise mathematical ratios: three concentric concentric boundaries, hairline calibration, and dynamic optical balance. Synthesized the visual identity into a museum-grade linen-bound physical monograph for private investor distribution.',
    imageSrc: '/brand/graphics/artboard-4-brand-eye.jpg',
    imageAlt: 'The Brand Eye Category Rarity & Perception Emblem Artboard',
    imageWidth: 1200,
    imageHeight: 1200,
    deliverables: [
      {
        label: 'Parametric BrandEye Vector Seal',
        description: 'Mathematically calibrated heraldic emblem engineered for infinite scale and zero distortion.',
      },
      {
        label: 'Tactile Monograph Specification',
        description: 'Physical print production guidelines detailing foil stamping, debossing, and paper weights.',
      },
      {
        label: 'Digital Architectural Iconography Suite',
        description: 'Comprehensive system of responsive symbols, glyphs, and micro-interactions.',
      },
    ],
    executionTable: [
      {
        dimension: 'Emblem Geometry',
        standardAgencyApproach: 'Hand-traced vector paths with irregular curves and inconsistent stroke weights',
        brandmaniaArchitecture: 'Mathematically calibrated golden-ratio geometry with hairline stroke precision',
        commercialImpact: 'Flawless reproduction across micro-screens, jewelry engraving, and architectural signage',
      },
      {
        dimension: 'Tactile Production',
        standardAgencyApproach: 'Standard CMYK commercial printing on lightweight coated paper stocks',
        brandmaniaArchitecture: 'Obsidian dyed linen boards, ultraviolet foil debossing, and archival cotton stocks',
        commercialImpact: 'Creates an immediate visceral perception of extraordinary value upon physical contact',
      },
      {
        dimension: 'Cultural Longevity',
        standardAgencyApproach: 'Trendy visual styles that require frequent rebranding and consumer re-education',
        brandmaniaArchitecture: 'Timeless architectural archetypes designed to endure without modification for decades',
        commercialImpact: 'Protects long-term brand equity and accumulates prestige over multiple generations',
      },
    ],
    metrics: [
      {
        label: 'Brand Recognition Index',
        before: '14%',
        after: '68%',
        change: '+54.0%',
      },
      {
        label: 'Prestige Perception Score',
        before: '42 / 100',
        after: '94 / 100',
        change: '+52 pts',
      },
      {
        label: 'Repeat Customer LTV',
        before: '$1,850',
        after: '$3,420',
        change: '+84.8%',
      },
    ],
    publishedAt: '2026-03-10',
    updatedAt: '2026-03-22',
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

