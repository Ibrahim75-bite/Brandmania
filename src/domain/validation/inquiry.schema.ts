import { z } from 'zod';

export function normalizeWebsiteUrl(input?: string | null): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export const websiteValidator = z
  .string()
  .trim()
  .transform(normalizeWebsiteUrl)
  .refine(
    (val) => {
      if (!val) return true; // optional
      try {
        const parsed = new URL(val);
        return parsed.hostname.includes('.');
      } catch {
        return false;
      }
    },
    { message: 'Please provide a valid brand website (e.g. brand.com or https://brand.com)' }
  );

export const submitInquirySchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, 'Executive name must be at least 2 characters')
    .max(100, 'Executive name cannot exceed 100 characters'),
  companyName: z
    .string()
    .trim()
    .min(2, 'Company or brand name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please provide a valid corporate email address'),
  website: websiteValidator.optional(),
  companyTier: z.enum(
    ['EMERGING_ENTERPRISE', 'MID_MARKET', 'GLOBAL_ENTERPRISE', 'HAUTE_LUXURY'],
    { errorMap: () => ({ message: 'Please select a valid annual commercial revenue tier' }) }
  ),
  budgetRange: z.enum(
    ['TIER_50K_100K', 'TIER_100K_250K', 'TIER_250K_500K', 'TIER_500K_PLUS'],
    { errorMap: () => ({ message: 'Please select a valid advisory budget allocation' }) }
  ),
  services: z
    .array(z.string())
    .min(1, 'Please select at least one strategic focus discipline'),
  message: z
    .string()
    .trim()
    .min(10, 'Diagnostic context must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters'),
  // Anti-Spam Layer 1: Honeypot (must remain completely empty)
  company_fax_number: z.string().optional(),
  // Anti-Spam Layer 2: Submission Time-Lock (minimum 2500ms duration)
  submissionDurationMs: z.number().optional(),
});

export type SubmitInquirySchemaInput = z.infer<typeof submitInquirySchema>;
