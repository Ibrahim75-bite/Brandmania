/**
 * Navigation Configuration
 *
 * Header menu, mobile drawer items, and footer directories.
 */

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: 'Manifesto', href: '/#manifesto' },
  { label: 'System', href: '/#system' },
  { label: 'Disciplines', href: '/#disciplines' },
  { label: 'Work', href: '/#work' },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Architecture & System',
    links: [
      { label: 'Manifesto', href: '/#manifesto' },
      { label: 'Continuous System', href: '/#system' },
      { label: 'Disciplines', href: '/#disciplines' },
      { label: 'Selected Work', href: '/#work' },
      { label: 'Qualification Intake', href: '/#qualification' },
    ],
  },
  {
    title: 'Flagship Disciplines',
    links: [
      { label: 'Margin Recovery', href: '/services/margin-recovery' },
      { label: 'Brand Direction', href: '/services/brand-direction' },
      { label: 'Consumer Scope', href: '/services/consumer-scope' },
      { label: 'Supporting Capabilities', href: '/services' },
    ],
  },
  {
    title: 'Campaign Funnels',
    links: [
      { label: 'Executive Cold Outreach', href: '/f/default' },
      { label: 'Margin Leakage Diagnostic', href: '/f/margin-recovery' },
      { label: 'Fine Jewelry & Gemstones', href: '/f/jewelry' },
      { label: 'Designer Boutiques', href: '/f/designer-boutiques' },
    ],
  },
  {
    title: 'Legal & Compliance',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];
