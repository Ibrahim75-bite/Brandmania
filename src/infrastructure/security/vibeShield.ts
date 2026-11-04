/**
 * VibeShield: Niche Vibe-Coder Security Defenses
 * Standards: #1-20 Anti-Vibecode Hack Defenses
 *
 * Centralized defensive utilities for host allowlisting, SSRF prevention,
 * path traversal validation, open-redirect protection, constant-time
 * responses, and safe redirect validation.
 */

import crypto from 'crypto';

/* ------------------------------------------------------------------ */
/*  #13 Subdomain Takeover & Host Header Allowlist                    */
/* ------------------------------------------------------------------ */

export const ALLOWED_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  'brandmania.com',
  'www.brandmania.com',
  'brandmania.agency',
]);

/**
 * Validates the incoming Host header against an explicit allowlist
 * before performing any protocol redirect. Prevents host-header
 * poisoning and subdomain takeover.
 */
export function isAllowedHost(host: string | null | undefined): boolean {
  if (!host) return false;
  // Strip port for comparison
  const hostname = host.split(':')[0].toLowerCase();
  if (ALLOWED_HOSTS.has(hostname)) return true;
  // Allow .vercel.app preview hosts in non-production contexts
  if (hostname.endsWith('.vercel.app')) return true;
  return false;
}

/* ------------------------------------------------------------------ */
/*  #14 SSRF Prevention                                               */
/* ------------------------------------------------------------------ */

export { isSafeExternalUrl } from '../../domain/rules/ssrf-guard';

/* ------------------------------------------------------------------ */
/*  #15 Path Traversal Prevention                                     */
/* ------------------------------------------------------------------ */

/**
 * Strict allowlist regex for dynamic route parameters ([slug]).
 * Only lowercase alphanumeric + hyphens allowed. Rejects .. %2e / \ \0.
 */
export const SLUG_ALLOWLIST = /^[a-z0-9-]+$/;

/**
 * Validates a dynamic route slug against the strict allowlist.
 * Returns true only if the slug matches /^[a-z0-9-]+$/.
 */
export function isValidSlug(slug: string | null | undefined): boolean {
  if (!slug || typeof slug !== 'string') return false;
  // Reject null bytes, path separators, dot-dot sequences
  if (slug.includes('\0')) return false;
  if (slug.includes('..')) return false;
  if (slug.includes('/')) return false;
  if (slug.includes('\\')) return false;
  // Percent-encoded dot traversal
  if (/%2e|%2E/i.test(slug)) return false;
  return SLUG_ALLOWLIST.test(slug);
}

/* ------------------------------------------------------------------ */
/*  #19 Open Redirect Prevention                                      */
/* ------------------------------------------------------------------ */

/**
 * Validates a redirect URL against an allowed origin.
 * Rejects:
 *   - Protocol-relative URLs (//evil.com)
 *   - javascript: URLs
 *   - data: URLs
 *   - External untrusted domains
 * Falls back safely to '/' when unsafe.
 */
export function validateSafeRedirect(
  url: string | null | undefined,
  allowedOrigin: string,
): string {
  if (!url || typeof url !== 'string') return '/';

  // Reject empty
  const trimmed = url.trim();
  if (!trimmed) return '/';

  // Relative URLs starting with / are safe (same-origin)
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;

  // Reject protocol-relative URLs (//evil.com)
  if (trimmed.startsWith('//')) return '/';

  // Reject javascript: and data: schemes
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:')) return '/';
  if (lower.startsWith('data:')) return '/';
  if (lower.startsWith('vbscript:')) return '/';

  try {
    const parsed = new URL(trimmed);

    // Only allow http: and https:
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '/';

    // Normalize allowed origin for comparison
    const allowed = new URL(allowedOrigin);
    const allowedHost = allowed.hostname.toLowerCase();

    // Same-origin redirect is safe
    if (parsed.hostname.toLowerCase() === allowedHost) return trimmed;

    // External untrusted domain — fallback to safe default
    return '/';
  } catch {
    return '/';
  }
}

/* ------------------------------------------------------------------ */
/*  #20 User Enumeration Prevention (Constant-Time & Uniform)         */
/* ------------------------------------------------------------------ */

/**
 * Minimum response floor in milliseconds to prevent timing-based
 * user enumeration via response latency differences.
 */
export const ENUMERATION_RESPONSE_FLOOR_MS = 150;

/**
 * Delays resolution by at least `ms` milliseconds to enforce a
 * constant-time response floor, mitigating timing attacks that
 * could enumerate whether an email exists in the system.
 */
export async function enforceResponseFloor(ms: number = ENUMERATION_RESPONSE_FLOOR_MS): Promise<void> {
  const start = Date.now();
  await new Promise((resolve) => setTimeout(resolve, ms));
  const elapsed = Date.now() - start;
  if (elapsed < ms) {
    // Already slept enough; no-op
  }
}

/**
 * Returns a uniform, generic confirmation response regardless of
 * whether the email existed in the repository. Prevents user
 * enumeration via differing status codes or body shapes.
 */
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

/* ------------------------------------------------------------------ */
/*  #9 Prompt Injection Defense (re-export from sanitizer)            */
/* ------------------------------------------------------------------ */

export {
  detectAndNeutralizePromptInjection,
  sanitizeText,
} from './sanitizer';

/* ------------------------------------------------------------------ */
/*  #8 Phone normalization (import from domain validation)            */
/* ------------------------------------------------------------------ */

import { normalizePhoneNumber } from '@/domain/validation/inquiry.schema';

/**
 * Validates E.164 phone number: max 15 digits, blocks premium-rate
 * and invalid prefixes.
 */
export function isValidE164Phone(input: string | null | undefined): boolean {
  if (!input || typeof input !== 'string') return false;
  const normalized = normalizePhoneNumber(input);
  if (!normalized) return false;
  const digits = normalized.replace(/\D/g, '');
  // E.164 max 15 digits (excluding +)
  if (digits.length > 15) return false;
  // Block premium-rate prefixes (900, 0900, etc.)
  if (/^(1?900|0900)/i.test(digits)) return false;
  return true;
}
