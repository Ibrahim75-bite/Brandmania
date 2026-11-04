import { describe, it, expect } from 'vitest';
import {
  generateSchemaGraph,
  buildBlogPostingSchema,
  buildFaqPageSchema,
  buildPersonSchema,
  buildPostalAddressSchema,
  buildGeoCoordinatesSchema,
  buildReviewSchema,
  buildAggregateRatingSchema,
} from '../schemaGraph';
import { seoConfig } from '@/content/seoConfig';
import type { SeoConfig } from '@/domain/seo/schemaTypes';

describe('Schema.org JSON-LD Structured Data Engine Tests', () => {
  const siteUrl = seoConfig.siteUrl;

  it('DEFAULT GRAPH: generates valid @context and all active unconditional schemas', () => {
    const graph = generateSchemaGraph();

    expect(graph['@context']).toBe('https://schema.org');
    expect(Array.isArray(graph['@graph'])).toBe(true);

    const nodes = graph['@graph'];
    const types = nodes.flatMap((node) => {
      const t = node['@type'];
      return Array.isArray(t) ? t : [t];
    });

    // 1. Organization
    expect(types).toContain('Organization');
    const orgNode = nodes.find((n) => n['@id'] === `${siteUrl}/#organization`);
    expect(orgNode).toBeDefined();
    expect(orgNode?.name).toBe('BRANDMANIA');
    expect(orgNode?.slogan).toBe('Branded for the best');
    expect(orgNode?.description).toContain('$700,000+ annual revenue');
    expect(orgNode?.logo).toBe(`${siteUrl}/brand/textures/brandmania-cover-clean.jpg`);

    // 2. LocalBusiness (Dual-typed)
    expect(types).toContain('LocalBusiness');
    expect(types).toContain('ProfessionalService');
    const localBizNode = nodes.find((n) => n['@id'] === `${siteUrl}/#localbusiness`);
    expect(localBizNode).toBeDefined();
    expect(localBizNode?.priceRange).toBe('$$$$');
    expect(localBizNode?.currenciesAccepted).toBe('USD');

    // 3. Service (3 Flagship Disciplines)
    const serviceNodes = nodes.filter((n) => n['@type'] === 'Service');
    expect(serviceNodes).toHaveLength(3);
    const serviceIds = serviceNodes.map((s) => s['@id']);
    expect(serviceIds).toContain(`${siteUrl}/#service-brand-direction`);
    expect(serviceIds).toContain(`${siteUrl}/#service-margin-recovery`);
    expect(serviceIds).toContain(`${siteUrl}/#service-consumer-scope`);

    // 4. Offer (2 Confirmed Engagement Models)
    const offerNodes = nodes.filter((n) => n['@type'] === 'Offer');
    expect(offerNodes.length).toBeGreaterThanOrEqual(2);
    const offerIds = offerNodes.map((o) => o['@id']);
    expect(offerIds).toContain(`${siteUrl}/#offer-full-engagement`);
    expect(offerIds).toContain(`${siteUrl}/#offer-strategic-consultancy`);

    // 5. OfferCatalog
    const catalogNode = nodes.find((n) => n['@id'] === `${siteUrl}/#offer-catalog`);
    expect(catalogNode).toBeDefined();
    expect(catalogNode?.['@type']).toBe('OfferCatalog');

    // 7. ContactPoint
    const contactNode = nodes.find((n) => n['@id'] === `${siteUrl}/#contact-point`);
    expect(contactNode).toBeDefined();
    expect(contactNode?.contactType).toBe('Strategic Consultation & Qualification');
    expect(contactNode?.availableLanguage).toEqual(['English']);
    expect(contactNode?.url).toBe(`${siteUrl}/#qualification`);

    // 10. OpeningHoursSpecification
    const hoursNode = nodes.find((n) => n['@id'] === `${siteUrl}/#opening-hours`);
    expect(hoursNode).toBeDefined();
    expect(hoursNode?.dayOfWeek).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ]);
    expect(hoursNode?.opens).toBe('09:00');
    expect(hoursNode?.closes).toBe('18:00');

    // 13. WebSite
    const siteNode = nodes.find((n) => n['@id'] === `${siteUrl}/#website`);
    expect(siteNode).toBeDefined();
    expect(siteNode?.name).toBe('BRANDMANIA');

    // 14. WebPage
    const pageNode = nodes.find((n) => n['@id'] === `${siteUrl}/#webpage`);
    expect(pageNode).toBeDefined();
    expect(pageNode?.isPartOf).toEqual({ '@id': `${siteUrl}/#website` });

    // 15. BreadcrumbList
    const breadcrumbNode = nodes.find((n) => n['@id'] === `${siteUrl}/#breadcrumbs`);
    expect(breadcrumbNode).toBeDefined();
    const items = breadcrumbNode?.itemListElement as Array<{ name: string; position: number }>;
    expect(items).toHaveLength(6);
    expect(items.map((i) => i.name)).toEqual([
      'Home',
      'Manifesto',
      'System',
      'Disciplines',
      'Selected Work',
      'Consultation',
    ]);

    // 17. FAQPage
    const faqNode = nodes.find((n) => n['@id'] === `${siteUrl}/#faq`);
    expect(faqNode).toBeDefined();
    expect(faqNode?.['@type']).toBe('FAQPage');
    const mainEntity = faqNode?.mainEntity as Array<{ name: string }>;
    expect(mainEntity.length).toBeGreaterThanOrEqual(3);
    expect(mainEntity[0].name).toBe('What types of businesses does BRANDMANIA work with?');

    // 18. ItemList (Flagships & Industries Served)
    const itemLists = nodes.filter((n) => n['@type'] === 'ItemList');
    expect(itemLists).toHaveLength(2);
    const disciplinesList = nodes.find(
      (n) => n['@id'] === `${siteUrl}/#flagship-disciplines-list`
    );
    expect(disciplinesList).toBeDefined();
    expect(disciplinesList?.numberOfItems).toBe(3);

    const industriesList = nodes.find(
      (n) => n['@id'] === `${siteUrl}/#industries-served-list`
    );
    expect(industriesList).toBeDefined();
    expect(industriesList?.numberOfItems).toBe(20);
  });

  it('CONDITIONAL ANTI-FABRICATION RULE: Omits unverified facts in default config', () => {
    const graph = generateSchemaGraph();
    const nodes = graph['@graph'];
    const types = nodes.flatMap((node) => {
      const t = node['@type'];
      return Array.isArray(t) ? t : [t];
    });

    // Person (Founder) omitted if unverified
    expect(types).not.toContain('Person');
    expect(nodes.some((n) => n['@id'] === `${siteUrl}/#founder`)).toBe(false);

    // PostalAddress omitted if unverified
    expect(types).not.toContain('PostalAddress');
    expect(nodes.some((n) => n['@id'] === `${siteUrl}/#postal-address`)).toBe(false);

    // GeoCoordinates omitted if unverified
    expect(types).not.toContain('GeoCoordinates');
    expect(nodes.some((n) => n['@id'] === `${siteUrl}/#geo`)).toBe(false);

    // Review omitted if empty
    expect(types).not.toContain('Review');

    // AggregateRating omitted if null
    expect(types).not.toContain('AggregateRating');
    expect(nodes.some((n) => n['@id'] === `${siteUrl}/#aggregate-rating`)).toBe(false);
  });

  it('CONDITIONAL SERIALIZATION: Accurately serializes valid verified facts when provided', () => {
    const testConfig: SeoConfig = {
      ...seoConfig,
      founder: {
        name: 'Alexander Sterling',
        jobTitle: 'Principal & Strategic Director',
        url: `${siteUrl}/principal`,
        sameAs: ['https://linkedin.com/in/alexander-sterling'],
      },
      address: {
        streetAddress: '100 Mayfair Avenue',
        addressLocality: 'London',
        addressRegion: 'Greater London',
        postalCode: 'W1K 4QA',
        addressCountry: 'GB',
      },
      geo: {
        latitude: 51.5074,
        longitude: -0.1278,
        region: 'GB-LND',
        placename: 'London',
      },
      reviews: [
        {
          author: 'Marcus Vance',
          datePublished: '2026-03-15',
          reviewBody:
            'Brand Direction and Margin Recovery restructured our commercial operations, returning 34% margin.',
          reviewRating: {
            ratingValue: 5,
            bestRating: 5,
            worstRating: 1,
          },
        },
      ],
      aggregateRating: {
        ratingValue: 5.0,
        reviewCount: 1,
        bestRating: 5,
        worstRating: 1,
      },
    };

    const graph = generateSchemaGraph({ config: testConfig });
    const nodes = graph['@graph'];

    // Verify Person
    const personNode = nodes.find((n) => n['@id'] === `${siteUrl}/#founder`);
    expect(personNode).toBeDefined();
    expect(personNode?.['@type']).toBe('Person');
    expect(personNode?.name).toBe('Alexander Sterling');
    expect(personNode?.worksFor).toEqual({ '@id': `${siteUrl}/#organization` });

    // Verify PostalAddress
    const addressNode = nodes.find((n) => n['@id'] === `${siteUrl}/#postal-address`);
    expect(addressNode).toBeDefined();
    expect(addressNode?.streetAddress).toBe('100 Mayfair Avenue');

    // Verify GeoCoordinates
    const geoNode = nodes.find((n) => n['@id'] === `${siteUrl}/#geo`);
    expect(geoNode).toBeDefined();
    expect(geoNode?.latitude).toBe(51.5074);
    expect(geoNode?.longitude).toBe(-0.1278);

    // Verify Review
    const reviewNode = nodes.find((n) => n['@id'] === `${siteUrl}/#review-1`);
    expect(reviewNode).toBeDefined();
    expect(reviewNode?.['@type']).toBe('Review');
    expect((reviewNode?.author as { name: string }).name).toBe('Marcus Vance');

    // Verify AggregateRating
    const ratingNode = nodes.find((n) => n['@id'] === `${siteUrl}/#aggregate-rating`);
    expect(ratingNode).toBeDefined();
    expect(ratingNode?.ratingValue).toBe(5.0);
    expect(ratingNode?.reviewCount).toBe(1);

    // LocalBusiness should attach address, geo, aggregateRating
    const localBizNode = nodes.find((n) => n['@id'] === `${siteUrl}/#localbusiness`);
    expect(localBizNode?.address).toBeDefined();
    expect(localBizNode?.geo).toBeDefined();
    expect(localBizNode?.aggregateRating).toBeDefined();
  });

  it('BUILDERS: exports standalone helper builders for BlogPosting, FAQs and entities', () => {
    // BlogPosting
    const blogNode = buildBlogPostingSchema({
      headline: 'The Dilemma of Brand Authority vs Media Spend',
      description: 'Why ad spend accelerates capital destruction without margin architecture.',
      slug: 'brand-authority-vs-media-spend',
      datePublished: '2026-08-10',
      author: 'Strategic Principal',
    });
    expect(blogNode['@type']).toBe('BlogPosting');
    expect(blogNode['@id']).toBe(
      `${siteUrl}/briefings/brand-authority-vs-media-spend#article`
    );
    expect(blogNode.publisher).toEqual({ '@id': `${siteUrl}/#organization` });

    // FAQPage
    const faqNode = buildFaqPageSchema([
      { question: 'Test Question?', answer: 'Test Answer.' },
    ]);
    expect(faqNode['@type']).toBe('FAQPage');
    expect(faqNode['@id']).toBe(`${siteUrl}/#faq`);
  });
});
