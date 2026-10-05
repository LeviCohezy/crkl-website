# Content to review before going live

The site was built without a content hand-over. Wherever possible it uses
facts and sentences taken from the restaurant's current site (crkl.eu) and its
Michelin Guide listing, both read on 5 October 2026. Everything else is
flagged below, most important first.

Legend: **Placeholder** = invented or guessed, must be replaced.
**Verify** = taken from a real source, needs a quick check.
**Decide** = a choice someone has to make.

## 1. Must fix

| What | Where it shows | Edit in | Status |
| --- | --- | --- | --- |
| **The wine catalogue is invented.** Five wines ("CRKL Blanc", "CRKL Rouge", …) with made-up regions, notes and prices, inherited from the earlier scaffold. They read as house wines CRKL does not have. Replace with real bottles, or remove `/wijn/[slug]` and the "Uit de kelder" list. | `/wijn`, `/wijn/[slug]` | `src/lib/catalog/wines.ts` | Placeholder |
| **Dish captions are written from the photographs**, not from the menu. Names like "Noordzeevis · wortel · biet · citrus" or "Knolselder · paddenstoel · hazelnoot · jus" are what the plate looks like, not what it is. The season labels (e.g. "Lente 2026") come from the shoot dates in the filenames. | Homepage season scene, `/menu` season wall | `plates` in `src/lib/menu.ts` | Placeholder |
| **The reservation and contact forms deliver nowhere yet.** Without `ENQUIRY_WEBHOOK_URL` they validate, then tell the visitor online sending is unavailable and hand them a pre-written e-mail to `info@crkl.eu`. crkl.eu has its own `/reserveren` page (the booking system behind it could not be read). | `/reserveren`, `/contact` | `src/lib/enquiry.ts`, `.env.example` | Decide: embed the existing booking system, or point the webhook at something |
| **Two suppliers have no name.** The cattle farmer and the strawberry grower are described by trade only. | `/leveranciers`, homepage | `src/lib/suppliers.ts` | Placeholder |
| **Supplier names read off the photos.** "'t Groendal" (cheese label) and "Le Monde des Mille Couleurs" (sign in the field). The four short supplier texts are written from what the photos show. | `/leveranciers`, homepage | `src/lib/suppliers.ts` | Verify names, replace texts |
| **Team members have no names.** Only Sam and Jolien are named. The other four portraits carry a role guessed from the photo ("Wijn", "Bar", "Zaal"). Check that each person agrees to be shown. | `/verhaal` | `team` in `src/app/(site)/verhaal/page.tsx` | Placeholder |

## 2. Verify — taken from crkl.eu / Michelin

| What | Value used | Edit in |
| --- | --- | --- |
| Address | Diksmuidsesteenweg 351a, 8800 Roeselare | `src/lib/site.ts` |
| Phone / e-mail | 051 51 08 52 / info@crkl.eu | `src/lib/site.ts` |
| VAT number (footer) | BE 0550.981.180 | `src/lib/site.ts` |
| Lunch | Wednesday–Friday, 12:00–13:00 | `src/lib/site.ts` |
| Dinner | Wednesday–Saturday, 19:00–19:30 | `src/lib/site.ts` |
| Closed | Saturday lunch, Sunday, Monday, Tuesday; open for groups on Tuesday, Saturday lunch, Sunday | `src/lib/site.ts` |
| **Hours conflict:** the Michelin listing says Tuesday–Friday 12:00–13:00 and 19:00–20:30, Saturday 19:00–20:00. The site follows crkl.eu. | — | `src/lib/site.ts` |
| Menu CRKL+ | 5 courses €95 · wine pairing €40 · non-alcoholic juice €6.50 · signature dish +€31 · cheese board €15 · cheese instead of dessert €10 | `src/lib/menu.ts` |
| Menu Carré+ | 4 courses €79 · wine pairing €30 · cheese board €15 · cheese instead of dessert €10 | `src/lib/menu.ts` |
| Lunch | 2 courses €42 · 3 courses with dessert €56 | `src/lib/menu.ts` |
| Menu CRKL+ is shown as "Diner, woensdag tot zaterdag" and Menu Carré+ as "Lunch, woensdag tot vrijdag" | as read from crkl.eu — confirm which menu is served when | `src/lib/menu.ts` |
| The Room | up to 20 guests, audiovisual equipment; enquiry by e-mail | `/reserveren` page |
| Gift voucher | links to Tablefever; "value of your choice, valid one year" | `src/lib/site.ts` |
| Route link | Waze, coordinates 50.9517785, 3.0956398 | `src/lib/site.ts` |
| Social | instagram.com/restaurant_crkl, the Facebook page | `src/lib/site.ts` |
| Recognition | Michelin Guide and Gault&Millau are named and linked; no score, star or year is claimed | `/verhaal`, `/galerij`, footer |

