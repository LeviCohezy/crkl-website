import type { NextConfig } from "next";

/**
 * The site is a static export: every page is HTML in out/, served from any
 * static host. GitHub Pages serves it from /<repo>, so the deploy script sets
 * PAGES_BASE_PATH; locally it stays empty and the site runs at the root.
 *
 * Images are served as the files they are (no optimizer in a static export),
 * from public/images/web — a web-sized copy of every photograph the site
 * uses. See docs/MEDIA.md.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Folder-style URLs (/menu/index.html) work on any static host.
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
