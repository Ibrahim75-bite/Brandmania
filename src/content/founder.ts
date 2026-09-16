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
  name: '[OWNER COPY — Founder Name]',
  role: 'Founder & Strategic Principal',
  portraitUrl: '/brand/graphics/founder-placeholder.svg',
  biography:
    '[OWNER COPY — Founder biography detailing background in high-ticket brand direction, margin optimization, behavioral economics, and international commercial strategy.]',
  personalMotto:
    "Let people applaud your second to greatest work, because you're creating your greatest.",
  experienceHighlights: [
    {
      year: '[YEAR]',
      milestone: '[OWNER COPY — Established BRANDMANIA strategic consultancy]',
    },
    {
      year: '[YEAR]',
      milestone: '[OWNER COPY — Directed luxury margin recovery across UK & European houses]',
    },
    {
      year: '[YEAR]',
      milestone: '[OWNER COPY — Architected proprietary Consumer Scope neuro-marketing frameworks]',
    },
  ],
  credentials: [
    '[OWNER COPY — Credential / Strategic Authority 1]',
    '[OWNER COPY — Credential / Industry Specialization 2]',
    '[OWNER COPY — Credential / Commercial Track Record 3]',
  ],
};
