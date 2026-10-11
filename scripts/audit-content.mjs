#!/usr/bin/env node
/**
 * npm run audit:content
 *
 * Progress report on content depth. Prints where each page stands against
 * its target and a summary of how many are below target. It always exits 0:
 * it is a to-do list, not a gate, and is not part of the build.
 *
 * Reads the TypeScript data modules directly, which relies on Node's built-in
 * type stripping (Node 22.18+ / 23.6+).
 */
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { readPublishedGuides } = require('../src/lib/content-source.js')
const { categories } = await import('../src/data/categories.ts')
const { neighborhoods, neighborhoodIntros, neighborhoodFaqs } = await import('../src/data/neighborhoods.ts')

const INTRO_TARGET = 350
const FAQ_TARGET = 4
const KBYG_FIELDS = ['cover', 'payment', 'seating', 'ages', 'parking', 'bestNights']

const words = text => (text ?? '').trim().split(/\s+/).filter(Boolean).length
const pad = (s, n) => String(s).padEnd(n)
const lpad = (s, n) => String(s).padStart(n)
const mark = ok => (ok ? ' ' : '!')

const venues = JSON.parse(await readFile(new URL('../src/data/venues.json', import.meta.url), 'utf8')).venues.filter(
  v => v.status === 'active'
)
const activeNeighborhoods = new Set(venues.map(v => v.neighborhood))

// Listing pages ------------------------------------------------------------
const listing = [
  ...categories
    .filter(c => c.hasPage)
    .map(c => ({ kind: 'category', name: c.shortTitle, intro: c.description, faqs: c.faqs?.length ?? 0 })),
  ...neighborhoods
    .filter(n => n.hasPage && activeNeighborhoods.has(n.name))
    .map(n => ({ kind: 'neighborhood', name: n.name, intro: neighborhoodIntros[n.name], faqs: neighborhoodFaqs[n.name]?.length ?? 0 })),
]

console.log(`\nCATEGORY AND NEIGHBORHOOD PAGES   (targets: intro ${INTRO_TARGET}+ words, ${FAQ_TARGET}+ FAQs; ! = below target)\n`)
console.log(`  ${pad('Type', 13)} ${pad('Page', 20)} ${lpad('Intro', 7)}   ${lpad('FAQs', 4)}`)
let introsBelow = 0
let faqsBelow = 0
let listingBelow = 0
for (const p of listing) {
  const w = words(p.intro)
  const introOk = w >= INTRO_TARGET
  const faqOk = p.faqs >= FAQ_TARGET
  if (!introOk) introsBelow++
  if (!faqOk) faqsBelow++
  if (!introOk || !faqOk) listingBelow++
  console.log(`  ${pad(p.kind, 13)} ${pad(p.name, 20)} ${lpad(w, 6)}${mark(introOk)}   ${lpad(p.faqs, 4)}${mark(faqOk)}`)
}

// Venues -------------------------------------------------------------------
console.log(`\nVENUES   (What to Expect words, Know before you go fields filled of ${KBYG_FIELDS.length}, image, lastUpdated)\n`)
const nameWidth = Math.max(...venues.map(v => v.name.length)) + 1
console.log(`  ${pad('Venue', nameWidth)} ${lpad('WTE', 5)}  ${lpad('KBYG', 4)}  ${pad('Image', 5)}  Updated`)
let noWte = 0
let kbygIncomplete = 0
let noImage = 0
for (const v of [...venues].sort((a, b) => a.name.localeCompare(b.name))) {
  const wte = words(v.whatToExpect)
  const kbyg = KBYG_FIELDS.filter(f => v.knowBeforeYouGo?.[f]?.trim()).length
  if (!wte) noWte++
  if (kbyg < KBYG_FIELDS.length) kbygIncomplete++
  if (!v.image) noImage++
  console.log(
    `  ${pad(v.name, nameWidth)} ${lpad(wte, 5)}  ${lpad(`${kbyg}/${KBYG_FIELDS.length}`, 4)}  ${pad(v.image ? 'yes' : 'no', 5)}  ${v.lastUpdated}`
  )
}

// Guides -------------------------------------------------------------------
const guides = readPublishedGuides()
console.log(`\nGUIDES\n\n  Published: ${guides.length}`)

// Summary ------------------------------------------------------------------
console.log(`\nSUMMARY\n`)
console.log(`  Listing pages below target:   ${listingBelow} of ${listing.length}`)
console.log(`    intro under ${INTRO_TARGET} words:        ${introsBelow}`)
console.log(`    fewer than ${FAQ_TARGET} FAQs:           ${faqsBelow}`)
console.log(`  Venues without What to Expect: ${noWte} of ${venues.length}`)
console.log(`  Venues with Know before you go incomplete: ${kbygIncomplete} of ${venues.length}`)
console.log(`  Venues without an image:       ${noImage} of ${venues.length}`)
console.log(`  Published guides:              ${guides.length}\n`)
