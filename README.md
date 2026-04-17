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
