import { img } from './images'

export const couple = {
  groom: 'Aarav Sharma',
  bride: 'Siya Mehta',
  groomFirst: 'Aarav',
  brideFirst: 'Siya',
  dateLong: '20 December 2026',
  dateShort: '20 · 12 · 2026',
  // 7:00 PM IST on the wedding day
  target: new Date('2026-12-20T19:00:00+05:30'),
}

export const venue = {
  name: 'The Royal Orchid Palace',
  city: 'Jaipur, Rajasthan, India',
  mapQuery: 'The Royal Orchid Palace, Jaipur, Rajasthan, India',
}

export const story = [
  {
    no: 'I',
    title: 'The First Meeting',
    when: 'Jaipur · March 2019',
    image: img.bride,
    alt: 'A bride laughing in traditional jewellery',
    text: 'A tin of cardamom chai, a stranger’s terrible joke, and a laugh Aarav still cannot describe. He had stopped for tea on his way to a meeting; he missed the meeting and found the rest of his life.',
  },
  {
    no: 'II',
    title: 'The Beginning',
    when: 'Mumbai ⇄ Jaipur · 2019 – 2023',
    image: img.marigold,
    alt: 'Bright marigold flowers',
    text: 'Four years of midnight phone calls and early flights. Every arrival gate had a garland of marigolds waiting — Siya’s favourite flower, and Aarav’s quiet promise that he would always show up.',
  },
  {
    no: 'III',
    title: 'The Proposal',
    when: 'Lakeside · December 2025',
    image: img.lake,
    alt: 'A palace glowing at dusk over still water',
    text: 'At dusk, with the palace lights trembling on the water, Aarav forgot every word he had rehearsed. Siya said yes before he finished the first sentence — and then made him say the rest anyway.',
  },
  {
    no: 'IV',
    title: 'Forever Begins',
    when: 'Jaipur · 20 December 2026',
    image: img.couple,
    alt: 'An Indian bride and groom in garlands',
    text: 'Two families, five celebrations and one promise made before the sacred fire. We would be honoured to have you beside us as our story turns its most beautiful page.',
  },
]

// start is local IST wall-clock time. hours = duration for calendar entries.
export const events = [
  {
    id: 'engagement',
    name: 'Engagement',
    tagline: 'The promise',
    day: 'Friday',
    date: '18 December 2026',
    time: '7:00 PM',
    start: '2026-12-18T19:00:00',
    hours: 3,
    space: 'Sheesh Mahal Lounge',
    dress: 'Pastels & champagne',
    image: img.roses,
    alt: 'Red roses and a ceremonial ribbon',
    blurb: 'An intimate evening of rings, roses and blessings from the elders.',
  },
  {
    id: 'haldi',
    name: 'Haldi',
    tagline: 'The golden morning',
    day: 'Saturday',
    date: '19 December 2026',
    time: '10:00 AM',
    start: '2026-12-19T10:00:00',
    hours: 3,
    space: 'Marigold Courtyard',
    dress: 'Yellows & marigold',
    image: img.haldi,
    alt: 'A bride laughing during a haldi ceremony',
    blurb: 'Turmeric, laughter and flower petals — come dressed in sunshine.',
  },
  {
    id: 'sangeet',
    name: 'Sangeet',
    tagline: 'A night of music',
    day: 'Saturday',
    date: '19 December 2026',
    time: '7:30 PM',
    start: '2026-12-19T19:30:00',
    hours: 4,
    space: 'Moonlight Terrace',
    dress: 'Jewel tones & glamour',
    image: img.sangeet,
    alt: 'Dancers performing on a dark stage',
    blurb: 'Family performances, live music and a dance floor that never empties.',
  },
  {
    id: 'wedding',
    name: 'Wedding',
    tagline: 'The sacred vows',
    day: 'Sunday',
    date: '20 December 2026',
    time: '7:00 PM',
    start: '2026-12-20T19:00:00',
    hours: 5,
    space: 'Durbar Hall & Mandap Gardens',
    dress: 'Traditional · ivory & gold',
    image: img.rites,
    alt: 'A couple seated for the wedding rites',
    blurb: 'The pheras beneath a canopy of flowers — the heart of our celebration.',
  },
  {
    id: 'reception',
    name: 'Reception',
    tagline: 'The grand celebration',
    day: 'Monday',
    date: '21 December 2026',
    time: '7:00 PM',
    start: '2026-12-21T19:00:00',
    hours: 4,
    space: 'The Grand Ballroom',
    dress: 'Evening formal',
    image: img.reception,
    alt: 'A newly married couple receiving guests',
    blurb: 'Dinner, toasts and an evening to celebrate as newlyweds.',
  },
]

export const gallery = [
  { id: 'g1', src: img.hero, alt: 'Hands held in golden silk', caption: 'Held' },
  { id: 'g2', src: img.mehndi, alt: 'Bridal mehndi on both hands', caption: 'Mehndi' },
  { id: 'g3', src: img.ring, alt: 'Intricate henna on an open palm', caption: 'Details' },
  { id: 'g4', src: img.hands, alt: 'Hands during a wedding ritual', caption: 'Blessings' },
  { id: 'g5', src: img.chowk, alt: 'A pink and cream palace courtyard in Jaipur', caption: 'Jaipur' },
  { id: 'g6', src: img.lotus, alt: 'Lotus bud garlands hanging in a doorway', caption: 'Lotus' },
  { id: 'g7', src: img.rites, alt: 'Couple in wedding attire during the rites', caption: 'Pheras' },
]

export const demoBlessings = [
  {
    name: 'Meera Mehta',
    note: 'Bride’s mother',
    message: 'From the day you were born, we prayed for someone who would honour your light. Aarav, thank you for being that someone.',
  },
  {
    name: 'Rohan Sharma',
    note: 'Brother of the groom',
    message: 'Bhai, you finally found the one person who laughs at your jokes. Keep her. We are all counting on it.',
  },
  {
    name: 'Naina & Kabir',
    note: 'College friends',
    message: 'Some people are written into each other’s stories long before they meet. May every chapter ahead be gentle and golden.',
  },
  {
    name: 'Dadi Sunita',
    note: 'Grandmother',
    message: 'Khush raho, aabaad raho. May your home always smell of chai and marigolds.',
  },
]
