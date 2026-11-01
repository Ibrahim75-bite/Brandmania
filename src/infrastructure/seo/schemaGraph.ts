import { seoConfig as defaultSeoConfig } from '@/content/seoConfig';
import type {
  SeoConfig,
  Founder,
  PostalAddress,
  GeoCoordinates,
  Review,
  AggregateRating,
  FaqItem,
  BlogPostInput,
} from '@/domain/seo/schemaTypes';

// Recursive helper to omit undefined values from JSON-LD output
function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(stripUndefined) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v !== undefined) {
        cleaned[k] = stripUndefined(v);
      }
    }
    return cleaned as T;
  }
  return value;
}

export function buildPostalAddressSchema(
  address: PostalAddress,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'PostalAddress',
    '@id': `${siteUrl}/#postal-address`,
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  });
}

export function buildGeoCoordinatesSchema(
  geo: GeoCoordinates,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'GeoCoordinates',
    '@id': `${siteUrl}/#geo`,
    latitude: geo.latitude,
    longitude: geo.longitude,
  });
}

export function buildPersonSchema(
  founder: Founder,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'Person',
    '@id': `${siteUrl}/#founder`,
    name: founder.name,
    jobTitle: founder.jobTitle,
    worksFor: { '@id': `${siteUrl}/#organization` },
    url: founder.url,
    sameAs: founder.sameAs,
  });
}

export function buildReviewSchema(
  review: Review,
  index: number,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'Review',
    '@id': `${siteUrl}/#review-${index + 1}`,
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.reviewRating.ratingValue,
      bestRating: review.reviewRating.bestRating,
      worstRating: review.reviewRating.worstRating,
    },
    itemReviewed: { '@id': `${siteUrl}/#organization` },
  });
}

export function buildAggregateRatingSchema(
  rating: AggregateRating,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'AggregateRating',
    '@id': `${siteUrl}/#aggregate-rating`,
    ratingValue: rating.ratingValue,
    reviewCount: rating.reviewCount,
    bestRating: rating.bestRating,
    worstRating: rating.worstRating,
    itemReviewed: { '@id': `${siteUrl}/#organization` },
  });
}

