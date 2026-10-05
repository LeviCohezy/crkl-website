# CRKL

Website for CRKL, a small-batch wine house. Built with Next.js 16 (App Router,
Turbopack), React 19, TypeScript and Tailwind CSS v4.

The site is currently a marketing site. It is structured so that an online shop
— Stripe checkout, customer accounts, order history — can be added without
rebuilding it. See [`docs/ECOMMERCE-ROADMAP.md`](docs/ECOMMERCE-ROADMAP.md).

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

## Layout

```
public/
├── images/       all photography and graphics, by subject
└── videos/       all video, by use
src/
├── app/
│   ├── (site)/        the public marketing site
│   ├── (shop)/        reserved — cart & checkout
│   ├── (account)/     reserved — login & order history
│   ├── layout.tsx     fonts, global metadata
│   ├── globals.css    brand tokens (colours, type)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── catalog/       wine-specific UI
│   ├── layout/        header, footer
│   ├── media/         image and video wrappers
│   └── ui/            buttons, container, headings
└── lib/
    ├── catalog/       the wine catalogue + its data access layer
    ├── media.ts       resolves every image/video URL
    ├── format.ts      price and volume formatting
    └── site.ts        site-wide constants
```

## Where to change things

| You want to… | Edit |
| --- | --- |
| Add or change a wine | `src/lib/catalog/wines.ts` |
| Change brand colours or fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Change nav, contact details, tagline | `src/lib/site.ts` |
| Add photography or video | `public/images/…`, `public/videos/…` — see [`docs/MEDIA.md`](docs/MEDIA.md) |
| Add a page | a folder with `page.tsx` under `src/app/(site)/` |

## Current placeholders

These are deliberate stand-ins, all in one place each:

- **Catalogue** — five invented wines in `src/lib/catalog/wines.ts`.
- **Copy** — written to the right length and tone, but not approved.
- **Photography and video** — none yet. Pages render a brand-coloured frame
  where an asset is missing, so the site looks finished before the shoot.
- **Palette and type** — a wine-cellar palette and Cormorant/Inter pairing,
  defined as tokens in `src/app/globals.css`.
- **Prices** — shown, but no way to buy; the buy button is explicitly disabled.

## Notes

- `next dev` maintains the managed block at the top of `AGENTS.md`. Next.js 16
  differs from older versions in ways that matter (async `params`, `proxy.ts`
  instead of `middleware.ts`, Turbopack by default); the version-matched docs
  are in `node_modules/next/dist/docs/`.
- `npm audit` reports advisories in `eslint-config-next`'s dependency tree.
  They are dev-only and the only "fix" is downgrading ESLint config to v14 —
  not worth it. Nothing ships to users.
