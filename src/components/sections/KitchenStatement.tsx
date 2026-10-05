"use client";

import { useEffect, useRef } from "react";
import { imageUrl, videoUrl } from "@/lib/media";

/** Both copies of the line share this, so they land on top of each other. */
const lineType =
  "font-display w-[min(94vw,58rem)] text-center text-[clamp(2.75rem,9vw,7rem)] leading-[1.15] font-light";

/** Centres a box on its parent's centre point. */
const centred = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

/** How far the line drifts across the whole pass, in pixels. */
const DRIFT = 70;

const line = (
  <>
    Moderne visie
    <br />
    op gastronomie
  </>
);

/**
 * A full-viewport white breath in the page: one tilted 4:5 clip with a line of
 * display type laid across it, running wider than the video on both sides.
 *
 * The line changes colour depending on what is behind it — white over the
 * video, brand pink over the page. That is two copies of the same text: the
 * pink one sits underneath, and the white one lives *inside* the rotated,
 * clipped video box, counter-rotated by the same angle so it stays upright and
 * lands exactly on its twin. The video box's overflow does the masking, so the
 * colour change follows the tilted edges precisely.
 *
 * As the section passes the viewport the line drifts slowly upward against the
 * still video. Both copies read one CSS variable, so they move as one.
 */
export function KitchenStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !still) {
          // Autoplay can still be refused; not worth surfacing.
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    if (still) return () => observer.disconnect();

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      // 0 as the section enters from the bottom, 1 as it leaves past the top.
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);
      section.style.setProperty(
        "--statement-shift",
        `${((0.5 - clamped) * 2 * DRIFT).toFixed(2)}px`,
      );
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-white"
    >
      {/* Pink copy — the real heading, and what shows over the page. */}
      <div className={centred}>
        <h2 lang="nl" className={`statement-shift ${lineType} text-blush`}>
          {line}
        </h2>
      </div>

      {/* Capped on every axis so the clip always fits the viewport. */}
      <div className="relative aspect-[4/5] w-[min(84vw,56svh,34rem)] -rotate-[4deg] overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoUrl("all/Video-63111.mp4")}
          poster={imageUrl("hero/poster-kitchen.jpg")}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
        />

        {/* White copy, clipped to the video. Counter-rotated first, so the
            drift below it runs up the page rather than up the tilt. */}
        <div className={`${centred} rotate-[4deg]`}>
          <span
            aria-hidden
            className={`statement-shift block ${lineType} text-white`}
          >
            {line}
          </span>
        </div>
      </div>
    </section>
  );
}
