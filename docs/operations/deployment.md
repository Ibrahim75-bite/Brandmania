# Deployment Guide

## 1. Production Build Strategy
We use Next.js `output: 'standalone'` mode. This bundles only the required Node.js dependencies, server code, and static files into an optimized self-contained build, reducing container image size by over 80%.

## 2. Docker Container Deployment
Build and run the multi-stage Docker container:

```bash
# Build image
docker build -t agency-platform:latest .

# Run container with environment configuration
docker run -d \
  -p 3000:3000 \
  --name agency-platform \
  -e NODE_ENV=production \
  -e APP_URL=https://your-agency.com \
  -e API_SECRET_KEY=production-secret-must-be-32-chars-long! \
  agency-platform:latest
```

## 3. Docker Compose Orchestration
For local testing or single-server staging/production:

```bash
docker-compose up -d --build
```
This launches the container with resource limits, auto-restart, and integrated `/api/health` health checks.
