# Images & video

Two top-level folders, both served straight from the web root:

```
public/
├── images/
│   ├── all/        the full library — 715 shots from HABLAR, by shoot date
│   └── hero/       poster frames for the films below
└── videos/
    ├── all/        17 raw films (dishes, menu, kitchen)
    ├── hero/       the three hero loops
    └── clips/      shorter loops used further down the pages
```

The photographs all live in `all/`. That is fine: pages reference exact
filenames, so there is no need to sort the library into subject folders unless
it becomes hard to find things.

Filenames contain a `©` (e.g. `CRKL_Jan26_LR©Hablar-10.jpg`). This works —
tested raw, percent-encoded, and through the Next.js image optimizer — but it
is worth knowing about if a CDN or deploy target ever mangles non-ASCII paths.

So that nobody has to retype those names, [`src/lib/photos.ts`](../src/lib/photos.ts)
spells them out per shoot: `shoot.mei25(22)` is
`all/CRKL_Mei25_LR©HABLAR-22.jpg`. Every photograph on the site is named
through it.

## The films on the site

The raw films in `videos/all/` are portrait phone footage, up to 44 MB each.
The site never plays those. It plays seven short loops cut from them, scaled
to 720 px wide, silent, 0.5–1.9 MB each — small enough to live in git:

| File | Cut from | Used |
| --- | --- | --- |
| `hero/crkl-hero-keuken.mp4` | `CRKL_Asperges.mp4`, 0:07–0:21 | hero, left |
| `hero/crkl-hero-tafel.mp4` | `Video-5960.mp4`, 0:01–0:11 | hero, centre (and the only one on phones) |
| `hero/crkl-hero-zaal.mp4` | `Video-74689.mp4`, 0:04–0:11 | hero, right |
| `clips/crkl-dresseren.mp4` | `Video-71392.mp4`, 0:02–0:13 | homepage statement |
| `clips/crkl-wijn.mp4` | `Video-11519.mp4`, 0:00–0:10 | menu page, wine section |
| `clips/crkl-citroen.mp4` | `CRKL_Citroen.mp4`, 0:03–0:09 | spare |
| `clips/crkl-pass.mp4` | `Video-8938.mp4`, 0:00–0:14 | spare |

Each has a poster frame of the same name in `images/hero/`. The cuts avoid
the parts of the raw films that have captions burned in. To make another:

```bash
ffmpeg -ss 7 -t 14 -i public/videos/all/CRKL_Asperges.mp4 \
       -vf "scale=720:-2" -c:v libx264 -crf 27 -preset slow -an \
       -pix_fmt yuv420p -movflags +faststart public/videos/hero/name.mp4
ffmpeg -ss 1.2 -i public/videos/hero/name.mp4 -frames:v 1 -q:v 4 \
       public/images/hero/name.jpg
```

The hero shows three portrait films side by side on a wide screen — three
9:16 frames make almost exactly one 16:9 — so each plays near its native
resolution instead of one being stretched across the viewport.

## Rules of thumb

- **Name files after what they are**, lowercase with hyphens: `crkl-blanc.jpg`,
  not `IMG_4821.JPG`. Bottle shots should match the wine's `slug` in
  `src/lib/catalog/wines.ts` so they are easy to pair up.
- **Never reference a path by hand.** Use the helpers in
  [`src/lib/media.ts`](../src/lib/media.ts) and pass the path *without* the
  `images/` or `videos/` prefix:

  ```tsx
  <MediaImage src={shoot.mei25(22)} alt="Asperge met citroen en dille" />
  <BackgroundVideo src="clips/crkl-wijn.mp4" poster="hero/crkl-wijn.jpg" />
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

`public/images/all`, `public/videos/all` and `public/inspiration` are in
`.gitignore`. **That means a fresh clone or a deploy has no photographs** until
one of these is done — the site still renders, with rose placeholder frames:

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

