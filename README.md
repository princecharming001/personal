# Personal Website

Minimal personal site with subtle video game aesthetics and smooth animations.

## Design Features

**Visual Style:**
- **Beige background** with pixelated grid pattern
- **Blue-violet accent** (#7C3AED) - changed from orange
- Clean typography with subtle effects
- Video game inspired elements

**Animations & Effects:**
- ✨ Typing animation on heading with blinking cursor
- 🎮 Pixelated background grid (subtle)
- ⭐ Floating particles
- 🌟 Hover glow effects on links
- 📍 Pixel corner decorations
- 🎯 Smooth slide animations on list items
- 💫 Scale effects on buttons
- 🔷 Animated progress bars
- ⚡ Underline animations on links

**Interactive Elements:**
- Hover effects with translations
- Button scale on click
- Glow shadows on hover
- Smooth transitions throughout

## Tech Stack

- Next.js 16
- Tailwind CSS
- Framer Motion concepts (CSS animations)
- React Hooks for typing effect

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Booking Setup (Stripe + Google Calendar)

The `/book` page now supports:
- live availability from Google Calendar
- Stripe Checkout payment flow
- automatic event creation after successful payment via webhook

1) Copy env template and fill values:

```bash
cp .env.example .env.local
```

Security note:
- Never commit real API keys. `.env*` is gitignored in this repo by default.
- If a live secret key was pasted into chat/logs, rotate/revoke it in Stripe immediately.

2) Google Calendar setup:
- create a Google Cloud service account with Calendar API enabled
- share your booking calendar with the service account email (Editor access)
- set `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

3) Stripe setup:
- set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`
- run webhook forwarder to local API:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

- copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`

4) Use `NEXT_PUBLIC_SITE_URL` that matches your deployment domain in production.

## Admin Visual Editor + Publish Pipeline

> ✅ Verified end-to-end against production at `https://www.anishpolakala.com`.
> Save on `localhost` → Publish stages, commits, pushes, and deploys to Vercel
> in ~1–2 min, then the live site serves the saved snapshot.

A hidden editor launcher appears as a small dot in the bottom-right corner of the site.

- click the dot, enter the unlock code (`VaniAmma1` by default unless overridden by env)
- click **Start editing** — the page goes into `document.designMode = "on"` and a top format toolbar appears
- click any text on the page and edit visually; ⌘B / ⌘I / ⌘U / ⌘Z / ⌘⇧Z work
- pressing **Enter** inside an arrow bullet (→) clones the row beneath it
- click **Save version** to persist the rendered snapshot for that route
- click **Publish** to roll the saved snapshot out: stages `data/content-overrides.json`, commits, pushes to `origin HEAD`, then runs your deploy step

Configure in `.env.local`:

```bash
ADMIN_UNLOCK_CODE=VaniAmma1
ADMIN_SESSION_SECRET=your-long-random-secret
# Preferred on Vercel (Production): Project → Settings → Git → Deploy Hooks
ADMIN_PUBLISH_WEBHOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
# Or CLI (works with `npm run dev` locally if `vercel` is available):
ADMIN_PUBLISH_COMMAND=npx vercel deploy --prod --yes
```

Pipeline details:
- session is an HTTP-only signed cookie (`admin_session`, 6h)
- saves are sanitized server-side with `sanitize-html` (drops `<script>`, `<iframe>`, `<object>`, `javascript:` schemes; keeps Tailwind classes/styles)
- overrides live in `data/content-overrides.json` and are **statically imported** into the API route, which guarantees Vercel/Turbopack bundles the snapshot into the function
- saves on Vercel (read-only FS) intentionally fail with a clear error: edit on a writable host and Publish to roll out
- if `ADMIN_PUBLISH_WEBHOOK_URL` is set the publish endpoint POSTs to that URL after the git push and skips the shell deploy; otherwise `ADMIN_PUBLISH_COMMAND` runs
- the editor UI surfaces a step-by-step log for every Publish so you can see exactly what happened
- to opt out of the git push step set `ADMIN_PUBLISH_GIT_PUSH=false`

## Customization

Edit `app/page.tsx`:
- Change accent color (replace `#7C3AED` and `#6D28D9`)
- Adjust animation speeds
- Modify particle count
- Update content

## Features

✅ Typing animation on load
✅ Pixelated grid background
✅ Floating particle effects
✅ Smooth hover animations
✅ Glow effects on interactive elements
✅ Pixel-style corner decorations
✅ Responsive design
✅ Performance optimized

## License

MIT
