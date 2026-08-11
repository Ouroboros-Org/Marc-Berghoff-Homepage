# Marc Berghoff — Design System Master

**Updated:** 2026-08-11
**Product:** English-language personal advisory website  
**Direction:** Editorial people leadership, calm authority, spacious, direct
**Design dials:** variance 4/10 · motion 3/10 · density 3/10

This file is the visual source of truth. The supplied presentation and website brief override the generic database recommendation that was used to establish the Trust & Authority page pattern.

## Brand palette

| Role | Value | CSS variable |
| --- | --- | --- |
| Primary blue | `#7CB0FF` | `--blue` |
| Deep blue | `#173D70` | `--blue-deep` |
| Blue ink | `#14345E` | `--blue-ink` |
| Soft blue | `#DCEAFF` | `--blue-soft` |
| Mist | `#F1F6FF` | `--blue-mist` |
| Accent yellow | `#FEC302` | `--yellow` |
| Ink | `#11151A` | `--ink` |
| Muted ink | `#626B76` | `--muted` |
| Paper | `#FFFFFF` | `--paper` |
| Canvas | `#F7F9FC` | `--canvas` |

Yellow is a signal, not a surface colour: use it for short rules, small marks, dark-surface focus states and rare emphasis. Light-surface focus indicators use deep blue to meet contrast requirements. Primary calls to action use deep blue so text contrast remains strong. Never place white text on the brand blue or yellow.

## Type

- Display and headings: **Instrument Sans Variable**, 540–720 weight, tight tracking.
- Body and controls: **Inter Variable**, 400–750 weight.
- Use sentence case. Keep paragraphs narrow and concrete.
- Avoid ornamental type, centred body copy and all-caps text beyond short eyebrow labels.

## Voice

- Address the reader as “you”. In public prose, Marc speaks as “I”, “me” or “my”.
- Keep Marc Berghoff in attribution, legal names, metadata titles, structured data and image labels where first person would be unclear.
- Begin with the reader’s live decision or operating problem. Explain Marc’s role only where it helps the reader choose or act.
- Keep one idea per sentence. Remove promotional claims, repeated conclusions and generic consulting language.
- Prefer concrete subjects and active verbs. Avoid stacked abstractions, inflated scene-setting, “not just … but” contrasts, forced groups of three and summary paragraphs that restate the section.
- Keep uncertainty and boundaries plain. An unfinished offer, unclear diagnosis or poor fit must not be resolved with generic reassurance.
- Keep credentials and biography out of decision sections unless that evidence changes the reader’s choice.

## Layout

- Maximum content width: `77.5rem` plus responsive gutters.
- Gutters: `clamp(1.25rem, 3.6vw, 3.5rem)`.
- Section spacing: `clamp(4.5rem, 9vw, 8.5rem)`.
- Default corner radii stay modest: 8–20px. Do not make every container a floating rounded card.
- Use borders, changing surfaces and asymmetric editorial grids to establish hierarchy.
- The site’s recurring visual idea is constraint: a short yellow segment interrupting a longer line, or a contained element holding back a wider flow.

## Components

### Buttons

- All button variants use a coherent pill shape; text links remain visually lightweight.
- Primary: deep-blue fill, white text, 1px deep-blue border.
- Secondary: transparent fill, deep-blue text and border.
- Minimum target height: 44px; default 51px.
- Hover changes colour, light and shadow only. Never move the layout.
- CTA buttons use a restrained looping surface light and shimmer through `::before` and `::after`, with a stronger hover/focus pass and no motion under `prefers-reduced-motion`.

### Cards

- Prefer ruled editorial panels over a generic card grid.
- White or canvas surfaces, 1px neutral border, little or no shadow.
- Use shadow only when a layer genuinely sits above another surface, such as the contact form or hero caption.

### Forms

- Labels remain visible above fields.
- Minimum 16px input text to prevent mobile zoom.
- Required fields, help text and error text must be programmatically associated.
- Focus uses a deep-blue ring on light surfaces and a yellow ring on dark surfaces; errors use both colour and text.
- Submission state must be announced with `aria-live` and preserve entered data on error.

