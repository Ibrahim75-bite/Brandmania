# Development Setup Guide

## Prerequisites
- Node.js `20+` or `22+` (Node `v24` supported)
- npm `10+` or `11+`
- Git

## Getting Started

1. **Clone and Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Verify and populate required variables according to `src/infrastructure/config/env.ts`.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to inspect the Foundation Verification Surface.

4. **Run Verification Scripts**:
   ```bash
   npm run typecheck   # Type verification
   npm run lint        # Linting checks
   npm test            # Run unit, integration, and architectural test suite
   npm run build       # Verify production compilation
   ```
