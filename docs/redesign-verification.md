# Fractional CPO redesign verification

Verified on 12 September 2026 against the integrated implementation at `f31a1e2`. The final documentation commit does not change application behavior. The work is collected in [PR #1](https://github.com/Ouroboros-Org/Marc-Berghoff-Homepage/pull/1), with separate service, editorial and homepage workstreams merged through PRs #2, #3 and #4.

## Automated checks

All checks passed using the installed dependencies and direct Node entry points. The local pnpm wrapper attempted dependency installation, so it was not used for validation.

```sh
node node_modules/eslint/bin/eslint.js .
node node_modules/vitest/vitest.mjs run
node node_modules/next/dist/bin/next build --webpack
node node_modules/typescript/bin/tsc --noEmit
```

- ESLint: no errors or warnings.
- Vitest: 99 tests passed across 13 files, including diagnostic scoring, contact validation, delivery-adapter behavior, configuration and route/content checks.
- Production build: successful compilation, type checking and static generation.
- TypeScript: no errors against generated production route types.

Vercel reported a successful deployment status for `f31a1e2`. Browser checks below used the local production server on port 3100; this is not evidence of the configuration or inbox delivery of the public deployment.

## Homepage at common viewport sizes

The connected browser is Chromium. Measurements use document coordinates after fonts load. Each value is the bottom edge of the hero button; helper copy is outside the button.

| Viewport | Book a call | Start the check | Horizontal overflow / clipped text |
| --- | ---: | ---: | --- |
| 1280 × 720 | 480px | 480px | None |
| 1366 × 768 | 534px | 534px | None |
| 1440 × 900 | 554px | 554px | None |
| 1920 × 1080 | 582px | 582px | None |
| 1024 × 768 | 465px | 465px | None |
| 768 × 1024 | 478px | 478px | None |
| 430 × 932 | 411px | 504px | None |
| 390 × 844 | 422px | 516px | None |
| 360 × 800 | 412px | 506px | None |
| 320 × 740 | 412px | 524px | None |

At 1280 × 720, the old buttons ended around 753px and were cut off. At 360 × 800, the old second button ended around 825px. Both actions now fit within those first viewports.

Visual inspection covered the complete desktop homepage and mobile sections: hero, four metrics, three engagement cards, Klarsolar case, testimonials, assessment teaser, working photographs, qualification, Insights and footer. Images were checked after normal scrolling triggered lazy loading. Case-study and article layouts, an article section link, and the Fractional CPO service hero were also inspected at 390 × 844.

## Interaction and navigation

- Mobile navigation opens with focus in the menu. Escape closes it, restores focus to the trigger and releases the body scroll lock.
- Desktop Arrow Down opens the service dropdown and focuses its first link. Escape closes it and restores trigger focus.
- A homepage check link opens `/bottleneck-assessment#bottleneck-check`.
- The assessment requires ten answers before showing a result. Ten True answers produce the expected 7/10 High result, without requesting an email.
- Optional sharing opens only on request and focuses Email. An invalid email produces inline feedback. Reset clears answers, the result and sharing state, returns progress to zero and disables the result button.
- Empty contact submission shows field-specific feedback and focuses Name. The booking fallback uses `contact@marcberghoff.com`.
- No browser console errors or warnings were captured during the production interaction checks. No real enquiry or result was sent.
- Independent source review checked navigation, route cleanup, proof, reduced-motion handling, readable hover/focus colors and reveal cleanup. Entrances leave server-rendered content visible, run once per mount and cancel when reduced motion is requested. No remaining material findings were reported.

## First-indexing route audit

A separate read-only HTTP crawl began at 14 pages and examined 758 anchor occurrences. It excluded 62 external or non-HTTP destinations and checked 696 internal links.

- All 16 distinct destination pages returned 200, declared `en-GB`, and had the correct self-canonical on `https://marcberghoff.com`.
- All 37 unique section targets resolved.
- All seven sampled retired or unknown routes returned direct 404 responses.
- The audit made 23 HTTP GET requests, with no redirects or form submissions.

English-only route metadata, sitemap, articles and the Klarsolar detail page are included in the build. Obsolete German and service routes have no compatibility redirects.

## Assets and remaining external checks

The enhanced hero is a 1037 × 1517 WebP at 97,030 bytes. The workshop image is a 1536 × 1024 WebP at 109,968 bytes. Originals are preserved, and generation details remain in [the internal asset record](generated-images.md). ACC and CPCC artwork links to the owner's verified Credly destinations.

The reported browser was Safari on MacBook Air. The compact-header layout now begins at 70rem; both prefixed and unprefixed backdrop filters are reset there so a fixed mobile panel is not contained by the header filter. Hero spacing was revised using the measured laptop constraints. An actual Safari engine was unavailable, so Safari reproduction and acceptance remain unverified.

The owner confirmed the public mailbox works. Local Google Forms mappings are configured, but Google Forms inbox notifications and live delivery were not tested. See [delivery setup](google-forms-setup.md). The local calendar link and legal address are unset: booking offers the verified email fallback, while incomplete legal pages remain noindex. Confirm the corresponding production settings before treating calendar booking or complete legal publication as ready.
