# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

# Marka platform — `web/` development guide

`web/` is the **production rebuild** of the prototype in the repo root (`../`).
The root is a high-fidelity **design reference** (vanilla JS + React-via-CDN +
`localStorage`); this app re-implements it as Next.js + Prisma + Postgres.
The full roadmap and data-layer→DB mapping live in [`../MIGRATION.md`](../MIGRATION.md).

## Stack
- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**.
- **Prisma 7** + **PostgreSQL** via the **`@prisma/adapter-pg` driver adapter**.
- **No Tailwind** — styling uses the prototype's CSS-variable token system (see below).
- Auth (planned, F2): **Auth.js / NextAuth v5**, hashed passwords, `ADMIN|EDITOR|MEMBER` roles.

## Architecture principle
**Admin writes → API/Server Action → Prisma → Postgres → site reads.** The
prototype's `theme/*` `localStorage` layers (`MarkaTheme`, `MarkaMembers`, …)
become Prisma models + a server API. Live `subscribe()` sync becomes
`revalidatePath`/`revalidateTag`. **All `/admin` routes must be role-guarded.**

## Styling — token CSS, not Tailwind
- The design system lives in `src/styles/marka.css` → `src/styles/tokens/*.css`,
  imported once at the top of `src/app/globals.css`. Do **not** add Tailwind.
- Use CSS custom properties, never hardcoded values: `var(--accent)`, `var(--bg)`,
  `var(--text)`, `var(--text-muted)`, `var(--border)`, `var(--font-display)`,
  `var(--font-mono)`, `var(--radius)`, spacing/`--section-y`, motion easings.
- Utility classes from `tokens/base.css`: `.u-container`, `.u-label` (mono eyebrow).
- Light/dark is driven by `data-theme="light|dark"` on `<html>` (set in `layout.tsx`).
  The prototype's `theme.js` runtime overrides these vars on `:root` — port that to a
  `ThemeProvider` (F3), not next-themes-from-scratch.
- **Fonts:** General Sans (display/body) + JetBrains Mono (numbers/labels/prices) load
  via the token CSS — do **not** use `next/font`/Geist.
- **CSS gotcha:** `@import` must precede all other rules (Turbopack rejects otherwise).

## Prisma
- Generated client is gitignored at `src/generated/prisma`. Run `npx prisma generate`
  after any `schema.prisma` change.
- Import the client from the singleton only: `import { prisma } from "@/lib/prisma"`.
  Never `new PrismaClient()` ad hoc (driver-adapter + HMR connection reuse).
- `DATABASE_URL` lives in `.env` (gitignored; see `.env.example`). The CLI reads it via
  `prisma.config.ts`; the runtime client gets it through the `PrismaPg` adapter.
- Migrations: `npx prisma migrate dev --name <change>`. Inspect data: `npx prisma studio`.

## Brand & content conventions (from `../readme.md`)
- **Turkish**, editorial, confident — never corporate filler. **No emoji** (use → ↗ glyphs).
- Sentence case for headings/body; **mono labels are UPPERCASE** with wide tracking.
- Numbers/dates/prices/scores always in **mono**. CTAs are verb-first, 1–2 words.
- Brand name is centralized (prototype: `brand/brand.js`); keep a single source of truth here too.

## Layout
```
web/
├─ src/app/        App Router (layout.tsx, page.tsx, globals.css)
├─ src/lib/        prisma.ts singleton, future server utilities
├─ src/styles/     marka.css + tokens/*  (design system)
├─ src/generated/  Prisma client (gitignored)
└─ prisma/         schema.prisma, migrations/
```

## Commands
- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build (run before declaring work done)
- `npm run lint` — ESLint
- `npx prisma generate | migrate dev | studio` — Prisma workflows
