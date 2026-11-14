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
