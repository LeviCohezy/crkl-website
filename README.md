# CRKL

Website for CRKL, a gastronomic restaurant in Roeselare. Built with Next.js 16
(App Router, Turbopack), React 19, TypeScript and Tailwind CSS v4, with GSAP,
Lenis and Motion for the scroll scenes and transitions. The site is in Dutch.

It is structured so that an online shop — Stripe checkout, customer accounts,
order history — can be added without rebuilding it. See
[`docs/ECOMMERCE-ROADMAP.md`](docs/ECOMMERCE-ROADMAP.md).

**Before going live, read [`CONTENT_TODO.md`](CONTENT_TODO.md)** — it lists
every piece of copy and data that still needs a human check.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

```bash
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

The photo library (`public/images/all`) is not in git — see
[`docs/MEDIA.md`](docs/MEDIA.md). Without it, every image frame shows a rose
placeholder and the site still works.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Letter hero that opens into three films, the house statement, the seasons as a sticky plate-by-plate scene, hosts, a horizontal gallery band, suppliers, reservation call |
| `/menu` | The three menus as a sticky scene, wine pairing, the season wall |
| `/verhaal` | The story in five chapters with a pinned frame, the team, recognition |
| `/leveranciers` | The four suppliers, each with the dining-room chair on location |
| `/wijn`, `/wijn/[slug]` | Aperitif, and the catalogue (placeholder wines) |
| `/galerij` | Filterable gallery with lightbox, press contact |
| `/reserveren` | Reservation request, The Room, gift voucher |
| `/contact` | Address, hours, map, contact form |

## Layout

```
public/
├── images/
│   ├── all/           the HABLAR photo library — NOT in git
│   └── hero/          poster frames for the films
└── videos/
    ├── all/           the raw films — NOT in git
    ├── hero/          the three hero loops, cut and compressed
    └── clips/         shorter loops used further down the pages
src/
├── app/
│   ├── (site)/        the public site, one folder per page
│   ├── (shop)/        reserved — cart & checkout
│   ├── (account)/     reserved — login & order history
│   ├── layout.tsx     fonts, global metadata
│   ├── globals.css    brand tokens (colours, type, easings)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── shell/         smooth scroll, page transition, preloader, header, footer, cursor
│   ├── motion/        reusable animation primitives
│   ├── home/          homepage sections
│   ├── sections/      sections shared between pages
│   ├── media/         image and video wrappers
│   └── ui/            buttons
└── lib/
    ├── site.ts        address, hours, nav, links — the facts
    ├── menu.ts        the menus and their prices
    ├── suppliers.ts   the supplier stories
    ├── photos.ts      names every photograph used; the gallery lives here
    ├── catalog/       the wine catalogue + its data access layer
    ├── enquiry.ts     server action behind both forms
    ├── media.ts       resolves every image/video URL
    ├── gsap.ts        GSAP with its plugins registered once
    └── format.ts      price and volume formatting
```

## Where to change things

| You want to… | Edit |
| --- | --- |
| Change hours, address, phone, nav, social links | `src/lib/site.ts` |
| Change a menu or a price | `src/lib/menu.ts` |
| Change the plates in the season scene | `plates` in `src/lib/menu.ts` |
| Add or remove a gallery photo | `gallery` in `src/lib/photos.ts` |
| Change a supplier | `src/lib/suppliers.ts` |
| Add or change a wine | `src/lib/catalog/wines.ts` |
| Change brand colours or fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Swap a hero film | `heroMedia` in `src/lib/site.ts` — see [`docs/MEDIA.md`](docs/MEDIA.md) |
| Make the forms deliver somewhere | set `ENQUIRY_WEBHOOK_URL` — see `src/lib/enquiry.ts` |
| Add a page | a folder with `page.tsx` under `src/app/(site)/` |

## Motion

| What | Where |
| --- | --- |
| Smooth scroll (Lenis on GSAP's ticker) | `components/shell/SmoothScroll.tsx` |
| Page transition: circle wipe from the click, hole opening onto the new page | `components/shell/PageTransition.tsx` — use `TransitionLink` for internal links |
| Opening curtain, once per page load | `components/shell/Preloader.tsx` |
| Hero: pinned letters, round window opening into three films | `components/home/Hero.tsx` |
| Sticky scenes (plates, menus, story chapters) | `home/SeasonScroller.tsx`, `sections/MenuScene.tsx`, `sections/StoryChapters.tsx` |
| Pinned horizontal gallery | `components/home/GalleryBand.tsx` |
| Word-by-word headings, image unveils, parallax, magnetic buttons, marquee, rotating ring | `components/motion/` |
| Cursor, scroll-progress ring, grain | `components/shell/Cursor.tsx`, `ScrollProgress.tsx`, `.grain-layer` in `globals.css` |

Everything respects `prefers-reduced-motion`: scroll scenes collapse to static
layouts, the intro and transitions are skipped, films hold on their poster.

## Notes

- `next dev` maintains the managed block at the top of `AGENTS.md`. Next.js 16
  differs from older versions in ways that matter (async `params`, `proxy.ts`
  instead of `middleware.ts`, Turbopack by default); the version-matched docs
  are in `node_modules/next/dist/docs/`.
- `npm audit` reports advisories in `eslint-config-next`'s dependency tree.
  They are dev-only and the only "fix" is downgrading ESLint config to v14 —
  not worth it. Nothing ships to users.
- The first version of this repo was scaffolded as a wine-house site. That
  version and the "v2" homepage concept the current design grew out of are in
  git history (commit "Snapshot existing work").
