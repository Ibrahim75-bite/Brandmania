import { z } from 'zod';
import { isSafeExternalUrl } from '../rules/ssrf-guard';

export function normalizeWebsiteUrl(input?: string | null): string {
  if (!input) return '';
  let trimmed = input.trim();
  if (!trimmed) return '';
  trimmed = trimmed.replace(/\/+$/, '');
  trimmed = trimmed.replace(/^(https?:\/\/)?www\./i, '$1');
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
      return isSafeExternalUrl(val);
    },
    { message: 'Please provide a valid public brand website (e.g. brand.com or https://brand.com)' }
  );

export function normalizePhoneNumber(input?: string | null): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (!trimmed) return '';
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';
  return hasPlus ? `+${digits}` : digits;
}

export function normalizeEmailAddress(input?: string | null): string {
  if (!input) return '';
  return input.trim().toLowerCase();
}

export const submitInquirySchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, 'Executive name must be at least 2 characters')
    .max(100, 'Executive name cannot exceed 100 characters'),
  roleTitle: z.string().trim().optional(),
  companyName: z
    .string()
    .trim()
    .min(2, 'Company or brand name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid corporate email address'),
  phone: z.string().trim().transform(normalizePhoneNumber).optional(),
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
  company_fax_number: z.string().optional(),
  submissionDurationMs: z.number().optional(),
  consentAccepted: z
    .boolean()
    .default(true)
    .refine((val) => val === true, {
      message: 'You must confirm corporate authorization (18+) and accept the Privacy Policy and Terms of Engagement.',
    }),
})
  .strip();

export type SubmitInquirySchemaInput = z.infer<typeof submitInquirySchema>;
export const STRIPPED_BROWSER_KEYS = ['price', 'discount', 'priorityScore'] as const;
