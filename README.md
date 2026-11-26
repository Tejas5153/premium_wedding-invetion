# Aarav & Siya — Wedding Invitation (Momentra Creatives demo)

A cinematic wedding invitation built with React + Vite + Framer Motion. All couple, venue and event details are **fictional demo content**.

## Run locally

```bash
cd C:\premium-wedding
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

## Deploy to Vercel

Import the folder/repo in Vercel (framework: Vite, build `npm run build`, output `dist`) — `vercel.json` is included. Set the optional env vars below in the project settings.

## Configuration (`.env`, see `.env.example`)

| Variable | Purpose |
| --- | --- |
| `VITE_RSVP_ENDPOINT` | URL that accepts a JSON `POST` of RSVPs |
| `VITE_GUESTBOOK_ENDPOINT` | URL: `GET` returns a JSON array of `{name,message,createdAt}`; `POST` stores one |
| `VITE_FILM_URL` | Direct `.mp4`/`.webm` URL or YouTube/Vimeo link for the wedding film |

## Persistence — what is and isn't real

- **RSVP:** with no endpoint, nothing is sent or stored. The success screen says so. RSVP payload: `{ name, attending, guests, message, submittedAt }`.
- **Guestbook:** with no endpoint, blessings are saved in this browser's `localStorage` only (not shared with the couple or other guests). The four "sample blessings" are fictional and shown separately.
- To make both persistent you need a backend: e.g. Formspree / Google Apps Script web app / Supabase table / a Vercel serverless function (`/api/rsvp`) writing to a database. Point the env vars at it. Cross-origin endpoints must allow CORS; the guestbook one should also moderate input.

## Film

No suitably licensed wedding film was available, so the section shows a styled placeholder until `VITE_FILM_URL` is set. Audio never autoplays; background music is opt-in via the button.

## Credits

See [CREDITS.md](./CREDITS.md).
