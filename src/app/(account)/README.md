# (account) — reserved

Route group for customer accounts and order history. Empty on purpose: see
`docs/ECOMMERCE-ROADMAP.md` phase 4.

Planned:

```
(account)/
├── layout.tsx          auth guard + account nav
├── login/page.tsx
├── account/page.tsx
└── account/orders/
    ├── page.tsx
    └── [orderId]/page.tsx
```

Note for Next.js 16: coarse route protection goes in a root `proxy.ts`
(the renamed `middleware.ts`), but the authorisation check that actually
matters belongs next to the data access.
