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
  'East Nashville': "East Nashville sits just across the Cumberland River from downtown and is one of the busiest music neighborhoods outside downtown. Punk plays at The Cobra and two-steppers fill the dance floor at Skinny Dennis. The Basement East books touring bands, and The 5 Spot puts local ones on stage in Five Points.",
  'The Gulch': "The Gulch was once a rail yard and is now one of Nashville's most polished neighborhoods, full of restaurants, condos, and rooftop bars. Its music rooms tend to specialize: The Station Inn sticks to bluegrass and roots, Rudy's Jazz Room to jazz, and Night We Met to house and electronic.",
  'Midtown': "Midtown sits between downtown and Vanderbilt, right where Music Row begins. Bobby's Idle Hour has been a Row hangout since the 1970s, and Losers opened in 2005 as a bar for the industry crowd. Live Oak and Tin Roof hold weekly songwriter nights on Demonbreun.",
  'SoBro': "SoBro, short for South of Broadway, starts just a few blocks below the honky tonks. The Listening Room Cafe and 3rd & Lindsley build their nights around songwriters and Americana, City Winery pairs touring acts with a full dinner, and Ascend Amphitheater brings big shows to the riverfront.",
  'Music Valley': "Music Valley sits roughly 10 miles northeast of downtown, built up around the Grand Ole Opry House, Gaylord Opryland Resort, and Opry Mills. Away from the Opry itself, three bars keep live country going nearly every day: The Nashville Palace, Music City Bar & Grill, and Scoreboard Bar & Grill.",
  "Printer's Alley": "Printer's Alley, a couple of blocks north of Broadway, takes its name from the printing houses and publishers that once filled it. Today it's home to live blues at Bourbon Street Blues and Boogie Bar, jazz over dinner at Skull's Rainbow Room, and a pair of karaoke bars.",
  'West End': "West End runs from downtown past Vanderbilt and Centennial Park and holds some of the city's longest-running rock clubs. Exit/In and The End sit on Elliston Place, a stretch locals call the Rock Block. Springwater books local punk and indie bands near the park, and The Local hosts country writers' rounds and showcases a few blocks away.",
  'Downtown': "Downtown holds some of the city's biggest stages, all within a short walk of Broadway. The Ryman Auditorium is its most famous concert hall, The Pinnacle at Nashville Yards is its newest, and Municipal Auditorium holds the largest crowds of the three.",
}

/** Longer intro text rendered below the venue cards on each neighborhood page, keyed by neighborhood name. Paragraphs separated by blank lines. */
export const neighborhoodIntroMore: Record<string, string> = {
  'East Nashville': "A punk show, a dance floor, a comedy night, and a piano bar are all within a few miles of each other, close enough to catch two in one night. Riverside Revival turned a former church into a concert hall, and Love & Exile pairs a wine list with a patio stage. Many rooms also keep a regular weekly lineup, so even a Monday or Tuesday night has options.\n\nMost of these rooms work as bars as much as venues, with pool tables, patios, and game rooms to fill the time between sets. Hours and age policies vary by room, so check each venue page before you go.",
  'West End': "The rest of the strip leans toward songwriters. The Commodore Grille puts original writers on stage most nights, and Analog pairs songwriter series with touring acts in a seated, theater-style room.\n\nCross-Eyed Critters adds karaoke to the mix, with an animatronic band backing every singer. It's one of three rooms here set inside a hotel, so West End works well if you're staying in the area and want a show without a long ride. Tickets, age limits, and parking change from room to room, and each venue page lays them out.",
  'Midtown': "Newer bars have moved in alongside the old ones. Odie's and Riley Green's Duck Blind both come from artists who played this neighborhood on their way up. Most of these rooms also double as sports bars, so a game on the big screens can run straight into a night of live music.\n\nThe crowd tends to mix songwriters, regulars, and visitors looking for country off the main strip. Each room keeps its own schedule of rounds and showcases, and the venue pages list them.",
  'SoBro': "Most of these rooms run a full kitchen, so you can grab a bite to eat and catch the show without moving tables. Tennessee Brew Works brews its beer in the same building where it books acoustic sets, and 6th & Peabody pairs moonshine tastings with live country in an outdoor beer garden.\n\nBeing this close to Broadway, SoBro works as a first or last stop. Catch an early round or a show here and walk up to the strip after, or come down once you've had a few hours of honky tonks. Showtimes and covers change from room to room, so look up each venue before planning around it.",
  'Downtown': "The three halls book beyond country, with rock and pop tours, comedy nights, and even pro wrestling on the calendar. The biggest shows at the Ryman and The Pinnacle can sell out early, so look to buy tickets well before you get to town.\n\nFor a drink before or after the show, Doc Holliday's and Wild Beaver Saloon both sit about a block off the strip. Doc's has a live band every night, and Wild Beaver hands you the karaoke mic. Age limits run from all ages to 21 and up depending on the room, but each venue page spells it out.",
  'The Gulch': "Two other rooms cast a wider net. The Blue Room hosts concerts, comedy, and film nights inside Jack White's Third Man Records, and Cannery Hall runs three stages for touring acts under one roof.\n\nThe Gulch is best known for its restaurants, so a show slots easily into a night built around dinner. Covers, seating, and dress codes vary by room, and every venue page has the details.",
  'Music Valley': "Each has its own lane. The Palace is the spot to go line dancing, Music City Bar & Grill is where classic country meets late nights, and Scoreboard is built for catching the game while the band plays.\n\nWith a resort and a cluster of hotels nearby, these are the closest live music options for anyone staying out this way. Covers and age limits aren't the same everywhere, so look at the venue page before heading over.",
  "Printer's Alley": "Most nights here move in stages. Dinner and jazz at Skull's or a blues set at Bourbon Street come first, and a turn at the mic at Ms. Kelli's or Lonnie's Western Room usually comes last.\n\nThe blocks around the alley round out a night here. Several old buildings nearby are now boutique hotels with restaurants and rooftop bars, including The Noelle, a 1929 Art Deco hotel on Fourth Avenue. One block over, The Arcade's upstairs galleries open their doors for the monthly First Saturday Art Crawl. Hours vary a lot from room to room in the alley, and some open only a few nights a week, so check the venue pages before you go.",
}

