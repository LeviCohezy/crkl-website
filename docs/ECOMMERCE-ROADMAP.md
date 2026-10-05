# Adding the shop

The marketing site is built so that commerce can be added without rewriting it.
This is the plan, the seams that already exist, and the order to do it in.

CRKL is a restaurant, so the first things the shop is likely to sell are
bottles from the cellar and gift vouchers. Vouchers are currently sold through
Tablefever (linked from `/reserveren`); the wines in the catalogue are
placeholders. Decide what is actually for sale before starting Phase 1.

Nothing here is installed yet — no Stripe dependency, no database, no auth. That
is deliberate: dead scaffolding rots. What exists instead are the boundaries.

## The seams already in place

| Seam | Where | Why it matters |
| --- | --- | --- |
| Async catalogue queries | `src/lib/catalog/index.ts` | `getWines()` / `getWine()` are already `async`. Swap the local array for a DB or Stripe products and no page changes. |
| Optional commerce block | `src/lib/catalog/types.ts` → `WineCommerce` | Price, stock and Stripe ids live apart from editorial fields. Already holds `stripeProductId` / `stripePriceId`. |
| Prices as integer cents | `WineCommerce.priceCents`, `src/lib/format.ts` | Same unit Stripe uses — no float rounding bugs later. |
| Reserved route groups | `src/app/(shop)`, `src/app/(account)` | Cart/checkout and account pages get their own chrome without touching the marketing layout in `src/app/(site)/layout.tsx`. |
| Env template | `.env.example` | Stripe/DB/auth variables are listed and commented out. |
| Disabled buy button | `src/app/(site)/wijn/[slug]/page.tsx` | One clearly-marked block to replace with a real add-to-cart. |

## Phase 1 — Products as the source of truth

Decide where a wine's commercial data lives. Two workable answers:

1. **Stripe as the catalogue.** Create a Product + Price per wine in Stripe,
   paste the ids into `wines.ts`. Editorial copy stays in the repo. Simplest,
   and good for ~20 SKUs.
2. **Database as the catalogue.** Wines in Postgres (Neon/Supabase + Drizzle or
   Prisma), mirrored to Stripe. Worth it once stock levels, vintages and
   allocations need to change without a deploy.

Either way, only `src/lib/catalog/index.ts` changes. Add stock handling to
`WineCommerce.inStock`.

## Phase 2 — Cart and checkout

```
src/app/(shop)/
├── layout.tsx          minimal chrome: logo, cart, no big footer
├── cart/page.tsx
└── checkout/
    ├── page.tsx
    └── success/page.tsx
```

- `npm i stripe @stripe/stripe-js`
- `src/lib/stripe/server.ts` — one shared `Stripe` client, server-only.
- Cart state: a cookie or a `cart` table. Keep it server-side where possible;
  read it with `await cookies()` (async in Next 16).
- Checkout: a Server Action that builds a **Stripe Checkout Session** from
  `stripePriceId` values and redirects. Do not trust prices from the client —
  always re-read them server-side.
- Tax and shipping: configure in Stripe. Alcohol shipping rules vary by country,
  so restrict shipping countries in the session.

## Phase 3 — Webhooks and orders

```
src/app/api/stripe/webhook/route.ts
```

- Verify the signature with `STRIPE_WEBHOOK_SECRET` against the **raw** body
  (`await request.text()`, never the parsed JSON).
- Handle at minimum `checkout.session.completed`,
  `payment_intent.payment_failed`, `charge.refunded`.
- Write the order to your own database on `checkout.session.completed`. Stripe
  is the payment record; your orders table is what the customer sees.
- Make it idempotent — Stripe retries. Key on the event id.
- Test locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## Phase 4 — Accounts and order history

```
src/app/(account)/
├── layout.tsx          auth guard + account nav
├── login/page.tsx
├── account/page.tsx
└── account/orders/
    ├── page.tsx
    └── [orderId]/page.tsx
```

- Auth: Auth.js (NextAuth v5) or Better Auth. Email magic links are a good fit
  for a wine shop — no password resets to support.
- **Route protection in Next 16:** the `middleware.ts` convention is deprecated
  and renamed to **`proxy.ts`** at the project root, exporting a function named
  `proxy`. The `edge` runtime is not supported there; it runs on Node.
  Use it for coarse redirects only — do the real authorisation check in the
  layout/page/Server Action that touches the data.
- Link orders to a `stripeCustomerId` so Stripe's customer portal can handle
  invoices and payment methods for free.

## Phase 5 — Shop polish

- Age verification gate (18+/legal drinking age) — a legal requirement for
  alcohol sales in most markets. A cookie-backed interstitial is enough.
- Stock-aware buttons, waitlist for allocated wines.
- `Product` JSON-LD on wine pages, with real price and availability, once the
  shop is live. Adding it before that risks Merchant/rich-result penalties.
- Order confirmation emails (Resend + React Email).
- Mixed cases, gift boxes, discount codes.
- Revalidate catalogue pages after a stock change with `revalidateTag` /
  `updateTag` rather than redeploying.

## Things to get right from the start

- **Never** put `STRIPE_SECRET_KEY` in a `NEXT_PUBLIC_*` variable.
- Recompute every price server-side at checkout.
- Keep money in integer cents everywhere.
- Log webhook failures somewhere you will actually look.
- Alcohol-specific: age verification, shipping restrictions by region, and
  excise/VAT handling are business decisions, not code ones — settle them before
  Phase 2.
