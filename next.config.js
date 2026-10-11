const { readPublishedGuides, readUpdates } = require('./src/lib/content-source.js')

/**
 * Optional routes. Static export cannot build a dynamic route with no params,
 * and an empty index page would be filler, so these routes only exist when
 * there is content for them. Their files use a dedicated extension
 * (page.guides.tsx, page.updates.tsx) that Next only treats as a page when it
 * is listed here.
 */
const optionalPageExtensions = [
  ...(readPublishedGuides().length > 0 ? ['guides.tsx'] : []),
  ...(readUpdates().length > 0 ? ['updates.tsx'] : []),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', ...optionalPageExtensions],
}

module.exports = nextConfig
