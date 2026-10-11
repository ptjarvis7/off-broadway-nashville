import { categories, type Category } from '@/data/categories'
import { getAllVenues } from '@/lib/venues'
import type { Venue } from '@/types'

export type { Category }

for (const category of categories) {
  if (category.hasPage && !category.teaser) {
    throw new Error(`Category "${category.slug}" has a page but no teaser in src/data/categories.ts`)
  }
}

/** Categories with a standalone /categories/<slug>/ page, in display order. */
export function getCategoriesWithPages(): Category[] {
  return categories.filter(c => c.hasPage)
}

export function getCategoriesWithoutPages(): Category[] {
  return categories.filter(c => !c.hasPage)
}

/** Resolves a slug only for categories that have a page. */
export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategoriesWithPages().find(c => c.slug === slug)
}

export function venueInCategory(venue: Venue, category: Category): boolean {
  if (category.filterType === 'venueType') return venue.venueTypeTags.includes(category.filterValue)
  if (category.filterType === 'genre') return venue.genreTags.includes(category.filterValue)
  if (category.filterType === 'bestFor') return venue.bestForTags.includes(category.filterValue)
  if (category.filterType === 'neighborhood') return venue.neighborhood === category.filterValue
  return false
}

export function getVenuesInCategory(category: Category): Venue[] {
  return getAllVenues().filter(v => venueInCategory(v, category))
}
