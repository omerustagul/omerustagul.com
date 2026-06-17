# Marka — Creative Agency Design System

**Marka** is the design system for an Awwwards-calibre creative agency **and** community
platform: an editorial, premium, motion-rich brand spanning a studio portfolio, an
academy (courses), an inspiration/blog hub, and a digital-product marketplace.

> Slogan: **"Dijitalde yeni standart."** (The new standard in digital.)

The brand name is intentionally a placeholder — **"Marka"** (Turkish for *brand*) — wired to a
single source of truth so it can be renamed everywhere at once (see *Brand name* below).

## Sources & provenance
- **Brief:** original generative brief (Turkish) for an Awwwards-inspired agency + academy +
  marketplace platform. Reference mood: <https://www.awwwards.com/>.
- **Attached codebase:** `stepofstep.com/` was attached but mounted **empty** (connection
  dropped). Per the user, we **built fresh from the brief** rather than recreating it. If you
  reconnect that codebase, revisit token values and component patterns against it.
- This is an **original** system — not a recreation of any company's proprietary UI.

## Brand decisions (locked with the user)
| Decision | Value |
|---|---|
| Accent | Electric green `#16D17F` (`--accent`) on off-white/near-black |
| Type | **General Sans** (Fontshare) display + body; **JetBrains Mono** for labels/scores/prices |
| Corners | Slightly rounded, 8–12px |
| Themes | Light (default) + Dark via `[data-theme="dark"]` |
| Brand name | Centralised — change once, propagates everywhere |

### Brand name (single source of truth)
`brand/brand.js` exports `BRAND_NAME`, `BRAND_SLOGAN`, `BRAND_SOCIAL` and also sets
`window.MarkaBrand` / `window.MARKA`. The `<Logo>` component defaults its text to `BRAND_NAME`;
UI-kit pages read `window.MARKA`. **Edit `brand/brand.js` and every surface updates.**

---

## CONTENT FUNDAMENTALS
How Marka writes.

- **Language:** Turkish, throughout. Confident, editorial, never corporate-filler.
- **Voice:** "We" implied, addressed to "you" (informal-but-respectful *sen/siz* blend leaning
  warm-professional). Example: *"Markaları geleceğe taşıyoruz."*, *"Projeni bizimle başlat."*
- **Tone:** Premium, minimal, bold. Big claims backed by specifics (*"%32 dönüşüm artışı"*),
  never vague hype.
- **Casing:** Sentence case for headlines and body. **Mono labels are UPPERCASE** with wide
  tracking (eyebrows, tags: `ÖNE ÇIKAN İŞ`, `PROJE`, `DİJİTAL ÜRÜN`).
- **Numbers:** Always in mono — scores (`4.9 / 5`, `9.2`), dates (`12 Haz 2026`), prices
  (`59 USD'den`, `₺1.299`), counters (`240+`). Turkish price suffixes attach directly (`'den`).
- **Eyebrows:** short, label-like, prefixed with a short accent tick line. e.g. `SON PROJELER`,
  `AKADEMİ`, `GÜNCEL YAZILAR`.
- **CTAs:** verb-first, 1–2 words. `Teklif Al`, `Projeyi İncele`, `Üye Ol`, `Tümünü Gör`,
  `Market'e Git`, `İletişime Geç`.
- **Emoji:** none. The brand uses typographic glyphs and arrows (→ ↗) instead.
- **Vibe:** an award-winning studio that is meticulous, calm, and quietly confident.

---

## VISUAL FOUNDATIONS
- **Layout:** 12-column editorial grid, **wide gutters** (`--gutter`, clamps to 5rem), generous
  vertical rhythm (`--section-y`). Asymmetry is welcome (1.4fr/1fr blog split, off-set heros).
- **Negative space:** abundant. White space is a design element, not leftover.
- **Color:** off-white `#FAFAFA` paper, near-black `#0A0A0A` ink, a single **electric-green**
  accent. Neutrals are a true grey ramp. Dark mode flips semantics; green is constant.
- **Type:** General Sans grotesk, **very large** display sizes with **tight tracking**
  (`--ls-display: -0.03em`), `line-height` near 0.95 on monsters. Mono (JetBrains) for any
  number/label. Display scale is fluid (`clamp`).
