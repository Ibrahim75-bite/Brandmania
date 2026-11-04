/**
 * File Security: Upload Validation, Binary Magic Byte Verification, and Time-Limited Signed URLs
 * Standards: #35 (File Upload Validation), #36 (Signed URLs)
 */

import crypto from 'crypto';
import path from 'path';

export interface FileValidationResult {
  isValid: boolean;
  sanitizedFilename: string;
  detectedMimeType?: string;
  error?: string;
}

/**
 * Standard #35: File Upload Validation
 * Validates file size, binary magic bytes, and sanitizes filenames to prevent path traversal and double extension attacks.
 */
export function validateFileUpload(
  buffer: Buffer,
  originalFilename: string,
  maxSizeBytes: number = 5 * 1024 * 1024 // 5MB default
): FileValidationResult {
  // 1. Check file size
  if (!buffer || buffer.length === 0) {
    return { isValid: false, sanitizedFilename: '', error: 'FILE_EMPTY' };
  }
  if (buffer.length > maxSizeBytes) {
    return {
      isValid: false,
      sanitizedFilename: '',
      error: `FILE_TOO_LARGE: Size ${buffer.length} exceeds max allowed ${maxSizeBytes} bytes`,
    };
  }

  // 2. Sanitize filename (prevent path traversal, null bytes, double extensions)
  const basename = path.basename(originalFilename).replace(/\0/g, '');
  const cleanName = basename.replace(/[^a-zA-Z0-9._-]/g, '_');

  // Check for dangerous executable double extensions (e.g. dossier.pdf.exe)
  const dangerousExtensions = [
    /\.exe$/i,
    /\.bat$/i,
    /\.cmd$/i,
    /\.sh$/i,
    /\.php$/i,
    /\.js$/i,
    /\.py$/i,
    /\.dll$/i,
    /\.ps1$/i,
    /\.vbs$/i,
  ];

  if (dangerousExtensions.some((ext) => ext.test(cleanName))) {
    return {
      isValid: false,
      sanitizedFilename: cleanName,
      error: 'DANGEROUS_FILE_EXTENSION_DETECTED',
    };
  }

  // Check for double extension patterns like file.png.exe or file.jpg.php
  const segments = cleanName.split('.');
  if (segments.length > 2) {
    const trailingExt = `.${segments[segments.length - 1].toLowerCase()}`;
    const secondaryExt = `.${segments[segments.length - 2].toLowerCase()}`;
    const allowedImageDocExts = ['.pdf', '.png', '.jpg', '.jpeg', '.webp'];

    if (allowedImageDocExts.includes(secondaryExt) && !allowedImageDocExts.includes(trailingExt)) {
      return {
        isValid: false,
        sanitizedFilename: cleanName,
        error: 'SUSPICIOUS_DOUBLE_EXTENSION',
      };
    }
  }

  // 3. Inspect binary magic bytes (do not trust user-supplied Content-Type)
  let detectedMimeType: string | undefined;

  // PDF magic bytes: %PDF- (0x25, 0x50, 0x44, 0x46, 0x2D)
  if (
    buffer.length >= 5 &&
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  ) {
    detectedMimeType = 'application/pdf';
  }
  // PNG magic bytes: 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
  else if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    detectedMimeType = 'image/png';
  }
  // JPEG magic bytes: 0xFF, 0xD8, 0xFF
  else if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    detectedMimeType = 'image/jpeg';
  }
  // WebP magic bytes: RIFF....WEBP (0x52, 0x49, 0x46, 0x46 ... 0x57, 0x45, 0x42, 0x50)
  else if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    detectedMimeType = 'image/webp';
  }

  if (!detectedMimeType) {
    return {
      isValid: false,
      sanitizedFilename: cleanName,
      error: 'UNSUPPORTED_OR_CORRUPT_MAGIC_BYTES: File format not recognized as valid PDF, PNG, JPEG, or WebP',
    };
  }

  return {
    isValid: true,
    sanitizedFilename: cleanName,
    detectedMimeType,
  };
}

/**
 * Standard #36: Time-Limited Cryptographically Signed URLs
 * Generates an HMAC-SHA256 signed URL for authorized confidential downloads.
 */
export function generateSignedUrl(
  resourcePath: string,
  expiresInSeconds: number,
  secret: string
): string {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const normalizedPath = resourcePath.startsWith('/') ? resourcePath : `/${resourcePath}`;
  const dataToSign = `${normalizedPath}?exp=${expiresAt}`;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(dataToSign)
    .digest('hex');

  return `${normalizedPath}?exp=${expiresAt}&sig=${signature}`;
}

export function verifySignedUrl(
  urlOrPath: string,
  secret: string
): { valid: boolean; path?: string; error?: string } {
  try {
    const parsed = new URL(urlOrPath, 'http://localhost');
    const pathName = parsed.pathname;
    const expStr = parsed.searchParams.get('exp');
    const signature = parsed.searchParams.get('sig');

    if (!expStr || !signature) {
      return { valid: false, error: 'MISSING_SIGNATURE_OR_EXPIRATION' };
    }

    const exp = parseInt(expStr, 10);
    if (isNaN(exp)) {
      return { valid: false, error: 'INVALID_EXPIRATION_TIMESTAMP' };
    }

    const now = Math.floor(Date.now() / 1000);
    if (exp <= now) {
      return { valid: false, error: 'SIGNED_URL_EXPIRED' };
    }

    const dataToSign = `${pathName}?exp=${exp}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(dataToSign)
      .digest('hex');

    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return { valid: false, error: 'SIGNATURE_MISMATCH' };
    }

    return { valid: true, path: pathName };
  } catch {
    return { valid: false, error: 'URL_PARSE_ERROR' };
  }
}
