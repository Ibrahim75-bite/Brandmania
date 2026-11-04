import { SeoConfigSchema, type SeoConfig } from '@/domain/seo/schemaTypes';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brandmania.com';
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

const rawConfig = {
  brandName: 'BRANDMANIA',
  tagline: 'Branded for the best',
  oneLiner: "Let's make you a market leader",
  siteUrl,
  revenueThreshold: '$700,000+ annual revenue',
  logoPath: '/brand/textures/brandmania-cover-clean.jpg',
  coverImagePath: '/brand/textures/brandmania-cover-clean.jpg',
  priceRange: '$$$$',
  currenciesAccepted: 'USD',
  locales: ['x-default', 'en', 'en-US', 'en-GB', 'en-AE', 'en-CA', 'en-AU'],
  defaultLocale: 'en',
  contactPoint: {
    contactType: 'Strategic Consultation & Qualification',
    availableLanguage: ['English'],
    url: `${siteUrl}/#qualification`,
  },
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  founder: null,
  address: null,
  geo: null,
  reviews: [],
  aggregateRating: null,
  flagshipDisciplines: [
    {
      id: 'brand-direction',
      name: 'Brand Direction',
      slogan: 'How the message is communicated is at least as important as what the message is.',
      description:
        'Aligning brand story, narrative, tone of voice, positioning, USP, trust, identity, vision, and mission with ideal customer perception.',
      anchor: `${siteUrl}/#brand-direction`,
    },
    {
      id: 'margin-recovery',
      name: 'Margin Recovery',
      slogan: 'Fix the machine before buying more traffic.',
      description:
        'Auditing commercial data across planning, marketing, sales, fulfillment, customer service, and post-purchase relationships to identify and repair revenue leakage before scaling traffic.',
      anchor: `${siteUrl}/#margin-recovery`,
    },
    {
      id: 'consumer-scope',
      name: 'Consumer Scope',
      slogan: 'Engineering customer perception, experience, and cognitive attachment.',
      description:
        'Designing customer touchpoints and interactions through psychology and behavioral economics (perceived value, psychological pricing, emotional attachment, loyalty, status perception, and behavioral elasticity).',
      anchor: `${siteUrl}/#consumer-scope`,
    },
  ],
  supportingCapabilities: [
    'Digital Marketing',
    'Growth Marketing',
    'Performance Marketing',
    'Content Creation',
    'Performance Content Creation',
    'Finance & Operations',
    'Strategic Management',
    'Team Management',
    'Project Management',
    'AI Automation',
    'AI Connected Systems',
  ],
  targetIndustries: [
    'Designers',
    'Jewelry & Gemstones',
    'Interior Design',
    'Outdoor Luxury Construction',
    'Hotels & Resorts',
    'Gyms',
    'Supplement Stores',
    'Sports & Fitness Wear',
    'Organic Herbs & Alternative Medicine',
    'Software & Mobile Apps',
    'Cosmetics & Skincare/Haircare',
    'E-Commerce',
    'Healthcare Nutrition & Weight Loss',
    'Perfumes',
    "Women's Clothing & Apparel",
    'Accessories',
    'Electronics',
    'Coffee',
    'B2B Medical Devices',
    'Furniture',
  ],
  engagementModels: [
    {
      id: 'full-engagement',
      name: 'Full Strategic Rebuild & Performance Engagement',
      description:
        'Comprehensive commercial and brand transformation for established businesses with $700,000+ annual revenue, aligning Brand Direction, Margin Recovery, and Consumer Scope.',
      eligibility:
        'Established businesses generating $700,000+ in annual revenue and high-ticket international brands.',
      priceRange: '$$$$',
    },
    {
      id: 'strategic-consultancy',
      name: 'Strategic Consultancy',
      description:
        'Targeted high-level advisory and diagnostic engagement for prospects not yet ready for a full rebuild or when full-engagement capacity is reached.',
      eligibility:
        'Qualifying brands requiring strategic direction, perceptual audits, or margin leakage diagnosis.',
      priceRange: '$$$',
    },
  ],
  faqs: [
    {
      question: 'What types of businesses does BRANDMANIA work with?',
      answer:
        'Established businesses generating $700,000+ in annual revenue and high-ticket international brands across design, jewelry, interior design, luxury construction, hospitality, fitness, supplements, software/apps, cosmetics, e-commerce, medical devices, and more.',
    },
    {
      question: "What are BRANDMANIA's three core disciplines?",
      answer: 'Brand Direction, Margin Recovery, and Consumer Scope.',
    },
    {
      question:
        'Does BRANDMANIA offer consultancy if we are not ready for a full engagement?',
      answer:
        'Yes, BRANDMANIA offers strategic consultancy for businesses not yet ready for a full rebuild or when full-engagement capacity is full.',
    },
    {
      question:
        'Do you sign a formal Mutual Non-Disclosure Agreement (NDA) before auditing our internal numbers?',
      answer:
        'Yes. While preliminary qualification intake does not require sensitive financial attachments, before we conduct a forensic Margin Recovery audit or access internal unit economics, CRM data, or supplier margins, we execute a formal bilateral Mutual NDA protecting both parties.',
    },
    {
      question:
        'Does submitting the Qualification Form bind our company to a retainer or fee?',
      answer:
        'No. Submitting the Qualification Form is a non-binding request for an executive diagnostic review. A binding commercial relationship and fee obligation only arise when both parties sign a written Master Services Agreement (MSA) and a specific Statement of Work (SOW).',
    },
    {
      question:
        'Who owns the intellectual property (IP) created during a client engagement?',
      answer:
        'Under our standard Master Services Agreement (MSA), upon full payment of fees, the Client owns the bespoke brand assets, positioning narratives, and custom deliverables created specifically for the Client as defined in the SOW, while BRANDMANIA retains ownership of its pre-existing diagnostic methodologies, frameworks, and analytical templates (Background IP).',
    },
    {
      question:
        'How long do you retain qualification inquiries if we do not move forward, and do you sell our data?',
      answer:
        'We never sell, rent, or trade client or inquiry data. Inquiries from organizations that do not proceed to an active advisory dialogue or formal engagement are systematically purged from active repositories within 90 days—or immediately upon your written erasure request.',
    },
  ],
};

export const seoConfig: SeoConfig = SeoConfigSchema.parse(rawConfig);
