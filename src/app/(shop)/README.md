# (shop) — reserved

Route group for cart and checkout. Empty on purpose: see
`docs/ECOMMERCE-ROADMAP.md` phase 2.

Planned:

```
(shop)/
├── layout.tsx          minimal checkout chrome
├── cart/page.tsx
└── checkout/
    ├── page.tsx
    └── success/page.tsx
```

A route group's name never appears in the URL, so `(shop)/cart/page.tsx`
serves `/cart`. It exists so checkout can have different chrome from the
marketing site without nesting the URLs.
