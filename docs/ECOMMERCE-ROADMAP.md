# Adding the shop

The marketing site is built so that commerce can be added without rewriting it.
This is the plan, the seams that already exist, and the order to do it in.

CRKL is a restaurant; the shop sells gift boxes and the gift voucher. The
voucher is sold through Tablefever today and links out. The three gift boxes
in the catalogue are placeholders — names, contents and prices are invented
so the flow can be seen working. Settle the real range before Phase 1.

The pages already exist, following the wireframe: `/shop`, `/shop/[slug]`,
`/geschenkbox`, `/cart`, `/checkout`, `/order-confirmation`, `/account`. What
is missing is everything behind them — no Stripe dependency, no database, no
auth. That is deliberate: dead scaffolding rots. What exists are the pages
and the boundaries.

## The seams already in place

| Seam | Where | Why it matters |
| --- | --- | --- |
| Async catalogue queries | `src/lib/catalog/index.ts` | `getProducts()` / `getProduct()` are already `async`. Swap the local array for a DB or Stripe products and no page changes. |
| Optional commerce block | `src/lib/catalog/types.ts` → `ProductCommerce` | Price, stock and Stripe ids live apart from editorial fields. Already holds `stripeProductId` / `stripePriceId`. |
| Prices as integer cents | `ProductCommerce.priceCents`, `src/lib/format.ts` | Same unit Stripe uses — no float rounding bugs later. |
| A cart that stores no prices | `src/lib/cart.ts` | Slugs and quantities in localStorage. Every amount is looked up in the catalogue again, so the cart cannot change what something costs. Replace this file with a server-side cart and nothing else moves. |
| A checkout that stops before payment | `src/components/shop/CheckoutFlow.tsx` | Steps one and two work. Step three is one clearly-marked block that says payment is not active — replace it with the Stripe redirect. |
| A confirmation page waiting for an order | `src/components/shop/OrderConfirmation.tsx` | Renders a `PlacedOrder` read from `sessionStorage`; nothing writes one yet, so it shows its "no order" state. |
| Checkout chrome | `src/app/(shop)/layout.tsx` | The tunnel: logo, phone, legal links, nothing else. |
| An account shell | `src/components/shop/AccountView.tsx` | Tabs and the logged-out state, form disabled. |
| Env template | `.env.example` | Stripe/DB/auth variables are listed and commented out. |

## Phase 1 — Products as the source of truth

Decide where a product's commercial data lives. Two workable answers:

1. **Stripe as the catalogue.** Create a Product + Price per item in Stripe,
   paste the ids into `products.ts`. Editorial copy stays in the repo. Simplest,
   and good for ~20 SKUs.
2. **Database as the catalogue.** Products in Postgres (Neon/Supabase + Drizzle or
   Prisma), mirrored to Stripe. Worth it once stock levels and the range need
   to change without a deploy.

Either way, only `src/lib/catalog/index.ts` changes. Add stock handling to
`ProductCommerce.inStock`.

## Phase 2 — Cart and checkout

The pages are built; this phase connects them.

```
src/app/(site)/cart/page.tsx                 exists — browser-side cart
src/app/(shop)/checkout/page.tsx             exists — stops before payment
src/app/(site)/order-confirmation/page.tsx   exists — waits for an order
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

`/account` exists as a shell (`src/app/(site)/account/page.tsx`): tabs and the
logged-out state. This phase adds the session, the real panels and

```
src/app/(site)/account/orders/[orderId]/page.tsx
```

- Auth: Auth.js (NextAuth v5) or Better Auth. Email magic links are a good fit
  for a small shop — no password resets to support.
- **Route protection in Next 16:** the `middleware.ts` convention is deprecated
  and renamed to **`proxy.ts`** at the project root, exporting a function named
  `proxy`. The `edge` runtime is not supported there; it runs on Node.
  Use it for coarse redirects only — do the real authorisation check in the
  layout/page/Server Action that touches the data.
- Link orders to a `stripeCustomerId` so Stripe's customer portal can handle
  invoices and payment methods for free.

## Phase 5 — Shop polish

- Age verification gate (18+/legal drinking age) if the boxes contain
  alcohol — a legal requirement for alcohol sales in most markets. A
  cookie-backed interstitial is enough.
- Stock-aware buttons.
- `Product` JSON-LD on product pages, with real price and availability, once the
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
