import { z } from 'zod';

export const PostalAddressSchema = z.object({
  streetAddress: z.string().min(1),
  addressLocality: z.string().min(1),
  addressRegion: z.string().optional(),
  postalCode: z.string().optional(),
  addressCountry: z.string().min(1),
});

export type PostalAddress = z.infer<typeof PostalAddressSchema>;

export const GeoCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  region: z.string().optional(),
  placename: z.string().optional(),
});

export type GeoCoordinates = z.infer<typeof GeoCoordinatesSchema>;

export const OpeningHoursSpecificationSchema = z.object({
  dayOfWeek: z.array(z.string()).min(1),
  opens: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  closes: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
});

export type OpeningHoursSpecification = z.infer<typeof OpeningHoursSpecificationSchema>;

export const ReviewRatingSchema = z.object({
  ratingValue: z.number().min(1).max(5),
  bestRating: z.number().default(5),
  worstRating: z.number().default(1),
});

export const ReviewSchema = z.object({
  author: z.string().min(1),
  datePublished: z.string().min(1),
  reviewBody: z.string().min(1),
  reviewRating: ReviewRatingSchema,
});

export type Review = z.infer<typeof ReviewSchema>;

export const AggregateRatingSchema = z.object({
  ratingValue: z.number().min(1).max(5),
  reviewCount: z.number().int().positive(),
  bestRating: z.number().default(5),
  worstRating: z.number().default(1),
});

export type AggregateRating = z.infer<typeof AggregateRatingSchema>;

export const FounderSchema = z.object({
  name: z.string().min(1),
  jobTitle: z.string().min(1),
  url: z.string().url().optional(),
  sameAs: z.array(z.string().url()).optional(),
});

export type Founder = z.infer<typeof FounderSchema>;

export const ContactPointSchema = z.object({
  contactType: z.string().min(1),
  availableLanguage: z.array(z.string()).min(1),
  url: z.string().min(1),
  email: z.string().email().optional(),
  telephone: z.string().optional(),
});

export type ContactPoint = z.infer<typeof ContactPointSchema>;

export const FlagshipDisciplineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slogan: z.string().min(1),
  description: z.string().min(1),
  anchor: z.string().min(1),
});

export type FlagshipDiscipline = z.infer<typeof FlagshipDisciplineSchema>;

export const OfferModelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  eligibility: z.string().min(1),
  priceRange: z.string().optional(),
});

export type OfferModel = z.infer<typeof OfferModelSchema>;

export const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FaqItem = z.infer<typeof FaqItemSchema>;

export const BlogPostInputSchema = z.object({
  headline: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  datePublished: z.string().min(1),
  dateModified: z.string().optional(),
  author: z.string().optional(),
  image: z.string().optional(),
});

export type BlogPostInput = z.infer<typeof BlogPostInputSchema>;

export const BreadcrumbItemSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  position: z.number().int().positive(),
});

export type BreadcrumbItem = z.infer<typeof BreadcrumbItemSchema>;

export const SeoConfigSchema = z.object({
  brandName: z.string().min(1),
  tagline: z.string().min(1),
  oneLiner: z.string().min(1),
  siteUrl: z.string().url(),
  revenueThreshold: z.string().min(1),
  logoPath: z.string().min(1),
  coverImagePath: z.string().min(1),
  priceRange: z.string().min(1),
  currenciesAccepted: z.string().min(1),
  locales: z.array(z.string()).min(1),
  defaultLocale: z.string().min(1),
  contactPoint: ContactPointSchema,
  openingHours: OpeningHoursSpecificationSchema,
  founder: FounderSchema.nullable(),
  address: PostalAddressSchema.nullable(),
  geo: GeoCoordinatesSchema.nullable(),
  reviews: z.array(ReviewSchema),
  aggregateRating: AggregateRatingSchema.nullable(),
  flagshipDisciplines: z.array(FlagshipDisciplineSchema).length(3),
  supportingCapabilities: z.array(z.string()).length(11),
  targetIndustries: z.array(z.string()).length(20),
  engagementModels: z.array(OfferModelSchema).length(2),
  faqs: z.array(FaqItemSchema).min(1),
});

export type SeoConfig = z.infer<typeof SeoConfigSchema>;
