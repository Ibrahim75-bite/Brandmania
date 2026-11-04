
export { isSafeExternalUrl, isPrivateOrReservedIp } from '../../domain/rules/ssrf-guard';

export function sanitizeText(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  sanitized = sanitized.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '');
  sanitized = sanitized.replace(/\son\w+\s*=\s*[^\s>]+/gi, '');

  sanitized = sanitized.replace(/javascript\s*:/gi, 'blocked_script:');
  sanitized = sanitized.replace(/vbscript\s*:/gi, 'blocked_script:');

  sanitized = sanitized.replace(/data\s*:\s*text\/html/gi, 'blocked_data:text/html');

  return sanitized.trim();
}

export interface PromptInjectionAnalysis {
  isSuspicious: boolean;
  detectedPatterns: string[];
  sanitizedText: string;
  neutralizedXml: string;
}

export function detectAndNeutralizePromptInjection(input: string): PromptInjectionAnalysis {
  if (!input || typeof input !== 'string') {
    return {
      isSuspicious: false,
      detectedPatterns: [],
      sanitizedText: '',
      neutralizedXml: '<user_untrusted_input></user_untrusted_input>',
    };
  }

  const suspiciousRegexes: { name: string; regex: RegExp }[] = [
    { name: 'IGNORE_PREVIOUS_INSTRUCTIONS', regex: /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i },
    { name: 'SYSTEM_PROMPT_OVERRIDE', regex: /(system\s+prompt|new\s+system\s+directive|developer\s+mode)/i },
    { name: 'ROLE_SPOOF_YOU_ARE_NOW', regex: /you\s+are\s+now\s+(an?\s+)?(unrestricted|jailbroken|assistant|dan|root)/i },
    { name: 'DELIMITER_INJECTION_IM_START', regex: /<\|im_start\|>|<\|im_end\|>|\[INST\]|\[\/INST\]/i },
    { name: 'XML_DELIMITER_SPOOF', regex: /<\/?[a-z_]+(?:system|instructions|directive)[^>]*>/i },
    { name: 'DISREGARD_RULES', regex: /disregard\s+(all\s+)?(safety\s+)?rules/i },
  ];

  const detectedPatterns: string[] = [];
  let sanitized = input;

  for (const pattern of suspiciousRegexes) {
    if (pattern.regex.test(input)) {
      detectedPatterns.push(pattern.name);
      sanitized = sanitized.replace(pattern.regex, '[SUSPICIOUS_PROMPT_OVERRIDE_FILTERED]');
    }
  }

  sanitized = sanitized
    .replace(/<\|im_start\|>/gi, '')
    .replace(/<\|im_end\|>/gi, '')
    .replace(/\[INST\]/gi, '')
    .replace(/\[\/INST\]/gi, '');

  const escapedForXml = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  const neutralizedXml = `<user_untrusted_input>\n${escapedForXml}\n</user_untrusted_input>`;

  return {
    isSuspicious: detectedPatterns.length > 0,
    detectedPatterns,
    sanitizedText: sanitized,
    neutralizedXml,
  };
}
