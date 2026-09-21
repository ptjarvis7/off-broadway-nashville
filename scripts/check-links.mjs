#!/usr/bin/env node
/**
 * Postbuild internal link checker.
 *
 * Scans every HTML file in out/ and fails the build when an internal link
 * points at something that was not exported, or when an internal page link is
 * missing the trailing slash that next.config.js's `trailingSlash: true`
 * requires. Without the trailing slash the link 308-redirects, which Google
 * Search Console reports as "Page with redirect".
 */
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative, posix } from 'node:path'

const OUT_DIR = 'out'

/** Extensions that are served as files, so their links need no trailing slash. */
const FILE_EXT = /\.(xml|txt|png|jpe?g|gif|svg|webp|avif|ico|pdf|json|css|js|mjs|webmanifest|woff2?|ttf|eot|mp4|webm|mp3)$/i

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

/** Skip links that never resolve to a file in out/. */
function isExternal(href) {
  return (
    href === '' ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('//') ||
    /^[a-z][a-z0-9+.-]*:/i.test(href) ||
    href.startsWith('/_next/')
  )
}

/** Where a given internal path must exist on disk inside out/. */
function targetFor(pathname) {
  if (FILE_EXT.test(pathname)) return join(OUT_DIR, pathname)
  return join(OUT_DIR, pathname, 'index.html')
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error(`check-links: ${OUT_DIR}/ not found. Run the export first.`)
    process.exit(1)
  }

  const htmlFiles = (await walk(OUT_DIR)).filter(f => f.endsWith('.html'))
  const errors = []
  let linkCount = 0

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8')
    const source = posix.sep + relative(OUT_DIR, file).split(/[\\/]/).join(posix.sep)
    const seen = new Set()

    for (const match of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/gi)) {
      const raw = match[1].replace(/&amp;/g, '&')
      if (isExternal(raw)) continue

      // Root-relative links only; the site emits no relative hrefs.
      if (!raw.startsWith('/')) {
        errors.push(`${source}: non-root-relative href "${raw}"`)
        continue
      }
      if (seen.has(raw)) continue
      seen.add(raw)
      linkCount++

      const pathname = raw.split(/[?#]/)[0]

      if (!FILE_EXT.test(pathname) && !pathname.endsWith('/')) {
        errors.push(`${source}: internal page href missing trailing slash: "${raw}"`)
        continue
      }
      if (!existsSync(targetFor(pathname))) {
        errors.push(`${source}: href "${raw}" has no target in ${OUT_DIR}/ (expected ${targetFor(pathname)})`)
      }
    }
  }

  if (errors.length) {
    console.error(`\ncheck-links: ${errors.length} broken internal link(s):\n`)
    for (const e of errors) console.error(`  ${e}`)
    console.error('')
    process.exit(1)
  }

  console.log(
    `check-links: OK — ${linkCount} unique internal link(s) across ${htmlFiles.length} page(s), all resolve with trailing slashes.`
  )
}

main().catch(err => {
  console.error('check-links: failed to run:', err)
  process.exit(1)
})
