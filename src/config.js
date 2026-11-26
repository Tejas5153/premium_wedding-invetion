// Central, environment-driven configuration.
// Copy .env.example to .env and set values to enable real integrations.
// Nothing here is required — the site runs fully in "demo mode" without them.

const env = import.meta.env

export const config = {
  // POST endpoint that receives RSVP JSON. Empty = demo mode (nothing is sent or stored).
  rsvpEndpoint: env.VITE_RSVP_ENDPOINT || '',
  // GET (list) + POST (create) endpoint for guestbook messages. Empty = this-device-only mode.
  guestbookEndpoint: env.VITE_GUESTBOOK_ENDPOINT || '',
  // Wedding film: a direct .mp4/.webm URL, or a YouTube/Vimeo *embed* URL. Empty = placeholder.
  filmUrl: env.VITE_FILM_URL || '',
}
