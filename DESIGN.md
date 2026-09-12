---
name: Marc Berghoff
description: White and navy, human imagery and a clear progression into strategic people leadership.
colors:
  navy: "#0b203d"
  blue: "#7cb0ff"
  blue-deep: "#173d70"
  blue-soft: "#dceaff"
  blue-mist: "#f1f6ff"
  on-navy-secondary: "#c2d0e1"
  blue-reading: "#36516c"
  blue-supporting: "#405a76"
  yellow: "#fec302"
  yellow-soft: "#fff1ba"
  ink: "#12283f"
  ink-soft: "#3e5062"
  muted: "#5d6a78"
  line: "#dce3eb"
  paper: "#ffffff"
  canvas: "#f7f9fc"
typography:
  display:
    fontFamily: "Instrument Sans Variable, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(2.8rem, 4.35vw, 4.35rem)"
    fontWeight: 570
    lineHeight: 1.07
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Instrument Sans Variable, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 4.25vw, 4.15rem)"
    fontWeight: 580
    lineHeight: 1.08
  label:
    fontFamily: "Inter Variable, Inter, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    lineHeight: 1.5
  body:
    fontFamily: "Inter Variable, Inter, Arial, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.65
spacing:
  gutter: "clamp(1.25rem, 3.6vw, 3.5rem)"
  section: "clamp(4.5rem, 9vw, 8.5rem)"
---

# Design system: Marc Berghoff

Updated for the September 2026 redesign. [context.tsv](context.tsv) holds current owner decisions and unresolved delivery work. The [preparation brief](docs/redesign-preparation.md) records the investigation; later owner answers take precedence over its provisional recommendations.

## Direction

The site presents a Fractional CPO who can work through the people side of growth with a leadership team. Its visual character is direct, spacious and personal: white reading surfaces, navy contrast, genuine portraits and restrained yellow/light-blue details drawn from the existing logo.

The homepage helps visitors choose and act. Article and case pages prioritize reading. The redesign replaces the former flat, repeated heading-left/copy-right pattern. Keep the personal voice and the logo; vary composition, scale and density to fit each section's purpose.

The main visual gesture is the complete pale-yellow highlight behind “Fractional CPO,” finished with a small light-blue corner. It emphasizes the actual offer and echoes the logo geometry. Avoid heavy underlines that resemble a writing warning.

## Identity and content

- Marc Berghoff is the public brand. HX Solutions appears only where the actual legal or operational identity requires it.
- English is the only active publishing language for now.
- Spell out Chief People Officer beside the main proposition. Explain people, leadership, organisational development and scaling in plain language.
- Marc speaks as “I,” “me” and “my.” Address the visitor as “you.” Use specific responsibilities and outcomes instead of consulting slogans.
- Present three engagements: Bottleneck Assessment with Review, Strategic People Advisory and Fractional CPO / ongoing Strategic People Advisory. Visitors can start with any of them.
- A free introductory conversation, typically 30 minutes, remains available to everyone. Scope and cadence are flexible starting points, with no minimum or maximum term.
- Coaching, leadership development, workshops and operational documents belong inside agreed engagements. They are not additional equally ranked offers.
- Use the shared [engagement model](src/content/engagements.ts) and [proof model](src/content/proof.ts). Keep quote wording, attribution, metric units and periods intact.

## Palette

`src/app/globals.css` owns the implementation tokens.

| Role | Token and value | Use |
| --- | --- | --- |
| Main contrast | `--navy: #0B203D` | Principal actions, proof band, featured engagement and closing |
| Supporting blue | `--blue-deep: #173D70` | Focus on light surfaces, supporting links and existing secondary-page structures |
| Brand blue | `--blue: #7CB0FF` | Small details and the preserved logo |
| Light fields | `--blue-soft: #DCEAFF`, `--blue-mist: #F1F6FF` | Diagnostic invitation, image framing and calm reading pauses |
| Yellow emphasis | `--yellow: #FEC302`, `--yellow-soft: #FFF1BA` | Role highlight, outcome figures and deliberate hover states |
| Reading | `--ink: #12283F`, `--ink-soft: #3E5062` | Headings and body copy on white |
| Supporting text | `--muted: #5D6A78` | Secondary text and CTA helper copy on white |
| Structural line | `--line: #DCE3EB` | Light borders and separators |
| Main surface | `--paper: #FFFFFF` | Primary reading surface |

