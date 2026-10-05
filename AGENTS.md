<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## CRKL project notes

- Read `README.md` for the layout and `docs/` for the two decisions that shape
  this codebase: `MEDIA.md` (asset conventions) and `ECOMMERCE-ROADMAP.md`
  (how the shop gets added).
- Never hardcode `/images/...` or `/videos/...` paths. Use `imageUrl()` /
  `videoUrl()` from `src/lib/media.ts`, or the `MediaImage` / `BackgroundVideo`
  components, so the asset library can move to a CDN in one env change.
- Read the catalogue through `src/lib/catalog/index.ts`, never by importing
  `wines.ts` directly. Those functions are async so the data source can change.
- Money is integer cents everywhere, formatted with `formatPrice()`.
- Colours and type come from the tokens in `src/app/globals.css`. No raw hex in
  components.
- The site is in Dutch (Flemish, "u" form). Facts live in `src/lib/site.ts`
  and `src/lib/menu.ts`; do not invent hours, prices, names or dishes — add to
  `CONTENT_TODO.md` instead.
- Name photographs through `shoot.*` in `src/lib/photos.ts` rather than typing
  the `©` filenames by hand.
- Internal links use `TransitionLink` (or `PillLink`) so they get the page
  transition. Scroll scenes use GSAP from `src/lib/gsap.ts`, wrapped in
  `gsap.matchMedia()` with `MOTION_OK` so reduced motion gets a static layout.
