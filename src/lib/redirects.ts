import vercelConfig from '../../vercel.json'
import { getNeighborhoodsWithoutPages, neighborhoodToSlug } from '@/lib/venues'
import { getCategoriesWithoutPages } from '@/lib/categories'

interface Redirect {
  source: string
  destination: string
  permanent?: boolean
}

/**
 * vercel.json is read by Vercel before the build runs, so it cannot be
 * generated from the data. Instead the build checks it: every neighborhood or
 * category with hasPage: false must have a permanent redirect to its index,
 * with and without the trailing slash, and no redirect may shadow a page that
 * still exists. Throws (failing the build) on any drift.
 */
export function assertRedirectsMatchRemovedPages(): void {
  const expected = new Map<string, string>()
  for (const n of getNeighborhoodsWithoutPages()) {
    expected.set(`/neighborhoods/${neighborhoodToSlug(n)}`, '/neighborhoods/')
  }
  for (const c of getCategoriesWithoutPages()) {
    expected.set(`/categories/${c.slug}`, '/categories/')
  }

  const redirects = ((vercelConfig as { redirects?: Redirect[] }).redirects ?? [])
  const bySource = new Map(redirects.map(r => [r.source, r]))
  const problems: string[] = []

  for (const [path, destination] of Array.from(expected)) {
    for (const source of [path, `${path}/`]) {
      const r = bySource.get(source)
      if (!r) problems.push(`missing redirect for ${source}`)
      else if (r.destination !== destination || r.permanent !== true) {
        problems.push(`${source} should permanently redirect to ${destination}`)
      }
    }
  }

  for (const r of redirects) {
    const path = r.source.replace(/\/$/, '')
    if (/^\/(neighborhoods|categories)\/[^/]+$/.test(path) && !expected.has(path)) {
      problems.push(`${r.source} redirects away a page that has hasPage: true (or no longer exists in the data)`)
    }
  }

  if (problems.length) {
    throw new Error(`vercel.json redirects are out of sync with hasPage flags:\n  ${problems.join('\n  ')}`)
  }
}
