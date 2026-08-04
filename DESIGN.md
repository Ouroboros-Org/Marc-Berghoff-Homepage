---
name: Marc Berghoff
description: A candid blue-and-yellow editorial system for leadership, organisation and coaching.
colors:
  blue: "#7cb0ff"
  blue-hover: "#6aa4fa"
  blue-deep: "#173d70"
  blue-ink: "#14345e"
  blue-soft: "#dceaff"
  blue-mist: "#f1f6ff"
  yellow: "#fec302"
  yellow-soft: "#fff2bd"
  yellow-ink: "#604800"
  ink: "#11151a"
  ink-soft: "#353b43"
  muted: "#626b76"
  line: "#d9dee6"
  line-dark: "#b8c2d0"
  paper: "#ffffff"
  canvas: "#f7f9fc"
  success: "#17643c"
  success-bg: "#e9f7ef"
  error: "#a42121"
  error-bg: "#fff0f0"
typography:
  display:
    fontFamily: "Instrument Sans Variable, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(3.2rem, 7.2vw, 6rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Instrument Sans Variable, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(2.45rem, 5vw, 4.9rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter Variable, Inter, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter Variable, Inter, Arial, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 750
    lineHeight: 1.25
    letterSpacing: "0.12em"
rounded:
  sm: "0.5rem"
  md: "0.875rem"
  lg: "1.25rem"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 3.6vw, 3.5rem)"
  section: "clamp(4.5rem, 9vw, 8.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.78rem 1.25rem"
    height: "3.2rem"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue-deep}"
    rounded: "{rounded.pill}"
    padding: "0.78rem 1.25rem"
    height: "3.2rem"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "0.7rem"
    padding: "0.72rem 0.85rem"
    height: "3rem"
---

# Design System: Marc Berghoff

## Overview

**Creative North Star: “The Candid Editorial Brief”**

The site should feel like a clear working document with a strong point of view: generous space, large direct headlines, ruled structures and a restrained blue/yellow identity. It is calm and human, not corporate-luxury or startup-glossy. Paper, pale-blue and deep-blue sections create pace; yellow is a precise marker, never a wash.

The message architecture starts with the reader’s situation, moves to the level of responsibility needed, explains the same four-step process, and ends with a free 30-minute conversation. The outcome is consistent: make a leadership, organisation or people issue clear enough to act on and put the right ownership around it. [PRODUCT.md](./PRODUCT.md), [docs/copy-deck.md](./docs/copy-deck.md) and [docs/feedback-coverage.md](./docs/feedback-coverage.md) are the source documents for product truth, copy and resolved feedback.

**The Responsibility Spectrum Rule.** Coaching means the client carries the work; advisory means the client keeps the decision; fractional leadership means Marc carries a defined remit; assessment provides evidence when the cause is unclear; group coaching is shared, participant-owned work. “Fractional Leadership Manager” is provisional and may appear as a limited biographical descriptor, but must not become the whole public identity.

## Colors

Blue carries structure and trust; yellow marks attention and forward movement; ink and paper keep the system editorial.

- Use blue-deep for dark bands, primary actions and numbered process markers; blue-soft and blue-mist for welcoming heroes, diagnostic areas and supporting sections.
- Use canvas as the default page field and paper for distinct reading or interaction surfaces. Use line and line-dark for structure before adding containers.
- Reserve yellow for the logo counter-shape, eyebrow rule, selection, small image blocks and rare evidence accents. Ensure yellow text uses yellow-ink.
- Use the success and error pairs only for real system feedback.

**The Yellow Marker Rule.** Yellow should point, underline or counterbalance. It must not dominate a section.

## Typography

Instrument Sans Variable is the display voice; Inter Variable is the reading and interface voice. The pairing is contemporary, direct and compact without feeling technical.

- Display headlines use tight tracking, balanced wrapping and short line lengths (usually 10–18 characters wide at the largest scale). Prefer weight 520–650; do not simulate authority with extra-bold type.
- Body copy stays near 1rem with a 1.65–1.78 line height and roughly 42–60 characters per line. Leads may rise to 1.35–1.42rem.
- Eyebrows and metadata are small, uppercase Inter with wide tracking. Pair them with a short yellow rule when they introduce a major section.
- Use sentence case for headings, labels and actions. Links should say what opens or happens next.

## Layout

The primary container is 77.5rem with fluid gutters; editorial secondary pages use a 74rem container and a 54rem narrow reading width. Major sections use the section spacing token, while compact sections use roughly 3.5–6rem. Heroes and section headers are asymmetric two-column compositions: the headline leads, and a narrower explanation, image or fact sits opposite it.

Alternate canvas, paper, pale-blue and deep-blue sections to create chapter-like rhythm. Use thin border rules to separate sections and repeated rows. Ruled rows are the default for offers, article lists, contact facts and comparable choices because they keep the page dense and scannable.

