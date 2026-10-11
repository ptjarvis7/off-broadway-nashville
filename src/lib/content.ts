import { readPublishedGuides, readUpdates } from '@/lib/content-source'

export interface Guide {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  body: string
}

/** Published guides from content/guides/, newest first. */
export function getPublishedGuides(): Guide[] {
  return readPublishedGuides()
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getPublishedGuides().find(g => g.slug === slug)
}

/** Whether /guides/ is built at all, and so whether anything may link to it. */
export function hasGuides(): boolean {
  return getPublishedGuides().length > 0
}

export interface SiteUpdate {
  date: string
  text: string
}

/** Entries from src/data/updates.json, newest first. */
export function getSiteUpdates(): SiteUpdate[] {
  return readUpdates()
}

/** The footer links /updates/ only once it has enough entries to be worth a visit. */
export const UPDATES_FOOTER_THRESHOLD = 3
