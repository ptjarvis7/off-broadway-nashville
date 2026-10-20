import type { FAQItem } from '@/components/FAQ'

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

/** Intro paragraph for each neighborhood page, keyed by neighborhood name. */
export const neighborhoodIntros: Record<string, string> = {
  'East Nashville': "East Nashville built its own music scene without much help from downtown. The 5 Spot has booked local bands in Five Points for years, and The Basement East hosts national touring acts in a room locals still call the Beast. The Cobra leans punk and metal on Gallatin Avenue, while Riverside Revival turned a 1951 church into a concert hall with the stained glass still intact. Skinny Dennis holds regular two-step nights, and Love & Exile keeps its patio busy with wine, cocktails, and live music of its own.",
  'The Gulch': "The Gulch is more of a music neighborhood than most visitors realize, with venues tucked between upscale restaurants and hotel bars. The Station Inn is one of the best bluegrass rooms in the country, Rudy's Jazz Room is a dedicated jazz club, small and seated, with live music every night, and Cannery Hall brings in everything from songwriter nights to bigger touring acts.",
  'Midtown': "Midtown sits right next to Music Row, which means the bars here attract real industry folks. Bobby's Idle Hour has been a songwriter hangout for decades. Losers is divey and real. This is where the business of music bleeds into the bar scene.",
  'SoBro': "South of Broadway but not part of it. The Listening Room Cafe is one of the best songwriter venues in the country, Ascend Amphitheater has the best skyline views of any outdoor venue in the city, and Third Man Records' Blue Room is unlike anything else in Nashville.",
  'Music Valley': "This is Grand Ole Opry territory. The venues out here cater to a more traditional country crowd, and that's not a criticism. It's exactly what some visitors are looking for. Real country music, near the Opry.",
  "Printer's Alley": "The old entertainment strip that predates Broadway's current incarnation. Blues, jazz, karaoke, and late nights. Skull's Rainbow Room has been here in various forms since the 1940s.",
  'West End': "Home to Exit/In, one of Nashville's most important rock venues, and Springwater, one of its oldest bars. The End is as divey as it gets. West End has the best concentration of rock venues in the city.",
  'Downtown': "The Ryman Auditorium alone justifies knowing this neighborhood. Municipal Auditorium handles bigger touring shows. A few honky tonks exist outside the Broadway corridor if you know where to look.",
}

/** Longer intro text rendered below the venue cards on each neighborhood page, keyed by neighborhood name. Paragraphs separated by blank lines. */
export const neighborhoodIntroMore: Record<string, string> = {}

/** FAQs for neighborhood pages, keyed by neighborhood name. */
export const neighborhoodFaqs: Record<string, FAQItem[]> = {
  'East Nashville': [
    {
      question: 'Is there a cover charge?',
      answer: "It varies by show and venue. The Basement East runs both free, first-come-first-served shows and ticketed events depending on the artist. Check each venue's page and calendar for specifics.",
    },
    {
      question: 'Is there an age requirement?',
      answer: 'It varies by show, not just venue. The Basement East allows minors in with a parent or guardian for some shows, but 18+ and 21+ shows require valid ID with no exceptions.',
    },
    {
      question: 'Is parking available?',
      answer: 'It varies by venue. The Basement East relies on street parking and a lot across the street after 6pm.',
    },
  ],
}
