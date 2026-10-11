import type { FAQItem } from '@/components/FAQ'

export interface Category {
  slug: string
  shortTitle: string
  title: string
  /** Full intro, rendered only on the category's own page. */
  description: string
  /** One line for the /categories/ index. Required when hasPage is true. */
  teaser?: string
  /** The single switch for whether /categories/<slug>/ exists. */
  hasPage: boolean
  filterType: 'venueType' | 'genre' | 'bestFor' | 'neighborhood'
  filterValue: string
  faqs?: FAQItem[]
}

export const categories: Category[] = [
  {
    slug: 'listening-rooms',
    hasPage: true,
    title: 'Best Nashville Listening Rooms',
    shortTitle: 'Listening Rooms',
    description: 'Seated venues built for hearing the music, the words, and the stories behind both.',
    teaser: 'Seated venues built for hearing the music, the words, and the stories behind both.',
    filterType: 'venueType',
    filterValue: 'Listening Room',
  },
  {
    slug: 'songwriter-rounds',
    hasPage: true,
    shortTitle: 'Songwriter Rounds',
    title: 'Best Songwriter Rounds in Nashville',
    description: "Half the songs you know by heart were written by someone who never got famous singing them. A songwriter round puts that person on stage instead, taking turns with two or three others, each playing their own songs. The Bluebird Cafe made the format famous and still books it nightly in a room the size of a living room. The Listening Room Cafe pairs the format with food brought right to your stage-side table, and 3rd & Lindsley runs writer nights alongside its bigger touring calendar. Smaller rooms keep the tradition going too, Bobby's Idle Hour on Music Row, The Local in West End, and Live Oak's weekly rounds among them.",
    teaser: "Hear the songs you know from the people who wrote them.",
    filterType: 'venueType',
    filterValue: "Writer's Round Venue",
    faqs: [
      {
        question: 'Is there a cover charge?',
        answer: "Not exactly. The Bluebird Cafe and The Listening Room Cafe both require a $15 per-person food and drink minimum instead of a straight cover. Smaller rooms like Bobby's Idle Hour and The Local skip the minimum entirely, just tip your server and the songwriters.",
      },
      {
        question: 'Do I need a reservation?',
        answer: "For the Bluebird Cafe and The Listening Room Cafe, yes, for most shows. Reservations open online in advance and often sell out within minutes. Smaller rooms don't take reservations, so just show up.",
      },
      {
        question: 'Can I talk during the songs?',
        answer: 'Not at a listening room. The Bluebird Cafe enforces a strict quiet policy during performances, and the format only works if the room actually listens. Save conversation for between songs.',
      },
    ],
  },
  {
    slug: 'honky-tonks',
    hasPage: true,
    shortTitle: 'Honky Tonks',
    title: 'Best Honky Tonks in Nashville Not on Broadway',
    description: "The honky-tonks on Broadway run on cover bands and overpriced buckets of beer for the tourist crowd. The Nashville Palace has slung fried bologna sandwiches and country bands since 1977, just steps from the Grand Ole Opry House. Skinny Dennis brought a Brooklyn transplant's take on the two-step to East Nashville. Losers Bar and Riley Green's Duck Blind sit next door to each other in Midtown, same owners, same music-industry crowd inside, and Doc Holliday's keeps the noise going just a block off the strip.",
    teaser: "Live country and room to dance, a short ride from Lower Broad.",
    filterType: 'venueType',
    filterValue: 'Honky Tonk',
    faqs: [
      {
        question: 'Is there a cover charge?',
        answer: "It varies by venue and night. Nashville Palace charges a $10 door cover on Fridays and Saturdays, and $10 to $20 on Tuesdays and Wednesdays depending on the dance instructor. Check each venue's page for current details.",
      },
      {
        question: 'Is there an age requirement to get in?',
        answer: "It varies by venue. Losers Bar and Riley Green's Duck Blind, for example, require guests to be 21 and up after 3pm on weekdays and all day on weekends. Check each venue's page for its specific policy.",
      },
      {
        question: 'What should I wear?',
        answer: 'Nothing dressy. Jeans and boots work fine at every honky-tonk on this list.',
      },
    ],
  },
  {
    slug: 'concert-venues',
    hasPage: true,
    shortTitle: 'Concert Venues',
    title: 'Best Nashville Concert Venues Beyond Broadway',
    description: "Nashville's national touring acts need a stage big enough to match their production. The Ryman, the Mother Church of Country Music, hosts national artists across every genre almost year-round. The Pinnacle anchors Nashville Yards with a 4,500-capacity room built for arena-level sound, and Marathon Music Works turns a converted early-1900s auto factory into one of the best mid-size stages in the South. Brooklyn Bowl pairs touring acts with nineteen lanes of bowling, and Ascend Amphitheater puts a summer show right on the river with the skyline behind the stage.",
    teaser: "Where touring acts play in Nashville, from small clubs to the Ryman.",
    filterType: 'venueType',
    filterValue: 'Concert Venue',
    faqs: [
      {
        question: 'Do I need to buy tickets in advance?',
        answer: "Yes, for a show. Unlike Broadway's honky-tonks, these venues sell tickets for specific dates and artists rather than offering free walk-in entry. Check each venue's page and ticketing site for availability.",
      },
      {
        question: 'Is seating reserved or standing room?',
        answer: "It varies by venue. The Ryman offers reserved seating for every show, while Brooklyn Bowl is a standing-room venue with limited ADA seating. Check each venue's page for its typical setup.",
      },
      {
        question: 'Is there an age requirement?',
        answer: 'It varies by show, not just venue. Marathon Music Works only requires ID for shows marked 18+ or 21+, and all-ages shows need no ID at all. Always check the specific event listing before buying tickets.',
      },
    ],
  },
  {
    slug: 'jazz-clubs',
    hasPage: true,
    shortTitle: 'Jazz Clubs',
    title: 'Best Jazz Clubs in Nashville',
    description: "Nashville has a stronger jazz scene than most visitors realize. These are the spots dedicated to it.",
    teaser: "Nashville has a stronger jazz scene than most visitors realize. These are the spots dedicated to it.",
    filterType: 'venueType',
    filterValue: 'Jazz Club',
  },
  {
    slug: 'karaoke-bars',
    hasPage: true,
    shortTitle: 'Karaoke Bars',
    title: 'Best Karaoke Bars in Nashville',
    description: "From piano bars to double-wide dive bars. Nashville's karaoke scene has more range than you'd expect.",
    teaser: "From piano bars to double-wide dive bars. Nashville's karaoke scene has more range than you'd expect.",
    filterType: 'venueType',
    filterValue: 'Karaoke Bar',
  },
  {
    slug: 'dinner-and-a-show',
    hasPage: false,
    shortTitle: 'Dinner & a Show',
    title: 'Best Dinner and a Show Spots in Nashville',
    description: 'Venues where the food and the music are both worth showing up for. Seated, intentional nights out.',
    filterType: 'bestFor',
    filterValue: 'Dinner and a show',
  },
  {
    slug: 'bluegrass',
    hasPage: false,
    shortTitle: 'Bluegrass Venues',
    title: 'Best Nashville Venues for Bluegrass',
    description: "The Station Inn is the anchor, but Nashville's bluegrass scene goes beyond one legendary room.",
    filterType: 'genre',
    filterValue: 'Bluegrass / Roots',
  },
  {
    slug: 'country-music',
    hasPage: false,
    shortTitle: 'Country Music Bars',
    title: 'Best Nashville Bars with Live Country Music Off Broadway',
    description: 'Not cover bands for bachelor parties. Bars where country music is the real draw.',
    filterType: 'genre',
    filterValue: 'Country',
  },
  {
    slug: 'near-the-opry',
    hasPage: true,
    shortTitle: 'Near the Opry',
    title: 'Live Music Near the Grand Ole Opry',
    description: "Music Valley sits about 10 miles from downtown, built up around the Grand Ole Opry House, where country legends and rising stars still take the stage every week. A short drive away, three more spots keep the neighborhood's nightlife going within walking distance of each other: the Nashville Palace fills its dance floor with weekend line-dancing lessons, Scoreboard Opry pairs live bands with a patio full of TVs, and Music City Bar and Grill stays open until 3am for whoever's still out after the other bars close.",
    teaser: "Where to keep the night going after a show at the Grand Ole Opry.",
    filterType: 'neighborhood',
    filterValue: 'Music Valley',
    faqs: [
      {
        question: 'Do I need a ticket for the Grand Ole Opry?',
        answer: 'Yes, always. The Opry sells reserved seating in advance for every show, and walk-up tickets are rarely available since shows consistently sell out.',
      },
      {
        question: 'Is there a dress code at the Opry?',
        answer: "No formal one. The Opry's own FAQ notes the crowd runs from faded jeans to business suits, so there's no need to dress up.",
      },
      {
        question: 'Can I visit these bars before or after an Opry show?',
        answer: 'Yes, that\'s when they\'re busiest. Nashville Palace, Scoreboard Opry, and Music City Bar and Grill all sit close enough to the Opry House to catch the crowd heading in or out.',
      },
    ],
  },
  {
    slug: 'date-night',
    hasPage: false,
    shortTitle: 'Date Night',
    title: 'Best Nashville Music Venues for a Date Night',
    description: 'Intimate rooms, good sound, and something worth talking about after. Music that becomes the evening.',
    filterType: 'bestFor',
    filterValue: 'Date night',
  },
  {
    slug: 'late-night',
    hasPage: false,
    shortTitle: 'Late Night',
    title: 'Best Late Night Live Music in Nashville',
    description: "Where to go when the earlier shows have ended. Venues that keep the music going past midnight.",
    filterType: 'bestFor',
    filterValue: 'Late night',
  },
]
