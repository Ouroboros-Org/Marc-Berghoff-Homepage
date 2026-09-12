# Pre-launch replacements

Last reviewed: 12 September 2026

This is the hand-off register for assets, contact data, legal disclosures and the
Google Forms connection. A checked item means both the source and the rendered
site were verified. Do not launch while any item marked **BLOCKER** remains.

## Portrait, proof and client assets

The portraits and report preview came from `MArc B offer V2.pptx`. Two client marks
were recovered from repository history; three more are temporary official-site
downloads for the review loop. Copyright, photographer and trademark permissions
still need to be retained outside this public repository.

| File | Pixels | Assessment | Replacement/action |
| --- | ---: | --- | --- |
| `public/images/portraits/marc-seated-original.webp` | 1202×1601 | The strongest available portrait. Good for an editorial portrait block and restrained hero crop; not wide enough for an uncropped full-bleed desktop background. | Keep for launch if image rights are confirmed. Request the camera original for sharper large/retina use. Add photographer credit if required. |
| `public/images/portraits/marc-speaking-original.webp` | 495×724 | Genuine event context, 30,636 bytes and visibly soft. Preserved as the source photograph. | The owner-authorised enhanced derivative below is used for the redesigned hero. Keep the camera original as a future quality improvement if available. |
| `public/images/portraits/marc-speaking-enhanced.webp` | 1037×1517 | Built-in ImageGen enhancement; 97,030 bytes; face, pose, clothing and composition checked against the source. | Ready for the working website. Preserve the original; reconstructed details are not evidence about the event. |
| `public/images/generated/marc-workshop.webp` | 1536×1024 | Built-in ImageGen scene using both genuine Marc references; 109,968 bytes. | Ready for personal/editorial placement. No named client or real event attribution. |
| `public/images/credentials/acc.webp` and `cpcc.webp` | 340×340 each | Official Credly artwork, lossless WebP; 20,598 and 38,920 bytes. | Link to the supplied ACC and CPCC pages. These replace the ICF membership badge as credential evidence. |
| `public/images/proof/sample-report-cover.webp` | 1920×1080 | Crisp deck graphic. It contains the fictional/example company “Wayline GmbH,” an August 2026 date and sample metrics. | Label it clearly as an illustrative fictional sample. Prefer an approved anonymised real report before launch. Never imply that Wayline or the figures are a client result. |
| `public/images/clients/klarsolar.webp` | 580×390 source canvas | Recovered unchanged from repository history. | **REVIEW:** retain client and trademark permission; replace with a current approved mark if supplied. |
| `public/images/clients/giftagoods.webp` | 447×447 source canvas | Recovered unchanged from repository history. | **REVIEW:** retain client and trademark permission; replace with a current approved mark if supplied. |
| `public/images/clients/cyberkongz.svg` | 1200×381 viewBox | Temporary black wordmark downloaded from the official CyberKongz press kit. | **BLOCKER:** replace or retain only after confirming permitted website use. |
| `public/images/clients/alberta.svg` | 107×80 viewBox | Temporary mark downloaded from the official Alberta Fire & Security site. | **BLOCKER:** replace with a human-supplied approved file and retain written permission. |
| `public/images/clients/vistage.svg` | 112×22 viewBox | Temporary wordmark copied from the official Vistage Malta site's inline SVG. | **BLOCKER:** replace with the approved Chair brand-portal asset and retain permission. |

## Generated-image slots

Generated images support the editorial design. The owner authorised a working
scene from both real portraits and requested a clean preview without AI labels or
watermarks. Keep provenance internally. Do not attribute a generated scene to a
named client, real event or testimonial speaker.

| Proposed file/slot | Intended role | Generation/review constraints | Final state |
| --- | --- | --- | --- |
| `public/images/generated/leadership-room.webp` | Fractional CPO transition image | Empty room prepared for a leadership conversation; provenance recorded internally, with no attribution to a real event. | Generated 29 July 2026 · 1586×992 · integrated on `/fractional-cpo` |
| Decision-detail concept | Optional mobile-friendly editorial detail/callout | The final layout does not need another still life. | Not generated; no active website slot |

Prompt and provenance notes are recorded in `docs/generated-images.md`. Generated
files are never used inside client-proof or testimonial panels.

## Contact and domain replacements

- [x] The owner selected `https://marcberghoff.com` as the canonical domain.
- [ ] Verify `NEXT_PUBLIC_SITE_URL` in Vercel Production matches that origin.
- [x] The confirmed working public inbox is `contact@marcberghoff.com`.
  `src/config/site.ts`, local configuration and public links use it. A production
  `NEXT_PUBLIC_CONTACT_EMAIL` override should use the same address.
- [ ] Optional: set `NEXT_PUBLIC_CONTACT_PHONE` to a confirmed public number in
  international format. Leave it unset to omit telephone links.
- [ ] To enable the calendar, set `NEXT_PUBLIC_CAL_LINK` to the confirmed Cal.com username and
  30-minute event slug without the domain, for example `marc/first-conversation`.
  The contact page passes this value to the inline Cal.com embed. Without it, the
  booking section offers an email link to arrange a time directly.
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
- [ ] `LEGAL_DISPUTE_RESOLUTION_STATEMENT` when applicable

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

Local Form mappings are configured. Verify the corresponding server-only Vercel
environment variables below; local presence does not prove production delivery.
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
- [x] Record generated-image provenance internally and omit visible AI labels as
  requested. Do not use generated scenes to document named client work.