### Editorial choice rows

- Use ruled, full-width rows for comparing services, articles and other peer choices; do not turn these directories into floating card grids.
- On wide screens, align the situation, format name, explanation and arrow in separate columns. Stack the supporting text below the name on narrow screens while keeping the whole row as one target.
- Keep rows flat at rest. A very light blue tint and deep-blue text shift may signal hover without moving content.

### Universal engagement process

- Show the four engagement steps as one connected sequence: a horizontal line with deep-blue numbered circles on wide screens, two columns at intermediate widths and a vertical line on small screens.
- Show the full sequence on `/services`. Service detail pages use the same compact start-of-work summary and link to `/services#process`; supporting copy may explain the selected format, but it must not imply a different process.

### Progressive disclosures

- Show the ten-statement diagnostic in full on Home. Diagnostic disclosures on service pages and optional enquiry fields remain collapsed by default; an incoming link may open the promised disclosure through its hash or query parameter.
- Use native disclosure semantics, a rotating chevron and a bordered white surface. The complete summary remains a generous click and keyboard target.
- Opening content must expand in place without hiding the summary or creating a separate modal flow.

### Embedded scheduling

- Place the inline calendar in a quiet white layer on the blue-mist section surface. The shell uses the same border, modest radius and low ambient shadow as the contact form.
- Allow the calendar to approach the viewport gutters on small screens so its controls stay usable. Internal overflow belongs to the embed, not the page.
- When the event link is not configured, keep the same shell and replace the calendar with a short, centred fallback that points to the contact form.

## Page pattern

1. Name the responsibility or operating problem in plain language.
2. Explain the amount of ownership available without turning the page into a biography or credentials pitch.
3. Start with the Bottleneck Assessment when the cause is disputed. Then present Executive Coaching, Strategic People Advisory, Peer Advisory and Fractional People Leadership in that fixed order, asking who carries the work.
4. Use the full four-step engagement process on `/services`; use the compact linked summary on service detail pages.
5. Show the ten-statement diagnostic in full near the top of the homepage.
6. Use only confirmed named work, approved credentials and attributed testimonials;
   never invent performance proof or expose unconfirmed company metrics.
7. Close with the free first conversation, typically 30 minutes; keep optional contact details collapsed
   unless the incoming CTA promises a detailed enquiry.

## Motion

- CSS transitions only unless movement communicates state.
- Use 160–220ms interaction transitions and a maximum 12px reveal distance.
- No parallax, autoplay media or scroll-jacking. The only looping decoration is the restrained CTA affordance.
- Honour `prefers-reduced-motion` globally.

## Accessibility and responsive rules

- Target WCAG 2.2 AA.
- Strong visible keyboard focus, skip link, semantic regions and one page-level `h1`.
- Do not communicate diagnostic results with colour alone.
- Verify 360px, 390px, 768px, 1024px and 1440px widths.
- Mobile navigation must trap scroll, close with Escape and remove hidden links from the tab order.
- No horizontal scrolling and no content obscured by the sticky header.

## Forbidden patterns

- Generic HR stock photography, glassmorphism and purple/pink “AI” gradients.
- Dense SaaS-style feature-card grids, carousels and decorative dashboards.
- Emojis as interface icons; use Lucide consistently.
- Fake logos, fabricated client metrics or AI-generated “proof”.
- Excessive title case, bold emphasis, vague authority claims or marketing filler.
- Invisible focus, hover-only meaning, layout-shifting hover effects and low-contrast text.

## Delivery checklist

- [x] Palette and typography match the supplied brief.
- [x] Diagnostic works by keyboard and explains its non-clinical scope.
- [x] The progressive contact form and Cal.com embed handle configured and unconfigured states.
- [x] Every route has useful metadata, canonical URL and responsive layout.
- [x] Focus, error, hover, loading, success and empty states are clear.
- [x] Reduced motion and 200% reflow remain usable.
- [x] Content passes the project’s anti-AI editorial review.
- [x] Generated imagery is disclosed in the internal asset register and never used as evidence.
