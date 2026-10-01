# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Founders, senior leaders and leadership teams in growing companies. They need help with people, leadership, organisational development or scaling. Some know the problem; others need to understand what is holding the company back. They may need a short intervention, advice alongside their own team or an experienced leader carrying an agreed remit.

## Product Purpose

Help visitors understand Marc Berghoff's organisational support, executive coaching and peer advisory, judge its relevance through specific evidence, and take an appropriate next step. The free 30-minute introductory conversation is open to everyone. An independent self-check gives visitors perspective on patterns in their company. The paid Bottleneck Assessment is a separate service.

## Positioning

Marc Berghoff is the public brand. The shared descriptor is People & organisation · Executive coaching. Fractional CPO (Chief People Officer) remains prominent in its own engagement and page. HX Solutions appears only where legal or operational accuracy requires it. The canonical domain is https://marcberghoff.com and the confirmed public mailbox is contact@marcberghoff.com.

## Operating Context

Three organisational engagements allow direct entry at any stage:

1. Bottleneck Assessment with Review: understand an unclear underlying problem and agree priorities. Typically 2–3 weeks.
2. Strategic People Advisory: clarify the response, work through decisions or support implementation the client owns. An illustrative starting point is 2–6 weeks.
3. Fractional CPO: ownership of an agreed people remit, often 1–2 days a week. Ongoing Strategic People Advisory is a separate option on the same page; the client retains delivery responsibility and agrees an advisory schedule.

These are flexible starting points, with no minimum or maximum term. Scope, pace, responsibilities and review points are agreed in conversation. Coaching, leadership development, workshops and operational documents can be tools within these engagements. Standalone one-to-one executive coaching and peer advisory have a separate leadership-support group on `/services#coaching` and `/services#peer-advisory`. Malta Vistage enquiries and the European group being curated have distinct contact routes. Strategic support does not replace routine HR administration or an operational HR team.

## Capabilities and Constraints

- English only. German pages, language alternates and obsolete standalone coaching/peer-advisory routes are removed. The site is prepared for first indexing, with no legacy redirects.
- The homepage introduces the offer, four concise experience tiles, three organisational engagements, two leadership-support cards, a featured case, testimonials, qualification, imagery, Insights and clear calls to action.
- The interactive self-check lives on `/self-check`. All ten statements require explicit answers. Results offer perspective on company patterns, without diagnosing a bottleneck or prescribing the paid service. Results are available without email; sharing is a separate choice.
- `/bottleneck-assessment` describes the paid engagement with interviews, a report and a review. It does not contain the short self-check.
- `/results/klarsolar` is the first full case page. Publish only supported facts, with optional details omitted until supplied.
- `/blog` uses a reusable article template and manually maintained typed content. Every published article has its own indexable page, overview link, metadata and RSS entry. No CMS is required.
- The contact form retains its validated Google Forms delivery path. Public email and booking fallbacks use the confirmed mailbox. External form notifications must be configured separately; a code change does not prove inbox receipt.
- European peer-advisory interest uses its own opt-in form and Google Form, configured with `GOOGLE_PEER_FORM_*` variables at deployment. Success requires a saved-response confirmation. General enquiries never join that register. See [setup](docs/google-forms-setup.md).
- Cal.com is embedded when configured, with a useful email fallback. A phone number appears only when a confirmed public number is configured.
- Preserve the Next.js stack, contact safeguards, accessibility and factual claim controls.

## Brand Commitments

White and dark navy establish the main contrast. Light blue and yellow provide accents; the logo remains light blue and light yellow. Use varied section composition, deliberate whitespace, clear reading order and restrained interactions. Entrances and outcome-number animations run only on first appearance and respect reduced motion. Static marketing content remains readable without animation or JavaScript; the interactive self-check and form submission require JavaScript.

Public prose speaks to the reader as “you” and refers to Marc as “I”, “me” or “my”. Use concrete, calm language and avoid inflated causal claims. About remains a personal narrative supported by imagery.

## Evidence on Hand

The October edit map selects Klarsolar headcount, coaching hours, leaders coached and sourcing longevity for the four Home tiles. Revenue figures remain in the evidence ledger and the existing case. Recheck current-duration claims and reuse permissions before publication. Preserve each metric’s units, period and attribution. Testimonials retain their exact approved wording. Source and approval records live in `docs/claim-ledger.md`.

Hero enhancement and workshop imagery use genuine Marc reference photos. Internal provenance lives in `docs/generated-images.md`; no visible generation labels appear in the site. Do not imply the generated workshop documents a specific real client event. The illustrative assessment report remains clearly identified as fictional.

## Product Principles

1. Make organisational support and support for an individual leader discoverable without conflating their fit requirements.
2. Let visitors enter the engagement that fits their situation.
3. Explain what the client receives, who carries the work and how scope is agreed.
4. Keep the free conversation easy to find and book.
5. Use specific evidence, with contribution wording proportionate to the source.
6. Make qualification understandable and keep the homepage moving.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Preserve keyboard navigation, visible focus, reduced-motion support, semantic headings, labelled forms and comfortable mobile touch targets. Check the complete homepage and key routes at short laptop, desktop, tablet and mobile sizes. Safari on MacBook Air is the owner’s reported browser; record actual engine coverage rather than claiming unavailable tests.
