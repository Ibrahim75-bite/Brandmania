# Configuration Management

## 1. Schema Validation
All configuration variables are declared and strictly validated via Zod in `src/infrastructure/config/env.ts`.

If any mandatory environment variable is missing or malformed upon application startup, the process throws an explicit startup error and exits immediately (fail-fast principle).

## 2. Environment Variables

| Variable | Description | Default / Example | Required in Prod |
|---|---|---|---|
| `NODE_ENV` | Runtime environment (`development`, `production`, `test`) | `development` | Yes |
| `PORT` | HTTP port | `3000` | No |
| `APP_URL` | Public application URL | `http://localhost:3000` | Yes |
| `LOG_LEVEL` | Logging verbosity (`debug`, `info`, `warn`, `error`) | `info` | No |
| `RATE_LIMIT_MAX_REQUESTS` | Maximum requests per window | `60` | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | `60000` | No |
| `API_SECRET_KEY` | Server-side signing secret | `dev-secret-key-32-chars-minimum!` | Yes |

## 3. Secret Management
- Secrets must **never** be committed to version control.
- In production, inject secrets via environment variables or secret vaults (e.g., AWS Secrets Manager, GCP Secret Manager, Vault).
- The structured logger automatically masks known sensitive fields (`token`, `secret`, `password`, `key`, `authorization`).
