import { z } from 'zod';

const DEFAULT_DEV_SECRET = 'dev-secret-key-32-chars-minimum-required!';

function isStrongSecret(val: string): boolean {
  if (val.length < 32) return false;
  const uniqueChars = new Set(val).size;
  if (uniqueChars < 8) return false;
  const repeatPattern = /^(.)\1{31,}$/;
  if (repeatPattern.test(val)) return false;
  const simpleSeq = /^(012345|123456|abcdef|qwerty)/i;
  if (simpleSeq.test(val.slice(0, 6))) return false;
  return true;
}

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  APP_URL: z.string().url().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(60),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  API_SECRET_KEY: z.string().min(32).refine(isStrongSecret).default(DEFAULT_DEV_SECRET),
  UNSUBSCRIBE_SECRET: z.string().min(32).refine(isStrongSecret).default(DEFAULT_DEV_SECRET),
  PAYMENT_WEBHOOK_SECRET: z.string().min(32).refine(isStrongSecret).default(DEFAULT_DEV_SECRET),
  DATABASE_URL: z.string().min(1).default('postgresql://postgres:postgres@localhost:6543/postgres'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_BOOKING_URL: z.string().url().default('https://calendly.com/brandmania-consultation/30min'),
  VERCEL: z.string().optional(),
  TRUST_PROXY: z.string().optional(),
  CACHE_DEFAULT_TTL_MS: z.coerce.number().default(300000),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const errorDetails = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('\n');
    throw new Error(`FATAL: Application configuration validation failed. Process cannot boot safely:\n${errorDetails}`);
  }
  return result.data;
}

export const env: Env = parseEnv();

export function assertProductionSecret(): void {
  if (isProduction() && env.API_SECRET_KEY === DEFAULT_DEV_SECRET) {
    throw new Error('FATAL: API_SECRET_KEY cannot use the default dev fallback in production. Set a strong, unique secret (min 32 chars, high entropy).');
  }
  if (isProduction() && env.UNSUBSCRIBE_SECRET === DEFAULT_DEV_SECRET) {
    throw new Error('FATAL: UNSUBSCRIBE_SECRET cannot use the default dev fallback in production.');
  }
  if (isProduction() && env.PAYMENT_WEBHOOK_SECRET === DEFAULT_DEV_SECRET) {
    throw new Error('FATAL: PAYMENT_WEBHOOK_SECRET cannot use the default dev fallback in production.');
  }
}

assertProductionSecret();
