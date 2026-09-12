# Publish an Insight

Articles are maintained in `src/content/blog.ts`. The shared template at
`src/app/(en)/blog/[slug]/page.tsx` gives each article its own indexable page.
The overview remains at `/blog`; a CMS is not needed for this workflow.

## Prepare the article

Start with Marc's supplied English text. Confirm the title, summary and final
wording before adding it to the published collection. Check client claims against
`docs/claim-ledger.md`. Keep unfinished drafts in the working branch or source
document until they are ready for the site.

Add one object to `BLOG_POSTS`. The first item is the featured article on the
Insights overview; the remaining items appear in array order. Use the existing
articles as complete examples.

| Field | What to enter |
| --- | --- |
| `slug` | A unique lowercase identifier with hyphens. Keep it stable after publication. |
| `title` | The article heading. It also supplies the page and social-preview title. |
| `description` | A concise summary for the overview, search metadata and article header. |
| `category` | A short topic label, such as “Leadership systems” or “Fractional CPO”. |
| `publishedAt` | The actual publication date in `YYYY-MM-DD` format. |
| `updatedAt` | The publication date initially; update it when the article changes substantively. |
| `intro` | The opening paragraph, without repeating the summary. |
| `sections` | Ordered sections with a unique `heading`, `paragraphs`, and optional `points` list. |
| `nextStep` | A clear label and an existing destination relevant to the article. |

Paragraphs and list items are plain text. Do not insert HTML or Markdown syntax
and expect rich formatting. Add supporting links through the optional
`sources` field; they appear as “Further reading”.

The section headings generate the contents links. Keep headings distinct and
include a letter or number so their anchors remain meaningful.

## Optional images and links

The article and each section can contain an `image` object:

```ts
image: {
  src: "/images/portraits/marc-seated-original.webp",
  alt: "Marc Berghoff seated at a table with a notebook",
  width: 1202,
  height: 1601,
}
```

This example uses an existing image. Choose an image that serves the actual
article. Place new files under `public/images/` and use their public path
beginning with `/images/`. Record the encoded image's real width and height.
Optimise new photographs as WebP or AVIF, and write alt text that describes their
relevant content. A `caption` is optional. Keep photographer credit where required
and retain image provenance. Generated scenes must not be attributed to real
clients or events.

Add a source list when the article refers to external evidence:

```ts
sources: [
  {
    label: "Marc Berghoff's Associate Certified Coach credential",
    href: "https://www.credly.com/badges/3ef5dbc3-30a7-4ae0-b9f1-d5e21d6caded/public_url",
  },
]
```

Use descriptive source labels and direct, verified HTTPS links. Article images,
captions and source lists are omitted cleanly when absent; no layout redesign is
needed.

## Preview and publish

1. Run the local development preview with `pnpm dev`.
2. Open `/blog` and the article at `/blog/<slug>`. Check title wrapping, the
   contents links, images, source links and the next-step destination on desktop
   and mobile.
3. Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` using the
   repository's configured runtime.
4. Review the change and publish through the site's normal deployment process.
   Adding a file locally does not update the live site.
5. After deployment, check the article URL and its overview link. The existing
   template/content collection also supplies article metadata, reading time,
   social previews, structured data, RSS and sitemap entries.

Preserve an existing article's slug when updating it. If a URL must change, add
an explicit redirect from the old URL and check all internal links before
publication. There is currently no draft field: every item in `BLOG_POSTS` is
included in the published collection.
