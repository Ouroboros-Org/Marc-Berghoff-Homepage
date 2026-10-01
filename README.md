# Marc Berghoff website

English website for Marc’s organisational support, executive coaching and peer advisory. Built with Next.js, React and TypeScript.

Start with [context.tsv](context.tsv) for decisions and outstanding verification. [PRODUCT.md](PRODUCT.md) describes the offer and publishing rules; [DESIGN.md](DESIGN.md) and the [design system](design-system/marc-berghoff/MASTER.md) describe the visual direction. The [October edit-map verification](docs/page-edit-map-verification.md) records the current content, routing, forms and testimonial changes. The [September site-wide verification](docs/sitewide-verification.md) and [homepage verification](docs/refinement-verification.md) preserve earlier design, navigation, motion and self-check evidence. The [preparation brief](docs/redesign-preparation.md) and [initial redesign verification](docs/redesign-verification.md) retain the original decisions and checks.

## Development

Use the pinned pnpm version in `package.json` and Node 22 or newer.

```sh
pnpm install
pnpm dev --webpack
```

Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` before merging. After deleting routes, regenerate Next.js types or remove stale generated `.next/types` and `.next/dev/types` output before type checking.

## Content and configuration

- Three organisational engagement definitions: `src/content/engagements.ts`; standalone coaching and peer details: `src/components/service-pages/services-landing.tsx`.
- Outcomes, testimonials and case studies: `src/content/proof.ts` and `docs/claim-ledger.md`.
- Manual article content: `src/content/blog.ts`; each published entry receives its own `/blog/[slug]` page. Follow the [article publishing guide](docs/article-publishing.md).
- Public domain and mailbox: `src/config/site.ts`, with environment overrides documented in `.env.example`.
- Form delivery: [Google Forms setup](docs/google-forms-setup.md). European peer interest uses a separate Form with `GOOGLE_PEER_FORM_*` variables. Inbox notifications are an external setting, separate from public `mailto` links.
- Image originals and optimized WebP derivatives: `public/images`; provenance in [generated images](docs/generated-images.md).

The launch is English only. Obsolete German and standalone coaching/peer-advisory routes have no redirects.
