# Site-wide refinement verification

Verified on 12 September 2026 against application revision `142c42b`. The following documentation commit changes no application behavior. [PR #8](https://github.com/Ouroboros-Org/Marc-Berghoff-Homepage/pull/8) integrates the mobile navigation workstream ([PR #9](https://github.com/Ouroboros-Org/Marc-Berghoff-Homepage/pull/9)), public copy ([PR #10](https://github.com/Ouroboros-Org/Marc-Berghoff-Homepage/pull/10)), secondary-page design ([PR #11](https://github.com/Ouroboros-Org/Marc-Berghoff-Homepage/pull/11)), and root typography, proof styling and integration fixes. Each workstream used its own branch and worktree.

This report covers the site-wide follow-up. The [homepage refinement report](refinement-verification.md) retains the earlier hero, section-order, motion and self-check interaction evidence. [Initial verification](redesign-verification.md) records asset and external configuration limits.

## Result

- All five testimonial instances on Home, Selected work and the Klarsolar case use italic text and opening/closing quotation marks. Existing font packages now supply real italic faces. Approved wording and attribution are preserved.
- The fit section uses green checks and red minus markers. Their contrast against the section background is approximately 6.62:1 and 6.87:1. Icon shapes and headings also convey the distinction.
- Mobile menu links reserve equal text padding in normal and selected states. Stable scrollbar space prevents accordion expansion from shifting the menu. Only the active group title receives the underline.
- Services, About, Results, Contact, Insights, Self-check, legal pages and the missing-page template share the navy/white palette, type scale, gutters and action treatment. Compositions still follow the content: personal narrative with images, concise engagement explanations and readable articles/cases.
- Shared closing invitations use a navy background, a centered action and associated helper text. Short entrances apply to headings, images, cards and invitations; long story/article prose and form controls remain immediately readable. Results and case metrics reuse the existing first-appearance counter.
- Public copy addresses the reader and explains who carries responsibility. Fractional CPO support can continue as needed; duration is flexible. The independent Self-check remains separate from the paid Bottleneck Assessment. Assessment terms and evidence remain intact.

## Automated and independent review

The installed-dependency commands passed:

```sh
node node_modules/eslint/bin/eslint.js .
node node_modules/vitest/vitest.mjs run
node node_modules/next/dist/bin/next build --webpack
node node_modules/typescript/bin/tsc --noEmit
```

- 132 tests passed in 16 files, including selected-page navigation and unique CTA/helper associations.
- The first full test run found an assertion still expecting the old assessment copy. Both expectations now match the reader-facing wording; the full suite then passed.
- The final two presentation fixes received a new production build, lint, TypeScript, independent source review and targeted responsive checks. They change no application logic.
- Independent review found and resolved missing helper associations and a tall About-page reveal wrapper. The final review found no material issues.

## Browser checks

QA used Chromium and the local production server on port 3100. All 17 current pages received DOM layout checks at **390 × 844** and **1280 × 720**. Every page had one main heading, no horizontal overflow, no clipped block text in the checked heading/body/footer elements and no missing `aria-describedby` targets. This is a responsive DOM check, not a claim that every pixel of all 34 combinations was inspected.

Screenshots and normal scrolling checked the major templates: About, Contact, Services, Fractional CPO, paid assessment, Results, case detail, Insights overview, article, Self-check and legal pages. Checks included mobile contact controls, Results metrics at 320px and 390px, article contents at 768px, the contact grid at 1024px, and shared closing/footer compositions at 390px and 1280px.

| Target | Observation |
| --- | --- |
| Selected Contact menu at 390px | Marker begins at 52px and text at 64px; 12px clear spacing. The About accordion button's right edge stays at 355px before/after expansion. |
| Selected Advisory and article menus at 320px | Active padding and group labels remain readable without overflow. |
| Selected Self-check at 320px | Yellow shortcut exposes the current-page state; no unrelated group is selected. |
| Escape from the final Contact menu | Menu closes, focus returns to Open navigation and body scroll lock clears. |
| Results closing at 390px | Button and section centers both measure 187.5px. |
| Results closing at 1280px | Button and section centers differ by less than 0.02px. |
| All testimonial pages | All five quote paragraphs have computed italic style and both quotation marks. |
| Case metrics | Counting appeared during entry, then settled to the approved `35 → 150` and `>100%`. |

Final visual corrections removed a duplicated call-duration aside from Contact and kept the highlighted “Fractional CPO.” phrase together. Both affected pages were rechecked at widths of 320, 390, 768, 1024 and 1280px without horizontal overflow or clipped headings. The complete phrase measures about 255px inside the 280px heading column at 320px.

The final production browser tab recorded no console warnings or errors. No real form submissions were made. The local booking embed showed the existing email fallback; calendar configuration and inbox delivery retain their previously recorded verification limits. Actual Safari on the reported MacBook Air remains unverified. Reduced-motion and print behavior retain the focused test/source-review evidence from the previous refinement; no new browser preference or print-preview test is claimed here.

## Routes and indexing

An independent GET-only audit of integrated revision `1086edc` checked all 17 current pages; the subsequent two presentation fixes do not change routes or metadata.

- 17/17 pages returned 200 with valid titles, descriptions, canonical links and Open Graph URLs, and declared `en-GB`.
- 56 internal destinations resolved, including 39 hash targets. All 17 article contents links matched their section IDs.
- All 27 JSON-LD blocks parsed. Privacy and imprint retained `noindex, follow`; the missing-page check returned 404.
- Questionnaire inputs occurred only on `/self-check`. Home links there, while the paid assessment page describes the service.

The audit made no POST requests or external submissions and found no material defects.
