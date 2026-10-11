# Guides

Each guide is one Markdown file in this folder. The file name becomes the URL:
`content/guides/first-night-off-broadway.md` is served at
`/guides/first-night-off-broadway/`. This README is never built.

## Frontmatter

Every guide starts with a frontmatter block:

```md
---
title: Your First Night Off Broadway
description: One or two sentences for search results and the guides index.
published: false
datePublished: 2026-11-01
dateModified: 2026-11-01
---
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Page heading, page title, and Article headline. |
| `description` | yes | Meta description and the summary on `/guides/`. |
| `published` | yes | `true` to build the guide. Anything else keeps it as a draft. |
| `datePublished` | yes | `YYYY-MM-DD`. Shown on the page and used in the Article markup. |
| `dateModified` | yes | `YYYY-MM-DD`. Shown as "Updated" and used as the sitemap `lastmod`. Bump it when the guide changes. |

A published guide with a missing field or a malformed date fails the build.

## What publishing does

`/guides/` does not exist until at least one guide has `published: true`.
The first published guide turns on the `/guides/` index, the Guides link in the
header and footer, and the sitemap entries. Unpublishing the last guide turns
all of them off again.

## Body

Supported Markdown: `##` to `####` headings (the title is already the `h1`),
paragraphs, `-` or `1.` lists, `>` quotes, `---` rules, `[links](/venues/the-station-inn/)`,
`**bold**`, `*italic*`, and `` `code` ``. Raw HTML is escaped.

Link to venue pages with a root-relative path and a trailing slash, for example
`/venues/the-bluebird-cafe/`. The build's link checker fails on a link to a page
that does not exist or one that is missing the trailing slash.
