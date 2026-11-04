
import crypto from 'crypto';

export const ALLOWED_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  'brandmania.com',
  'www.brandmania.com',
  'brandmania.agency',
]);

export function isAllowedHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const hostname = host.split(':')[0].toLowerCase();
  if (ALLOWED_HOSTS.has(hostname)) return true;
  if (hostname.endsWith('.vercel.app')) return true;
  return false;
}

export { isSafeExternalUrl } from '../../domain/rules/ssrf-guard';

export const SLUG_ALLOWLIST = /^[a-z0-9-]+$/;

export function isValidSlug(slug: string | null | undefined): boolean {
  if (!slug || typeof slug !== 'string') return false;
  if (slug.includes('\0')) return false;
  if (slug.includes('..')) return false;
  if (slug.includes('/')) return false;
  if (slug.includes('\\')) return false;
  if (/%2e|%2E/i.test(slug)) return false;
  return SLUG_ALLOWLIST.test(slug);
}

export function validateSafeRedirect(
  url: string | null | undefined,
  allowedOrigin: string,
): string {
  if (!url || typeof url !== 'string') return '/';

  const trimmed = url.trim();
  if (!trimmed) return '/';

  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;

  if (trimmed.startsWith('//')) return '/';

  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:')) return '/';
  if (lower.startsWith('data:')) return '/';
  if (lower.startsWith('vbscript:')) return '/';

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '/';

    const allowed = new URL(allowedOrigin);
    const allowedHost = allowed.hostname.toLowerCase();

    if (parsed.hostname.toLowerCase() === allowedHost) return trimmed;

    return '/';
  } catch {
    return '/';
  }
}

export const ENUMERATION_RESPONSE_FLOOR_MS = 150;

export async function enforceResponseFloor(ms: number = ENUMERATION_RESPONSE_FLOOR_MS): Promise<void> {
  const start = Date.now();
  await new Promise((resolve) => setTimeout(resolve, ms));
  const elapsed = Date.now() - start;
  if (elapsed < ms) {
  }
}

export function uniformConfirmationResponse(
  message: string,
  overrides: Record<string, unknown> = {},
): { success: boolean; message: string; deletionReceiptId?: string; timestamp?: string; [key: string]: unknown } {
  return {
    success: true,
    message,
    deletionReceiptId: `del_${crypto.randomBytes(6).toString('hex')}_${Date.now().toString(36)}`,
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

export {
  detectAndNeutralizePromptInjection,
  sanitizeText,
} from './sanitizer';

import { normalizePhoneNumber } from '@/domain/validation/inquiry.schema';

export function isValidE164Phone(input: string | null | undefined): boolean {
  if (!input || typeof input !== 'string') return false;
  const normalized = normalizePhoneNumber(input);
  if (!normalized) return false;
  const digits = normalized.replace(/\D/g, '');
  if (digits.length > 15) return false;
  if (/^(1?900|0900)/i.test(digits)) return false;
  return true;
}