## 3. Copy written for this site

Sentences in quotes on the pages that are **not** from crkl.eu. All are short
and deliberately cautious, but none has been approved.

| Where | Copy | Based on |
| --- | --- | --- |
| Homepage hero | "Waar verfijning en beleving centraal staan" | crkl.eu's own sentence, shortened |
| Homepage hosts | "Sam in de keuken, Jolien in de zaal" | The photos (he wears the chef's apron). crkl.eu only says "Sam & Jolien" — **confirm the roles** |
| Homepage hosts | "Wat op het bord komt, begint bij mensen die we bij naam kennen." | Written |
| Homepage gallery | "Een zaal in pastel en cirkels" + two lines about the interior | Paraphrase of the Michelin description |
| Homepage suppliers | "Onze stoel op bezoek" + intro | Written, from the photo series (the pink chair on location) |
| Call to action | "Schuif mee aan tafel", "We ontvangen u graag." | Written |
| `/verhaal` chapters | Five titles and paragraphs: the concrete villa and pastel interior; fixed menu, Belgian produce with Asian and Mediterranean influences; the dining room; Belgian wines; the terrace | Paraphrased from the Michelin listing and crkl.eu. **Nothing here is the owners' own story** — no founding year, no background, no philosophy. This page most needs real copy |
| `/menu` | "Het menu ligt vast, de gerechten niet…", the allergy line, the wine-pairing paragraph | Written around the real prices |
| `/wijn` | "Eerst een aperitief", the bar paragraph, "Flessen om mee naar huis te nemen. De webshop volgt…" | Written. The webshop line is a promise — remove it if no shop is planned |
| `/leveranciers` | "Dagvers begint niet in de keuken…" and the four supplier texts | Written |
| `/galerij` | Press paragraph | Written; press requests go to info@crkl.eu |
| `/reserveren` | "Dit is een aanvraag. Uw tafel ligt vast na onze bevestiging." and the confirmation texts | Written |
| 404 | "Deze tafel bestaat niet" | Written |
| Photo alt texts | Every image | Written from the photo; names Sam and Jolien where they appear |

## 4. Decide

- **Photography rights.** All photos are HABLAR's (the © is in the filenames).
  The footer credits "Fotografie · HABLAR". Confirm the licence covers web use
  and that the credit is worded as agreed.
- **Media hosting.** The 715-photo library is not in git (see
  `docs/MEDIA.md`). Until it is uploaded to a CDN and
  `NEXT_PUBLIC_MEDIA_BASE_URL` is set, a deployed site shows rose placeholder
  frames instead of photographs. The seven short film loops *are* in git.
- **Map.** `/contact` embeds Google Maps by address, without an API key. It
  sets Google cookies; add a consent step or swap it for a static map if the
  privacy policy requires it.
- **Privacy / cookie pages.** None exist yet. crkl.eu links a cookie
  statement PDF.
- **Social share image.** No Open Graph image is set; add a 1200×630 JPEG at
  `public/images/og/` and reference it in `src/app/layout.tsx`.
- **Language.** Dutch only. crkl.eu may have French/English — not carried over.
- **Domain.** `NEXT_PUBLIC_SITE_URL` must be set for correct canonical URLs,
  sitemap and structured data.
