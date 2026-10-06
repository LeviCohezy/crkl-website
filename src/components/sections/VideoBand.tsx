"use client";

import { useRef } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type VideoBandProps = {
  eyebrow?: string;
  /** Two short lines, set wide and letterspaced over the film. */
  lines: [string, string];
  video: string;
  poster: string;
};

/**
 * A full-screen looping film with a line of letterspaced capitals across
 * it. The film drifts slower than the page (parallax), and the two lines
 * slide apart a little as you pass, so the type feels laid on the picture
 * rather than printed on it.
 */
export function VideoBand({ eyebrow, lines, video, poster }: VideoBandProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scroll = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo("[data-film]", { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: scroll });
        gsap.fromTo("[data-line='0']", { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: scroll });
        gsap.fromTo("[data-line='1']", { xPercent: 6 }, { xPercent: -6, ease: "none", scrollTrigger: scroll });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex h-svh min-h-[34rem] items-center justify-center overflow-hidden bg-ink text-white">
      <div data-film className="absolute inset-0 scale-[1.25] will-change-transform">
        <BackgroundVideo src={video} poster={poster} />
      </div>
      <div aria-hidden className="absolute inset-0 bg-ink/35" />
      <div className="relative px-6 text-center">
        {eyebrow ? <p className="eyebrow mb-8 text-white/80">{eyebrow}</p> : null}
        <h2 className="font-display text-[clamp(1.9rem,6vw,6.5rem)] leading-[1.15] font-light tracking-[0.24em] uppercase">
          <span data-line="0" className="block will-change-transform">
            {lines[0]}
          </span>
          <span data-line="1" className="block italic will-change-transform">
            {lines[1]}
          </span>
        </h2>
      </div>
    </section>
  );
}
