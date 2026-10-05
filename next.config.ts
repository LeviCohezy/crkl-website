import type { NextConfig } from "next";

/**
 * Media lives in /public by default. When the library gets too big for the
 * repo, set NEXT_PUBLIC_MEDIA_BASE_URL to a CDN/bucket origin — every asset
 * path goes through `src/lib/media`, so nothing else has to change.
 * See docs/MEDIA.md.
 */
const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: mediaBaseUrl ? [new URL(`${mediaBaseUrl}/**`)] : [],
  },
};

export default nextConfig;
