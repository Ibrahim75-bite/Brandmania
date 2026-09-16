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
  { label: 'Flagships', href: '/#flagships' },
  { label: 'Margin Recovery', href: '/services/margin-recovery' },
  { label: 'Brand Direction', href: '/services/brand-direction' },
  { label: 'Consumer Scope', href: '/services/consumer-scope' },
  { label: 'Progression', href: '/#mechanism' },
  { label: 'Selectivity', href: '/#selectivity' },
];

export const FOOTER_SECTIONS = [
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
    title: 'Firm & Philosophy',
    links: [
      { label: 'About & Philosophy', href: '/about' },
      { label: 'Selected Work', href: '/work' },
      { label: 'Executive Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal & Compliance',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Engagement', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];