White text belongs on navy. Yellow and light-blue surfaces use dark text. Supporting text on dark sections uses a pale blue derived from that surface, not the light-surface muted token. Preserve the logo's own light-blue/light-yellow artwork. Signal success and errors with the existing semantic colors and explicit text.

## Typography and spacing

Instrument Sans is the display face; Inter is the reading and control face. Most homepage headings use weights around 550–620, while the highlighted role reaches 690. Keep tracking at or above -0.04em and headlines below 6rem. Headings wrap to the actual available space; avoid fixed line breaks that fail at nearby widths.

Use generous separation before a major heading and tighter spacing between its heading and explanation. Do not apply one tall section-height pattern throughout. The outcome band and self-check invitation are compact. The engagements and personal introduction have more breathing room.

The homepage container is 77.5rem with fluid gutters. Reading paragraphs usually sit between 40 and 60 characters per line. CTA helper text is outside the button, associated with that action and readable at ordinary mobile widths. Do not shrink text to force the hero into a fixed viewport height.

## Homepage composition

1. A white hero with two reader-focused sentences, the highlighted Fractional CPO role, a two-sentence excerpt, and two distinct actions with helper text. The portrait, name and verified credentials form a separate right-hand group on desktop.
2. A compact navy band with four outcome values, labels and time/context lines. Numbers animate once into their exact final values; these are evidence, not controls.
3. A personal introduction with a workshop image on the left, a smaller genuine portrait and first-person prose on the right. More of Marc's story remains on About.
4. A featured case alternates that balance: story on the left and navy result block on the right, followed by a supporting testimonial. Link to the full case. On mobile the numerical result precedes the story.
5. A compact light-blue self-check invitation linking to the independent `/self-check` page.
6. A centred introduction and three comparable engagement cards. Fractional CPO is navy at rest, with a pale-yellow title. Each card exposes the starting situation, what the client receives, typical cadence and a clear link.
7. Paired, static fit criteria. Clearly distinguish strategic support from day-to-day administration or replacement of a whole HR team.
8. One featured Insight with smaller companion article links and an overview route.
9. A navy invitation to the free conversation. Center the call button and helper directly beneath the copy, with the message link below. A compact white footer provides clear separation, grouped navigation, a call button and a self-check link.

Do not append generic statement sections around this sequence. Evidence replaces repetitive claims. Testimonials remain readable in place without a carousel.

Set testimonial text in italic with opening and closing quotation marks on Home, Selected work and case pages. Load the existing typefaces' italic variants; keep attribution upright and preserve the approved wording. In the fit section, green checks use `--success` and red minus marks use `--error`. Headings and icon shapes retain the distinction independently of color.

## Components and behavior

### Secondary pages

Carry the same navy, white, light-blue and yellow palette, shared gutters, calm heading weights and short action labels through Services, About, Selected work, Contact, Insights, Self-check and legal pages. Remove older decorative circles and gradient hero fields. A page without a hero aside uses the available reading width rather than reserving an empty second column.

Keep compositions appropriate to the content: About remains an image-supported personal narrative; services explain the engagement; case studies and articles prioritize reading. Use first-appearance entrances for concise headings, cards, images and closing invitations. Keep long article and story prose immediately readable. A shared closing invitation uses a navy field with a centered action and helper beneath it.

### Actions and engagement cards

Buttons retain pill geometry and a minimum height of 44px. Book a call uses navy with white text; Start self-check uses the filled yellow accent with navy text. Both are prominent, with calendar and checklist icons distinguishing their purposes. Secondary actions use a quiet outline, and inverse actions use white on navy. Hover preserves the distinction between the two principal actions. The booking button has a small static shadow; it has no looping decoration.

