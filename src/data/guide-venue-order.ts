/**
 * Order of the Related Guides block on venue pages that more than one guide links.
 * Keyed by venue slug. Guides listed here show first, in this order. Any other
 * guide that links the venue follows, newest first. Venues not listed here show
 * every guide that links them, newest first.
 *
 * Each listed guide must exist in content/guides/ and must link the venue,
 * or the build fails.
 */
export const guideVenueOrder: Record<string, string[]> = {
  'the-bluebird-cafe': ['how-songwriter-rounds-work', 'live-music-under-21'],
  'the-listening-room-cafe': ['how-songwriter-rounds-work', 'live-music-under-21'],
  '3rd-and-lindsley': ['how-songwriter-rounds-work', 'live-music-under-21'],
  'the-station-inn': ['walkable-music-venues', 'live-music-under-21'],
  'the-ryman-auditorium': ['walkable-music-venues', 'live-music-under-21'],
  'rudys-jazz-room': ['walkable-music-venues', 'live-music-under-21'],
  'the-pinnacle': ['walkable-music-venues', 'live-music-under-21'],
  'skulls-rainbow-room': ['live-music-under-21', 'walkable-music-venues'],
  'the-basement-east': ['live-music-under-21', 'walkable-music-venues'],
}
