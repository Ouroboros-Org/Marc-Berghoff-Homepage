# Marc Berghoff website redesign preparation

Prepared on 12 September 2026 against commit `a9199bc`. Implementation was subsequently authorized, including separate worktrees/branches, reviewed PRs and a final merge to main.

Owner decisions after preparation: use flexible typical durations with no lower or upper term; discuss the right shape in the free 30-minute conversation. Use the proposed proof and Klarsolar case. The working public inbox is `contact@marcberghoff.com`. Reproduce the spacing issue in Safari on MacBook Air where tooling permits. This is a first-indexing launch: remove obsolete pages and translations without legacy redirects or compatibility links. These decisions supersede the open questions and redirect proposal below.

Rebuild the experience around Fractional CPO, with three clear engagements and proof close to the hero. Keep the existing Next.js application, assessment logic, contact flow and article infrastructure. The most valuable change is a clearer hierarchy and shorter content; colour and motion should reinforce it.

Current decisions and unresolved dependencies are tracked in [context.tsv](../context.tsv). The owner's September brief supersedes the older five-format, bilingual, assessment-first and flat-layout prescriptions in the existing product/design documents. Remaining details below are recommendations unless explicitly identified as an owner instruction.

## Decisive findings

| Finding | Evidence | Consequence for the redesign |
| --- | --- | --- |
| Hero actions are cut off on short laptop screens. | Local browser measurements: button bottoms at about 753px in a 1280x720 viewport and 788px at 1366x768. Fonts were loaded. `src/app/home.module.css:6` and `src/components/home-page.tsx:34`. | Shorten the proposition and supporting copy; put helper text outside buttons; size vertical spacing for both viewport width and height. |
| Several sections repeat a large heading on the left and supporting copy on the right. | Recognition, candour, offers header, process summary, Insights header and closing in `src/components/home-page.tsx:95`. | Replace and combine sections rather than simply append proof, testimonials and another process. |
| The dedicated assessment destination already exists. | `src/components/service-pages/bottleneck-assessment-page.tsx:44`; the homepage mounts its own check at `src/components/home-page.tsx:89`. | Reuse `/bottleneck-assessment`. Remove the full check from Home, with direct links to the appropriate page section. |
| The short self-check and the paid assessment are different experiences. | `src/components/diagnostic/BottleneckDiagnostic.tsx:65`; paid service copy at `bottleneck-assessment-page.tsx:44`. | Label the free check separately from the Full Bottleneck Assessment with Review. Preserve results without an email and explicit optional sharing. |
| Four potential outcome claims already exist, with different evidence status. | `docs/claim-ledger.md:82`, `:85`, `:86`, `:96`. | Build the component around those candidates, pending the owner's selection. Do not substitute coaching hours or client headcount for business outcomes. |
| Article publishing is already implemented. | `src/content/blog.ts:1` and `src/app/(en)/blog/[slug]/page.tsx:32`. | Extend the existing template and document manual publishing. A CMS would add unnecessary scope. |
| English-only affects routing, SEO and shared content. | `src/config/routes.ts:1`, `src/app/sitemap.ts:55`, `src/components/site-shell.tsx:37`. | Remove German navigation, indexable pages, language alternates and duplicated maintenance together. |
| Visible email and enquiry delivery are separate. | `src/config/site.ts:4`, `src/app/api/contact/route.ts:146`, `docs/google-forms-setup.md:9`. | Select the public mailbox and verify a delivery/notification path from Google Forms. Changing a mailto link alone is insufficient. |

The existing public brand and default domain are already Marc Berghoff and `https://marcberghoff.com`. A source search found no `hx` references in `src` or `public`; deployment-configured legal/contact values still need checking when configuring the release. Do not replace legal provider details with the personal marketing name without preserving the actual contracting entity.

## Proposed visitor journey and homepage

Visitors can start at the engagement they need. The three stages describe increasing support, not mandatory purchases in sequence. The free introductory conversation is available at every entry point.

