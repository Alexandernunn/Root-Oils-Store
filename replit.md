# Workspace

## Amani Roots — Firebase Auth (Google Sign-In)
- `artifacts/amani-roots/src/lib/firebase.ts` — exports `auth` and `googleProvider`
- `artifacts/amani-roots/src/context/AuthContext.tsx` — `AuthProvider` + `useAuth` hook (user, signInWithGoogle, signOut)
- `artifacts/amani-roots/src/components/auth/LoginModal.tsx` — branded Google sign-in modal
- Navbar shows Sign In button / user avatar (desktop); clicking avatar signs out
- Groups page: clicking compose buttons prompts sign-in if not logged in; auto-opens compose after sign-in
- BlogForm: when signed in, shows user name/photo instead of manual author input; saves uid + photoURL to Firestore
- **Requires**: Firebase console → Authentication → Enable Google provider + add domain to Authorized Domains

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/amani-roots` (`@workspace/amani-roots`)

Premium marketing website for Amani Roots Oils — a natural hair care brand.

- **Aesthetic**: Quiet luxury / art gallery minimalism (Zara.com inspired)
- **Color palette**: `--bg: #FAFAF8`, `--bg-alt: #F5F3EF`, `--bg-mist: #EEF4F0`, `--bg-cream: #F7F3ED`, `--text: #1A1714`, `--text-muted: #8A8580`, `--forest: #2F5F48`, `--sage: #7A9E87`, `--mint: #D6E8DC`, `--gold: #C9A96E`
- **Typography**: Cormorant Garamond (headings, weight 300), Nunito (body, weight 300)
- **Hero**: 9:16 portrait video on desktop (left-aligned, side text right), full-bleed on mobile
- **Pages**: Home (10 sections), Shop (hero image + product grid), About (founder story)
- **Home sections**: Hero, Philosophy, Three Pillars (7 Herbs · 3 Oils · Healthy Roots), Science, Product Spotlight, Testimonials (with photos), Scalp, Floating Bottle, Email Signup, FAQ
- **About page**: Founder photo hero, story intro, mission, founder's journey (verbatim from amanirootsoils.com/founder-story), sign-off
- **Shop page**: Wide botanical hero image, product grid (5 products from Wix CDN), bottom accent
- **Copy**: All text sourced verbatim from amanirootsoils.com
- **Assets**: All product images, brand photos, hero.mp4 in `public/assets/`; some product images load directly from Wix CDN
- **No backend** — purely static frontend marketing site
- **Preview path**: `/`

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
