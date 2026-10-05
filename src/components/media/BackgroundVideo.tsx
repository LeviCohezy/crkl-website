"use client";

import { useEffect, useRef, useState } from "react";
import { imageUrl, videoUrl } from "@/lib/media";

type BackgroundVideoProps = {
  /** Path under public/videos, e.g. "hero/crkl-hero.mp4". */
  src: string;
  /** Path under public/images, used as the poster frame. */
  poster?: string;
  className?: string;
};

/**
 * Muted, looping background video.
 *
 * Silently removes itself if the file is missing or the browser refuses to
 * play it, leaving whatever sits behind it visible. Honours
 * prefers-reduced-motion by holding on the poster frame instead of playing.
 */
export function BackgroundVideo({
  src,
  poster,
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      video.pause();
      return;
    }
    // Autoplay can still be refused; that is not an error worth surfacing.
    void video.play().catch(() => {});
  }, []);

  if (failed) return null;

  return (
    <video
      ref={videoRef}
      className={`h-full w-full object-cover ${className}`}
      src={videoUrl(src)}
      poster={poster ? imageUrl(poster) : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      onError={() => setFailed(true)}
    />
  );
}
