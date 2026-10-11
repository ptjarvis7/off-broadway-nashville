/**
 * Reads the file-based content (guides and site updates) straight from disk.
 *
 * CommonJS on purpose: next.config.js requires it to decide which optional
 * routes exist before the app is compiled, and the app imports the same code
 * so the two can never disagree about what is published.
 */
const fs = require('node:fs')
const path = require('node:path')

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides')
const UPDATES_FILE = path.join(process.cwd(), 'src', 'data', 'updates.json')
const DATE = /^\d{4}-\d{2}-\d{2}$/

/** Parses a `---` frontmatter block of simple `key: value` lines. */
function parseFrontmatter(raw, file) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) throw new Error(`${file}: missing --- frontmatter block`)
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const kv = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/.exec(line)
    if (!kv) throw new Error(`${file}: cannot parse frontmatter line "${line}"`)
    let value = kv[2].trim()
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1)
    data[kv[1]] = value === 'true' ? true : value === 'false' ? false : value
  }
  return { data, body: match[2] }
}

/**
 * @typedef {{ slug: string, title: string, description: string, published: boolean,
 *   datePublished: string, dateModified: string, body: string }} GuideSource
 */

/** Every guide in content/guides/ (README.md excluded), published or not. */
function readAllGuides() {
  if (!fs.existsSync(GUIDES_DIR)) return []
  return fs
    .readdirSync(GUIDES_DIR)
    .filter(f => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
    .sort()
    .map(f => {
      const file = path.join('content', 'guides', f)
      const { data, body } = parseFrontmatter(fs.readFileSync(path.join(GUIDES_DIR, f), 'utf8'), file)
      const published = data.published === true
      if (published) {
        for (const key of ['title', 'description', 'datePublished', 'dateModified']) {
          if (typeof data[key] !== 'string' || !data[key]) throw new Error(`${file}: published guide is missing "${key}"`)
        }
        for (const key of ['datePublished', 'dateModified']) {
          if (!DATE.test(data[key])) throw new Error(`${file}: ${key} must be YYYY-MM-DD, got "${data[key]}"`)
        }
      }
      return /** @type {GuideSource} */ ({
        slug: f.replace(/\.md$/, ''),
        title: String(data.title ?? ''),
        description: String(data.description ?? ''),
        published,
        datePublished: String(data.datePublished ?? ''),
        dateModified: String(data.dateModified ?? ''),
        body,
      })
    })
}

/** Published guides, newest first. */
function readPublishedGuides() {
  return readAllGuides()
    .filter(g => g.published)
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : a.datePublished > b.datePublished ? -1 : 0))
}

/** @typedef {{ date: string, text: string }} SiteUpdate */

/** Site updates, newest first. Missing file means no updates. */
function readUpdates() {
  if (!fs.existsSync(UPDATES_FILE)) return /** @type {SiteUpdate[]} */ ([])
  const entries = JSON.parse(fs.readFileSync(UPDATES_FILE, 'utf8'))
  if (!Array.isArray(entries)) throw new Error('src/data/updates.json must be an array')
  for (const e of entries) {
    if (!e || !DATE.test(e.date) || typeof e.text !== 'string' || !e.text.trim()) {
      throw new Error(`src/data/updates.json: each entry needs a YYYY-MM-DD date and text, got ${JSON.stringify(e)}`)
    }
  }
  return /** @type {SiteUpdate[]} */ (entries).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

module.exports = { readAllGuides, readPublishedGuides, readUpdates }
