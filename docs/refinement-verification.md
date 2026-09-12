# Homepage refinement verification

Verified on 12 September 2026 against `aa54f76168d2a0cc0383d4f88ced53f91b648a0e`. The following documentation commit changes no application behavior. [PR #5](https://github.com/Ouroboros-Org/Marc-Berghoff-Homepage/pull/5) integrates the self-check workstream ([PR #6](https://github.com/Ouroboros-Org/Marc-Berghoff-Homepage/pull/6)), motion workstream ([PR #7](https://github.com/Ouroboros-Org/Marc-Berghoff-Homepage/pull/7)), and root copy, composition, CTA and footer changes. Workstreams used separate branches and worktrees.

This report supersedes the initial report's homepage measurements and description of the self-check location. Earlier asset, contact and route-cleanup evidence remains in [the initial verification](redesign-verification.md).

## Changes reviewed

The hero addresses the reader in two sentences: “Build the organisation you want to lead. Work with a Fractional CPO.” A simulated skeptical-founder critique compared three copy directions; it informed the wording but is not user research. The supporting excerpt explains both advisory involvement and responsibility for an agreed remit.

The homepage now runs from hero and metrics to the personal introduction, case study, short self-check invitation, engagements, qualification, Insights and closing. The introduction has imagery on the left; the case reverses that composition on desktop and puts its numerical result first on mobile. Book a call is navy with a calendar icon; Start self-check is yellow with a checklist icon. The centered closing action leads into a compact white footer with two navigation columns on mobile.

The independent `/self-check` page offers perspective on company patterns. `/bottleneck-assessment` describes the paid service and contains no questionnaire. Self-check results use neutral recurring-signal labels, with optional conversation and sharing choices in every result band.

## Automated checks

All checks passed with installed dependencies:

```sh
node node_modules/eslint/bin/eslint.js .
node node_modules/vitest/vitest.mjs run
node node_modules/next/dist/bin/next build --webpack
node node_modules/typescript/bin/tsc --noEmit
```

- 125 tests passed across 15 files.
- ESLint and TypeScript reported no errors.
- The production build completed, including `/self-check`.
- Motion tests cover first appearance, observer cleanup, focus, preference changes, frame cancellation, final-value formatting and visible server output.
- Independent review found and resolved a print issue: unvisited reveal content and exact outcome values now remain visible in print. Source review also checked hover/focus contrast and preserved navigation behavior; no material findings remain.

## Responsive and visual checks

The connected browser is Chromium. Browser QA used the fresh local production build on port 3100. Values below are rounded document coordinates after fonts loaded. Each pair is the bottom edge of the button and its associated helper text.

| Viewport | Book a call / helper | Start self-check / helper | Horizontal overflow or clipped text |
| --- | ---: | ---: | --- |
| 320 × 740 | 568 / 612px | 679 / 705px | None |
| 360 × 800 | 508 / 534px | 601 / 627px | None |
| 390 × 844 | 508 / 534px | 601 / 627px | None |
| 430 × 932 | 497 / 523px | 591 / 617px | None |
| 768 × 1024 | 498 / 544px | 498 / 544px | None |
| 1024 × 768 | 529 / 575px | 529 / 575px | None |
| 1280 × 720 | 497 / 543px | 497 / 543px | None |
| 1366 × 768 | 609 / 655px | 609 / 655px | None |
| 1440 × 900 | 633 / 679px | 633 / 679px | None |
| 1920 × 1080 | 674 / 720px | 674 / 720px | None |

Both buttons and helpers fit inside every tested first viewport. Screenshots and normal scrolling checked the laptop hero, introduction, case, teaser, engagement cards, closing and footer, plus mobile reading order, metrics, self-check page and navigation. The closing button center matches the section center at both 390px and 1366px viewport widths.

## Motion and interactions

- Server output exposes the exact final metrics. After hydration, below-viewport entrances arm without hiding content already being viewed.
- Actual first-appearance counting was observed at intermediate values `35 → 131`, `>84%`, `€30k → €297k` and `4 years`, then settled to the exact approved `35 → 150`, `>100%`, `€30k → €350k` and `5 years`.
- Reveal state changed from pending to running during scrolling. Returning to viewed content did not restart entrances or counters. Accessible text retained the final claims while visual figures changed.
- The desktop Self-check shortcut opened `/self-check`. Mobile navigation showed distinct yellow Self-check and navy Book a call actions; Escape closed it and restored focus to Open navigation.
- Ten True answers produced the expected 7/10 result, now headed “Several recurring signals.” No email was needed to see it.
- Share with Marc opened the optional form and focused Email. An invalid address produced inline feedback. Reset cleared checked answers, result and sharing state, restored 0 of 10 progress and disabled the result button.
- No browser console errors or warnings were captured. No real form submission was made.

Reduced-motion and print behavior were verified through focused tests and source review, not an actual browser preference or print-preview session. Safari on the reported MacBook Air was unavailable and remains unverified.

## Targeted route check

An independent read-only check made six HTTP GETs against the integrated production server:

- Home, Services, Self-check and Bottleneck Assessment all returned 200, declared `en-GB`, and had correct self-canonicals.
- Only `/self-check` contained the questionnaire: ten fieldsets and twenty radio inputs. Source search confirmed one render location.
- No obsolete links to a questionnaire on the paid assessment page remained.
- All nine relevant section targets resolved.
- The sitemap returned 200 and listed each relevant route exactly once.

The check made no POST requests and found no material defects. Production inbox delivery, calendar configuration and legal-provider details retain the limits recorded in the initial verification.
