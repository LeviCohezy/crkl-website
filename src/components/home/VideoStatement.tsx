"use client";

import { useEffect, useRef } from "react";
import { imageUrl, videoUrl } from "@/lib/media";
import { playMuted } from "@/lib/video";

/** Both copies of the line share this, so they land on top of each other. */
const lineType =
  "font-display w-[min(94vw,62rem)] text-center text-[clamp(2.5rem,8vw,6.5rem)] leading-[1.12] font-light";

/** Centres a box on its parent's centre point. */
const centred = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

/** How far the line drifts across the whole pass, in pixels. */
const DRIFT = 70;

type VideoStatementProps = {
  /** Two short lines; the second is set in italic. */
  lines: [string, string];
  video: string;
  poster: string;
};

/**
 * A full-viewport statement on the dark band: one slightly tilted clip with
 * a line of display type laid across it, running wider than the film on both
 * sides.
 *
 * The line changes colour depending on what is behind it — white over the
 * film, rose over the page. That is two copies of the same text: the rose
 * one sits underneath, and the white one lives *inside* the rotated, clipped
 * film box, counter-rotated by the same angle so it stays upright and lands
 * exactly on its twin. The box's overflow does the masking, so the colour
 * change follows the tilted edges precisely.
 *
 * As the section passes the viewport the line drifts slowly upward against
 * the film. Both copies read one CSS variable, so they move as one.
 */
export function VideoStatement({ lines, video, poster }: VideoStatementProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const film = videoRef.current;
    if (!section || !film) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !still) playMuted(film);
        else film.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(film);

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

  const line = (
    <>
      {lines[0]}
      <br />
      <em>{lines[1]}</em>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-ink"
    >
      {/* Rose copy — the real heading, and what shows over the page. */}
      <div className={centred}>
        <h2 className={`statement-shift ${lineType} text-blush`}>{line}</h2>
      </div>

      {/* Capped on every axis so the clip always fits the viewport. */}
      <div className="relative aspect-[4/5] w-[min(80vw,54svh,32rem)] -rotate-[3deg] overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoUrl(video)}
          poster={imageUrl(poster)}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
        />

        {/* White copy, clipped to the film. Counter-rotated first, so the
            drift below it runs up the page rather than up the tilt. */}
        <div className={`${centred} rotate-[3deg]`}>
          <span aria-hidden className={`statement-shift block ${lineType} text-white`}>
            {line}
          </span>
        </div>
      </div>
    </section>
  );
}
