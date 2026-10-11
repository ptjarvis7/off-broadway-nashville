#!/usr/bin/env node
/**
 * npm run images
 *
 * Reads original photos from photos-in/ (gitignored), each named by venue slug
 * (for example photos-in/the-station-inn.jpg), and writes two WebP files per
 * photo to public/images/venues/:
 *
 *   <slug>-1600.webp   1600px wide, used as the page image and og:image
 *   <slug>-800.webp    800px wide, offered to smaller screens via srcset
 *
 * sharp drops all metadata (EXIF, GPS, XMP, IPTC) unless told to keep it, and
 * this script never asks it to. Orientation from EXIF is applied to the pixels
 * first, so photos still come out upright. Images narrower than a target width
 * are not upscaled.
 *
 * Prints the `image` object to paste into the venue in src/data/venues.json;
 * alt text (and credit, if any) still have to be written by hand.
 */
import { readdir, mkdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const IN_DIR = 'photos-in'
const OUT_DIR = join('public', 'images', 'venues')
const WIDTHS = [1600, 800]
const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.tif', '.tiff', '.avif'])

async function main() {
  if (!existsSync(IN_DIR)) {
    console.log(`images: no ${IN_DIR}/ folder. Add originals named by venue slug, e.g. ${IN_DIR}/the-station-inn.jpg`)
    return
  }

  const venues = JSON.parse(await readFile(join('src', 'data', 'venues.json'), 'utf8')).venues
  const slugs = new Set(venues.map(v => v.slug))
  const files = (await readdir(IN_DIR)).filter(f => INPUT_EXT.has(extname(f).toLowerCase()))

  if (files.length === 0) {
    console.log(`images: ${IN_DIR}/ has no photos.`)
    return
  }

  await mkdir(OUT_DIR, { recursive: true })
  let failed = false

  for (const file of files) {
    const slug = basename(file, extname(file))
    if (!slugs.has(slug)) {
      console.error(`images: skipping ${file}, "${slug}" is not a venue slug in src/data/venues.json`)
      failed = true
      continue
    }

    const input = join(IN_DIR, file)
    const outputs = []
    for (const width of WIDTHS) {
      const out = join(OUT_DIR, `${slug}-${width}.webp`)
      // .rotate() bakes in EXIF orientation; no .withMetadata(), so nothing else carries over.
      const info = await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(out)
      outputs.push({ out, width: info.width, height: info.height, size: info.size })
    }

    // Belt and braces: confirm the written files carry no EXIF/XMP/IPTC.
    for (const { out } of outputs) {
      const meta = await sharp(out).metadata()
      if (meta.exif || meta.xmp || meta.iptc) {
        console.error(`images: ${out} still has metadata, refusing to keep it`)
        failed = true
      }
    }

    const large = outputs[0]
    for (const o of outputs) console.log(`images: ${o.out} ${o.width}x${o.height} ${(o.size / 1024).toFixed(0)} KB`)
    console.log(
      `  "image": ${JSON.stringify({ src: `/images/venues/${slug}-1600.webp`, alt: '', width: large.width, height: large.height, credit: '' })}`
    )
  }

  if (failed) process.exit(1)
}

main().catch(err => {
  console.error('images: failed:', err)
  process.exit(1)
})