export function buildFaqPageSchema(
  faqs: FaqItem[],
  customConfig?: SeoConfig
): Record<string, unknown> {
  const config = customConfig || defaultSeoConfig;
  const siteUrl = config.siteUrl;

  return stripUndefined({
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    isPartOf: { '@id': `${siteUrl}/#webpage` },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
}

export function buildBlogPostingSchema(
  post: BlogPostInput,
  customConfig?: SeoConfig
): Record<string, unknown> {
  const config = customConfig || defaultSeoConfig;
  const siteUrl = config.siteUrl;
  const canonicalUrl = `${siteUrl}/briefings/${post.slug}`;

  return stripUndefined({
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    isPartOf: { '@id': `${siteUrl}/#website` },
    mainEntityOfPage: canonicalUrl,
    headline: post.headline,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author,
        }
      : { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
    image: post.image
      ? post.image.startsWith('http')
        ? post.image
        : `${siteUrl}${post.image}`
      : `${siteUrl}${config.coverImagePath}`,
  });
}

export interface SchemaGraphOptions {
  config?: SeoConfig;
  canonicalPath?: string;
  pageTitle?: string;
  pageDescription?: string;
  includeBlogPosting?: BlogPostInput;
}

export interface JsonLdGraph {
  '@context': string;
  '@graph': Record<string, unknown>[];
}

/**
 * Builds the centralized, production-grade Schema.org JSON-LD @graph architecture
 * supporting all 18 service-business schemas.
 */
export function generateSchemaGraph(options: SchemaGraphOptions = {}): JsonLdGraph {
  const config = options.config || defaultSeoConfig;
  const siteUrl = config.siteUrl;
  const pageUrl = options.canonicalPath ? `${siteUrl}${options.canonicalPath}` : siteUrl;

  const graphNodes: Record<string, unknown>[] = [];

  // 1. Organization Schema
  const organizationNode = stripUndefined({
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: config.brandName,
    slogan: config.tagline,
    description:
      'Branding & Marketing Agency serving established businesses ($700,000+ annual revenue) and high-ticket international brands across Brand Direction, Margin Recovery, and Consumer Scope.',
    url: siteUrl,
    logo: `${siteUrl}${config.logoPath}`,
    image: `${siteUrl}${config.coverImagePath}`,
    contactPoint: { '@id': `${siteUrl}/#contact-point` },
    hasOfferCatalog: { '@id': `${siteUrl}/#offer-catalog` },
    makesOffer: config.engagementModels.map((model) => ({
      '@id': `${siteUrl}/#offer-${model.id}`,
    })),
  });
  graphNodes.push(organizationNode);

  // 2. LocalBusiness (Dual-typed with ProfessionalService & Organization)
  const localBusinessNode = stripUndefined({
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#localbusiness`,
    name: config.brandName,
    url: siteUrl,
    parentOrganization: { '@id': `${siteUrl}/#organization` },
    priceRange: config.priceRange,
    currenciesAccepted: config.currenciesAccepted,
    openingHoursSpecification: { '@id': `${siteUrl}/#opening-hours` },
    ...(config.address ? { address: buildPostalAddressSchema(config.address, siteUrl) } : {}),
    ...(config.geo ? { geo: buildGeoCoordinatesSchema(config.geo, siteUrl) } : {}),
    ...(config.aggregateRating
      ? { aggregateRating: buildAggregateRatingSchema(config.aggregateRating, siteUrl) }
      : {}),
  });
  graphNodes.push(localBusinessNode);

  // 3. Service Schemas (3 Flagship Disciplines)
  for (const disc of config.flagshipDisciplines) {
    const serviceNode = stripUndefined({
      '@type': 'Service',
      '@id': `${siteUrl}/#service-${disc.id}`,
      name: disc.name,
      serviceType: disc.name,
      slogan: disc.slogan,
      description: disc.description,
      provider: { '@id': `${siteUrl}/#organization` },
      url: disc.anchor,
    });
    graphNodes.push(serviceNode);
  }

  // 4. Offer Schemas (2 Confirmed Engagement Models)
  for (const model of config.engagementModels) {
    const offerNode = stripUndefined({
      '@type': 'Offer',
      '@id': `${siteUrl}/#offer-${model.id}`,
      name: model.name,
      description: model.description,
      offeredBy: { '@id': `${siteUrl}/#organization` },
      priceRange: model.priceRange || config.priceRange,
      eligibleCustomerType: model.eligibility,
      url: `${siteUrl}/#qualification`,
    });
    graphNodes.push(offerNode);
  }

  // 5. OfferCatalog Schema
  const offerCatalogNode = stripUndefined({
    '@type': 'OfferCatalog',
    '@id': `${siteUrl}/#offer-catalog`,
    name: `${config.brandName} Strategic Capabilities & Disciplines Catalog`,
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Flagship Disciplines',
        itemListElement: config.flagshipDisciplines.map((disc) => ({
          '@id': `${siteUrl}/#service-${disc.id}`,
        })),
      },
      {
        '@type': 'OfferCatalog',
        name: 'Supporting Capabilities',
        itemListElement: config.supportingCapabilities.map((cap, idx) => ({
          '@type': 'Offer',
          position: idx + 1,
          name: cap,
          offeredBy: { '@id': `${siteUrl}/#organization` },
        })),
      },
    ],
  });
  graphNodes.push(offerCatalogNode);

  // 6. Person Schema (Founder/Principal, only if non-null and verified)
  if (config.founder) {
    graphNodes.push(buildPersonSchema(config.founder, siteUrl));
  }

  // 7. ContactPoint Schema
  const contactPointNode = stripUndefined({
    '@type': 'ContactPoint',
    '@id': `${siteUrl}/#contact-point`,
    contactType: config.contactPoint.contactType,
    availableLanguage: config.contactPoint.availableLanguage,
    url: config.contactPoint.url,
    ...(config.contactPoint.email ? { email: config.contactPoint.email } : {}),
    ...(config.contactPoint.telephone ? { telephone: config.contactPoint.telephone } : {}),
  });
  graphNodes.push(contactPointNode);

  // 8. PostalAddress Schema (Standalone if address configured)
  if (config.address) {
    graphNodes.push(buildPostalAddressSchema(config.address, siteUrl));
  }

  // 9. GeoCoordinates Schema (Standalone if geo configured)
  if (config.geo) {
    graphNodes.push(buildGeoCoordinatesSchema(config.geo, siteUrl));
  }

  // 10. OpeningHoursSpecification Schema
  const openingHoursNode = stripUndefined({
    '@type': 'OpeningHoursSpecification',
    '@id': `${siteUrl}/#opening-hours`,
    dayOfWeek: config.openingHours.dayOfWeek,
    opens: config.openingHours.opens,
    closes: config.openingHours.closes,
  });
  graphNodes.push(openingHoursNode);

  // 11. Review Schemas (Only if verified reviews exist)
  if (config.reviews.length > 0) {
    config.reviews.forEach((review, idx) => {
      graphNodes.push(buildReviewSchema(review, idx, siteUrl));
    });
  }

  // 12. AggregateRating Schema (Only if verified rating exists)
  if (config.aggregateRating) {
    graphNodes.push(buildAggregateRatingSchema(config.aggregateRating, siteUrl));
  }

  // 13. WebSite Schema
  const webSiteNode = stripUndefined({
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: config.brandName,
    description: config.tagline,
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: config.defaultLocale,
  });
  graphNodes.push(webSiteNode);

  // 14. WebPage Schema
  const webPageNode = stripUndefined({
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    url: pageUrl,
    name:
      options.pageTitle ||
      `${config.brandName} — Branded for the Best | Brand Direction, Margin Recovery & Consumer Scope`,
    description:
      options.pageDescription ||
      'Branding and commercial advisory for established businesses ($700,000+ annual revenue) and high-ticket international brands across Brand Direction, Margin Recovery, and Consumer Scope.',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
    inLanguage: config.defaultLocale,
    breadcrumb: { '@id': `${siteUrl}/#breadcrumbs` },
  });
  graphNodes.push(webPageNode);

  // 15. BreadcrumbList Schema (Primary architectural navigation anchors)
  const breadcrumbNode = stripUndefined({
    '@type': 'BreadcrumbList',
    '@id': `${siteUrl}/#breadcrumbs`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Manifesto',
        item: `${siteUrl}/#manifesto`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'System',
        item: `${siteUrl}/#system`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Disciplines',
        item: `${siteUrl}/#brand-direction`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Selected Work',
        item: `${siteUrl}/#campaigns`,
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Consultation',
        item: `${siteUrl}/#qualification`,
      },
    ],
  });
  graphNodes.push(breadcrumbNode);

  // 16. BlogPosting Schema (Optional passed input)
  if (options.includeBlogPosting) {
    graphNodes.push(buildBlogPostingSchema(options.includeBlogPosting, config));
  }

  // 17. FAQPage Schema (Verified FAQs)
  if (config.faqs && config.faqs.length > 0) {
    graphNodes.push(buildFaqPageSchema(config.faqs, config));
  }

  // 18. ItemList Schemas (Flagship Disciplines & Industries Served)
  const flagshipDisciplinesList = stripUndefined({
    '@type': 'ItemList',
    '@id': `${siteUrl}/#flagship-disciplines-list`,
    name: 'BRANDMANIA Flagship Disciplines',
    numberOfItems: config.flagshipDisciplines.length,
    itemListElement: config.flagshipDisciplines.map((disc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: disc.name,
      description: disc.description,
      item: `${siteUrl}/#service-${disc.id}`,
    })),
  });
  graphNodes.push(flagshipDisciplinesList);

  const industriesServedList = stripUndefined({
    '@type': 'ItemList',
    '@id': `${siteUrl}/#industries-served-list`,
    name: 'Industries Served by BRANDMANIA',
    numberOfItems: config.targetIndustries.length,
    itemListElement: config.targetIndustries.map((ind, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: ind,
    })),
  });
  graphNodes.push(industriesServedList);

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };
}