At about 58–59rem, complex grids collapse and the four-step process becomes two columns. At 54rem the desktop navigation becomes a full mobile menu. At 46–42rem, layouts become one column, button rows become full-width stacks, offer rows reduce to label/title/body/arrow, and the four steps become a vertical timeline. Preserve section order; do not merely shrink desktop type.

## Elevation & Depth

The system is flat by default. Depth comes from tonal section changes, rules, overlaps and occasional outlined circles. Use the soft blue shadow (`0 18px 55px rgba(19, 45, 82, 0.11)`) only for portraits, diagnostic disclosures, form shells, calendar shells and report-like artifacts. Submenus may use a tighter directional shadow. Ordinary content and offer rows stay shadowless.

## Shapes

Editorial structure is mostly square and ruled. Large radii belong to bounded interactive or document-like surfaces; fields use a modest 0.7rem radius. Buttons are fully pill-shaped. Portraits and editorial images use near-square corners or the large radius, with precise cropping. Thin oversized circles and square blue/yellow logo geometry are recurring counter-shapes, not decorative wallpaper.

## Components

### Buttons

Primary buttons are deep blue on white with pill geometry, an arrow where direction helps, and at least a 3rem height. Secondary buttons are white with a deep-blue border; inverse buttons are white on deep-blue bands. Text links use a blue underline. Hover may shift color, add a small shadow or move 1px on active. The animated CTA border is reserved for the principal booking action, runs slowly, and becomes static under reduced motion.

### Ruled rows and cards

Use ruled rows for service choices, insights and repeated comparable items. A row may tint pale blue on hover but should not lift. Use cards only when an item is genuinely bounded: a form, calendar, diagnostic, report preview, evidence unit or self-contained case/result. Do not turn every paragraph or service into a floating card.

### Navigation

The 4.8rem sticky header uses the logo, grouped “How I help”, “Insights” and “About” navigation, LinkedIn and one booking CTA. Active groups use a blue underline. Desktop submenus pair a short orientation line with two-column page links. The mobile menu occupies the viewport below the header, uses numbered accordion groups, locks background scroll, traps focus, closes with Escape and restores focus. Hide the logo descriptor on the narrowest screens.

### Universal four-step process

Always use the same sequence and meaning: **First conversation → Make the issue clearer → Agree my involvement → Move and review.** On desktop, four numbered circles sit on one horizontal rule; on mobile, they form a vertical timeline. The first conversation is free, detailed, 30 minutes and precedes paid work. Do not create service-specific process variants.

### Forms and calendar

Keep name, email and message visible. Put business context in a collapsed, optional disclosure and open it only when a link explicitly promises more detail. Labels remain visible above fields; helper, privacy and error copy is concrete. Inputs use paper, a visible border and a 3px deep-blue focus ring; errors use explicit text plus red styling. Put the short form and calendar side by side on desktop and form first on mobile. The Cal.com embed must scroll and size safely on mobile; show a clear contact fallback while unconfigured.

### Diagnostic disclosure

The six-question check is optional and collapsed by default. Its closed state is one paper panel with a short label, one descriptive title, one helper line and a chevron. A CTA that promises the check may open and scroll to it via the hash or `?check=open`. The open state rotates the chevron, adds one ruled body area and avoids repeating the tool title or preamble. The paid assessment remains a supporting offer, not the site identity or a mandatory gateway.

### Images, accessibility and motion

Use real portraits and working-detail photography, cropped deliberately with `object-fit: cover`. Pair key portraits with a paper caption and a small yellow offset block; use editorial images as broad pauses with restrained captions. Do not introduce generic stock metaphors.

Target WCAG 2.2 AA: semantic headings, labelled controls, keyboard-complete menus/disclosures, a skip link, visible 3px focus rings, adequate contrast and touch targets of at least 2.75rem. Use yellow focus on dark surfaces and deep blue on light surfaces. Default transitions are brief (about 180–220ms). Honor `prefers-reduced-motion` by removing smooth scrolling, continuous CTA animation and non-essential transitions.

## Do's and Don'ts

### Do

- **Do** write to the reader as “you” and let Marc write as “I”, “me” and “my”.
- **Do** use concrete, plain English, observable situations and explicit responsibility boundaries.
- **Do** state uncertainty, scope, fees, poor fit and what happens next without softening them into sales language.
- **Do** reuse the responsibility spectrum, ruled-row offers and universal process before inventing a new pattern.

### Don't

- **Don't** use hype, generic consulting language, invented claims or unconfirmed company-size, growth, ARR or outcome figures.
- **Don't** use AI-writing tells: puffed significance, formulaic negative parallelism, decorative triads, excessive em dashes or conclusions that explain what the preceding copy already showed.
- **Don't** make founders, managers or employees the villain; describe behavior and operating consequences.
- **Don't** make assessment mandatory, invent group-coaching details or let the provisional fractional title swallow the broader practice.
- **Don't** replace editorial rules with grids of interchangeable cards, decorative gradients or heavy shadows.
