import { venue } from '../data/content'

const pad = (n) => String(n).padStart(2, '0')

// Formats an IST wall-clock date as Google Calendar's floating local time (YYYYMMDDTHHMMSS).
function toCalString(date) {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00`
  )
}

export function googleCalendarUrl(event) {
  const [datePart, timePart] = event.start.split('T')
  const [y, m, d] = datePart.split('-').map(Number)
  const [hh, mm] = timePart.split(':').map(Number)
  // Date.UTC is used purely as a timezone-agnostic calendar calculator.
  const start = new Date(Date.UTC(y, m - 1, d, hh, mm))
  const end = new Date(start.getTime() + event.hours * 3600 * 1000)

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.name} — Aarav & Siya`,
    dates: `${toCalString(start)}/${toCalString(end)}`,
    ctz: 'Asia/Kolkata',
    details: `${event.tagline}. ${event.blurb}\nDress code: ${event.dress}.`,
    location: `${event.space}, ${venue.name}, ${venue.city}`,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.mapQuery)}`
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&output=embed`