/** FAQs for neighborhood pages, keyed by neighborhood name. */
export const neighborhoodFaqs: Record<string, FAQItem[]> = {
  'East Nashville': [
    {
      question: "How far is East Nashville from downtown?",
      answer: "Most of the neighborhood's venues are 5 to 10 minutes from downtown by car. The rooms farther up Gallatin Pike take a bit longer.",
    },
    {
      question: "Can you walk between venues in East Nashville?",
      answer: "In pockets. The East Room, The Cobra, and Skinny Dennis are all on Gallatin Avenue, a few blocks apart. The 5 Spot and The Basement East are both near Five Points. Getting from one cluster to the other is easier by car or rideshare.",
    },
    {
      question: "Is parking easy in East Nashville?",
      answer: "It depends on the room. A few venues have on-site parking or a lot nearby, and others have almost none, so check the venue page before you drive. Rideshare is the simplest plan if you're hopping between rooms.",
    },
  ],
  'West End': [
    {
      question: "Can you walk between West End venues?",
      answer: "Mostly. The venues are spread over about ten blocks, from 18th Avenue out to 28th. Exit/In and The End are on the same block of Elliston Place. Springwater, The Local, and the Commodore Grille are all near Centennial Park. Walking the whole stretch takes around 20 minutes.",
    },
    {
      question: "How far is West End from downtown?",
      answer: "About 2 miles, roughly a 10-minute drive or rideshare from Broadway. West End Avenue runs straight there, making for an easy trip.",
    },
    {
      question: "Where do you park in West End?",
      answer: "It's a mix. The hotel venues generally have garages, while Elliston Place and the streets around Centennial Park are mostly street parking and small pay lots.",
    },
  ],
  'Midtown': [
    {
      question: "Is Midtown the same as Music Row?",
      answer: "They overlap. Music Row is the music business district, centered on 16th and 17th Avenues South, where labels, publishers, and studios work. Midtown's bars sit at its north end, around the roundabout where Demonbreun and Division Streets meet, so a night out here puts you right next to where the songs get made.",
    },
    {
      question: "Can you bar-hop in Midtown?",
      answer: "Easily. Losers, Duck Blind, and Odie's share the same block of Division Street. Tin Roof and Live Oak sit next to each other on Demonbreun, a few blocks away. Bobby's Idle Hour is a short walk from both.",
    },
    {
      question: "How is parking in Midtown?",
      answer: "Street spots along Demonbreun fill up fast on weekends, so a nearby garage or rideshare is the safer plan. Parts of Division Street have some free parking close by, which is rare for this part of town.",
    },
  ],
  'SoBro': [
    {
      question: "Can you walk to SoBro from Broadway?",
      answer: "Yes. Ascend sits right at the foot of Broadway on the riverfront. The Listening Room Cafe and City Winery are around a 10- to 15-minute walk from the strip. 3rd & Lindsley and Tennessee Brew Works sit a little farther south, where a short rideshare is often easier.",
    },
    {
      question: "What else is there to do in SoBro?",
      answer: "The Country Music Hall of Fame and Museum, the Schermerhorn Symphony Center, and Music City Center are all in the neighborhood. That makes it easy to spend the afternoon at a museum and stay in the area for an evening show.",
    },
    {
      question: "Is parking expensive in SoBro?",
      answer: "It can be, especially on nights with a big show at Ascend or a convention at Music City Center. Downtown garages cover most of the area, and a few venues run their own lot or valet, so check the venue page before driving in.",
    },
  ],
  'Downtown': [
    {
      question: "Which Downtown venues can you walk to from Broadway?",
      answer: "All of them, depending on where you start. The Ryman, Doc Holliday's, and Wild Beaver are each about a block off Broadway. Municipal Auditorium is a few blocks farther north, and The Pinnacle at Nashville Yards is the longest walk, closer to 15 minutes from the honky tonks.",
    },
    {
      question: "Is Downtown busy on show nights?",
      answer: "Very. A sold-out show at one of these halls can overlap with a Predators game at Bridgestone Arena, which slows traffic on the way in. Leave extra time, and expect a wait for a rideshare once the show lets out.",
    },
    {
      question: "What's the best way to get to a Downtown show?",
      answer: "Rideshare is usually the easiest option. Garage prices climb on big show nights, and hunting for a spot adds time when traffic is already heavy. If you'd rather drive, ParkItDowntown.com lists garages near each venue.",
    },
  ],
  'The Gulch': [
    {
      question: "Where is The Gulch?",
      answer: "Just southwest of downtown, between Lower Broadway and Music Row. Most of its venues are a 10- to 20-minute walk from the honky tonks, or a few minutes by car or rideshare.",
    },
    {
      question: "What's worth seeing in The Gulch before a show?",
      answer: "The #WhatLiftsYou wings mural on 11th Avenue South is one of the most photographed spots in the city, and it's a short walk from The Station Inn. Beyond that, the neighborhood is mostly restaurants, shops, and rooftop bars, so it's easy to fill an evening before the music starts.",
    },
    {
      question: "How does parking work in The Gulch?",
      answer: "Expect to pay. It's mostly garages and paid street spots, and they fill up fast most nights. Parking options differ by venue, so check the venue page before you drive in.",
    },
  ],
  'Music Valley': [
    {
      question: "How far is Music Valley from downtown Nashville?",
      answer: "Roughly 10 miles, or about 15 to 20 minutes by car without traffic. Rideshare works, but it costs more than hopping between neighborhoods closer to the city, so it can pay to stay in the area for the night.",
    },
    {
      question: "Do you need a car in Music Valley?",
      answer: "For most of it, yes. The three bars sit within a short walk of each other, but getting to them from Opry Mills or the Opry House is better done by car or rideshare, since the roads aren't built for walking. Several bars have their own free lots, which is rare in Nashville.",
    },
    {
      question: "Is Music Valley worth visiting during the day?",
      answer: "Yes. Opry Mills is a big outlet mall, Gaylord Opryland Resort is worth walking through for its indoor gardens, and the Opry House runs daytime backstage tours that take you through the artist entrance and dressing rooms.",
    },
  ],
  "Printer's Alley": [
    {
      question: "Where exactly is Printer's Alley?",
      answer: "It runs between Third and Fourth Avenues North, from Church Street up to Union Street. Lonnie's Western Room sits just off the alley on Church Street, and Ms. Kelli's is down a flight of stairs that's easy to walk past.",
    },
    {
      question: "When does Printer's Alley get busy?",
      answer: "After dark. Bourbon Street opens for lunch most days, but the other rooms don't open until evening. The crowd builds as the night goes on, and some rooms stay open until 2am or later.",
    },
    {
      question: "Do you need reservations in Printer's Alley?",
      answer: "For the seated rooms, it's a good idea. Skull's Rainbow Room and Bourbon Street both take reservations and fill up on weekends, while the karaoke bars are walk-in.",
    },
  ],
}
