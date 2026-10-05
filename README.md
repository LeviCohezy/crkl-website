# CRKL

Website for CRKL, a gastronomic restaurant in Roeselare. Built with Next.js 16
(App Router, Turbopack), React 19, TypeScript and Tailwind CSS v4, with GSAP,
Lenis and Motion for the scroll scenes and transitions. The site is in Dutch.

Pages, sections and their order follow the wireframe (`wireframes-crkl-v3`,
22 July 2026). The visual layout is the site's own: rose, quiet, typographic,
with photography doing most of the work.

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

Each page's sections are in the order the wireframe gives them.

| Route | Sections |
| --- | --- |
| `/` | hero slider · trust band · reviews · six "mogelijkheden" tiles · the chef · dishes · signature dish · menu statement · reservation form · practical info |
| `/menu` | hero · signature dishes · the menu in tabs (Lunch / Diner / Dranken) · wine & champagne · reservation form · FAQ |
| `/lunch` | hero · reviews · the formula · lunch menu · dishes · reservation form · FAQ |
| `/diner` | hero · philosophy statement · dinner menu · wine pairing · dishes · reviews · reservation form · FAQ |
| `/the-room` | hero · the room · set-ups · gallery · quote · two-step enquiry form · FAQ |
| `/events` | hero · kinds of events · approach · gallery · quote · enquiry form · FAQ |
| `/trouwen` | hero · the day · building blocks · gallery · quote · four steps · two-step enquiry form · FAQ |
| `/over-ons` | hero · the story · kitchen & team · the team · recognition · contact form |
| `/champagne-pompadour` | hero · the story · chef's quote · reservation form |
| `/gastro-rsl` | hero · why a member · together · reservation form |
| `/geschenkbox` | hero · what is in it · choose a box · how it works · reviews · FAQ |
| `/shop`, `/shop/[slug]` | title and filters · product grid · delivery band; product detail |
| `/contact` | title · how to reach us · contact form · FAQ |
| `/cart` | title · line items · summary · cross-sell · trust band |
| `/checkout` | minimal header · steps · form · order summary · trust line · minimal footer |
| `/order-confirmation` | confirmation · recap · next step |
| `/account` | title and tabs · content panel · help band |
| `/privacy`, `/terms`, `/cookies`, `/accessibility` | title · contents · text (one shared template) |
| 404 | statement · four exits |

Review cards and quote spotlights render nothing until real quotes are added
to `src/lib/reviews.ts`.

## Layout

```
public/
├── images/
│   ├── all/           the HABLAR photo library — NOT in git
│   └── hero/          poster frames for the films
└── videos/
    ├── all/           the raw films — NOT in git
    ├── hero/          three loops, cut and compressed
    └── clips/         two more
src/
├── app/
│   ├── (site)/        every public page, with the header and footer
│   ├── (shop)/        the checkout tunnel, with its own bare chrome
│   ├── layout.tsx     fonts, metadata, smooth scroll, transition, curtain
│   ├── globals.css    brand tokens (colours, type, easings)
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── shell/         smooth scroll, page transition, preloader, header, footer, cursor
│   ├── motion/        reusable animation primitives
│   ├── sections/      the section types every page is assembled from
│   ├── home/          the homepage's own scenes
│   ├── shop/          product card, cart, checkout, account
│   ├── media/         image and video wrappers
│   └── ui/            links and buttons
└── lib/
    ├── site.ts        address, hours, nav, links — the facts
    ├── menu.ts        the menu and its prices
    ├── reviews.ts     guest reviews and quotes (empty until supplied)
    ├── faq.ts         the questions under each page
    ├── photos.ts      names every photograph used
    ├── catalog/       the shop's products + their data access layer
    ├── cart.ts        the browser-side cart
    ├── enquiry.ts     server action behind every form
    ├── media.ts       resolves every image/video URL
    ├── gsap.ts        GSAP with its plugins registered once
    └── format.ts      price formatting
```

## Where to change things

