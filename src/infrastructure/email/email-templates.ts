import crypto from 'crypto';
import { env } from '../config/env';

const UNSUBSCRIBE_SECRET =
  process.env.UNSUBSCRIBE_SECRET || 'brandmania-rfc8058-unsubscribe-secret-salt-2026';

export const emailSuppressionSet = new Set<string>();

export function generateUnsubscribeToken(email: string): string {
  const normalized = email.toLowerCase().trim();
  return crypto.createHmac('sha256', UNSUBSCRIBE_SECRET).update(normalized).digest('hex');
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const expectedToken = generateUnsubscribeToken(email);
  if (expectedToken.length !== token.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expectedToken), Buffer.from(token));
}

export function suppressEmail(email: string): void {
  emailSuppressionSet.add(email.toLowerCase().trim());
}

export function isEmailSuppressed(email: string): boolean {
  return emailSuppressionSet.has(email.toLowerCase().trim());
}

export interface ExecutiveEmailParams {
  to: string;
  subject: string;
  bodyText: string;
  bodyHtml?: string;
  baseUrl?: string;
}

export interface PreparedEmail {
  to: string;
  subject: string;
  text: string;
  html: string;
  headers: {
    'List-Unsubscribe': string;
    'List-Unsubscribe-Post': string;
    [key: string]: string;
  };
  unsubscribeUrl: string;
}

export function buildExecutiveEmail({
  to,
  subject,
  bodyText,
  bodyHtml,
  baseUrl = env.APP_URL,
}: ExecutiveEmailParams): PreparedEmail {
  const token = generateUnsubscribeToken(to);
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const unsubscribeUrl = `${cleanBase}/api/v1/communications/unsubscribe?email=${encodeURIComponent(to.toLowerCase().trim())}&token=${token}`;

  const footerText = `\n\n---\nBRANDMANIA — Strategic Brand & Commercial Advisory\nUnsubscribe from executive briefings & communications: ${unsubscribeUrl}`;
  const text = `${bodyText}${footerText}`;

  const defaultHtmlBody = bodyHtml || `<p style="font-family: sans-serif; font-size: 15px; color: #111;">${bodyText.replace(/\n/g, '<br/>')}</p>`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
      ${defaultHtmlBody}
      <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 32px 0 16px;" />
      <p style="font-size: 12px; color: #6B7280; line-height: 1.5;">
        BRANDMANIA — Strategic Brand &amp; Commercial Advisory<br />
        <a href="${unsubscribeUrl}" style="color: #6B7280; text-decoration: underline;">
          Unsubscribe from executive briefings &amp; communications
        </a>
      </p>
    </div>
  `.trim();

  return {
    to,
    subject,
    text,
    html,
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    unsubscribeUrl,
  };
}