| Order | Content and purpose | Composition |
| --- | --- | --- |
| 1 | Fractional CPO proposition, concise scope, portrait, introductory call and self-check actions | White hero; purposeful emphasis on Fractional CPO; small credential links near Marc, with both actions early in the reading order |
| 2 | Four quantified outcomes with units, periods and short context | Compact navy band; four columns on desktop; two by two on mobile when labels fit, then one column where necessary |
| 3 | Three engagements and a route for visitors who are unsure | Centred introduction above three comparable cards; Fractional CPO receives the strongest emphasis; numbered order remains clear on mobile |
| 4 | One featured case: situation, Marc's contribution and result, with link to the full case | Image or result-led composition, reversing the hero's visual balance; include an existing testimonial where it supports the case |
| 5 | Bottleneck Assessment teaser | Short contrasting band with one sentence and a clear link; no embedded questionnaire |
| 6 | A personal introduction and working approach | Image on the left, a short first-person story on the right, and an About link; avoid repeating the outcome band or case |
| 7 | Who benefits and who needs a different kind of support | Clear paired criteria with a candid, respectful tone; easy to scan without an interactive selector |
| 8 | Insights preview | One featured article with smaller companion links; retain a clear route to the overview |
| 9 | Free introductory conversation and direct contact | Compact closing invitation with short button text and adjacent supporting information |

Replace the generic candour section and standalone process summary with the case and practical engagement guidance. Reduce the current long experience list after moving proof higher. Place one or two testimonials within proof or the personal introduction; avoid a tall carousel or a separate sequence of repeated quote panels.

Provisional hero copy for the first visual pass:

> Your Fractional CPO for the next stage of growth.
>
> As your Chief People Officer, I help you strengthen your people, leadership and organisation as you scale.

Use **Book a call** with “Free introductory conversation · typically 30 minutes” beneath it. Use **Start the check** with “10 statements · about 2 minutes · no email needed” beneath it if the existing self-check remains the destination. A link labelled **Bottleneck Assessment** should open the full service explanation rather than imply the two-minute check is the paid engagement.

Navigation should expose Services, Bottleneck Assessment, Selected work, Insights, About and the booking action within available space. Keep the assessment directly discoverable in both header and footer. Preserve the working mobile menu's keyboard and focus behavior while simplifying its content.

## Three engagement containers

Use one shared content model across homepage, Services, navigation and enquiry choices. Each engagement needs a starting situation, clear title, deliverables, typical scope/cadence, prerequisites, end condition and next action. Detailed service pages can carry the full terms; homepage cards need only the decision-making essentials.

| Engagement | Entry condition | Existing substance to preserve | Boundary and next step |
| --- | --- | --- | --- |
| Full Bottleneck Assessment with Review | The underlying issue is unclear or disputed | Typically 2–3 weeks; interviews and questionnaire; report; review workshop; fixed fee agreed in advance. The existing guarantee is narrow and written into the scope. | Ends with findings and priorities. Client can act independently, use short advisory, or discuss ongoing involvement. Retain the existing authorised commitments unless the owner changes them. |
| Short Strategic People Advisory | The issue is understood, but the response or priorities need work | Advice on people, roles and organisation; client keeps decision authority. Existing copy permits a scoped decision or retainer. | Recommend a bounded question, an agreed recommendation or plan, and a review/handover. Do not invent a duration or promise a fixed list of documents. Exact package boundaries are open. |
| Fractional CPO / ongoing Strategic People Advisory | The company needs sustained senior support | Existing fractional copy specifies 1–2 days per week, decision rights, internal support, review rhythm and handover; duration follows the remit. | Distinguish an embedded CPO remit from ongoing advice where the client retains ownership. Confirm cadence, minimum commitment and the existing one-fractional-engagement capacity statement. |

Coaching, leadership development, workshops, peer work and operational documents become possible methods or deliverables within these engagements. Their inclusion follows the agreed remit. Existing method pages can remain useful subordinate resources, with clear links into the three engagements; do not present them as equal additional offers. Reassess any current copy promising standalone formats so it does not contradict the new structure.

Separate the offer progression from the engagement process. The existing ordered four-step process can remain on Services after improving the hierarchy: number, step title, explanation, then duration/supporting label. Prefer a vertical sequence on narrow/tablet layouts if a two-column arrangement makes order ambiguous. There is no selected step in the current component; do not add artificial selection. Reserve active styling for actual navigation, expanded controls and answered diagnostic choices.

Proposed qualification wording should cover strategic leadership access, willingness to make decisions, and operational HR capacity where the remit needs it. Clarify that Marc does not replace day-to-day HR administration or provide an entire operational HR team. Do not invent minimum headcount, revenue thresholds or sector exclusions. These are draft criteria for review, not new eligibility rules.

