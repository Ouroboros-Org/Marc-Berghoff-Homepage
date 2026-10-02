# October page-edit-map implementation

Implemented from fetched `origin/main` commit `5ef1584a61e38999a02e1ed86bd9f7c793ac6c53`
on `codex/implement-page-edit-map`. Source: the owner's 18 September 2026
`Marc_Homepage_Page_by_Page_Edit_Map.md`, with the 1 October instructions to use
a separate Google Form at deployment and add the Alberta testimonial.

The existing visual system, page routes, imagery and dependencies are retained.
The confirmed mailbox remains `contact@marcberghoff.com`; the example mailbox in
the editing map does not replace that established owner decision.

## Coverage

| Map section | Implemented result |
| --- | --- |
| G01–G03 | Shared descriptor, five service choices inside the existing menu, explicit footer audiences, concise scope notes and unchanged substantive terms. |
| 1 · Home | Single retained headline and supplied supporting copy; revised four proof tiles; original organisational cards and scoped fit criteria; two leadership-support cards before Insights. Personal introduction, both existing quotes, case, self-check teaser and closing copy retained. |
| 2 · Services | Organisation group, standalone coaching and two peer paths, methods before process, merged first-conversation reassurance, and working anchors. The four process steps remain intact. |
| 3 · Bottleneck Assessment | Existing service content, fee and guarantee retained; redundant process recap removed and the full-process link placed with terms. |
| 4 · Strategic People Advisory | Buyer questions lead the page; conditional deliverables, client-owned implementation, links to ongoing advisory/CPO/coaching and one page-specific scope block. |
| 5 · Fractional CPO | Explicit responsibility and advisory distinction, dedicated `#ongoing-advisory` target, retained comparison bullets, clarified boundaries and one scope block. |
| 6 · About | Supplied introduction and beliefs, coaching/peer links from credentials, Contact process destination and broader closing text. Biography, credentials, imagery and personal details retained. |
| 7 · Selected work | Existing proof grouped by organisational work, coaching and peer advisory; one Vistage statement, retained speaking facts, logos and original quotes; broader closing invitation. |
| 8–9 · Self-check and Insights | Shared navigation changes only; existing questions, scoring, result flow, optional sharing, article content and links retained. |
| 10 · Contact | Editable optional topic with safe URL prefill; stable enquiry/booking anchors; separate European interest form after direct contacts; unchanged process steps at `#how-we-begin` with a waitlist distinction. |
| Owner follow-up · Alberta | Complete four-paragraph testimonial on Selected work and Fractional CPO, attributed to Alberta. Existing Home testimonials remain unchanged. |

The retired standalone coaching/peer routes remain absent. Revenue figures are
retained in the claim ledger and existing Klarsolar case, without adding a case.
See the [claim ledger](claim-ledger.md) for source and attribution boundaries.

## European interest registration

The dedicated endpoint is `/api/european-peer-advisory`. It validates the request
and explicit group-specific opt-in, then awaits a separate Google Form save.
It accepts only the configured Google Form URL and distinct numeric entry IDs,
never falls back to the enquiry Form, and requires the exact confirmation
specified in [Google Forms setup](google-forms-setup.md#6-separate-european-peer-advisory-register).
A bare HTTP 200 or returned validation form is not success.

Errors preserve the entered fields and opt-in and provide an email fallback.
Only successful persistence produces the registration confirmation. General
enquiries and optional self-check sharing retain their existing destination;
the selected enquiry topic is included in the existing message field.

## Verification

- All 158 tests in 18 files pass, including request validation, topic mapping,
  separate-form configuration, provider failure handling and save-before-success.
- ESLint, TypeScript and the production build pass.
- The ten mapped pages were inspected at 390×844 and 1280×720 in Chromium:
  no horizontal overflow, duplicate IDs or broken loaded images. Home, Services
  and Contact also passed 320×740 and 768×1024 checks.
- Coaching and Malta CTAs select the appropriate editable enquiry topic. Mobile
  service navigation reaches its anchors and closes the menu correctly.
- The European form requires unchecked-by-default consent. Missing configuration
  displays an error, retains the visitor's entries and leaves the general form
  independent. No live external submission was made.
- An HTTP crawl of 17 pages found no broken internal destinations across 49
  distinct hrefs and 44 hash targets, including existing articles, case and legal
  pages.
- Source comparisons confirm no edits to article bodies, case content,
  self-check questions/scoring or the shared four-step process definitions.
- Alberta's four paragraphs and attribution were checked on both pages at mobile
  and desktop widths. The final production CPO preview has no browser warnings
  or errors.

## 2 October navigation refinement

Implemented from fetched `origin/main` commit `fdc2ad0`; application commit
`e2f46c6` changes four production files. The owner chose existing Services
sections for the two prominent audience cards. The overview and five specific
offers remain in a compact list without descriptions, beside the cards on
desktop and below them on mobile. Shared footer definitions are unchanged.

The leader heading now uses the existing sticky-header anchor offset. Crossing
the mobile breakpoint closes the desktop submenu; crossing back closes mobile
navigation and restores page interaction. Mobile focus outlines sit inside the
links so the accordion cannot clip them.

- All 158 tests in 18 files, ESLint, TypeScript and the production build pass.
- Production Chromium checks passed at 320×740, 390×844, 1130×800 and 1280×720,
  with no horizontal overflow or clipped menu text.
- Both audience cards and all six compact destinations were followed. Coaching
  and Malta links preserve their enquiry topics; the European link reaches its
  separate interest form. No form was submitted.
- ArrowDown, Tab order, visible focus, Escape, outside-click dismissal,
  same-page hash navigation and breakpoint changes were checked. Mobile links
  have a minimum 44px touch height; closing restores scrolling and page access.
- Insights and About retain their descriptions. Footer links and current-page
  indicators remain correct. The final preview has no console warnings or errors.

## Deployment checks

Configure the seven `GOOGLE_PEER_FORM_*` variables from [`.env.example`](../.env.example)
with the new Google Form and its required confirmation message. Submit an
identified test registration and verify the six values in its linked Sheet and
Marc's follow-up access before launch. Local provider simulations cannot prove
live Google persistence or inbox notifications.

The work has not been deployed. Existing release checks for current claims,
client permissions, calendar configuration, legal details and actual Safari
remain applicable; this content pass does not establish those external facts.
