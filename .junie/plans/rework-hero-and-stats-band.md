---
sessionId: session-260904-180008-o5dt
---

# Requirements

### Overview & Goals
Move the `cohort-group` image into the hero as a true background treatment with a readable overlay, then redesign the current stats area so it reads as a cleaner horizontal band on large screens.

### In Scope
- Use the `cohort-group` asset family as the hero background source.
- Add a dark overlay so the hero copy stays readable on top of the image.
- Ensure the hero background does not repeat and fills the hero area (`cover`).
- Make the first screen fit cleanly without an initial page scroll caused by the hero/header combination.
- Let the masthead sit transparently over the dark hero, then switch into its solid scrolled state once the page moves.
- Rework the current stats/facts section so the items stay in a single horizontal row on larger screens.
- Keep each stat’s number and label on the same line in the large-screen band.
- Keep the mobile/tablet fallbacks responsive instead of forcing one row at every width.
- Normalize the course card layouts so varying copy, pricing and metadata do not make the cards feel uneven.

### Out of Scope
- Rewriting unrelated page sections.
- Inventing new content sources outside `src/config/site.config.js` unless a stat label/value truly needs content changes.
- Large visual-system changes that conflict with the existing site palette and typography.

### Acceptance Criteria
- `Hero` displays the `cohort-group` image behind the copy, with visible text contrast from an overlay.
- The hero image fills the section without tiling and can crop as needed.
- The landing viewport does not show an unwanted page scroll before the user moves down the page.
- The masthead is visually transparent on top of the hero and becomes readable against later light sections after scrolling.
- The old side-by-side proof-image layout is removed or simplified so the image is no longer duplicated below the hero.
- The stats section presents four items horizontally on large screens and degrades cleanly at narrower breakpoints.
- Each stat reads as a single inline fact on large screens instead of a diagonal number/label stack.
- Course cards no longer use the purple left border accent, and their bodies/actions align consistently across cards despite different content lengths.
- The implementation follows the site’s existing React component structure and shared CSS approach.

# Technical Design

### Current Implementation
- `src/App.js` renders `Hero` and then `ProofBand` as separate homepage sections.
- `src/components/Hero.js` is currently copy-only; it has no media layer.
- `src/components/ProofBand.js` currently owns the `cohort-group` photo via `responsive('cohort-group', '720px')` and places it beside `FactStrip`.
- `src/components/FactStrip.js` renders the four stats from `src/config/site.config.js`.
- `src/App.css` styles `.hero` as a text viewport section and `.facts__list` as a `2 x 2` grid.
- `src/media/images.js` is the project’s existing image registry/helper and should remain the source of truth for responsive image assets.

### Research Notes
- MDN confirms `background-size: cover` is the right behavior when the image must fill the container while preserving aspect ratio, accepting crop as the trade-off.
- MDN confirms `background-repeat: no-repeat` is needed to prevent tiling.
- Because `src/styles/foundation.css` explicitly documents “no gradients,” the overlay should preferably be a flat semi-opaque layer rather than a gradient wash.

### Key Decisions
- Keep the existing asset pipeline in `src/media/images.js` rather than hard-coding `/static/media/...` paths into CSS.
- Prefer moving the image treatment into `Hero.js` as a dedicated media/background layer instead of referencing the compiled localhost asset URL directly.
- Use a flat dark overlay to preserve readability while staying consistent with the design rules in `src/styles/foundation.css`.
- Keep the facts driven from `site.config.js`; only the presentation changes unless the labels themselves need refinement.

### Proposed Changes
- Update `src/components/Hero.js` so the hero contains both the text content and a background/media layer sourced from the `cohort-group` image set.
- Add hero structure/classes in `Hero.js` to support:
  - background image layer
  - overlay layer
  - foreground copy layer with correct stacking
- Refactor `src/components/ProofBand.js` so it no longer renders the cohort image beside the stats. Depending on the cleanest result, it should either:
  - become a wrapper that renders only `FactStrip`, or
  - be removed from `App.js` entirely and replaced by `FactStrip` directly.
- Rework `.hero`, `.hero__inner`, and new hero media/overlay classes in `src/App.css` to:
  - preserve the full-viewport behavior under the sticky masthead
  - apply `cover`/`no-repeat`
  - ensure readable foreground contrast
  - respect the existing shell width and spacing rhythm
- Rework `.facts`, `.facts__list`, and `.facts__item` in `src/App.css` so the stats band is horizontal on large screens, likely via a 4-column grid or equivalent single-row layout.
- Keep responsive breakpoints so the four facts can wrap or stack below large-screen widths instead of becoming cramped.

