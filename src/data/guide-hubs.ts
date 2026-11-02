/**
 * Guides linked from each category and neighborhood page, keyed by the hub's
 * path. Hubs show guide titles only. A guide that isn't published is skipped.
 *
 * Venue pages need no entry here: each venue page lists every published guide
 * whose text links to it (see getGuidesForVenue in src/lib/content.ts).
 */
export const guideHubs: Record<string, string[]> = {
  '/categories/listening-rooms/': ['how-songwriter-rounds-work', 'live-music-under-21'],
  '/categories/songwriter-rounds/': ['how-songwriter-rounds-work', 'live-music-under-21'],
  '/categories/honky-tonks/': ['walkable-music-venues'],
  '/categories/concert-venues/': ['live-music-under-21', 'walkable-music-venues'],
  '/categories/jazz-clubs/': ['walkable-music-venues', 'live-music-under-21'],
  '/categories/karaoke-bars/': ['walkable-music-venues'],
  '/categories/near-the-opry/': ['live-music-under-21'],
  '/neighborhoods/the-gulch/': ['walkable-music-venues', 'live-music-under-21'],
  '/neighborhoods/midtown/': ['walkable-music-venues'],
  '/neighborhoods/west-end/': ['walkable-music-venues', 'live-music-under-21'],
  '/neighborhoods/downtown/': ['walkable-music-venues', 'live-music-under-21'],
  '/neighborhoods/printer-s-alley/': ['walkable-music-venues'],
  '/neighborhoods/east-nashville/': ['walkable-music-venues', 'live-music-under-21'],
  '/neighborhoods/sobro/': ['how-songwriter-rounds-work', 'live-music-under-21'],
  '/neighborhoods/music-valley/': ['live-music-under-21'],
}
