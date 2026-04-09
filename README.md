# needle.fm

A Letterboxd-style music diary app. Log albums, rate them, write reviews, and follow friends' listening habits.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Pages

| Route | Description |
|---|---|
| `/` | Activity feed — friends' recent logs and reviews |
| `/discover` | Browse top-rated albums, filter by genre, get recommendations |
| `/diary` | Your personal listening diary, organized by month |
| `/profile` | Your stats, genre breakdown, lists, activity chart |
| `/log` | Log a new album — search, rate, review, add context tags |
| `/album/[id]` | Album detail page with community reviews |

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** — Playfair Display + DM Sans

## Project structure

```
app/
  page.tsx          → Feed
  discover/         → Discover
  diary/            → Diary
  profile/          → Profile
  log/              → Log album
  album/[id]/       → Album detail
  globals.css       → Design tokens, shared styles
  layout.tsx        → Root layout + Nav

components/
  Nav.tsx           → Top navigation bar
  ui.tsx            → Shared components (AlbumArt, Stars, Avatar, etc.)

lib/
  data.ts           → Mock data (albums, diary entries, feed, etc.)
```

## Next steps to make it real

1. **Database** — swap `lib/data.ts` for a real DB (Postgres via Prisma or Supabase)
2. **Auth** — add NextAuth.js or Clerk for user accounts
3. **Music metadata** — integrate Spotify Web API or MusicBrainz for real album art, track listings, genre tags
4. **Search** — add full-text search (Algolia or Postgres FTS)
5. **Social** — real follow/following, notifications
6. **Image upload** — profile photos via Cloudinary or Vercel Blob
