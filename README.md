# CRKL

Website for CRKL, a gastronomic restaurant in Roeselare. Built with Next.js 16
(App Router, Turbopack), React 19, TypeScript and Tailwind CSS v4, with GSAP,
Lenis and Motion for the scroll scenes and transitions. The site is in Dutch.

Pages, sections and their order follow the wireframe (`wireframes-crkl-v3`,
22 July 2026). The visual layout is the site's own: rose, quiet, typographic,
with photography doing most of the work, and its compositions are drawn from
the editorial and fine-dining references in `public/inspiration/`.

**Before going live, read [`CONTENT_TODO.md`](CONTENT_TODO.md)** — it lists
every piece of copy and data that still needs a human check.

## Deploying

The site is a static export (`output: "export"` in `next.config.ts`): every
page is plain HTML in `out/`, served from any static host. GitHub Pages serves
it from `/crkl-website`, which the deploy script sets as the base path:

```bash
./scripts/deploy-pages.sh   # builds out/ and force-pushes it to the gh-pages branch
```

It uses the `gh-pages` branch rather than a GitHub Actions workflow because
the local `gh` token has no `workflow` scope. What a static host cannot do:
deliver forms (they fall back to a pre-written e-mail unless
`NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL` is set), take payment, or sign anyone in —
those pages say so.

## V3 — the white version (`/v3`)

A second design of the whole site, built beside the current one so the two
can be compared: open http://localhost:3000/v3/ (and `/v3/menu`, `/v3/the-room`,
…). Everything the current site has is there — the content pages, the shop,
cart, checkout, account and the legal pages — in one language:

- **Soft white, with a soft rose here and there.** The page is `#fcfaf9`
  (`.v3-scope` overrides `--color-cream`), one `rose` section per page at
  most, pink hairlines, one pink button. Straight corners everywhere; the
  only curve is `Orbit`, a line of text on a circle that turns slowly
  (home, Trouwen and Over ons only).
- **Tight and still.** Photographs sit inside the page's gutters with white
  around them, never full-bleed; they drift a few percent inside their
  frame and nothing else moves. No eyebrows, no pills, no
  picture-beside-text blocks. Sections alternate a whole screen of words
  (`Statement`, inking in word by word) with a paragraph you lean into.
- **Reserving is a tool, not a form.** `/v3/reserveren` books a table the
  way Zenchef does, one choice per screen: guests → day → time → details
  (`components/v3/Reserve.tsx`; the calendar reads the opening days and
  the time slots from `site.ts`). Every "Reserveer" leads there. Each page
  ends with a plain **contact form** instead (`ContactSection`); The Room,
  Events and Trouwen keep their own enquiry forms. Swap `Reserve` for the
  booking system's widget when there is one.
- **Homepage order as briefed:** what the house is → what kind of house →
  the dinner menu → the plates → The Room (business) → lunch (rose) →
  events → the contact form.
- **The Room** is written for business meetings and private dining;
  **Events** for corporate, wedding and family occasions; **Trouwen** for
  the romantic, small wedding with the terrace and garden.

Where it lives: `src/app/(v3)/v3/` (pages, with the glass header and the
footer in its layout), `src/app/(v3-checkout)/v3/checkout/` (the bare
checkout tunnel), `src/components/v3/` (the kit: `Hero`, `Statement`,
`MenuList`, `Visuals`, `Strip`, `Feature`, `IndexRows`, `Columns`, `Figures`,
`VideoBand`, `Team`, `Practical`, `Reserve`, `ContactSection`,
`FormSection`/`Form`, `Faq`, `Legal`, `Header`, `Footer`, `Orbit`, `Links`,
`Section`, `type`). It shares all data (`site.ts`, `menu.ts`, `faq.ts`,
`photos.ts`, `legal.ts`, the catalogue) and the shop components with the
current site.

Pages are written with the site's own hrefs (`/menu`, `/reserveren`);
`HrefPrefix` in the V3 layout keeps them under `/v3`. Its pages carry
`robots: noindex` while they are a version. **To promote V3:** move the
pages from `(v3)/v3/` into `(site)/`, drop the `HrefPrefix` providers and the
`noindex`, point `(site)/layout.tsx` at `components/v3/Header` and `Footer`,
and fix the `canonical` paths.

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

The full photo library (`public/images/all`) is not in git; the site serves
web-sized copies from `public/images/web`, which are — see
[`docs/MEDIA.md`](docs/MEDIA.md).

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