### File Impact
- `src/components/SiteHeader.js`
- `src/components/Hero.js`
- `src/components/ProofBand.js`
- `src/components/FactStrip.js` (markup tweaks if needed for the new band layout)
- `src/components/Courses.js` (markup tweaks for more stable card structure)
- `src/App.js` (only if section composition changes)
- `src/App.css`
- `src/media/images.js` only if a tiny helper extension is needed for background usage; otherwise leave unchanged.

### Risks
- A CSS `background-image` approach can bypass the project’s current responsive `srcSet` image pattern; if that becomes too limiting, an absolutely positioned responsive `<img>` layer inside `Hero.js` is the safer implementation.
- The current `.shell` max width (`1240px`) may make the stats feel less “full-width” than the user expects, so spacing and band treatment need to be chosen carefully.
- If the overlay is too strong, the image loses impact; if too weak, the headline loses contrast.

# Testing

### Validation Approach
- Run the React build/testable UI locally and inspect the hero/stats layout at large and small breakpoints.
- Verify that the hero text remains readable against the image across viewport sizes.
- Confirm that the stats remain one row on large screens and reflow intentionally below that.

### Key Scenarios
- Desktop viewport: hero shows `cohort-group` background with overlay; stats render horizontally in one row.
- Tablet viewport: hero still crops gracefully; stats may reduce spacing or wrap at the intended breakpoint.
- Mobile viewport: no repeated background artifacts; text remains legible; stats remain readable without overflow.

### Edge Cases
- Long stat labels should not break the row awkwardly on large screens.
- The hero background should not create layout shift or place copy behind the sticky header.
- If the hero uses an absolutely positioned image layer, stacking order and pointer behavior should not interfere with buttons.

# Delivery Steps

### ✓ Step 1: Integrate the cohort image into the hero with a readable overlay
`Hero` becomes the single place where the cohort image and first-screen copy are composed together.

- Update `src/components/Hero.js` to include a background/media layer based on the `cohort-group` asset family from `src/media/images.js`.
- Add the overlay and foreground content structure needed to keep the heading, lede, and CTA buttons readable on top of the image.
- Adjust the `.hero*` rules in `src/App.css` so the image fills the hero area with `cover` behavior, does not repeat, and still respects the sticky-header height calculation.

### ✓ Step 2: Remove the duplicate proof-image layout and simplify the section flow
The homepage no longer shows the cohort image again in the old proof band layout below the hero.

- Refactor `src/components/ProofBand.js` so it stops rendering `proof__media` and the old side-by-side image/facts composition.
- Update `src/App.js` only if needed to simplify the section order after the hero absorbs the image responsibility.
- Clean up the now-obsolete `.proof` / `.proof__inner` / `.proof__media` styling in `src/App.css` while preserving the surrounding section rhythm.

### ✓ Step 3: Redesign the stats strip as a horizontal large-screen band
The four numeric facts read as a cleaner horizontal band on desktop and remain responsive below that.

- Rework the layout rules for `FactStrip` in `src/App.css`, changing `.facts__list` from the current 2-column grid to a single-row large-screen presentation.
- Tweak `src/components/FactStrip.js` markup only where needed to support the new spacing, alignment, and visual hierarchy.
- Keep the existing stat values sourced from `src/config/site.config.js`, and verify the breakpoints prevent overflow or cramped labels on smaller screens.

### ✓ Step 4: Make the hero and masthead share the first screen cleanly
The opening viewport should feel like one composed frame: no unwanted initial scroll, readable dark-overlay contrast, and a masthead that can start transparent over the hero.

- Update `src/components/SiteHeader.js` to track whether the page is still at the top so the masthead can switch between transparent-over-hero and solid-scrolled states.
- Rework the masthead and hero sizing rules in `src/App.css` so the first viewport lands cleanly without showing an unnecessary page scroll on load.
- Ensure the transparent state still keeps brand, nav, CTA and mobile toggle readable against the dark overlay.

### ✓ Step 5: Correct the stats alignment and remove the leftover card accent
The numbers band should read horizontally, and the visual treatment should not keep the purple left-border card effect.

- Adjust the `FactStrip` markup/CSS so each stat item aligns its icon, value and label in a single row on large screens while remaining responsive below that.
- Remove the residual purple left-border styling from the relevant cards in `src/App.css`.
- Rebalance spacing and alignment so the stats band still feels clean after the inline treatment.

### ✓ Step 6: Normalize the course card content layout
Course cards should stay visually even even when summaries, fees and other metadata vary in length.

- Refine `src/components/Courses.js` only where needed to group metadata and actions more predictably.
- Rework the `.course*` rules in `src/App.css` to eliminate alternating offsets, stabilize vertical rhythm, and keep footer/action areas aligned across cards.
- Pay special attention to the fee row so long pricing text wraps cleanly without pushing the rest of the card into inconsistent positions.