#!/usr/bin/env node
/**
 * Postbuild JSON-LD checker, run after check-links.mjs.
 *
 * For every HTML file in out/ it fails the build when:
 *   - a <script type="application/ld+json"> block is not valid JSON,
 *   - any URL on this site inside a block (url, item, @id, image, ...) points
 *     at a page or file that was not exported, or at a page without the
 *     trailing slash, or at the non-www host,
 *   - a page type is missing the schema types it is expected to carry.
 */
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative, posix } from 'node:path'

const OUT_DIR = 'out'
const SITE_URL = 'https://www.offbroadwaynashville.co'
const SITE_HOST = /^https?:\/\/(www\.)?offbroadwaynashville\.co(?=[/?#]|$)/i
const FILE_EXT = /\.(xml|txt|png|jpe?g|gif|svg|webp|avif|ico|pdf|json|css|js|webmanifest)$/i

/** Schema types each kind of page must carry. */
const EXPECTED = [
  { match: p => p === '/', types: ['WebSite', 'Organization', 'Person'] },
  { match: p => /^\/venues\/[^/]+\/$/.test(p), types: ['MusicVenue', 'BreadcrumbList'] },
  { match: p => /^\/(categories|neighborhoods)\/[^/]+\/$/.test(p), types: ['CollectionPage', 'ItemList', 'BreadcrumbList'] },
  { match: p => /^\/guides\/[^/]+\/$/.test(p), types: ['Article', 'Person', 'BreadcrumbList'] },
]

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

/** Every string anywhere in the value, with the key it sits under. */
function* strings(value, key = '') {
  if (typeof value === 'string') yield [key, value]
  else if (Array.isArray(value)) for (const v of value) yield* strings(v, key)
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) yield* strings(v, k)
}

function* types(value) {
  if (Array.isArray(value)) for (const v of value) yield* types(v)
  else if (value && typeof value === 'object') {
    const t = value['@type']
    if (typeof t === 'string') yield t
    else if (Array.isArray(t)) yield* t
    for (const v of Object.values(value)) yield* types(v)
  }
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error(`check-jsonld: ${OUT_DIR}/ not found. Run the export first.`)
    process.exit(1)
  }

  const htmlFiles = (await walk(OUT_DIR)).filter(f => f.endsWith('.html'))
  const errors = []
  let blockCount = 0
  let urlCount = 0

  for (const file of htmlFiles) {
    const rel = relative(OUT_DIR, file).split(/[\\/]/).join(posix.sep)
    const route = rel === 'index.html' ? '/' : rel.endsWith('/index.html') ? `/${rel.slice(0, -'index.html'.length)}` : `/${rel}`
    const html = await readFile(file, 'utf8')
    const pageTypes = new Set()

    for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      blockCount++
      let data
      try {
        data = JSON.parse(match[1])
      } catch (err) {
        errors.push(`${route}: JSON-LD block is not valid JSON (${err.message})`)
        continue
      }
      for (const t of types(data)) pageTypes.add(t)

      for (const [key, value] of strings(data)) {
        if (key === '@context' || !SITE_HOST.test(value)) continue
        urlCount++
        if (!value.startsWith(`${SITE_URL}/`)) {
          errors.push(`${route}: JSON-LD ${key} "${value}" is not on the canonical ${SITE_URL} host`)
          continue
        }
        const pathname = value.slice(SITE_URL.length).split(/[?#]/)[0]
        if (!FILE_EXT.test(pathname) && !pathname.endsWith('/')) {
          errors.push(`${route}: JSON-LD ${key} "${value}" is missing its trailing slash`)
          continue
        }
        const target = FILE_EXT.test(pathname) ? join(OUT_DIR, pathname) : join(OUT_DIR, pathname, 'index.html')
        if (!existsSync(target)) {
          errors.push(`${route}: JSON-LD ${key} "${value}" points at a page that does not exist (expected ${target})`)
        }
      }
    }

    for (const rule of EXPECTED) {
      if (!rule.match(route)) continue
      for (const t of rule.types) {
        if (!pageTypes.has(t)) errors.push(`${route}: expected JSON-LD type ${t}, found ${[...pageTypes].join(', ') || 'none'}`)
      }
    }
  }

  if (errors.length) {
    console.error(`\ncheck-jsonld: ${errors.length} problem(s):\n`)
    for (const e of errors) console.error(`  ${e}`)
    console.error('')
    process.exit(1)
  }

  console.log(`check-jsonld: OK, ${blockCount} JSON-LD block(s) across ${htmlFiles.length} page(s) parse, ${urlCount} site URL(s) all resolve.`)
}

main().catch(err => {
  console.error('check-jsonld: failed to run:', err)
  process.exit(1)
})