Every page is assembled from the same small set of section types, and each
type has a few compositions, so no two neighbouring sections on a page share
a layout. The compositions come from the references in `public/inspiration/`.

| Component | Compositions |
| --- | --- |
| `PageHero` | `straddle` (title runs on into a full-width photo), `giant` (photo half, rose half with a very large title and a card crossing the seam), `cascade` (letterspaced title, three photos stepping diagonally), `centered` (wide letterspaced title with a tall photo rising into it), `offset` (eyebrow at the edge, title a third of the way in, photo bleeding right) |
| `Tiles` | `stagger` (pictures at alternating heights, captions above one and below the next), `tall` (tall cards with the name at the top of the picture) |
| `SplitMedia` | `simple`, `stack` (two overlapping pictures), `collage` (three pictures of different sizes with the words in the cells between), `inset` (a rose panel set in from the edges with pictures breaking over it) |
| `Gallery` | `stagger` (a row at alternating heights with a centred line under it), `collage` (four sizes set loosely in a square), `strip` (tall pictures butted edge to edge, full width) |
| `Statement` | `inset` (the one dark moment, as a panel with a photo breaking its corner), `type` (large type with pictures behind and in front), `fade` (a paragraph inking in word by word) |
| `Cards` | `columns` (outlined numerals), `flanked` (one picture in the middle, items either side, a thin arc behind), `checker` (rows of picture and words, alternating sides), `photos` |
| `Steps` | one hairline, four rings with numbers, the last step is the call to action |
| `FormBand` | `card` (form in a cream card over a softened photo, hours and phone each in a thin ring), `split` (title centred, form left, framed box right), `plain` |
| `MenuSpread` | the menu as a book you leaf through by scrolling: the section pins and each screen of scroll turns a page — the left half rises out while the right half sinks, and the next spread arrives with the menu and the photograph on the other sides (desktop; phones keep the photograph on top). Arrows and page numbers scroll to a page (Blanquette) |
| `CardFan` | three cards that start as one stack and fan out as the section pins |
| `Cinematic` | the section pins while a picture (or film) opens from a slit at its centre to the full screen, then a row of four |
| `VideoBand` | a full-screen looping film with two lines of letterspaced capitals drifting over it |
| `PinBand` | a gallery that scrolls sideways while the section pins |
| `Timeline` | a hairline that draws itself down the page, lighting up each moment |
| `MenuExcerpt` | `columns`, `framed` |
| `TrustBand`, `Reviews`, `Spotlight`, `Praktisch`, `Faq`, `LegalPage` | one composition each |

Rich copy uses `Disclosure` (short line, full paragraphs folded under it but
always in the page), `Pills`, `PullQuote` and in-section `Tabs` from
`components/motion/Disclosure.tsx`, and `CountUp` for figures.

`Band` gives each of them one of four backgrounds — white, tinted, brand,
and "dark", which is now the brand pink as well — which is how the page
pacing in the wireframe is kept. White carries the site, pink is the second
colour, and no line on the site is dark.

### Find-it accents

`components/motion/Accents.tsx` — a thin `Ring` (sometimes with one dot on
it), a faint `Square` slipped off a photo or heading, an `Eyebrow` with a
short rule and a tiny ring, and `Hollow` outlined numerals. At most one per
section; they are meant to be noticed on the second look.

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
| One larger scene per page: scroll-turned menu (Menu), slit reveal (Lunch, Over ons), full-screen film (Diner), card fan (The Room), sideways band (Events), drawn timeline (Trouwen), word-fade (Champagne Pompadour) | `components/sections/` |
| Statement: a tilted film with a two-colour line across it | `components/home/VideoStatement.tsx` |
| Headings that rise word by word, images uncovered from their bottom edge, parallax, links that lean to the pointer | `components/motion/` |
| Cursor ring, scroll-progress hairline, grain | `components/shell/`, `.grain-layer` in `globals.css` |

Everything respects `prefers-reduced-motion`: scroll scenes collapse to static
layouts, the intro and transitions are skipped, films hold on their poster.

## What does not work yet

- **Payment.** The cart is real (browser-side); checkout's last step says
  online payment is not active and offers the order as an e-mail.
- **Accounts.** `/account` shows the logged-out state with the form disabled.
- **Form delivery.** Without `NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL`, forms validate
  and then hand the visitor a pre-written e-mail (from the browser — the site
  is a static export, so there is no server action).

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
