import { z } from 'zod';

const DEFAULT_DEV_SECRET = 'dev-secret-key-32-chars-minimum-required!';

/**
 * Custom refinement: rejects weak/repeated-character secrets.
 * A strong secret must have sufficient entropy — not just length.
 */
function isStrongSecret(val: string): boolean {
  if (val.length < 32) return false;

  // Reject the default dev fallback string ONLY in production
  if (process.env.NODE_ENV === 'production' && val === DEFAULT_DEV_SECRET) {
    return false;
  }

  // Reject trivially weak patterns: all same char, simple repeats
  const uniqueChars = new Set(val).size;
  if (uniqueChars < 8) return false; // Too little character variety

  // Reject repeated-character patterns like "aaaa...", "ababab..."
  const repeatPattern = /^(.)\1{31,}$/;
  if (repeatPattern.test(val)) return false;

  // Reject sequential simple patterns
  const simpleSeq = /^(012345|123456|abcdef|qwerty)/i;
  if (simpleSeq.test(val.slice(0, 6))) return false;

  return true;
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  APP_URL: z.string().url().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(60),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  // #10 Strong Secret Key Entropy Validation: min(32) chars, custom refinement,
  // production forbids default fallback dev string
  API_SECRET_KEY: z
    .string()
    .min(32, 'API_SECRET_KEY must be at least 32 characters')
    .refine(isStrongSecret, {
      message:
        'API_SECRET_KEY is too weak: must have high entropy (not repeated/simple patterns) and cannot be the default dev fallback in production',
    })
    .default(DEFAULT_DEV_SECRET),
  CACHE_DEFAULT_TTL_MS: z.coerce.number().default(300000),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errorDetails = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('\n');

    throw new Error(
      `FATAL: Application configuration validation failed. Process cannot boot safely:\n${errorDetails}`,
    );
  }

  return result.data;
}

export const env: Env = parseEnv();

/**
 * #10 Production guard: forbid the default dev secret in production.
 * Throws at boot if NODE_ENV === 'production' and API_SECRET_KEY equals
 * the default fallback dev string.
 */
export function assertProductionSecret(): void {
  if (env.NODE_ENV === 'production' && env.API_SECRET_KEY === DEFAULT_DEV_SECRET) {
    throw new Error(
      'FATAL: API_SECRET_KEY cannot use the default dev fallback in production. Set a strong, unique secret (min 32 chars, high entropy).',
    );
  }
}

// Run the production guard at module load time
assertProductionSecret();
