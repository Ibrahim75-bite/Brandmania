export interface FaqItem {
  id: string;
  category: 'qualification' | 'brand-direction' | 'margin-recovery' | 'consumer-scope' | 'governance';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
}

export interface FaqCategory {
  id: 'all' | 'qualification' | 'brand-direction' | 'margin-recovery' | 'consumer-scope' | 'governance';
  label: string;
  index: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { id: 'all', label: 'All Directives', index: '00' },
  { id: 'qualification', label: 'Qualification & Tracks', index: '01' },
  { id: 'brand-direction', label: 'Brand Direction', index: '02' },
  { id: 'margin-recovery', label: 'Margin Recovery', index: '03' },
  { id: 'consumer-scope', label: 'Consumer Scope', index: '04' },
  { id: 'governance', label: 'Governance & Timelines', index: '05' },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-qual-01',
    category: 'qualification',
    categoryLabel: 'Qualification & Engagement Tracks',
    question: 'What is the commercial qualification revenue floor to engage BRANDMANIA?',
    shortAnswer: 'Established enterprises generating $700,000+ in verified annual revenue.',
    detailedAnswer:
      'BRANDMANIA exclusively partners with established enterprises generating $700,000+ in verified annual revenue, as well as high-ticket international brands. Our strategic methodologies, mathematical margin audits, and high-contrast visual architectures are calibrated for businesses with existing product-market fit, dedicated operations, and the capital capacity to compound category leadership.',
  },
  {
    id: 'faq-qual-02',
    category: 'qualification',
    categoryLabel: 'Qualification & Engagement Tracks',
    question: 'What is the structural difference between Track I and Track II engagements?',
    shortAnswer: 'Track I is a comprehensive full-funnel transformation; Track II is a targeted strategic consultancy.',
    detailedAnswer:
      'Track I (Full Strategic & Performance Engagement) is an end-to-end transformation encompassing complete Brand Direction architecture, deep Six-Stage Margin Recovery auditing, and full Consumer Scope behavioral engineering. Track II (Strategic Consultancy) is a focused, high-level advisory engagement designed for qualified leadership teams requiring diagnostic clarity, strategic roadmapping, and priority architectural guidance prior to full implementation or during interim capacity windows.',
  },
  {
    id: 'faq-qual-03',
    category: 'qualification',
    categoryLabel: 'Qualification & Engagement Tracks',
    question: 'How is executive and commercial confidentiality governed?',
    shortAnswer: 'Strict bilateral mutual Non-Disclosure Agreement (NDA) protocol prior to data exchange.',
    detailedAnswer:
      'All commercial metrics, margin calculations, unit economics, proprietary methodologies, and executive discussions are executed under a binding bilateral mutual NDA. We do not disclose client financials, proprietary operations, or private campaign strategies under any circumstances.',
  },
  {
    id: 'faq-qual-04',
    category: 'qualification',
    categoryLabel: 'Qualification & Engagement Tracks',
    question: 'Why does BRANDMANIA strictly limit concurrent enterprise engagements?',
    shortAnswer: 'To ensure partner-level strategic immersion and eliminate diluted agency account models.',
    detailedAnswer:
      'We reject the commoditized agency model of stacking dozens of accounts on junior personnel. BRANDMANIA accepts a maximum of three concurrent enterprise engagements per quarter. Every engagement is personally directed and executed by Principal Strategic Architect Ibrahim Badreldin alongside specialized systems architects.',
  },
  {
    id: 'faq-brand-01',
    category: 'brand-direction',
    categoryLabel: 'Flagship I: Brand Direction',
    question: 'What is Brand Direction Architecture and why does it command pricing power?',
    shortAnswer: 'Aligning corporate identity and market perception to eliminate price resistance.',
    detailedAnswer:
      'Brand Direction is the disciplined alignment of corporate identity, narrative positioning, unique selling proposition (USP), tone of voice, visual systems, and institutional trust architecture. When market perception matches or exceeds your underlying product excellence, buyers evaluate your offering based on status and conviction rather than unit price comparison.',
  },
  {
    id: 'faq-brand-02',
    category: 'brand-direction',
    categoryLabel: 'Flagship I: Brand Direction',
    question: 'How does Brand Direction prevent businesses from falling into the commodity trap?',
    shortAnswer: 'By engineering an uncontested category position that renders competitors obsolete.',
    detailedAnswer:
      'Without rigorous brand direction, customer acquisition defaults to advertising volume and price discounting. We reposition your brand at the absolute summit of your vertical, establishing linguistic mastery, authoritative aesthetics, and psychological moats that competitors cannot replicate simply by outspending you on media.',
  },
  {
    id: 'faq-brand-03',
    category: 'brand-direction',
    categoryLabel: 'Flagship I: Brand Direction',
    question: 'What physical and digital deliverables are engineered under Brand Direction?',
    shortAnswer: 'Complete brand governance dossiers, typography frameworks, artboard standards, and design tokens.',
    detailedAnswer:
      'Deliverables include the Comprehensive Brand Architecture Monograph, Positioning & Narrative Standard, Executive Tone of Voice Playbook, Hairline Visual Identity & Token Specifications, 100% Uncropped Deliverable Artboards, and cross-platform design guidelines ready for immediate enterprise deployment.',
  },
  {
    id: 'faq-margin-01',
    category: 'margin-recovery',
    categoryLabel: 'Flagship II: Margin Recovery',
    question: 'What is the Six-Stage Margin Recovery Audit?',
    shortAnswer: 'A forensic diagnostic across Planning, Marketing, Sales, Fulfillment, Support, and Post-Purchase.',
    detailedAnswer:
      'The Six-Stage Margin Recovery Audit evaluates your entire commercial engine: 01 Planning (capital allocation & unit economics), 02 Marketing (CAC efficiency & ad waste), 03 Sales (conversion friction & discount leakage), 04 Fulfillment (operational drag & logistics yield), 05 Customer Service (support resolution costs & churn prevention), and 06 Post-Purchase Relationships (repeat purchase rate & enterprise LTV).',
  },
  {
    id: 'faq-margin-02',
    category: 'margin-recovery',
    categoryLabel: 'Flagship II: Margin Recovery',
    question: 'Why should an enterprise audit margin recovery before increasing advertising spend?',
    shortAnswer: 'Fix the commercial engine before pouring in expensive fuel.',
    detailedAnswer:
      'Pouring paid traffic into an uncalibrated commercial funnel amplifies operational leakage and erodes net contribution margins. By plugging conversion leaks, eliminating premature discounting, and streamlining fulfillment yield first, every subsequent advertising dollar delivers compounding net profit rather than top-line vanity metrics.',
  },
  {
    id: 'faq-margin-03',
    category: 'margin-recovery',
    categoryLabel: 'Flagship II: Margin Recovery',
    question: 'How does Margin Recovery calculate and reclaim lost contribution margin?',
    shortAnswer: 'By identifying structural leakage points across each of the 6 revenue stages.',
    detailedAnswer:
      'We utilize empirical margin leakage modeling to benchmark your current stage friction against category-leading standards. The diagnostic quantifies unrecovered capital across your commercial chain and provides prioritized, high-leverage architectural interventions to restore net margins.',
  },
  {
    id: 'faq-margin-04',
    category: 'margin-recovery',
    categoryLabel: 'Flagship II: Margin Recovery',
    question: 'What is the delivery timeline for a comprehensive Margin Recovery audit?',
    shortAnswer: 'Preliminary diagnostic within 14 business days; complete commercial roadmap within 30 days.',
    detailedAnswer:
      'Following access to necessary operational metrics under NDA, our preliminary Six-Stage Margin Recovery Diagnostic is delivered within 14 business days. The comprehensive operational blueprint and implementation roadmap are finalized within 30 business days.',
  },
  {
    id: 'faq-consumer-01',
    category: 'consumer-scope',
    categoryLabel: 'Flagship III: Consumer Scope',
    question: 'What is Consumer Scope Architecture?',
    shortAnswer: 'Behavioral economics and cognitive attachment engineering that commands price inelasticity.',
    detailedAnswer:
      'Consumer Scope is our behavioral science discipline that analyzes and optimizes how high-ticket buyers perceive, evaluate, and bond with your brand. By systematically aligning value contrast, status perception, and post-purchase validation, we eliminate purchase hesitation and create enduring organic loyalty.',
  },
  {
    id: 'faq-consumer-02',
    category: 'consumer-scope',
    categoryLabel: 'Flagship III: Consumer Scope',
    question: 'What are the Seven Behavioral Dimensions analyzed in Consumer Scope?',
    shortAnswer: 'Perceived Value, Psychological Pricing, Emotional Attachment, Social Identity, Status Perception, Enduring Loyalty, Decision Architecture.',
    detailedAnswer:
      'Consumer Scope investigates seven distinct psychological vectors: 01 Perceived Value (status vs production cost), 02 Psychological Pricing (contextual framing), 03 Emotional Attachment (irrational customer preference), 04 Social Identity (in-group belonging cues), 05 Status Perception (prestige amplification), 06 Enduring Loyalty (multi-year retention loops), and 07 Decision Architecture (frictionless checkout conviction).',
  },
  {
    id: 'faq-consumer-03',
    category: 'consumer-scope',
    categoryLabel: 'Flagship III: Consumer Scope',
    question: 'How does Consumer Scope engineer genuine price inelasticity?',
    shortAnswer: 'By separating buyer willingness-to-pay from cost-plus commodity benchmarks.',
    detailedAnswer:
      'Customers do not resist high prices; they resist inadequate perceived value. By framing offerings through scarcity, institutional prestige, and deep social identity resonance, buyers willingly transact at premium price points without demanding seasonal discounts or comparative concessions.',
  },
  {
    id: 'faq-consumer-04',
    category: 'consumer-scope',
    categoryLabel: 'Flagship III: Consumer Scope',
    question: 'How do Brand Direction, Margin Recovery, and Consumer Scope interconnect?',
    shortAnswer: 'They function as an indivisible tripartite growth and margin engine.',
    detailedAnswer:
      'Brand Direction creates executive market perception and pricing power. Margin Recovery seals internal operational leakage to protect net contribution margin. Consumer Scope cements buyer attachment and lifetime value. Together, they eliminate dependence on commodity discounting and sustain compounded category authority.',
  },
  {
    id: 'faq-gov-01',
    category: 'governance',
    categoryLabel: 'Commercial Governance, Timelines & Deliverables',
    question: 'Who retains intellectual property rights to developed strategies and assets?',
    shortAnswer: 'The client receives 100% full, unencumbered ownership of all final strategic deliverables.',
    detailedAnswer:
      'Upon completion of financial obligations, 100% of all custom strategic blueprints, visual identity assets, copy architectures, and design tokens become the exclusive intellectual property of your enterprise. BRANDMANIA retains zero restrictive claims or ongoing licensing dependencies.',
  },
  {
    id: 'faq-gov-02',
    category: 'governance',
    categoryLabel: 'Commercial Governance, Timelines & Deliverables',
    question: 'How much C-suite executive bandwidth is required during an engagement?',
    shortAnswer: 'Surgically streamlined: initial 90-minute briefing followed by milestone checkpoints.',
    detailedAnswer:
      'We respect executive schedules. Engagements require an initial 90-minute executive briefing session, followed by bi-weekly 45-minute milestone reviews. We execute all diagnostic modeling, visual development, and system documentation autonomously.',
  },
  {
    id: 'faq-gov-03',
    category: 'governance',
    categoryLabel: 'Commercial Governance, Timelines & Deliverables',
    question: 'What is the immediate next step to initiate a confidential briefing?',
    shortAnswer: 'Submit executive coordinates via the Qualification Intake or schedule directly at /consultation.',
    detailedAnswer:
      'Qualified enterprise executives ($700,000+ annual revenue) can submit initial coordinates via the Qualification form on our homepage or reserve a private 30-minute 1:1 Strategic Briefing at brandmania.com/consultation under mutual NDA.',
  },
];
