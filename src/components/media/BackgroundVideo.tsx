"use client";

import { useEffect, useRef, useState } from "react";
import { imageUrl, videoUrl } from "@/lib/media";
import { playMuted } from "@/lib/video";

type BackgroundVideoProps = {
  /** Path under public/videos, e.g. "hero/crkl-hero-tafel.mp4". */
  src: string;
  /** Path under public/images, used as the poster frame. */
  poster?: string;
  className?: string;
};

/**
 * Muted, looping background video.
 *
 * Plays only while it is on screen, removes itself if the file is missing,
 * and honours prefers-reduced-motion by holding on the poster frame.
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playMuted(video);
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (failed) return null;

  return (
    <video
      ref={videoRef}
      className={`h-full w-full object-cover ${className}`}
      src={videoUrl(src)}
      poster={poster ? imageUrl(poster) : undefined}
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
