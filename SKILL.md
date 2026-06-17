---
name: marka-design
description: Use this skill to generate well-branded interfaces and assets for Marka, an Awwwards-calibre creative-agency + academy + marketplace platform — for production or throwaway prototypes/mocks. Contains the editorial design language, electric-green palette, General Sans + JetBrains Mono type, motion principles, reusable components, and a full website UI kit.
user-invocable: true
---

Read `readme.md` in this skill first — it holds the brand context, content fundamentals,
visual foundations, and iconography. Then explore the other files.

**Foundations:** `styles.css` (entry point) → `tokens/*.css` for colors, type, spacing, motion.
**Brand name:** centralised in `brand/brand.js` (`BRAND_NAME` = "Marka") — change it there to
rename everywhere.
**Components:** `components/**` (React, exposed on `window.MarkaCreativeAgencyDesignSystem_68806e`).
**Full screens:** `ui_kits/website/` (homepage) and `pages/` (skeleton secondary pages).

If creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets/tokens out
and produce static HTML files for the user to view — link `styles.css`, reuse the component
classes/patterns from `ui_kits/website/site.css`, and bring in `motion.js` for the signature
scroll-reveal / magnetic-cursor / parallax interactions (it degrades gracefully).

If working on production code, read the rules here to design as an expert in this brand:
editorial grid, big tight-tracked General Sans headlines, mono labels/numbers, hairline borders,
flat cards that zoom on hover, electric-green accent, restrained premium motion, and **no emoji**.

If the user invokes this skill with no other guidance, ask what they want to build, ask a few
focused questions (surface, light/dark, motion intensity, real content vs. placeholder), then act
as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
