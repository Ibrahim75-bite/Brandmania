
export function isPrivateOrReservedIp(ip: string): boolean {
  if (ip === '::1' || ip === '::' || ip.startsWith('fe80:')) {
    return true;
  }

  const parts = ip.split('.').map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return false;
  }

  const [a, b] = parts;

  if (a === 0) return true;

  if (a === 127) return true;

  if (a === 10) return true;

  if (a === 172 && b >= 16 && b <= 31) return true;

  if (a === 192 && b === 168) return true;

  if (a === 169 && b === 254) return true;

  return false;
}

export function isSafeExternalUrl(urlStr: string): boolean {
  if (!urlStr || typeof urlStr !== 'string') {
    return false;
  }

  try {
    const parsed = new URL(urlStr);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    if (parsed.username || parsed.password) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase().trim();

    if (!hostname) {
      return false;
    }

    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname.endsWith('.lan') ||
      hostname.endsWith('.home')
    ) {
      return false;
    }

    if (isPrivateOrReservedIp(hostname)) {
      return false;
    }

    const unbracketed = hostname.replace(/^\[|\]$/g, '');
    if (isPrivateOrReservedIp(unbracketed)) {
      return false;
    }

    return hostname.includes('.');
  } catch {
    return false;
  }
}