- **Borders:** **hairline** `1px solid var(--border)` (#DDD light / #2A2A2A dark). Used to
  separate sections, rows (services accordion), filter bars — not boxes-everywhere.
- **Corners:** 8–12px on cards/inputs; pill (`--radius-pill`) on buttons, badges, chips.
- **Shadows:** restrained. Cards are **borderless/flat by default**; lift (`--shadow-lift`) only
  appears on hover/elevated surfaces. No ambient drop-shadow soup.
- **Cards:** image/placeholder on top (rounded 12px) + text below. No border, no shadow at rest;
  hover = image **zoom (scale 1.05)**, title gets an **animated green underline**, and a
  magnetic cursor label ("Projeyi Gör →") fades in.
- **Imagery:** real images are user-supplied later; until then we use **neutral placeholder
  frames** (subtle two-tone gradient + corner mono caption) — never fake/AI imagery, never
  hand-drawn SVG scenes. Hue-rotation gives variety across a grid.
- **Backgrounds:** flat paper or flat ink. No gradient-wash backgrounds. The only gradients are
  the faint placeholder fills and hero scrim (a fade-to-paper for text legibility).
- **Animation:** premium & fast (220–560ms), expo-out easing (`--ease-out:
  cubic-bezier(0.16,1,0.3,1)`). Signature moves: **scroll-reveal** (fade + 24px rise, staggered),
  **mask reveal** headlines (lines wipe up), **parallax + scale** on hero/media, **magnetic**
  buttons, a **custom cursor** that grows and shows a label over interactive media, **marquee**
  partner strip, **count-up** stats, mega-menu + full-screen mobile overlay. All gated on
  `prefers-reduced-motion` and degrade to visible if the paint loop is unavailable.
- **Hover states:** links get an accent underline grow; buttons darken (primary) or fill-wipe
  green (secondary); cards zoom; rows in the services list expand and reveal a description.
- **Press states:** buttons `scale(0.97)`; icon buttons `scale(0.92)`.
- **Transparency/blur:** only the **stuck header** (backdrop-blur 14px over translucent paper)
  and the floating hero-variant control. Used sparingly, for chrome that floats over content.
- **Focus:** visible 2px accent ring (`--focus-ring`) with offset — accessibility first.

---

## ICONOGRAPHY
Marka is deliberately **typographic-first** — true to minimal award-winning sites.
- **Glyphs as icons:** arrows (`→ ← ↗`), plus/close (`＋ ✕`), chevrons (`⌄`), theme toggle
  (`☾ ☀`), hamburger (`≡`), stars (`★`). These are Unicode/text, styled with the type system —
  no icon font required, perfectly crisp, and inherit color.
- **Social:** rendered as real **brand glyphs** (Instagram, LinkedIn, X, YouTube, Dribbble, Behance)
  via the **Simple Icons** CDN (`https://cdn.simpleicons.org/<slug>`), masked with CSS `mask-image`
  so they inherit `currentColor` and recolor on hover. Shown in the header (desktop), the footer
  (all widths), and the mobile overlay. Accounts are driven by `BRAND_SOCIAL` in `brand/brand.js` —
  add/remove an entry and every surface updates. **Substitution note:** Simple Icons is a CDN brand-icon
  set (CC0); no logo PNGs are bundled. LinkedIn (dropped from Simple Icons) is **self-hosted** at
  `assets/social/linkedin.svg` and routed locally; the other five load from the CDN.
- **Star rating:** a tiny inline SVG star in the `Rating` component (the one intentional inline
  SVG — a generic 5-point star, not brand art).
- **Emoji:** never.
- **If you need a richer icon set** (line icons for a dashboard, etc.), use **Lucide**
  (`https://unpkg.com/lucide@latest`) — thin 1.5–2px stroke, rounded joins — which matches this
  system's weight. *(Substitution flag: no project icon font was supplied; Lucide is the
  recommended CDN match, not an existing asset.)*
- **Logo:** wordmark only (`Marka.` with a green accent dot). No symbol mark. See
  `guidelines/brand-wordmark.html` and the `Logo` component.

---

## INDEX / manifest
Root files:
- `styles.css` — **the entry point** consumers link (import manifest only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `base.css`.
- `brand/brand.js` — brand name/slogan/social, single source of truth.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — reusable primitives (see below).
- `ui_kits/website/` — the **full homepage** UI kit + screen components + interaction layer.
- `pages/` — skeleton secondary pages (Portfolio, Project, Blog, Academy, Market, About, Contact).
- `SKILL.md` — Agent-Skill front-matter for downloadable use.

**Components** (`window.MarkaCreativeAgencyDesignSystem_68806e.<Name>`):
- core/ — `Button`, `IconButton`, `Logo`, `Badge`, `Tag`, `Avatar` + `AvatarStack`, `Rating`,
  `SectionHeading`
- forms/ — `Input`, `Select`
- media/ — `Media`, `Marquee`
- cards/ — `ProjectCard`, `CourseCard`, `BlogCard`, `ProductCard`

**UI kit — website:** `ui_kits/website/index.html` is the complete homepage (hero with 3
explorable directions, latest works, partners marquee, services, academy, blog, market, CTA
blocks) composed from `parts.jsx`, `Hero.jsx`, `Sections.jsx`, `app.jsx`, with `site.css` +
`motion.js` (the interaction layer). The header + footer come from the **shared site-chrome**.

**Theme system (`theme/`) — drives the live site:**
- `theme/theme.js` — single source of truth for live appearance: header template, footer
  template, accent color, light/dark mode, font family, corner radius. Persisted in
  `localStorage('mk-theme')`, applied as CSS custom-property overrides on `:root`, and
  broadcast across tabs/iframes via the `storage` event. `window.MarkaTheme` API:
  `get() · set(patch) · reset() · subscribe(fn)` plus catalogs (`ACCENTS`, `FONTS`,
  `HEADER_TEMPLATES`, `FOOTER_TEMPLATES`).
- `theme/site-chrome.js` — **one** header + footer for every page, rendered into
  `#mk-header` / `#mk-footer` from `window.MK_BASE` (path to project root). 4 header templates
  (classic / centered / minimal / split) + 2 footer templates (columns / compact) + shared
  mobile overlay. Re-renders live when the admin changes a template. Used by the homepage AND
  every `pages/*.html`, so the chrome is identical site-wide.

**UI kit — admin (`ui_kits/admin/`):** a modular control panel (editorial brand language).
`index.html` + `admin.css` + `admin-data.js` (mock data + `ai()` helper) + `admin-core.jsx`
(atoms) + `modules-main.jsx` (Dashboard, **Görünüm & Tema**, **İçerik/Blog**, **AI Raporlar**)
+ `modules-skel.jsx` (Projeler, Kurslar, Market, Kullanıcılar, Medya, SEO, Ayarlar) + `app.jsx`
(shell). Highlights:
- **Görünüm & Tema** edits the live theme (header/footer template, palette, font, mode, radius)
  with an **embedded live preview** of the real homepage that updates instantly.
- **Blog** and **SEO** and **Raporlar** call **real Claude** via `window.claude.complete`
  (graceful simulated fallback when unavailable — works offline/downloaded).

**Foundation cards** populate the Design System tab (groups: Colors, Type, Spacing, Brand,
Components, Website, Admin).
