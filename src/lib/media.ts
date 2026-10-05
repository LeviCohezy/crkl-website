/**
 * Every image and video URL in the app goes through here.
 *
 * By default assets are served from /public (so `images/wines/x.jpg` becomes
 * `/images/wines/x.jpg`). Set NEXT_PUBLIC_MEDIA_BASE_URL and the exact same
 * paths resolve to a CDN or bucket instead, with no component changes.
 *
 * See docs/MEDIA.md for the folder conventions.
 */

const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/+$/, "") ?? "";

function resolve(root: "images" | "videos", path: string): string {
  const clean = path.replace(/^\/+/, "");
  // Already an absolute URL? Pass it straight through.
  if (/^https?:\/\//.test(path)) return path;
  const prefixed = clean.startsWith(`${root}/`) ? clean : `${root}/${clean}`;
  return base ? `${base}/${prefixed}` : `/${prefixed}`;
}

/** `imageUrl("wines/bottle.jpg")` → `/images/wines/bottle.jpg` */
export function imageUrl(path: string): string {
  return resolve("images", path);
}

/** `videoUrl("hero/reel.mp4")` → `/videos/hero/reel.mp4` */
export function videoUrl(path: string): string {
  return resolve("videos", path);
}

/** Absolute URL, needed for OG images and other metadata. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/+$/, "");
  return `${siteUrl}/${path.replace(/^\/+/, "")}`;
}
