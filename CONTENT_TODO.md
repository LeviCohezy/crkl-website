# Content to review before going live

The site follows the wireframe (`wireframes-crkl-v3`, 22 July 2026) for which
pages exist, which sections each has and in what order. The wireframe is an
outline, not copy — so most of the words on the site had to come from
somewhere else. Wherever possible they are facts and sentences from the
restaurant's current site (crkl.eu) and its Michelin Guide listing, read on
5 October 2026. Everything else is listed here, most important first.

Legend: **Placeholder** = invented or guessed, must be replaced.
**Missing** = the section exists but shows nothing until content is supplied.
**Verify** = taken from a real source, needs a quick check.
**Decide** = a choice someone has to make.

## 1. Missing — sections that are built but hidden

These are in the wireframe and in the code, in the right place, but render
nothing because their content cannot be made up. Add the content in
`src/lib/reviews.ts` and they appear.

| Section | Pages | What is needed |
| --- | --- | --- |
| Review cards | `/` (section 4), `/lunch`, `/diner`, `/geschenkbox` | 2–3 real quotes with names per page |
| Quote spotlight (dark band before the form) | `/the-room`, `/events`, `/trouwen` | One host or couple, full quote, name and occasion |
| Chef's quote | `/champagne-pompadour` | One line from the chef on champagne and the kitchen |
| Dishes on the menu | `/menu`, `/lunch`, `/diner` | The current courses per menu (`courses` in `src/lib/menu.ts`), with allergens. Today the menus show names and prices only |

## 2. Placeholder — must be replaced

