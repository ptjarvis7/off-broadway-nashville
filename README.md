# Off Broadway Nashville

A static directory of Nashville live music venues beyond the Broadway strip.
Next.js App Router, exported to static HTML (`output: 'export'`, `trailingSlash: true`).

## Commands

```bash
npm run dev          # local dev server
npm run build        # static export to out/, then the internal link check
npm run check-links  # run the link check on its own against an existing out/
```

`npm run build` fails if the link check fails, so a broken internal link cannot ship.

## Venue data

`src/data/venues.json` is the single source of truth for venue records.
Everything reads it through `src/lib/venues.ts` — routes and components never
import the JSON directly.

### Keeping `lastUpdated` honest

Every venue carries a `lastUpdated` field (`YYYY-MM-DD`). It drives the
"Updated [Month YYYY]" line on each venue page and the `<lastmod>` for that
venue's entry in `sitemap.xml`.

**Whenever you change a venue's content, bump that venue's `lastUpdated` to the
date of the change in the same commit.** Content means anything a reader sees:
`name`, `neighborhood`, `shortDescription`, `whatToExpect`, the tag arrays, or
`officialWebsite`. If you do not bump it, the venue page and the sitemap will
keep advertising a stale date, which is worse for search than no date at all.

Neighborhood, category, and list-page `<lastmod>` values are derived from the
newest `lastUpdated` of the venues they contain, so they follow automatically.

## SEO

`src/lib/seo.ts` owns the shared metadata surface. Every route builds its
metadata with `pageMetadata({ title, description, path })`, which emits a
self-referencing canonical plus Open Graph and Twitter tags that match that
page's own title and description.

Next.js **replaces** rather than merges `openGraph`/`twitter` between segments,
so the root layout deliberately defines neither — a default there would leak
onto any page that did not set its own. New routes must call `pageMetadata`.

`twitter:card` is `summary` until the site has a real `og:image`; switch it to
`summary_large_image` in `pageMetadata` once images exist.

All internal links must end in a trailing slash. `next.config.js` sets
`trailingSlash: true`, so a link without one 308-redirects and Search Console
reports it as "Page with redirect". `scripts/check-links.mjs` enforces this.
