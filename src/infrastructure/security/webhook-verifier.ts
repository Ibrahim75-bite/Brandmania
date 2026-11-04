/**
 * Webhook Cryptographic Verification & Replay Protection
 * Standard #8: Webhook Verification
 */

import crypto from 'crypto';

export interface VerifyWebhookOptions {
  payload: string | Buffer;
  signatureHeader: string | null;
  secret: string;
  toleranceSeconds?: number;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  error?: string;
  timestamp?: number;
}

/**
 * Validates HMAC-SHA256 webhook signatures with timestamp replay protection.
 * Supports standard 't=timestamp,v1=signature' format or raw hex signatures.
 */
export function verifyWebhookSignature({
  payload,
  signatureHeader,
  secret,
  toleranceSeconds = 300,
}: VerifyWebhookOptions): WebhookVerificationResult {
  if (!signatureHeader) {
    return { isValid: false, error: 'SIGNATURE_HEADER_MISSING' };
  }
  if (!secret) {
    return { isValid: false, error: 'SECRET_KEY_MISSING' };
  }

  const payloadString = typeof payload === 'string' ? payload : payload.toString('utf-8');

  // Handle 't=timestamp,v1=signature' format
  if (signatureHeader.includes('t=') && signatureHeader.includes('v1=')) {
    const parts = signatureHeader.split(',');
    let timestampStr = '';
    let signatureHex = '';

    for (const part of parts) {
      const [key, value] = part.trim().split('=');
      if (key === 't') timestampStr = value;
      if (key === 'v1') signatureHex = value;
    }

    if (!timestampStr || !signatureHex) {
      return { isValid: false, error: 'SIGNATURE_FORMAT_INVALID' };
    }

    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) {
      return { isValid: false, error: 'TIMESTAMP_INVALID' };
    }

    // Check timestamp freshness to prevent replay attacks
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > toleranceSeconds) {
      return { isValid: false, error: 'TIMESTAMP_EXPIRED', timestamp };
    }

    // Compute expected HMAC over `${timestamp}.${payload}`
    const signedPayload = `${timestamp}.${payloadString}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');

    const signatureBuffer = Buffer.from(signatureHex, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return { isValid: false, error: 'SIGNATURE_MISMATCH', timestamp };
    }

    return { isValid: true, timestamp };
  }

  // Fallback: direct hex signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payloadString)
    .digest('hex');

  const cleanHeader = signatureHeader.replace(/^sha256=/, '');
  const signatureBuffer = Buffer.from(cleanHeader, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return { isValid: false, error: 'SIGNATURE_MISMATCH' };
  }

  return { isValid: true };
}
