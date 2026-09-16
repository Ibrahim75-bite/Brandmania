import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  APP_URL: z.string().url().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(60),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  API_SECRET_KEY: z.string().min(16).default('dev-secret-key-32-chars-minimum-required!'),
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
      `FATAL: Application configuration validation failed. Process cannot boot safely:\n${errorDetails}`
    );
  }

  return result.data;
}

export const env: Env = parseEnv();
