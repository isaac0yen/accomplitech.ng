---
sessionId: session-260904-172902-gb3x
---

# Requirements

### Overview & Goals
Keep Create React App as-is. Do a focused visual and copy pass so the site reads as a real Lagos training school, not a square template. Header, About, gallery, and contact form stay. Work is concentrated on hero, stats, clients collage, course cards/copy, a light corporate large-screen polish, and a small footer touch.

### Scope
**In scope**
- Large-screen hero: copy (eyebrow → title → lede → two buttons) fills the viewport under the sticky masthead. Photo and stats are *below* the fold.
- Below the fold on large screens: cohort photo **left**, stats **right**, with a real two-column alignment (not four cramped centered columns).
- Hero copy shortened so a non-technical visitor can read it in one glance, especially on mobile.
- Clients: collage using known logo aspect ratios (UBA 198×140, Vitafoam/Fruitylife/MyCIL ~square, AIPL 489×103).
- Course cards: less identical boxes; clearer, plainer copy; still no decorative AI-slop (gradients, blobs, fake 3D).
- Team-training block: large-screen alignment only.
- Footer: small polish only.

**Out of scope**
- New stack, routing, CMS, animations library.
- Header / About / gallery / form redesign.
- New photography or logo files.

### Functional Requirements
- Masthead unchanged on desktop and mobile.
- First viewport on ≥701px is copy + CTAs only; image+stats appear on scroll.
- Mobile: no hero photo (current behaviour); copy is shorter; stats remain readable in one row or a clean 2×2 if four-up still fails.
- Course register links still use `registrationUrl`; team training still goes to `#contact`.
- Content still lives in `src/config/site.config.js`.

### Non-Functional
- No new dependencies.
- Keep existing tokens in `src/styles/foundation.css` (paper, ink, purple, accent).
- Avoid vibe-coded tells: no gradient text, glass, random blobs, identical equal-height gimmicks, or fake testimonials.

# Technical Design

### Current Implementation
Single-page CRA: `App.js` stacks `SiteHeader` → `Hero` → `FactStrip` → `About` → `Clients` → `Courses` → `Gallery` → `Contact` → `Footer`.

Hero (`Hero.js` + `.hero` in `App.css`) is a **column**: copy then a wide 2.6:1 photo, `min-height: 100dvh - nav`. Photo hidden ≤700px. Stats are a separate full-width strip of four centered columns — that is why they look misaligned.

Clients are a wrap row of `height: 64px` logos. Courses are a 3-up grid of identical bordered cards; first three shown, rest behind a toggle. Corporate is a dark two-pane box.

### Key Decisions
1. **Do not merge FactStrip into Hero.** Keep two components; change *order of what fills the first screen* via CSS/layout, not a new subsystem.
2. **Hero first screen = copy only** on large screens (user request). Photo + stats form the next band.
3. **Photo left / stats right** on large screens: wrap photo + `FactStrip` in a shared layout class in `App.js` (minimal markup change) rather than stuffing stats into `Hero.js`.
4. **Copy stays in `site.config.js`** for courses; hero strings stay in `Hero.js` but get shortened.
5. **Cards stay CSS-only.** Differentiation via type hierarchy, one accent rule, and slightly uneven padding — not icons-per-card or bento kitsch.

### Proposed Changes
**Hero**
- Short title (what you learn, where). Short lede (six tracks, two class times, campus or online) — no stacked jargon list in one sentence.
- `.hero` remains `min-height: calc(100dvh - var(--nav-h))` and **does not include the photo** on large screens.
- Move the photo out of the first viewport into the next band.

**Photo + stats band**
- New wrapper in `App.js` (e.g. `.proof`): grid `1.15fr 0.85fr` from 861px up.
- Left: existing `cohort-group` image, `object-fit: cover`, taller crop (~4:5 or 1:1), not 2.6:1 strip.
- Right: `FactStrip` as a **2×2 grid**, each cell `align-items: start; text-align: left`, shared left padding, numbers tabular, labels wrapping on two lines. No vertical centering of mixed-length labels.
- Mobile: photo still omitted; stats full width under hero.

**Clients collage**
- CSS grid with explicit tracks using known ratios: three squares + UBA slightly wide + AIPL spanning a wide cell. Uneven sizes on purpose so it reads as a collage, not a logo ticker.

**Courses**
- Rewrite summaries in `site.config.js` to plain English (who it is for + what you leave with).
- Split long Data Analysis price onto two lines in CSS (`white-space` / stacked `dd`).
- Card: left 3px purple edge, title larger, tools as text not chips-in-boxes if that still feels square; keep duration + fee + Register.
- Keep 3-up + “view more” — do not add libraries.

**Corporate / footer**
- Corporate: `align-items: start`, aside not vertically stretched; CTA stays.
- Footer: spacing/type only.

### File Structure
- Modify: `src/App.js`, `src/App.css`, `src/components/Hero.js`, `src/components/FactStrip.js`, `src/components/Clients.js`, `src/components/Courses.js`, `src/config/site.config.js`, `src/components/Footer.js` if needed.
- Do not add packages or new pages.

### Risks
- First-screen-only-copy can feel empty if type is too small — use existing clamp title sizes and vertical centering.
- Collage can overflow on tablet — collapse to two rows under 860px.
- Do not reintroduce bit.ly; keep Google Form URL.

# Testing

### Validation Approach
Manual in the browser at ~1280px and ~390px. No new test files.

### Key Scenarios
- Desktop: first screen is header + hero copy + two buttons only; scroll shows photo left / stats right, aligned.
- Mobile: header hamburger works; hero copy readable without horizontal overflow; no hero photo; stats still legible.
- Clients collage does not clip AIPL wordmark; logos keep intrinsic ratios.
- Course Register opens the Google Form; Team training CTA jumps to `#contact`.
- About, gallery, form unchanged in behaviour.

### Edge Cases
- 701–860px: photo+stats stack or stay grid without overlapping masthead.
- `courses__toggle` still reveals remaining tracks.

# Delivery Steps

### ✓ Step 1: Hero first screen + photo/stats band
Large-screen first viewport is copy only; the next band is photo left and stats right, properly aligned.

- Shorten hero title and lede in `Hero.js` so six tracks and class times are readable (especially mobile).
- Remove the photo from the first-screen `.hero` layout in `Hero.js` / `App.css`.
- Add a `.proof` wrapper in `App.js` around the photo and `FactStrip`.
- CSS: desktop grid photo | 2×2 stats, left-aligned cells, consistent gaps; mobile stats-only under hero.
- Keep `useShowHeroPhoto` so small screens never fetch the image.

### ✓ Step 2: Clients collage + course cards and copy
Logos read as a collage; course cards and catalogue copy feel less templated and easier for non-technical visitors.

- Rebuild `.clients__row` as a ratio-aware CSS collage using widths/heights already in `site.config.js`.
- Rewrite course `summary` (and light title tweaks if needed) in `site.config.js`.
- Restyle `.course` in `App.css` (accent edge, type, price wrapping) without new icons or effects.
- Touch corporate two-pane alignment on large screens and a small footer spacing pass.
- Spot-check 1280px and 390px: header, about, gallery, form untouched in behaviour.