| You want to… | Edit |
| --- | --- |
| Change hours, address, phone, nav, links, the Google rating | `src/lib/site.ts` |
| Change the menu or a price, add the dishes | `src/lib/menu.ts` |
| Add guest reviews or quotes | `src/lib/reviews.ts` |
| Change a FAQ answer | `src/lib/faq.ts` |
| Add or change a product | `src/lib/catalog/products.ts` |
| Change the copy on a page | that page's `page.tsx` under `src/app/(site)/` |
| Change brand colours or fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Make the forms deliver somewhere | set `ENQUIRY_WEBHOOK_URL` — see `src/lib/enquiry.ts` |
| Add a page | a folder with `page.tsx` under `src/app/(site)/`, built from `components/sections/` |

## Sections

Every page is assembled from the same small set, so a new page is mostly a
list:

| Component | Wireframe archetype |
| --- | --- |
| `PageHero` | hero split |
| `TrustBand` | band |
| `Reviews`, `Spotlight` | review cards, quote statement |
| `Tiles` | immersive tiles |
| `SplitMedia` | split media (photo or film) |
| `Gallery` | gallery |
| `Cards` | card grid |
| `Steps` | steps |
| `Statement`, `VideoStatement` | statement on the dark band |
| `MenuTabs`, `MenuExcerpt` | editorial menu |
| `ReservationBand`, `FormBand` | form on the brand tint |
| `Praktisch` | hours, address, map |
| `Faq` | accordion |
| `LegalPage` | title · contents · text |

`Band` gives each of them one of four backgrounds — white, tinted, dark,
brand — which is how the page pacing in the wireframe is kept.

## Motion

Deliberately few moves, repeated:

| What | Where |
| --- | --- |
| Smooth scroll (Lenis on GSAP's ticker) | `components/shell/SmoothScroll.tsx` |
| Page transition: a rose curtain rises, the route swaps, it lifts away | `components/shell/PageTransition.tsx` — use `TransitionLink` for internal links |
| Opening curtain with the monogram, once per page load | `components/shell/Preloader.tsx` |
| Hero: four slides that wipe over one another and drift | `components/home/HomeHero.tsx` |
| Dishes: a pinned row that scrolls sideways | `components/home/DishBand.tsx` |
| Signature dish: a round window that opens to the full photograph — the one circle on the site | `components/home/Signature.tsx` |
| Statement: a tilted film with a two-colour line across it | `components/home/VideoStatement.tsx` |
| Headings that rise word by word, images uncovered from their bottom edge, parallax, links that lean to the pointer | `components/motion/` |
| Cursor ring, scroll-progress hairline, grain | `components/shell/`, `.grain-layer` in `globals.css` |

Everything respects `prefers-reduced-motion`: scroll scenes collapse to static
layouts, the intro and transitions are skipped, films hold on their poster.

## What does not work yet

- **Payment.** The cart is real (browser-side); checkout's last step says
  online payment is not active and offers the order as an e-mail.
- **Accounts.** `/account` shows the logged-out state with the form disabled.
- **Form delivery.** Without `ENQUIRY_WEBHOOK_URL`, forms validate and then
  hand the visitor a pre-written e-mail.

See [`docs/ECOMMERCE-ROADMAP.md`](docs/ECOMMERCE-ROADMAP.md).

## Notes

- `next dev` maintains the managed block at the top of `AGENTS.md`. Next.js 16
  differs from older versions in ways that matter (async `params`, `proxy.ts`
  instead of `middleware.ts`, Turbopack by default); the version-matched docs
  are in `node_modules/next/dist/docs/`.
- `npm audit` reports advisories in `eslint-config-next`'s dependency tree.
  They are dev-only and the only "fix" is downgrading ESLint config to v14 —
  not worth it. Nothing ships to users.
- Earlier versions are in git history: the wine-house scaffold and "v2"
  homepage concept (commit "Snapshot existing work"), and a first restaurant
  build made before the wireframe was found (commit "Build the CRKL
  restaurant site").