## Proof, case studies and assets

| Outcome candidate | Evidence status in repository | Required context |
| --- | --- | --- |
| 35 → 150 people | Publicly supported claim, Klarsolar | Six months; Marc supported the growth, without sole-cause attribution |
| More than 100% revenue growth | Deck-authorised, Klarsolar | Two years; company result during the relevant period |
| €30k → €350k ARR | Deck-authorised, Giftagoods | One year; ARR, not total revenue; during Marc's strategic support |
| Five years of continued use | Owner-authorised sourcing engagement | Keep the financial-services group and CFO anonymous; recheck current use |

Klarsolar is the recommended first case because its scale-up result and existing testimonial can form one coherent story. The repository still lacks a full account of the challenge, Marc's specific actions and attribution boundaries. Request those details once the case is selected. The fictional Wayline report must remain a sample report and must not become a client case.

Create a reusable case model and a detail route under `/results/[slug]`, linked from Home and Selected work. The model should support title, named client or anonymous descriptor, period, engagement, result with units/timeframe, challenge, Marc's remit, actions, outcome, optional quote, attribution, image and internal evidence references. Keep internal approval/evidence records out of the public payload. Omit missing optional fields cleanly. Incomplete editorial cases can be reviewed in a preview but must not appear as complete factual stories in public indexing, feeds or structured data.

The existing Klarsolar and Giftagoods testimonials can populate the first review version with their current wording and attribution. Centralize them so Home and Selected work do not diverge. A third testimonial is mentioned in the ledger, but its actual text is not present in the current content.

Both supplied credential pages were inspected on 12 September 2026:

- [Associate Certified Coach (ACC)](https://www.credly.com/badges/3ef5dbc3-30a7-4ae0-b9f1-d5e21d6caded/public_url), issued to Marc Berghoff by ICF Credentials and Standards; the page shows expiry on 30 June 2027.
- [Certified Professional Co-Active Coach (CPCC)](https://www.credly.com/badges/2e498aea-87f1-4353-b575-679679b12547/public_url), issued to Marc Berghoff by Co-Active Training Institute on 30 April 2024.

Replace the current ICF membership badge with the actual credential artwork and link each badge to its supplied page. Use the authoritative artwork; do not generate or reinterpret certification marks. The reference at [Structure First](https://structure-first.de/) supports a compact number-plus-label proof band. Its typography, figures and animated counters are not a template to copy.

Only two genuine Marc photos are in the repository: the seated portrait at 1202x1601 and the speaking portrait at 495x724. The latter is the hero source and was visually inspected. Both are usable references for the requested generation; extra genuine photos would improve likeness but are not necessary to begin the requested working version.

During implementation:

1. Preserve both original assets. Use ImageGen to sharpen/upscale the speaking photo, checking face, glasses, hands and clothing against the original.
2. Generate a separate working/workshop scene using both references and deliberate composition for the chosen section. Keep Marc recognizable. Avoid attaching a fabricated scene to a named client event.
3. Reframe or extend backgrounds only where the layout requires it. Give mobile a deliberate crop rather than relying on a wide image to shrink.
4. Honor the owner's request for a clean visual preview without AI labels or watermarks. Keep provenance in the internal asset record and avoid factual captions implying an actual event.
5. Export responsive WebP or AVIF derivatives with dimensions, suitable quality and accurate image sizing. Existing raster assets are already WebP; retain SVG marks as vectors. Do not re-compress every existing asset without a benefit.
6. Preserve About's personal narrative and chronology. Add images as pauses within the story rather than rewriting it as a corporate bullet list.

## Visual and interaction direction

Use white as the main reading surface and navy as the primary contrast, with the existing light-blue/light-yellow logo preserved. A reasonable first palette can reuse the existing navy `#173D70`, deeper navy `#0B203D`, light blue `#7CB0FF` and stronger yellow `#FEC302`, then refine their roles after contrast and composition checks. Exact values are a reversible design decision, not a prerequisite for implementation.

Keep the readable Instrument Sans/Inter pairing initially. Create depth through image framing, restrained overlaps, tonal surfaces and spacing. Use larger whitespace before major headings while keeping the hero and metric strip compact. Alternate centred, image-led and left/right compositions according to the content; mechanical colour alternation would create another repetitive pattern.

Give “Fractional CPO” a deliberate typographic treatment, such as a pale-yellow rectangular highlight with a small blue offset detail. Replace the current recognition section's thick `.28em` yellow underline with a lighter highlight or weight/colour emphasis. Preserve a clear distinction between headings, labels and supporting copy.

Entrance motion should be brief and subtle, with small position/opacity changes once per element per page visit. It should not replay when scrolling back. Keep content readable without JavaScript, make all content immediately available under reduced motion, and remove the existing looping booking-button animation. Avoid count-up metrics, parallax and auto-rotating testimonials.

Interactive cards should communicate their destination through both hover and keyboard focus. Yellow surfaces need dark text; navy surfaces need white text. Update all child text/icon colours together so muted labels remain readable. Essential content remains visible at rest. Static metrics and process steps should not acquire misleading pointer or hover affordances.

## Routes, publishing and contact

- Retain `/`, `/services`, `/bottleneck-assessment`, `/advisory`, `/fractional-people-leadership`, `/about`, `/results`, `/contact`, `/blog` and existing article slugs unless content changes make a redirect useful. “Fractional CPO” does not require changing a working URL.
- Make English the only active public content path. Recommend exact temporary redirects from known German routes to their English counterparts while German is deferred. Map legal routes explicitly; unknown German paths should resolve to a meaningful not-found response rather than blanket Home redirects. Validate current framework redirect behavior during implementation.
- Remove the locale switcher, German sitemap/hreflang entries and German structured-data language claims. Keep old translations in version history rather than maintaining a second active copy. Review social images, metadata, not-found pages, forms and footer text as part of the same change.
- Keep the existing typed article content and shared template. Add a short manual publishing guide covering slug, title, summary, category, dates, article body, optional images, links, preview and publication. Preserve individual metadata, canonical URLs, reading time, structured data, RSS, sitemap and overview links. Update articles and hardcoded navigation suggestions that still teach five equal offers.
- Add an explicit publication state only where draft content is needed; apply it consistently to routes, indexes, feeds, sitemap and structured data. A noindex tag alone is not access control. Do not put confidential client details into a public preview.
- Use the selected personal-domain mailbox everywhere public, including footer, contact, booking fallback and structured data. Keep HX Solutions only where the true legal/operational identity requires it. No alias or forwarding work is requested.
- Preserve the current contact validation, honeypot/rate-limit checks, diagnostic payload validation and accessible error handling. Inspect the actual Google Forms notification arrangement once the receiving mailbox is confirmed. If the current service cannot deliver the required notifications, scope a direct delivery adapter as a separate dependency rather than silently introducing an email provider.

## Implementation ownership and order

The lead owns the canonical context, content contracts, shared navigation/routes, cross-page consistency and final integration. Agents receive a bounded file list, relevant context IDs, deliverables and acceptance checks. They report evidence and changed contracts, not repeated repository tours. Only one agent writes a shared file at a time.

| Stage | Owner and boundary | Dependency and finish condition |
| --- | --- | --- |
| 1. Resolve content decisions | Lead with owner | Record responses about proof, engagement commitments and mailbox. Draft unconfirmed copy without treating it as fact. |
| 2. Establish shared contracts | Lead | Update canonical product/design rules and the three-offer model; define route and proof/article models before parallel edits. |
| 3A. Homepage and visual system | Design implementation agent | Own Home content/component/styles and agreed tokens. Deliver hero, metrics, engagement cards, case teaser, fit criteria and restrained motion. Coordinate shared shell changes through lead. |
| 3B. Engagement pages and assessment | Service implementation agent | Own service-page content/components and assessment placement. Consume the shared offer contract; preserve diagnostic and contact behavior. |
| 3C. Evidence, editorial pages and assets | Content/media implementation agent | Own case detail/Selected work, article template/guide, About imagery and generated asset records. Consume agreed proof models and design tokens. |
| 4. Site integration | Lead | Complete navigation/footer, English route/SEO migration, contact configuration and cross-links. Remove obsolete active offer/locale assumptions. |
| 5. Independent review and corrections | A reviewer other than each feature's author, coordinated by lead | Exercise the intended visitor journeys and responsive states; reconcile issues against evidence and fix consequential failures. |
| 6. Reviewable handoff | Lead | Provide the finished preview, checks and any exact content or external-setup dependencies. Production publication is outside this preparation request. |

Do not start three branches of UI work before the offer and content contracts agree. Asset generation can run alongside implementation after its placement and reference requirements are fixed. Small verified changes should follow the repository's normal version-control practice while preserving unrelated work.

## Verification and remaining questions

Baseline checks passed on the unmodified application: `pnpm lint`, `pnpm typecheck`, and `pnpm test` (11 test files, 98 tests). A local webpack development preview was inspected after the initial Turbopack preview did not finish loading promptly. No production build, external form submission, booking or deployment was performed.

The local browser measured these first-viewport positions with loaded fonts. Measurements are rounded CSS pixels from the top of the document:

| Viewport | Hero CTA bottoms | Interpretation |
| --- | --- | --- |
| 1280x720 | 753 / 753 | Both extend below the first viewport |
| 1366x768 | 788 / 788 | Both extend below the first viewport |
| 1440x900 | 812 / 812 | Both fit |
| 1920x1080 | 843 / 843 | Both fit |
| 768x1024 | 655 / 655 | Actions fit; portrait extends the hero below them |
| 390x844 | 690 / 763 | Both fit, after a long copy block |
| 360x800 | 733 / 825 | Secondary action extends below the viewport |
| 430x932 | 690 / 764 | Both fit |

No document-level horizontal overflow was measured at these sizes. That does not establish that every element is unclipped or that all pages are responsive. Only one browser engine was available in the connected browser inventory, so the owner's browser-to-browser spacing difference is not reproduced. Width-driven padding, vertically centred hero columns and font wrapping are plausible contributors, not a confirmed browser bug.

For implementation acceptance:

- Inspect the entire revised homepage at the viewport sizes above, plus the actual breakpoint boundaries around tablet/navigation transitions. At 1280x720 and 1366x768, both hero actions and their helper text should fit comfortably at ordinary zoom. At enlarged text/zoom, prioritize readable content and reflow over enforcing a fixed-height hero.
- Verify mobile reading order and wrapping for the three service cards, four proof items, assessment teaser, case and quotes. Test keyboard focus, menu Escape/focus return, 200% zoom, narrow reflow and reduced motion. No essential information should depend on hover or animation.
- Exercise Home to self-check, service explanation to booking, direct fractional enquiry, case summary to detail, article overview to article, and footer assessment navigation. Check browser back behavior and anchor offsets beneath the sticky header.
- Cover the diagnostic's unanswered, partial, completed, reset, optional-share, submitting, success and error states. Preserve results without an email and explicit sharing; do not activate the unused session-storage path accidentally.
- Verify English-only routing, old known German redirects, unknown paths, canonical URLs, metadata, social images, RSS, article/case links and publication-state filtering.
- Run lint, typecheck, existing tests and a production build after integration. Add focused regression tests for changed route/publication contracts and meaningful diagnostic/navigation behavior; do not add tests that merely mirror style values or copy.
- Compare the actual reported browsers at equal CSS viewport dimensions and loaded fonts, including a fresh load and reload. Record the header, heading and CTA bounds. Equal 100% zoom alone is insufficient evidence of equal available space.
- Confirm new images' visual fidelity, responsive crops, encoded size and loading priority. Keep the hero stable while media loads. Local checks should not be described as production performance measurements.
- Before claiming enquiry delivery is complete, verify receipt through the agreed form/notification path using an explicitly authorized test submission.

Questions already sent to the owner:

1. **Proof and featured case:** use the four existing candidates and Klarsolar, or prepare a different selection? After selection, supply the missing challenge, specific actions and result context for the full case. Detailed case copy need not block component work.
2. **Engagement commitments:** identify any changes to existing assessment promises; define the short advisory boundary and ongoing commitment; distinguish ongoing advice from an embedded Fractional CPO remit. Preserve already authorised assessment and fractional terms unless changed. Do not apply an existing fractional cadence or capacity limit to a different advisory arrangement without evidence.
3. **Public mailbox:** select the exact address on `marcberghoff.com`, confirm it receives mail, and identify any change wanted to the existing form-collection approach. This blocks final contact configuration, not visual work.
4. **Browser reproduction, optional:** which browsers, device/OS and live/preview URL showed the top-spacing difference? This is useful for verification and does not block the design direction.

No additional preference round is needed for colours, alignment, fonts, imagery placement, article infrastructure or qualification-section structure. Those choices are either authorized by the brief or can be made reversibly within the existing system.