Only interactive cards respond to hover. Engagement cards turn pale yellow with navy text on hover or keyboard focus; article links use navy or a yellow tint. Titles, labels and icons change together. A visible focus outline remains independent of the color change. Static outcomes, quotes and process steps do not receive click-like affordances.

Each engagement card is one link, with no nested buttons. Keep the cards in the same reading order when stacked. Their numbers indicate the increasing level of support, not mandatory purchases or a completed/selected state.

### Assessment and process

Home and the direct menu shortcut link to `/self-check` for the independent free reflection tool. A link labelled Bottleneck Assessment opens `/bottleneck-assessment`, the paid service with interviews, a report and a review. The short self-check offers perspective on company patterns; it is not an abbreviated assessment or a prerequisite to paid work.

The existing four-step engagement process belongs on Services. Use a clear ordered sequence with the step title ahead of secondary metadata. Service choice is a separate decision; do not invent active or selected process steps.

### Credentials and imagery

`CredentialBadges` owns the ACC and CPCC artwork links for Home and About. Use authoritative credential marks and their supplied Credly destinations. Do not reinterpret certification artwork.

Use responsive WebP/AVIF photo derivatives with explicit sizes and deliberate crops. Keep original photographs. Generated working images support atmosphere and are recorded internally; captions must not imply a fabricated scene occurred at a named client. The clean public presentation does not expose internal asset-production notes.

Keep About as a personal narrative with imagery and chronology. Images create pauses in the story rather than substituting for factual evidence.

### Motion

The hero and final outcome values are present in the server render. `Reveal` adds a soft rise or fade to individual headings, cards and story blocks when they first enter the viewport. Avoid wrapping a tall section whose entrance would finish before its lower content appears. Outcome numbers count smoothly to their exact final values on first appearance, with stable width and static accessible text. Scrolling back does not replay motion. Keep timing calm, without bounce, parallax, autoplay testimonials or looping CTA effects.

Content is visible in the server render and without JavaScript. Reduced-motion visitors receive immediate content; changing that preference also cancels an active entrance. Hover transitions are removed under reduced motion.

### Shared shell, forms and navigation

Preserve working menu semantics, focus handling, Escape behavior, scroll locking and focus return. Self-check is directly discoverable in header and footer; Bottleneck Assessment remains in the service navigation. Keep a booking/contact action in the shared header. Navigation content follows the current English-only route model.

Mobile menu links keep the same text alignment in normal and selected states, with space between the current-page marker and the text. Reserve scrollbar space before an accordion expands. Active group decoration belongs on the title, not its decorative numeric prefix.

Keep form labels, validation, errors, success feedback and explicit optional diagnostic sharing. Do not erase answers or contact text on recoverable errors. Keep calendar sizing, scrolling and contact fallbacks usable on phones.

## Responsive acceptance

- At 1280×720 and 1366×768, both hero actions and their helper text should fit comfortably at ordinary zoom. Height-aware spacing complements width-based type sizing; it must not clip content.
- Homepage engagement cards stack below 55rem; the hero becomes one column below 48rem. At phone widths, text and actions precede imagery. Below 30rem the hero actions stack, each followed immediately by its helper.
- Outcomes become two columns below 48rem. Labels and units must remain readable and grouped with their value; reduce columns further if real content needs it.
- The case, image-led introduction, fit criteria and Insights become a deliberate single-column reading sequence.
- Check 360, 390, 430, 768, 1024, 1280, 1366, 1440 and 1920px layouts as appropriate, including the actual breakpoint boundaries. Check short heights, 200% zoom and narrow reflow.
- Compare the reported Safari/MacBook Air behavior with another available browser at matching CSS viewport dimensions, loaded fonts and fresh/reloaded states. Equal 100% zoom alone is not a controlled comparison.
- Verify keyboard focus, contrast, no horizontal overflow, accessible names, reduced motion and stable image loading. Source inspection is not a rendered pass; record actual checks and remaining limits.
