# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page for the **Nathaniel School of Music (NSM)** intermediate piano course. It's a full-stack TypeScript app with a React frontend and Express backend, hosted on Replit.

## Deployment

Deployed on **Vercel**. `vercel.json` is configured:
- `buildCommand`: `vite build` (frontend only; esbuild server bundle is not needed on Vercel)
- `outputDirectory`: `dist/public` (Vite build output served as CDN)
- API routes (`/api/*`) are served by `api/index.ts` as a Vercel serverless function
- All other routes rewrite to `/index.html` for SPA routing

To deploy: push to GitHub, connect repo to Vercel, add env vars in Vercel dashboard.

**Required env vars in Vercel dashboard:**
- `DATABASE_URL`, `RESEND_API_KEY`, `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`

## Commands

```bash
# Development
npm run dev          # Start Express server with Vite HMR (port 5000)

# Production build
npm run build        # Vite frontend build + esbuild server bundle → dist/
npm run start        # Run production build

# Type checking
npm run check        # tsc (no emit)

# Database
npm run db:push      # Push schema changes to PostgreSQL via drizzle-kit
```

## Architecture

### Monorepo layout
- `client/` — React 18 SPA (Vite, entry at `client/src/main.tsx`)
- `server/` — Express API (entry at `server/index.ts`)
- `shared/` — Shared TypeScript types and Zod schemas (`shared/schema.ts`)
- `content/landing.json` — All page copy, structured data, and section content (single source of truth for editable text)

### Path aliases (configured in `vite.config.ts`)
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### Frontend
- Single page (`client/src/pages/home.tsx`) that composes all sections in order
- Section components live in `client/src/components/sections/`
- `content/landing.json` is imported directly in `home.tsx` and props-drilled to each section
- UI primitives from shadcn/ui (`client/src/components/ui/`) — do not edit these
- Routing via **wouter** (not React Router)
- Data fetching via **TanStack Query** (`client/src/lib/queryClient.ts`)

### Backend API routes (`server/routes.ts`)
- `GET /api/geo` — detects user's country/region (domestic/europe/international) via CDN headers or ip-api.com fallback; used to show region-specific pricing in `FeesSection`
- `POST /api/course-builder` — validates form with Zod, then concurrently saves to Google Sheets and sends emails via Resend

### Key integrations
- **Google Sheets** (`googleapis`): form submissions go to spreadsheet ID `16BNZdshYZC-SeG2Yar1pzM1ggQu2k9Y73U_CGlCYDck`, sheet `Intermediate`
- **Resend**: transactional email notifications on form submission
- **Google Analytics** (`window.gtag`): event tracking via `client/src/lib/analytics.ts`
- **A/B testing**: localStorage-based variant assignment in `client/src/lib/ab-testing.ts`, consumed via `useABTest` hook; active tests are `HERO_HEADLINE` and `PRIMARY_CTA`

### Database
- PostgreSQL via `@neondatabase/serverless` + Drizzle ORM
- Schema in `shared/schema.ts` (currently only a `users` table; the course builder form does **not** write to the DB)
- `DATABASE_URL` env var required

### Environment variables required
- `DATABASE_URL` — PostgreSQL connection string
- `RESEND_API_KEY` — for email sending
- `GOOGLE_SHEETS_CLIENT_EMAIL` — service account email
- `GOOGLE_SHEETS_PRIVATE_KEY` — PEM key (newlines may be escaped as `\n` in env)

### Pricing / region logic
The `/api/geo` endpoint classifies visitors into `domestic` (South Asia), `europe`, or `international`. This region string is passed to `FeesSection` to display the correct pricing tier. For local testing, set `localStorage.setItem('test_region', 'domestic')` in the browser console.
