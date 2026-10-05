"use client";

import Image from "next/image";
import { useState } from "react";
import { imageUrl } from "@/lib/media";

type MediaImageProps = {
  /** Path under public/images, e.g. "all/CRKL_Jan26_LR©Hablar-17.jpg". */
  src: string;
  alt: string;
  /** Tailwind sizing for the frame, e.g. "aspect-[3/4]" or "h-full". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Shown while the real asset is still missing. */
  fallbackLabel?: string;
};

/**
 * An image in a frame that always looks intentional.
 *
 * If the file is missing at public/images/<src> — or the media library has
 * not been uploaded to the CDN yet — the frame shows a rose wash with an
 * optional label instead of a broken-image icon.
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
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-petal ${aspect} ${className}`}>
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
          className="eyebrow absolute inset-0 flex items-center justify-center p-4 text-center text-stone"
        >
          {fallbackLabel ?? "CRKL"}
        </span>
      )}
    </div>
  );
}
