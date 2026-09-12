# Marc Berghoff website

English website for Marc’s Fractional CPO and strategic people advisory work. Built with Next.js, React and TypeScript.

Start with [context.tsv](context.tsv) for decisions and outstanding verification. [PRODUCT.md](PRODUCT.md) describes the offer and publishing rules; [DESIGN.md](DESIGN.md) and the [design system](design-system/marc-berghoff/MASTER.md) describe the visual direction. The [site-wide verification](docs/sitewide-verification.md) records the latest cross-page design, copy and mobile navigation checks. The [homepage verification](docs/refinement-verification.md) preserves the hero, motion and self-check evidence. The [preparation brief](docs/redesign-preparation.md) records the initial audit and resolved owner inputs; [initial redesign verification](docs/redesign-verification.md) retains earlier evidence and external configuration limits.

## Development

Use the pinned pnpm version in `package.json` and Node 22 or newer.

```sh
pnpm install
pnpm dev --webpack
```

Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` before merging. After deleting routes, regenerate Next.js types or remove stale generated `.next/types` and `.next/dev/types` output before type checking.

## Content and configuration

- Three flexible engagement definitions: `src/content/engagements.ts`.
- Outcomes, testimonials and case studies: `src/content/proof.ts` and `docs/claim-ledger.md`.
- Manual article content: `src/content/blog.ts`; each published entry receives its own `/blog/[slug]` page. Follow the [article publishing guide](docs/article-publishing.md).
- Public domain and mailbox: `src/config/site.ts`, with environment overrides documented in `.env.example`.
- Form delivery: [Google Forms setup](docs/google-forms-setup.md). Inbox notifications are an external setting, separate from public `mailto` links.
- Image originals and optimized WebP derivatives: `public/images`; provenance in [generated images](docs/generated-images.md).

The launch is English only. Obsolete German and standalone coaching/peer-advisory routes have no redirects.
