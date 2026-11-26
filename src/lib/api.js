import { config } from '../config'

// ---- RSVP -----------------------------------------------------------------
// With VITE_RSVP_ENDPOINT unset this resolves with { persisted: false } and
// sends nothing anywhere. The UI uses that flag to be honest with the guest.
export async function submitRsvp(payload) {
  if (!config.rsvpEndpoint) {
    await new Promise((r) => setTimeout(r, 900))
    return { persisted: false }
  }
  const res = await fetch(config.rsvpEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error(`RSVP request failed (${res.status})`)
  return { persisted: true }
}

// ---- Guestbook --------------------------------------------------------------
const STORE_KEY = 'momentra-wedding-guestbook-v1'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
  } catch {
    return []
  }
}

export const guestbookIsRemote = Boolean(config.guestbookEndpoint)

export async function loadMessages() {
  if (!config.guestbookEndpoint) return readLocal()
  const res = await fetch(config.guestbookEndpoint)
  if (!res.ok) throw new Error(`Guestbook load failed (${res.status})`)
  return res.json()
}

export async function addMessage(entry) {
  const message = { ...entry, createdAt: new Date().toISOString() }
  if (!config.guestbookEndpoint) {
    const next = [message, ...readLocal()].slice(0, 50)
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable — message stays in memory for this visit */
    }
    return message
  }
  const res = await fetch(config.guestbookEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
  if (!res.ok) throw new Error(`Guestbook post failed (${res.status})`)
  return message
}
