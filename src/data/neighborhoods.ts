/**
 * Every neighborhood a venue can belong to. `hasPage` is the single switch for
 * whether a neighborhood gets a standalone /neighborhoods/<slug>/ page: it
 * drives static params, the sitemap, the neighborhoods index, and every
 * internal link. Neighborhoods without a page still appear in the /venues/
 * filters and in the "Smaller scenes" list on /neighborhoods/.
 *
 * Turning a page off also needs a matching permanent redirect in vercel.json;
 * the build fails until it has one (see assertRedirectsMatchRemovedPages).
 */
export interface NeighborhoodInfo {
  name: string
  /** One or two sentences for the /neighborhoods/ index. */
  blurb: string
  hasPage: boolean
}

export const neighborhoods: NeighborhoodInfo[] = [
  { name: 'East Nashville', hasPage: true, blurb: 'The indie heart of the city. Local bands, divey rooms, and a scene that feels like Nashville before the boom.' },
  { name: 'The Gulch', hasPage: true, blurb: 'Bluegrass legends, jazz clubs, and one of the city\'s best independent venue complexes. More depth than the neighborhood gets credit for.' },
  { name: 'Midtown', hasPage: true, blurb: 'Music Row is right here. Songwriter bars, honky tonks, and spots where industry people drink.' },
  { name: 'SoBro', hasPage: true, blurb: 'Downtown-adjacent without being Broadway. Listening rooms, outdoor stages, and river views.' },
  { name: 'Music Valley', hasPage: true, blurb: 'Near the Opry. Classic country, line dancing, and venues that feel like Nashville used to.' },
  { name: "Printer's Alley", hasPage: true, blurb: 'The old late-night strip. Blues, jazz, karaoke, and a few spots that have been here for decades.' },
  { name: 'West End', hasPage: true, blurb: 'Historic rock venues, neighborhood bars, and a couple of Nashville institutions worth knowing.' },
  { name: 'Downtown', hasPage: true, blurb: 'The Ryman, Municipal Auditorium, and a few honky tonks that exist outside the Broadway bubble.' },
  { name: 'Germantown', hasPage: false, blurb: 'Newer but not generic. Brooklyn Bowl anchors it, with a few other spots worth the trip north.' },
  { name: 'Green Hills', hasPage: false, blurb: 'The Bluebird Cafe is here. That alone makes it worth the drive.' },
  { name: 'Wedgewood-Houston', hasPage: false, blurb: "Santa's Pub is here. Enough said." },
  { name: 'Berry Hill', hasPage: false, blurb: 'Just south of downtown. A distillery tavern and a laid-back vibe away from the tourist core.' },
  { name: 'Madison', hasPage: false, blurb: "Live country at Dee's and bowling with a band at Eastside Bowl, both just north of East Nashville." },
  { name: 'The Nations', hasPage: false, blurb: 'West Nashville neighborhood bar territory. Casual, local, and worth knowing about.' },
  { name: 'West Nashville', hasPage: false, blurb: 'Ray Stevens built a showroom out here. Old-school Nashville entertainment.' },
  { name: 'Hillsboro Village', hasPage: false, blurb: 'Quiet neighborhood venue energy. Good for a songwriter round without the crowds.' },
  { name: 'Marathon Village', hasPage: false, blurb: 'Marathon Music Works is the anchor. Mid-size shows in an industrial converted space.' },
  { name: '8th Ave S', hasPage: false, blurb: 'The Basement is here, along with a couple of smaller spots on the corridor south of downtown.' },
]
