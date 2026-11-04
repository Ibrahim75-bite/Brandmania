/**
 * Server-Side Request Forgery (SSRF) Guard
 * Standard #34: SSRF Prevention
 *
 * Validates URLs to prevent SSRF attacks against internal network infrastructure,
 * cloud metadata endpoints (169.254.169.254), private subnet ranges, and loopbacks.
 * (Domain-safe pure logic: no external library dependencies)
 */

export function isPrivateOrReservedIp(ip: string): boolean {
  // Check IPv6 loopback
  if (ip === '::1' || ip === '::' || ip.startsWith('fe80:')) {
    return true;
  }

  // Check IPv4 octets
  const parts = ip.split('.').map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return false;
  }

  const [a, b] = parts;

  // 0.0.0.0/8 (Current network)
  if (a === 0) return true;

  // 127.0.0.0/8 (Loopback)
  if (a === 127) return true;

  // 10.0.0.0/8 (Private class A)
  if (a === 10) return true;

  // 172.16.0.0/12 (Private class B: 172.16.0.0 - 172.31.255.255)
  if (a === 172 && b >= 16 && b <= 31) return true;

  // 192.168.0.0/16 (Private class C)
  if (a === 192 && b === 168) return true;

  // 169.254.0.0/16 (Link-local / AWS / GCP / Azure Instance Metadata Service)
  if (a === 169 && b === 254) return true;

  return false;
}

export function isSafeExternalUrl(urlStr: string): boolean {
  if (!urlStr || typeof urlStr !== 'string') {
    return false;
  }

  try {
    const parsed = new URL(urlStr);

    // Only allow http: and https: protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    // Reject URLs with embedded credentials (e.g. https://user:pass@domain.com)
    if (parsed.username || parsed.password) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase().trim();

    // Reject empty hostnames
    if (!hostname) {
      return false;
    }

    // Reject localhost, local, internal domain suffixes
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

    // Check if hostname is an IP literal
    if (isPrivateOrReservedIp(hostname)) {
      return false;
    }

    // Reject IPv6 literals enclosed in brackets [::1]
    const unbracketed = hostname.replace(/^\[|\]$/g, '');
    if (isPrivateOrReservedIp(unbracketed)) {
      return false;
    }

    // Ensure valid dot in public hostname
    return hostname.includes('.');
  } catch {
    return false;
  }
}
