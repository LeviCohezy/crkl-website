"use client";

import Image from "next/image";
import { useState } from "react";
import { imageUrl } from "@/lib/media";

type MediaImageProps = {
  /** Path under public/images, e.g. "wines/crkl-blanc.jpg". */
  src: string;
  alt: string;
  /** Tailwind aspect utility, e.g. "aspect-[3/4]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Shown while the real asset is still missing. */
  fallbackLabel?: string;
  /** Tunes the stand-in frame to the surrounding section. */
  tone?: "light" | "dark";
};

const fallbackTone = {
  light: {
    frame: "bg-gradient-to-br from-cream-dim to-stone/25",
    label: "text-stone",
  },
  dark: {
    frame: "wash-cellar",
    label: "text-cream/35",
  },
} as const;

/**
 * An image in a frame that always looks intentional.
 *
 * Until the real file exists at public/images/<src>, the frame shows a brand
 * wash with an optional label instead of a broken-image icon — so the site is
 * presentable before the photography lands.
 */
export function MediaImage({
  src,
  alt,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className = "",
  imageClassName = "",
  fallbackLabel,
  tone = "light",
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);
  const standIn = fallbackTone[tone];

  return (
    <div
      className={`relative overflow-hidden ${standIn.frame} ${aspect} ${className}`}
    >
      {!failed ? (
        <Image
          src={imageUrl(src)}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <span
          aria-hidden
          className={`eyebrow absolute inset-0 flex items-center justify-center p-4 text-center ${standIn.label}`}
        >
          {fallbackLabel ?? "CRKL"}
        </span>
      )}
    </div>
  );
}
