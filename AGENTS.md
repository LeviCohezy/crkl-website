<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## CRKL project notes

- Read `README.md` for the layout and `docs/` for the two decisions that shape
  this codebase: `MEDIA.md` (asset conventions) and `ECOMMERCE-ROADMAP.md`
  (what the shop still needs).
- **The wireframe decides structure**: which pages exist, which sections each
  has, and in what order (`wireframes-crkl-v3`, summarised in the README's
  page table). Layout and styling are the site's own. Do not add, drop or
  reorder sections without being asked.
- **Elegance first, and vary the composition.** Whitespace, type and
  photography do the work. No two neighbouring sections on a page may share
  a layout: pick a different composition (`variant`) for each — see the
  catalog in the README. The "find it" accents (`Ring`, `Square`, `Eyebrow`,
  `Hollow` in `components/motion/Accents.tsx`) are hairline geometry, at most
  one per section. No rounded image masks, rotating badges or filled shapes.
- **White first, pink second, brown almost never.** Backgrounds are white
  (`cream`), the brand pink (`blush`) and its tint (`petal`). Every rule,
  border, divider, leader and button outline uses `line` / `line-strong`
  (pale pinks) or white — never ink, never black. `clay` appears only in the
  hairline accents (`Ring`, `Square`, `Hollow`), two or three per page; ink
  is for type. Primary buttons are pink pills with a sweep fill; the nav,
  the reserve pill and floating cards are frosted glass (`.glass`).
  Photographs have 16 px corners unless they meet the viewport edge.
- Build pages from `src/components/sections/`; give each section a `Band`
  tone (white / tint / dark / brand) to keep the wireframe's pacing.
- Never hardcode `/images/...` or `/videos/...` paths. Use `imageUrl()` /
  `videoUrl()` from `src/lib/media.ts`, or the `MediaImage` / `BackgroundVideo`
  components, so the asset library can move to a CDN in one env change. Name
  photographs through `shoot.*` in `src/lib/photos.ts` rather than typing the
  `©` filenames by hand.
- Read the catalogue through `src/lib/catalog/index.ts`, never by importing
  `products.ts` directly. Those functions are async so the data source can
  change. The cart (`src/lib/cart.ts`) stores slugs and quantities only —
  always look prices up again.
- Money is integer cents everywhere, formatted with `formatPrice()`.
- Colours and type come from the tokens in `src/app/globals.css`. No raw hex in
  components. Blush is light: type on it is ink, never white.
- The site is in Dutch (Flemish, "u" form; `/trouwen` says "jullie"). Facts
  live in `src/lib/site.ts` and `src/lib/menu.ts`; do not invent hours,
  prices, names, dishes, reviews or quotes — add to `CONTENT_TODO.md` instead.
- Internal links use `TransitionLink` (or `ArrowLink` / `SolidLink`) so they
  get the page transition. Scroll scenes use GSAP from `src/lib/gsap.ts`,
  wrapped in `gsap.matchMedia()` with `MOTION_OK` so reduced motion gets a
  static layout.
