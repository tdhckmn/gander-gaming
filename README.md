# Gander Gaming — Website

Firebase + React web app for [gandergaming.com](https://gandergaming.com). Landing page, Grok?! 2e product page, and in-game tools.

## Stack

- React + Vite
- React Router v6
- Firebase (Hosting + Analytics)
- jsPDF (character sheet export)

## Dev

```bash
yarn dev       # local dev server
yarn build     # production build
yarn preview   # preview production build locally
yarn deploy    # build + deploy to Firebase
```

Firebase config lives in `.env.local` (not committed).

## Routes

| Path | Page |
|---|---|
| `/` | Home / Gander Gaming landing |
| `/grok` | Grok?! 2nd Edition product page |
| `/tools` | Random generators (Character, Scene, NPC, Asset) |

## Analytics

Google Analytics runs through Firebase (GA4). It only loads after the user accepts the cookie banner.

To test without sending real hits, append `?qa=true` to any URL — all events will log to the console instead. QA mode persists for the session via localStorage.

### UTM Campaigns

Campaign links follow standard UTM format:

```
https://gandergaming.com/?utm_source=kickstarter&utm_medium=referral&utm_campaign=grok2e
```

To link to a specific page instead of the landing page, swap the path:

```
https://gandergaming.com/grok?utm_source=discord&utm_medium=social&utm_campaign=grok2e
https://gandergaming.com/tools?utm_source=reddit&utm_medium=social&utm_campaign=grok2e
```

Feel free to change `utm_campaign` to something like `grok2e_launch` or `grok2e_ks_week1` as needed.

| Channel | `utm_source` | `utm_medium` |
|---|---|---|
| Kickstarter page | `kickstarter` | `referral` |
| Discord | `discord` | `social` |
| Reddit | `reddit` | `social` |
| Facebook | `facebook` | `social` |
| Bluesky | `bluesky` | `social` |

In GA4, go to **Reports → Acquisition → Traffic Acquisition** and filter by `Session source / medium` to see breakdowns per channel.

UTM params captured on landing are stored in `sessionStorage` so they survive in-session navigation without cluttering the visible URL.

## SEO

Each page manages its own title, description, canonical URL, and Open Graph tags via the `useSEO` hook. The share image for the Grok page is `assets/img/share-grok.png`.
