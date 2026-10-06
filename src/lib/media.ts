/**
 * Every image and video URL in the app goes through here.
 *
 * By default assets are served from /public (so `images/web/x.jpg` becomes
 * `/images/web/x.jpg`), under the site's base path when it is deployed below
 * one (GitHub Pages serves it from /crkl-website). Set
 * NEXT_PUBLIC_MEDIA_BASE_URL and the exact same paths resolve to a CDN or
 * bucket instead, with no component changes.
 *
 * See docs/MEDIA.md for the folder conventions.
 */

const cdn = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/+$/, "") ?? "";
const base = cdn || (process.env.NEXT_PUBLIC_BASE_PATH ?? "");

function resolve(root: "images" | "videos", path: string): string {
  // Already an absolute URL? Pass it straight through.
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\/+/, "");
  const prefixed = clean.startsWith(`${root}/`) ? clean : `${root}/${clean}`;
  return `${base}/${prefixed}`;
}

/** `imageUrl("web/bottle.jpg")` → `/images/web/bottle.jpg` */
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
