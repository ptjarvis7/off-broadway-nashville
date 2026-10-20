import type { FAQItem } from '@/components/FAQ'

export interface Category {
  slug: string
  shortTitle: string
  title: string
  /** Full intro, rendered only on the category's own page. */
  description: string
  /** Longer intro text rendered below the venue cards on the category's own page. Paragraphs separated by blank lines. */
  descriptionMore?: string
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
    description: "Nashville has hundreds of stages, but only a handful of rooms built for sitting down and hearing every word. These three cover different ground. The Bluebird Cafe and The Listening Room Cafe run songwriter rounds, where the writers behind the hits play their songs. The Station Inn shifts the focus to bluegrass, roots, and classic country along with the occasional round.",
    descriptionMore: "Most live music in Nashville caters to the party crowd. On Broadway, bands play covers over bar noise for tips. A listening room flips the arrangement, allowing audiences to catch every line and every note. Between songs, artists share where a lyric came from or who they wrote it with.\n\nIt's a great fit if you care more about the music than the party, or if you've already had a night out on Broadway and want to see a different side of the city. It's also perfect for a date or night out with family.\n\nTickets, seating, and parking work differently at each room, so check the venue page before you head out.",
    teaser: 'Seated venues built for hearing the music, the words, and the stories behind both.',
    filterType: 'venueType',
    filterValue: 'Listening Room',
    faqs: [
      {
        question: "What is a listening room?",
        answer: "A seated venue where the audience comes to listen to the music instead of talking over the band. In Nashville, that usually means songwriter rounds and smaller acoustic shows.",
      },
      {
        question: "Which listening room should I pick for my first time?",
        answer: "If you can plan ahead, try for the Bluebird. It's the most famous of the three, but tickets go fast. If you're deciding the same day, The Listening Room Cafe is the easier ticket and has two shows a night. If you're a bluegrass fan, The Station Inn is your spot, and they take walk-ups.",
      },
      {
        question: "Can I talk during the show?",
        answer: "Save it for between songs. The Bluebird has a quiet policy, and the crowd enforces it. Plan on the same courtesy at the other two, and order food and drinks between songs when you can.",
      },
    ],
  },
  {
    slug: 'songwriter-rounds',
    hasPage: true,
    shortTitle: 'Songwriter Rounds',
    title: 'Best Songwriter Rounds in Nashville',
    description: "Nashville runs on songwriters, and a round is the best way to hear them. This list runs from seated rooms like The Bluebird Cafe and 3rd & Lindsley, where the round is the whole night, to bars like Bobby’s Idle Hour and The Green Light Bar, where writers trade songs a few feet from the bar while the game is on TV.",
    descriptionMore: "Many of the biggest songs on country radio were written by people whose names never made it onto the album cover. A round is where those writers get to play the songs themselves, often alongside a few new ones they’re still working out. You get a stripped-down version of a song you know, played by the person who wrote it, along with the story of how it came together. It changes how you hear that song the next time it comes on.\n\nThe setting shapes the night more than you’d expect. In the seated rooms, the songs have your full attention. At the bars, the round runs alongside cold beer and whatever game is on, and feels more like stumbling onto something. Both are worth catching, and seeing one of each gives you the full picture.\n\nWhich nights each room runs its rounds, and what it costs to get in, varies a lot from place to place, so check the venue page before you go.",
    teaser: "Hear the songs you know from the people who wrote them.",
    filterType: 'venueType',
    filterValue: "Writer's Round Venue",
    faqs: [
      {
        question: "What happens at a songwriter round?",
        answer: "Three or four writers share the stage and take turns playing their own songs. Between songs, they talk about how each one was written. Some rooms seat the writers in the middle of the audience, which is where “in the round” comes from.",
      },
      {
        question: "Will I recognize any of the songs?",
        answer: "There’s a good chance. Many writers play hits they wrote for other artists, then mix in newer songs that haven’t been recorded yet. You may not know the names on the lineup, but you’ll often know the choruses.",
      },
      {
        question: "Can I catch a round without buying a ticket?",
        answer: "Yes. Bobby’s Idle Hour has no cover for its Thursday songwriter night, and The Local in West End doesn’t charge a cover for any of its weekly rounds.",
      },
    ],
  },
  {
    slug: 'honky-tonks',
    hasPage: true,
    shortTitle: 'Honky Tonks',
    title: 'Best Honky Tonks in Nashville Not on Broadway',
    description: "Some of the best country bars in Nashville are miles from Broadway. This list runs from Dee's Country Cocktail Lounge, in a converted trailer in Madison, and Skinny Dennis in East Nashville to The Nashville Palace across from the Opry and Doc Holliday's, just steps off the strip.",
    descriptionMore: "Before Lower Broadway filled up with multi-story bars carrying famous names, a honky-tonk was a neighborhood bar where a band played country and people danced to it. The rooms on this list still feel that way. The walls are covered in old records, memorabilia, or dollar bills signed by past customers. At most of them, a round of drinks won't break the bank like it does at the celebrity bars downtown.\n\nCome ready to dance, or at least to watch other people do it. A few of these bars run karaoke instead of a band, so you might end up on the mic yourself. The crowd mixes locals, industry regulars, and visitors, and on the right night someone you've heard on the radio walks in and joins the band for a few songs.\n\nEach bar sets its own cover, age limit, and dance lesson schedule, so look at the venue page before you head out.",
    teaser: "Live country and room to dance, a short ride from Lower Broad.",
    filterType: 'venueType',
    filterValue: 'Honky Tonk',
    faqs: [
      {
        question: "What makes a bar a honky-tonk?",
        answer: "In Nashville, it usually means live country music, room to dance, and a crowd that doesn't take itself too seriously. Some lean toward old-school dive bar and others toward full dance hall.",
      },
      {
        question: "Do I need to know how to dance?",
        answer: "No. Plenty of people come just to listen and watch. If you want to learn, The Nashville Palace and Skinny Dennis both teach line dancing or the two-step early in the evening.",
      },
      {
        question: "What should I wear?",
        answer: "Nothing dressy. Jeans and boots work fine at every honky-tonk on this list.",
      },
    ],
  },
  {
    slug: 'concert-venues',
    hasPage: true,
    shortTitle: 'Concert Venues',
    title: 'Best Nashville Concert Venues Beyond Broadway',
    description: "Nashville's reputation is country, but its concert calendar covers almost everything. This list runs from rooms that hold a couple hundred people, like The Basement and The End, through mid-size stages like Marathon Music Works and Brooklyn Bowl, up to the Ryman, Ascend Amphitheater, and Municipal Auditorium.",
    descriptionMore: "Touring artists come through Nashville constantly, so the small clubs here get more than their share of good shows. Bigger names sometimes play them unannounced, and newer bands pass through on their way up. A band you see in front of 200 people this year might be headlining a much larger stage a few years from now.\n\nThe buildings are part of the draw. On this list you'll find a church built in 1892, an early-1900s auto plant, an 1880s flour mill, and two venues that put the stage next to bowling lanes. A few have hosted shows for decades, and one has the names of the artists who sold it out painted above the bar.\n\nSeating, age limits, and parking change a lot from room to room, and sometimes from show to show at the same room, so read the venue page before you buy tickets.",
    teaser: "Where touring acts play in Nashville, from small clubs to the Ryman.",
    filterType: 'venueType',
    filterValue: 'Concert Venue',
    faqs: [
      {
        question: "Do I need to buy tickets in advance?",
        answer: "For most shows, yes. These venues sell tickets for specific dates and artists. A few, like The Cobra and Eastside Bowl, also run free shows on a smaller stage.",
      },
      {
        question: "Can I find music besides country?",
        answer: "Easily. Across these rooms, the calendar covers rock, indie, punk, metal, Americana, hip-hop, and comedy. East Nashville and the Elliston Place stretch in West End lean hardest toward rock and punk.",
      },
      {
        question: "What's the difference between the Ryman and the Grand Ole Opry?",
        answer: "The Ryman is a historic concert hall downtown that books touring acts across every genre. It was the Opry's home from 1943 to 1974. The Grand Ole Opry is a multi-artist country show at the Opry House in Music Valley, with six to eight performers each night.",
      },
    ],
  },
  {
    slug: 'jazz-clubs',
    hasPage: true,
    shortTitle: 'Jazz Clubs',
    title: 'Best Jazz Clubs in Nashville',
    description: "Nashville is a country town first, but it keeps a small, serious jazz scene going for anyone looking for it. These three rooms are dedicated to it: Rudy's Jazz Room in the Gulch, and Skull's Rainbow Room and the Bourbon Street Blues and Boogie Bar, both in Printer's Alley downtown.",
    descriptionMore: "Jazz has been part of Nashville's nightlife longer than most visitors expect. Printer's Alley was the city's late-night strip for decades, and its clubs have drawn names like Elvis Presley, Etta James, and B.B. King.\n\nThe three rooms cover different moods. One is a quiet listening room built around a grand piano. Another is an underground lounge where the night ends with a burlesque show. The third is a loud, brassy blues bar with a New Orleans streak. Pick based on whether you want to sit and listen or get up and move. Any of them makes a good change of pace after a few nights of country.\n\nReservations, show times, and covers differ at each club, and weekends fill up fast, so check the venue page before you go.",
    teaser: "A small, serious jazz scene for anyone looking for it.",
    filterType: 'venueType',
    filterValue: 'Jazz Club',
    faqs: [
      {
        question: "Does Nashville have a jazz scene?",
        answer: "Yes, though it's smaller than the country scene and easy to miss. Printer's Alley and the Gulch are the places to start, and a few concert venues and restaurants around town book jazz nights too.",
      },
      {
        question: "What kind of jazz will I hear?",
        answer: "Mostly traditional styles: solo piano, small combos, swing, and New Orleans-style blues and brass. Rudy's Jazz Room gives Thursdays over to gypsy jazz in the style of Django Reinhardt.",
      },
      {
        question: "Can I eat dinner at a jazz club?",
        answer: "Yes. All three serve full menus, and two of them lean toward New Orleans cooking, so you can make dinner and the show one stop.",
      },
    ],
  },
  {
    slug: 'karaoke-bars',
    hasPage: true,
    shortTitle: 'Karaoke Bars',
    title: 'Best Karaoke Bars in Nashville',
    description: "Music City takes karaoke seriously, and the scene here covers a lot of ground. This list runs from Santa's Pub, a Christmas-themed double-wide, and Sid Gold's Request Room, a piano bar in East Nashville, to the late-night rooms around Printer's Alley and a West End bar where an animatronic band backs you up.",
    descriptionMore: "Singing in front of strangers in a city full of professional musicians sounds intimidating, but the crowds at these bars tend to cheer for everyone. Nobody expects a perfect performance, and a nervous first-timer usually gets as much noise as a seasoned regular.\n\nA few of these bars sit within a short walk of each other downtown, so it's easy to hop between rooms in a single night. Karaoke also works well for groups, since everyone gets a turn and nobody has to agree on a band.\n\nSong fees, karaoke nights, and hours vary by bar, and some only run karaoke a few nights a week, so check the venue page before you go.",
    teaser: "From piano bars to a Christmas-themed double-wide, Music City's karaoke covers a lot of ground.",
    filterType: 'venueType',
    filterValue: 'Karaoke Bar',
    faqs: [
      {
        question: "Do I have to sing?",
        answer: "No. Plenty of people come just to watch, and the crowd is half the show. Some of these bars give you other things to do between songs too, like the pool table at Ms. Kelli's or the mechanical bull at Wild Beaver Saloon.",
      },
      {
        question: "What's a piano karaoke bar?",
        answer: "Instead of singing over a backing track, you sing with a live pianist who plays your song as you go. Sid Gold's Request Room in East Nashville is the city's only one.",
      },
      {
        question: "Can I sing something besides country?",
        answer: "Yes. The song lists cover rock, pop, hip-hop, and oldies alongside country, and Ms. Kelli's is known for a huge catalog.",
      },
    ],
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
    description: "The Grand Ole Opry is the reason most people make the trip out to Music Valley, and some of Nashville's longest-running country bars sit close by. The Nashville Palace has been here since 1977, and Scoreboard Bar & Grill and Music City Bar & Grill have been pouring beer nearby for decades.",
    descriptionMore: "Since the Opry is a bit of a drive from downtown, it's worth staying in the area after a show. The bars nearby run live country well past the time the Opry lets out, so you can keep the night going without a long rideshare across town.\n\nThe Opry puts country legends and today's biggest stars on the same stage, while the bars around it add a dance floor, cold beer, and live bands. Most lean toward classic country, which suits an Opry crowd.\n\nParking is free at a few of these spots, which is rare in Nashville, but hours and dance lesson nights vary, so check the venue page before you go.",
    teaser: "Where to keep the night going after a show at the Grand Ole Opry.",
    filterType: 'neighborhood',
    filterValue: 'Music Valley',
    faqs: [
      {
        question: "Do I need a ticket for the Grand Ole Opry?",
        answer: "Yes. The Opry sells reserved seating in advance for every show, and walk-up tickets are rarely available since shows consistently sell out.",
      },
      {
        question: "Is there a dress code at the Opry?",
        answer: "No formal one. The Opry's own FAQ notes the crowd runs from faded jeans to business suits, so there's no need to dress up.",
      },
      {
        question: "Can I visit these bars before or after an Opry show?",
        answer: "Either works, and those are their busiest times. The Nashville Palace, Scoreboard Bar & Grill, and Music City Bar & Grill all sit close enough to the Opry House to catch the crowd heading in or out.",
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
