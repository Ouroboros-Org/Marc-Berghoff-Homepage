# Marc Berghoff design system implementation map

Updated 12 September 2026 for the Fractional CPO redesign.

[DESIGN.md](../../DESIGN.md) is the design source of truth. [context.tsv](../../context.tsv) records owner decisions and verification dependencies. This file maps that direction to reusable implementation rather than maintaining a second set of visual rules.

| Concern | Implementation | Contract |
| --- | --- | --- |
| Color, type and shared browser surfaces | `src/app/globals.css` | White and navy foundation, preserved logo accents, Instrument Sans/Inter, visible focus and themed text selection/caret |
| Buttons | `src/components/button.tsx`, `button.module.css` | Coherent pill actions, 44px minimum targets, coordinated foreground/background states and no continuous animation |
| Homepage content | `src/content/home.ts` | One English copy source with concise Fractional CPO proposition and helpers outside actions |
| Engagements | `src/content/engagements.ts` | Three directly accessible engagements, flexible scope, methods inside the remit |
| Outcomes and testimonials | `src/content/proof.ts` | Shared evidence, intact units, periods, quote wording and attribution |
| Homepage composition | `src/components/home-page.tsx`, `src/app/home.module.css` | Hero, compact proof, personal introduction, case, self-check invitation, three engagements, fit, Insights and closing |
| Entrances | `src/components/reveal.tsx` | Visible server content; one rise/fade after first intersection; no replay on scrolling back; reduced-motion support |
| Outcome numbers | `src/components/outcome-number.tsx`, `src/components/motion` | Once-only counts into exact claims; stable width and accessible final values; immediate final content for reduced motion and print |
| Credential links | `src/components/credential-badges.tsx` | Authoritative ACC and CPCC artwork and Credly destinations, reusable on Home and About |
| Process | `src/components/engagement-process.tsx` | Ordered four-step sequence on Services, distinct from choosing an engagement |
| Navigation and contact | Shared shell and contact components | English-only navigation, direct Self-check shortcut, paid assessment in services, free conversation, preserved keyboard and form behavior |
| Secondary editorial layouts | `src/components/pages/editorial.tsx`, `secondary-pages.module.css`, `utility-pages.module.css` | Shared hero gutters, optional aside column, short CTA labels with associated helpers, navy closing invitations and readable legal/404 templates |
| Testimonial and fit styling | `src/app/globals.css`, `src/app/home.module.css` | Real italic quotations with upright attribution; green checks and red minus markers alongside descriptive headings |

## Fixed commitments

- Marc Berghoff is the public brand. Keep the light-blue/light-yellow logo.
- Fractional CPO is the main proposition. Explain Chief People Officer in plain language.
- Use white for reading, `--navy` for the strongest contrast, blue for supporting surfaces and yellow for precise emphasis.
- Change alignment, composition and density according to content. Do not repeat a large left heading and small right explanation through the page.
- The Full Bottleneck Assessment with Review, Strategic People Advisory and Fractional CPO / ongoing Strategic People Advisory are the three primary engagements. The introductory call is available regardless of starting point.
- The independent reflection questionnaire lives on `/self-check`. The paid Bottleneck Assessment remains on `/bottleneck-assessment`. Home carries distinct invitations and links.
- Interactive cards have useful hover and keyboard-focus states. Static proof and process elements do not pretend to be interactive.
- Entrances and outcome-number animations run once per element per page visit. Static content remains readable without JavaScript; reduced-motion visitors receive immediate final values.
- Keep factual evidence distinct from illustrative working imagery. Preserve accurate image crops and internal asset provenance.
- Publish and maintain English only until the owner reopens German work.

## Verification boundary

The implementation branch receives focused code checks. Final integration must verify the complete page at short laptop, desktop, tablet and phone viewports, including loaded images and fonts, keyboard operation, reduced motion, zoom/reflow and all destinations. In particular, measure both hero actions and their helpers at 1280×720 and 1366×768. The Safari/MacBook Air comparison remains a separate browser check until actually exercised.
