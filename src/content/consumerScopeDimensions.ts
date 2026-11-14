import type { GlyphName } from '@/presentation/components/primitives/ArchitecturalGlyph';

export interface ConsumerScopeDimension {
  id: string;
  name: string;
  glyph: GlyphName;
  principle: string;
  thesis: string;
  rotationDeg: number;
  scaleVal: number;
}

export const CONSUMER_SCOPE_DIMENSIONS: ConsumerScopeDimension[] = [
  {
    id: '01',
    name: 'Perceived Value',
    glyph: 'dim-perceived-value',
    principle: 'Perception dictates willingness-to-pay far more than production cost.',
    thesis:
      'When market perception elevates an offering above commodity comparisons, buyers evaluate value by status and certainty rather than unit manufacturing cost.',
    rotationDeg: 0,
    scaleVal: 1.0,
  },
  {
    id: '02',
    name: 'Psychological Pricing',
    glyph: 'dim-psychological-pricing',
    principle: 'Price resistance is an emotional reaction to uncalibrated value contrast.',
    thesis:
      'Engineering pricing architecture and contextual framing so premium figures feel natural, extinguishing discount friction before it arises.',
    rotationDeg: 51.4,
    scaleVal: 1.03,
  },
  {
    id: '03',
    name: 'Emotional Attachment',
    glyph: 'dim-emotional-attachment',
    principle: 'Rational logic justifies decisions, but emotional resonance drives them.',
    thesis:
      'Designing visceral brand rituals and communication cues that build irrational customer preference—the deepest moat against competitor feature wars.',
    rotationDeg: 102.8,
    scaleVal: 1.05,
  },
  {
    id: '04',
    name: 'Social Identity',
    glyph: 'dim-social-identity',
    principle: 'Customers do not merely buy products; they buy confirmation of who they are.',
    thesis:
      'Turning your brand into a symbolic badge of self-definition, aligning ownership with the customer’s aspirational peer identity.',
    rotationDeg: 154.3,
    scaleVal: 1.02,
  },
  {
    id: '05',
    name: 'Status Perception',
    glyph: 'dim-status-perception',
    principle: 'High-ticket buyers seek risk mitigation and prestige validation.',
    thesis:
      'Disciplined visual standards and surgical tone of voice establish institutional prestige that commands immediate market respect.',
    rotationDeg: 205.7,
    scaleVal: 1.06,
  },
  {
    id: '06',
    name: 'Enduring Loyalty',
    glyph: 'dim-enduring-loyalty',
    principle: 'A single transaction is a test; lifetime loyalty is an engineered ecosystem.',
    thesis:
      'Constructing post-purchase affirmation systems and customer loops that transform one-time purchasers into generational brand ambassadors.',
    rotationDeg: 257.1,
    scaleVal: 1.04,
  },
  {
    id: '07',
    name: 'Decision-Making Architecture',
    glyph: 'dim-decision-architecture',
    principle: 'Hesitation is caused by perceived transition risk and cognitive friction.',
    thesis:
      'Systematically resolving unspoken doubts and removing cognitive friction at the precise psychological point of decision.',
    rotationDeg: 308.6,
    scaleVal: 1.05,
  },
];
