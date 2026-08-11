# Pre-launch replacements

Last reviewed: 11 August 2026

This is the hand-off register for assets, contact data, legal disclosures and the
Google Forms connection. A checked item means both the source and the rendered
site were verified. Do not launch while any item marked **BLOCKER** remains.

## Deck assets currently in the repository

The three files below were extracted from `MArc B offer V2.pptx`. The deck owner
authorised use in the implementation brief, but copyright, photographer and
trademark permissions still need to be retained outside this public repository.

| File | Pixels | Assessment | Replacement/action |
| --- | ---: | --- | --- |
| `public/images/portraits/marc-seated-original.webp` | 1202×1601 | The strongest available portrait. Good for an editorial portrait block and restrained hero crop; not wide enough for an uncropped full-bleed desktop background. | Keep for launch if image rights are confirmed. Request the camera original for sharper large/retina use. Add photographer credit if required. |
| `public/images/portraits/marc-speaking-original.webp` | 495×724 | Genuine event context, but only 39 KB and visibly soft. Safe at roughly 240 CSS pixels for high-density displays; weak as a large feature image. | **BLOCKER if shown large:** replace with the original event photograph at least 1200 px wide. Do not use AI sharpening as proof of image authenticity. |
| `public/images/proof/sample-report-cover.webp` | 1920×1080 | Crisp deck graphic. It contains the fictional/example company “Wayline GmbH,” an August 2026 date and sample metrics. | Label it clearly as an illustrative/anonymised sample. Prefer an approved anonymised real report before launch. Never imply that Wayline or the figures are a client result. |

## Generated-image slots

Generated images must support the editorial design, not pretend to document client
work. The two real portraits can be used as colour, wardrobe and lighting
references. Do not create a synthetic client meeting, stage an identifiable
company event or invent a testimonial speaker.

| Proposed file/slot | Intended role | Generation/review constraints | Final state |
| --- | --- | --- | --- |
| `public/images/generated/diagnostic-worktable.webp` | Wide break on the Bottleneck Assessment page | Empty strategy table with an interrupted sequence; no people, logos or client information. | Generated 29 July 2026 · 1586×992 · integrated on `/bottleneck-assessment` · Marc review recommended |
| `public/images/generated/leadership-room.webp` | Fractional people leadership transition image | Empty room prepared for a leadership conversation; explicitly captioned as illustrative. | Generated 29 July 2026 · 1586×992 · integrated on `/fractional-people-leadership` · Marc review recommended |
| Decision-detail concept | Optional mobile-friendly editorial detail/callout | The final layout does not need another still life. | Not generated; no active website slot |

Prompt and provenance notes are recorded in `docs/generated-images.md`. Generated
files are never used inside client-proof or testimonial panels.

## Contact and domain replacements

- [ ] **BLOCKER:** Confirm the canonical domain and set `NEXT_PUBLIC_SITE_URL` in
  Vercel Production to its HTTPS origin without a path or trailing slash.
- [x] Public inbox defaults to `marc@marcberghoff.com` and may be changed with `NEXT_PUBLIC_CONTACT_EMAIL`.
  It currently appears in `src/config/site.ts` because it came from deck slide 15.
- [ ] Optional: set `NEXT_PUBLIC_CONTACT_PHONE` to a confirmed public number in
  international format. Leave it unset to omit telephone links.
- [ ] **BLOCKER:** Set `NEXT_PUBLIC_CAL_LINK` to the confirmed Cal.com username and
  30-minute event slug without the domain, for example `marc/first-conversation`.
  The live contact pages pass this value to the inline Cal.com embed.
- [ ] Confirm the LinkedIn URL and whether the `/en` locale suffix should remain.

## Legal replacements

The rendered legal pages read their provider details from environment variables
through `src/app/(en)/privacy/legal-details.ts`. Configure and verify:

- [ ] `LEGAL_NAME`
- [ ] `LEGAL_TRADING_NAME` when a separate trading name is used
- [ ] **BLOCKER:** `LEGAL_ADDRESS`; legal pages remain `noindex` until it is present
- [ ] `LEGAL_COUNTRY`
- [ ] `LEGAL_REGISTRATION_VAT` when applicable
- [ ] `LEGAL_CONTENT_RESPONSIBLE`
- [ ] `LEGAL_CONTACT_RETENTION_PERIOD`
- [ ] `LEGAL_CONTACT_RETENTION_PERIOD_DE` when the German wording needs an override
- [ ] `LEGAL_DISPUTE_RESOLUTION_STATEMENT` when applicable
- [ ] `LEGAL_DISPUTE_RESOLUTION_STATEMENT_DE` when the German wording needs an override

The legal email and telephone values reuse `NEXT_PUBLIC_CONTACT_EMAIL` and
`NEXT_PUBLIC_CONTACT_PHONE`.

- [ ] **BLOCKER:** Have a qualified reviewer check `/privacy` and `/imprint` for
  the actual legal entity, operating country, professional title, provider
  contracts and Google/Vercel account configuration. The repository templates are
  not legal advice.
- [ ] Confirm the retention period is actually implemented in the Google Form,
  linked Sheet and any inbox/export workflow.
- [ ] Confirm the Vercel and Google data-processing terms and any required
  international-transfer safeguards for the live accounts.
- [ ] If analytics, consent behaviour, embedded media or the scheduling setup
  changes, update the privacy notice before deployment.

## Google Forms and Sheet replacements

Create the Form and configure all server-only Vercel environment variables below.
The values in `.env.example` are deliberately non-working placeholders.

- [ ] **BLOCKER:** `GOOGLE_FORM_ACTION_URL`
- [ ] **BLOCKER:** `GOOGLE_FORM_ENTRY_FORM_TYPE`
- [ ] **BLOCKER:** `GOOGLE_FORM_ENTRY_FULL_NAME`
- [ ] **BLOCKER:** `GOOGLE_FORM_ENTRY_EMAIL`
- [ ] **BLOCKER:** `GOOGLE_FORM_ENTRY_MESSAGE`
- [ ] **BLOCKER:** `GOOGLE_FORM_ENTRY_DIAGNOSTIC_SUMMARY`
- [ ] **BLOCKER:** `GOOGLE_FORM_ENTRY_CONSENT`
- [ ] **BLOCKER:** Submit the contact form with optional context closed and open on
  a Vercel preview; confirm both messages reach the correct Form and Sheet.
- [ ] Test one contact submission that includes a diagnostic summary.
- [ ] Set and document Google Form/Sheet access, deletion and retention rules.

See `docs/google-forms-setup.md` for field creation, entry-ID discovery and the
full smoke test.

## Claims and permissions

- [ ] Review every **Deck-authorised** and **Approval needed** row in
  `docs/claim-ledger.md`.
- [ ] Keep written client approval for named metrics, logos and direct quotes.
- [ ] Confirm the ACC credential and current Vistage role immediately before
  launch.
- [ ] Home now uses the owner-authorised title “Organisational Psychologist.”
  Confirm that the title is warranted in every jurisdiction where it is presented,
  following the publishing rule in `docs/claim-ledger.md`.
- [ ] Remove the age “34” wherever it remains; it is a stale deck detail.
- [ ] Keep generated imagery visibly illustrative and out of proof/testimonial
  contexts.
