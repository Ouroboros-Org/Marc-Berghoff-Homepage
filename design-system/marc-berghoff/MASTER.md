# Marc Berghoff — Design System Master

**Updated:** 2026-07-29  
**Product:** English-language personal advisory website  
**Direction:** Editorial diagnostic, calm authority, spacious, direct  
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

## Layout

- Maximum content width: `77.5rem` plus responsive gutters.
- Gutters: `clamp(1.25rem, 3.6vw, 3.5rem)`.
- Section spacing: `clamp(4.5rem, 9vw, 8.5rem)`.
- Default corner radii stay modest: 8–20px. Do not make every container a floating rounded card.
- Use borders, changing surfaces and asymmetric editorial grids to establish hierarchy.
- The site’s recurring visual idea is constraint: a short yellow segment interrupting a longer line, or a contained element holding back a wider flow.

## Components

### Buttons

- Pill shape is reserved for calls to action.
- Primary: deep-blue fill, white text, 1px deep-blue border.
- Secondary: transparent fill, deep-blue text and border.
- Minimum target height: 44px; default 51px.
- Hover changes colour and shadow only. Never move the layout.

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

## Page pattern

1. Name the recognisable operating problem.
2. Offer the six-question diagnostic without an email gate.
3. Show how the constraint compounds.
4. Explain the paid assessment, process and fee.
5. Give routes into advisory, fractional work and coaching.
6. Support claims with named work, measured outcomes and attributed testimonials.
7. Close with a short contact form; keep the extended form on the contact page.

## Motion

- CSS transitions only unless movement communicates state.
- Use 160–220ms interaction transitions and a maximum 12px reveal distance.
- No parallax, looping decoration, autoplay media or scroll-jacking.
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
- [x] Quick and extended contact forms validate and handle configured/unconfigured Google Forms states.
- [x] Every route has useful metadata, canonical URL and responsive layout.
- [x] Focus, error, hover, loading, success and empty states are clear.
- [x] Reduced motion and 200% reflow remain usable.
- [x] Content passes the project’s anti-AI editorial review.
- [x] Generated imagery is disclosed in the internal asset register and never used as evidence.
