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
| Homepage composition | `src/components/home-page.tsx`, `src/app/home.module.css` | Hero, compact proof, three engagements, case, diagnostic invitation, personal introduction, fit, Insights and closing |
| Entrances | `src/components/reveal.tsx` | Visible server content; one rise/fade after first intersection; no replay on scrolling back; reduced-motion support |
| Credential links | `src/components/credential-badges.tsx` | Authoritative ACC and CPCC artwork and Credly destinations, reusable on Home and About |
| Process | `src/components/engagement-process.tsx` | Ordered four-step sequence on Services, distinct from choosing an engagement |
| Navigation and contact | Shared shell and contact components | English-only navigation, direct assessment links, free conversation, preserved keyboard and form behavior |

## Fixed commitments

- Marc Berghoff is the public brand. Keep the light-blue/light-yellow logo.
- Fractional CPO is the main proposition. Explain Chief People Officer in plain language.
- Use white for reading, `--navy` for the strongest contrast, blue for supporting surfaces and yellow for precise emphasis.
- Change alignment, composition and density according to content. Do not repeat a large left heading and small right explanation through the page.
- The Full Bottleneck Assessment with Review, Strategic People Advisory and Fractional CPO / ongoing Strategic People Advisory are the three primary engagements. The introductory call is available regardless of starting point.
- The full questionnaire lives on the dedicated assessment page. Home carries clear invitations and links.
- Interactive cards have useful hover and keyboard-focus states. Static proof and process elements do not pretend to be interactive.
- Entrances run once per element per page visit. Essential content never depends on motion or JavaScript.
- Keep factual evidence distinct from illustrative working imagery. Preserve accurate image crops and internal asset provenance.
- Publish and maintain English only until the owner reopens German work.

## Verification boundary

The implementation branch receives focused code checks. Final integration must verify the complete page at short laptop, desktop, tablet and phone viewports, including loaded images and fonts, keyboard operation, reduced motion, zoom/reflow and all destinations. In particular, measure both hero actions and their helpers at 1280×720 and 1366×768. The Safari/MacBook Air comparison remains a separate browser check until actually exercised.
