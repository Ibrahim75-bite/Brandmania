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
  { label: 'Insights', href: '/insights' },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Architecture & System',
    links: [
      { label: 'Manifesto', href: '/#manifesto' },
      { label: 'Continuous System', href: '/#system' },
      { label: 'Disciplines', href: '/services' },
      { label: 'Selected Work & Case Studies', href: '/work' },
      { label: 'Executive Insights & Articles', href: '/insights' },
      { label: 'Qualification Intake', href: '/#qualification' },
    ],
  },
  {
    title: 'Flagship Disciplines',
    links: [
      { label: 'Brand Direction', href: '/services/brand-direction' },
      { label: 'Margin Recovery', href: '/services/margin-recovery' },
      { label: 'Consumer Scope', href: '/services/consumer-scope' },
      { label: 'Supporting Capabilities', href: '/services#capabilities' },
    ],
  },
  {
    title: 'Campaign Funnels',
    links: [
      { label: 'Executive Cold Outreach', href: '/f/cold-outreach' },
      { label: 'Margin Leakage Diagnostic', href: '/f/margin-diagnostic' },
      { label: 'Fine Jewelry & Gemstones', href: '/f/jewelry' },
      { label: 'Designer Boutiques', href: '/f/boutiques' },
    ],
  },
  {
    title: 'Legal & Compliance',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Refund & Cancellation Policy', href: '/terms#refund-policy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Data Deletion Request', href: '/privacy#data-deletion' },
    ],
  },
];
