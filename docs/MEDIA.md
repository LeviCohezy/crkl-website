# Images & video

Two top-level folders, both served straight from the web root:

```
public/
├── images/
│   └── all/        the full library — 715 shots from HABLAR, by shoot date
└── videos/
    └── all/        17 films (dishes, menu, kitchen)
```

Everything currently lives in `all/`. That is fine: pages reference exact
filenames, so there is no need to sort the library into subject folders unless
it becomes hard to find things.

Filenames contain a `©` (e.g. `CRKL_Jan26_LR©Hablar-10.jpg`). This works —
tested raw, percent-encoded, and through the Next.js image optimizer — but it
is worth knowing about if a CDN or deploy target ever mangles non-ASCII paths.

## Rules of thumb

- **Name files after what they are**, lowercase with hyphens: `crkl-blanc.jpg`,
  not `IMG_4821.JPG`. Bottle shots should match the wine's `slug` in
  `src/lib/catalog/wines.ts` so they are easy to pair up.
- **Never reference a path by hand.** Use the helpers in
  [`src/lib/media.ts`](../src/lib/media.ts) and pass the path *without* the
  `images/` or `videos/` prefix:

  ```tsx
  <MediaImage src="wines/crkl-blanc.jpg" alt="Bottle of CRKL Blanc" />
  <BackgroundVideo src="hero/crkl-hero.mp4" poster="hero/crkl-hero.jpg" />
  ```

  That indirection is what lets the whole library move to a CDN later with a
  single environment variable.
- **Missing files degrade gracefully.** `MediaImage` shows a brand-coloured
  frame with a label, `BackgroundVideo` removes itself. So you can build pages
  before the photography arrives.

## Preparing assets

| Use | Format | Target size |
| --- | --- | --- |
| Photography | JPEG (or AVIF/WebP source) | longest edge 2400px, < 500 KB |
| Logos, icons | SVG | — |
| Social share | JPEG/PNG | exactly 1200×630 |
| Hero loop | MP4 (H.264) + poster JPEG | < 6 MB, 6–12s, silent |
| Longer film | MP4 (H.264) | < 25 MB, or host it externally |

`next/image` handles resizing and AVIF/WebP conversion automatically, so upload
one good-quality original per image rather than several sizes.

Video is *not* optimised by Next.js — compress it before committing. HandBrake
or:

```bash
ffmpeg -i input.mov -vcodec libx264 -crf 26 -preset slow \
       -vf "scale=1920:-2" -an public/videos/hero/crkl-hero.mp4
```

(`-an` strips audio, which a background loop never needs.)

## The library is already too big for git

The library is **717 MB** today (608 MB of images, 110 MB of video) and will
only grow. That is past the point where it belongs in the repository: it would
sit in git history forever and ship with every deployment.

Do **not** commit `public/images/all` or `public/videos/all`. Pick one:

1. **Host the media elsewhere (recommended).** Upload the two folders to a
   bucket or CDN keeping the same paths, then set:

   ```bash
   NEXT_PUBLIC_MEDIA_BASE_URL="https://cdn.crkl.be"
   ```

   Every path in the code already resolves through `src/lib/media.ts`, so
   nothing else changes. `next.config.ts` allows that origin automatically.
   Good options: Vercel Blob, Cloudflare R2, Bunny. For the films,
   Mux or Cloudflare Stream give real adaptive streaming.

2. **Git LFS**, if the media must stay versioned alongside the code. Enable it
   and uncomment the LFS lines in `.gitattributes` *before* the first commit —
   adding LFS after the fact means rewriting history.

Either way the four 40 MB+ films should be compressed or streamed rather than
served as files; see the ffmpeg recipe above.