| What | Where it shows | Edit in |
| --- | --- | --- |
| **The three gift boxes are invented**: names, contents, prices (€45 / €75 / €125) and photographs (none shows an actual box). They exist so the shop, cart and checkout can be seen working. | `/geschenkbox`, `/shop`, `/shop/[slug]`, `/cart`, `/checkout` | `src/lib/catalog/products.ts` |
| **"Wat zit erin" and "Zo werkt het"** on the gift-box page describe a box and a process nobody confirmed (wrapping, pickup, shipping). | `/geschenkbox` | that page |
| **Shipping.** The cart and checkout offer "Verzending in België" without a price; the shop band promises it. | `/shop`, `/cart`, `/checkout` | `CartView.tsx`, `CheckoutFlow.tsx`, shop page |
| **The Champagne Pompadour page is a holding text.** The wireframe names the ambassadorship; nothing else was supplied. The page says Maison Pompadour is a champagne house from Reims and that CRKL pours it — and no more. No photograph of the champagne exists in the library. | `/champagne-pompadour`, `/menu` (wine section), `/diner` | that page |
| **The Gastro RSL page is a holding text.** Nothing could be found about the organisation; the page describes it in general terms and uses the supplier photographs for "local produce". The three "Samen sterk" cards are invented. | `/gastro-rsl` | that page |
| **The signature dish is not identified.** The homepage scene shows the langoustine photograph and speaks of "het signature gerecht van de chef" without naming it. | `/` (section 8) | `src/components/home/Signature.tsx` |
| **Dish captions are written from the photographs**, not from the menu ("Asperge — met citroen, venkel en dille", etc.). | `/menu` (signature dishes), alt texts everywhere | menu page, `src/lib/photos.ts` |
| **The Room is now written in full** (business and private use cases, the five "worries", the three set-ups with details, the four figures, a longer FAQ). Fact from crkl.eu: up to 20 guests, audiovisual equipment, parking, open for groups on Tuesday / Saturday lunch / Sunday, the menus and prices. Written to a plausible standard and **to be confirmed**: one dedicated contact person; changes accepted up to the day itself; a pre-test of the guest's laptop; service that "knows when to come in"; a walking-dinner format with standing tables; coffee and water on the table for meetings; "6 dagen per week". The MICE vocabulary (directiecomité, productvoorstelling, workshop) is a guess at the audience. | `/the-room` | that page, `src/lib/faq.ts` |
| **Wedding page.** crkl.eu confirms "kleinschalige huwelijksfeesten" and nothing more. Ceremony, reception, the four steps and the gallery (which shows the room and terrace, not a wedding) are written to the wireframe's outline. | `/trouwen` | that page |
| **Event gallery** shows the room, terrace and bar — not past events, as the wireframe intends. | `/events` | that page |
| **FAQ answers.** The questions follow the topics in the wireframe. Answers are facts where crkl.eu gave one (parking, hours, The Room's capacity and AV, voucher validity); the rest say "tell us / call us" rather than guess (vegetarian menu, children, budget, exclusivity, ceremony on site, shipping, personalisation). | every page with a FAQ | `src/lib/faq.ts` |
| **Team.** Only Sam and Jolien are named; the third card is "Het team". "Sam in the kitchen, Jolien in the dining room" is inferred from the photographs (he wears the chef's apron). | `/over-ons`, `/` (section 6) | over-ons page |
| **Legal pages are drafts, not legal text.** Each says so at the top and is excluded from search engines. The cookie page's "Beheer voorkeuren" button is disabled — there is no consent manager. | `/privacy`, `/terms`, `/cookies`, `/accessibility` | each page |

## 3. Does not work yet

| What | Behaviour today | To finish |
| --- | --- | --- |
| **Reservation and enquiry forms** | Validate, then tell the visitor online sending is unavailable and hand them a pre-written e-mail to `info@crkl.eu`. | Set `ENQUIRY_WEBHOOK_URL`, or embed the booking system crkl.eu already uses on its `/reserveren` page. |
| **Payment** | Cart works in the browser. Checkout steps 1–2 work; step 3 says online payment is not active and offers the order as an e-mail. The "Betaal" button is disabled. | Stripe — `docs/ECOMMERCE-ROADMAP.md`. |
| **Order confirmation** | Shows "no recent order" — nothing can place one. | Follows payment. |
| **Account** | Logged-out state with the form disabled. | Auth — roadmap phase 4. |

The wireframe's microcopy under the reservation form — "Bevestiging binnen
enkele minuten · geen voorschot" — is **not** on the site: it is a promise only
a connected booking system can keep. The form says "Uw tafel ligt vast na onze
bevestiging" instead. Likewise "Antwoord binnen 24u" became "We antwoorden zo
snel mogelijk". Put the originals back once they are true.

## 4. Verify — taken from crkl.eu, Michelin or Google

| What | Value used | Edit in |
| --- | --- | --- |
| Address | Diksmuidsesteenweg 351a, 8800 Roeselare | `src/lib/site.ts` |
| Phone / e-mail | 051 51 08 52 / info@crkl.eu | `src/lib/site.ts` |
| VAT number (footer) | BE 0550.981.180 | `src/lib/site.ts` |
| Lunch | Wednesday–Friday, 12:00–13:00 | `src/lib/site.ts` |
| Dinner | Wednesday–Saturday, 19:00–19:30 | `src/lib/site.ts` |
| Reservation time slots | Lunch 12:00 / 12:30 / 13:00, dinner 19:00 / 19:30 — derived from those hours | `src/lib/site.ts` |
| **Hours conflict.** Michelin says Tuesday–Friday 12:00–13:00 and 19:00–20:30, Saturday 19:00–20:00; the wireframe's example says "di–vr 12u–14u". The site follows crkl.eu. | — | `src/lib/site.ts` |
| Menu CRKL+ (dinner) | 5 courses €95 · signature dish +€31 · cheese board €15 · cheese instead of dessert €10 · wine pairing €40 | `src/lib/menu.ts` |
| Menu Carré+ (lunch) | 4 courses €79 · cheese board €15 · cheese instead of dessert €10 · wine pairing €30 | `src/lib/menu.ts` |
| Lunch formula | 2 courses €42 · 3 courses with dessert €56 | `src/lib/menu.ts` |
| Non-alcoholic juice | €6.50 | `src/lib/menu.ts` |
| Which menu is served at which service | as read from crkl.eu | `src/lib/menu.ts` |
| The Room | up to 20 guests, audiovisual equipment | `/the-room`, FAQ |
| Open for groups on Tuesday, Saturday lunch and Sunday | from crkl.eu | `src/lib/site.ts` |
| Gift voucher | links to Tablefever; value of your choice, valid one year | `src/lib/site.ts`, products |
| **Google rating** | **4,7** (463 reviews), as Google Maps showed on 6 October 2026. The wireframe says 4,9. | `src/lib/site.ts` |
| Credentials | "Ambassadeur Champagne Pompadour" and "Lid van Gastro RSL" — taken from the wireframe as given | `src/lib/site.ts` |
| Michelin Guide, Gault&Millau | linked in the footer; no score, star or year is claimed | footer |
| Route link | Waze, 50.9517785, 3.0956398 | `src/lib/site.ts` |
| Social | instagram.com/restaurant_crkl, the Facebook page | `src/lib/site.ts` |

## 5. Decide

- **Voice.** crkl.eu addresses guests as "u"; the wireframe's buttons say
  "je" and "jullie". The site uses "u" throughout, except `/trouwen`, which
  speaks to a couple and says "jullie". Buttons were adapted to match
  ("Plan uw event", "Uw winkelmand is leeg").
- **Brand colours.** Dusty rose `#DFBBB3` and accent `#B26A5C`, from the
  wireframe. The three pinks carry the site; the brown accent is kept to
  hairlines, outlined accents and a few words, and the one dark panel per
  page is `#2A1C1A`. On the rose, type is dark — white type would not be
  readable.
- **Hero.** A slider of four photographs with the headline and reserve button
  fixed over it, as the wireframe asks. The films are portrait phone footage
  and are used in portrait frames further down instead.
- **Photography rights.** All photos are HABLAR's (the © is in the
  filenames). The footer credits "Fotografie HABLAR". Confirm the licence
  covers web use and the credit is worded as agreed.
- **Media hosting.** The site now ships web-sized copies of the 70
  photographs it uses (`public/images/web`, 1800 px, about 11 MB); the full
  715-photo library stays out of git (see `docs/MEDIA.md`).
- **Map.** The practical-info section embeds Google Maps by address, without
  an API key. It sets Google cookies; add a consent step or swap it for a
  static map if the privacy policy requires it.
- **Social share image.** None set; add a 1200×630 JPEG at
  `public/images/og/` and reference it in `src/app/layout.tsx`.
- **Language.** Dutch only.
- **Domain.** `NEXT_PUBLIC_SITE_URL` must be set for correct canonical URLs,
  sitemap and structured data.
- **Pages the wireframe does not have.** A first build included Verhaal,
  Leveranciers, Wijn, Galerij and Reserveren. They were removed to follow
  the wireframe. The supplier photographs (the dining-room chair at each
  supplier) are a strong series that now only appears on `/gastro-rsl` —
  worth a place if the sitemap is ever reopened.

## 6. Written for the V3 design (`/v3`) — to confirm

The V3 pages reuse the facts above and add a few sentences of their own:

| What | Where it shows | Note |
| --- | --- | --- |
| "Voor grotere gezelschappen openen we ook op dinsdag, zaterdagmiddag en zondag; wat dan kan in de zaal, bespreken we graag met u." | `/v3/events` | Infers from crkl.eu's "voor groepen en events openen we ook op …" that the dining room can be set for a group on those days. Confirm. |
| The wedding page speaks of "de tuin" (a garden) as well as the terrace, and of a ceremony "als dat bij ons kan". | `/v3/trouwen` | The terrace under the white awning is photographed; a garden ceremony is not confirmed. |
| "Jolien ontvangt jullie gasten, Sam kookt. Het team weet wie wie is, wie wat niet eet …" | `/v3/trouwen` | Hospitality promise written to a plausible standard. |
| "Michelin Guide · Gault&Millau" named in the quality line under the homepage statement | `/v3` | Listings only; no score or distinction is claimed. |
| Alt texts for the two newly exported photographs (`juni26(23)`, `leveranciers(106)`) describe the pictures. | `/v3/menu`, `/v3/gastro-rsl` | — |
| The reservation tool on `/v3/reserveren` sends the request as an e-mail / webhook like every other form; it does not check availability. | `/v3/reserveren` | Replace `components/v3/Reserve.tsx` with the booking system's widget (Zenchef or the Tablefever flow crkl.eu uses). |
