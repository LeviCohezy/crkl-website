"use client";

import { useRef, type ReactNode } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Orbit } from "@/components/v3/Orbit";
import { type as t, wrap } from "@/components/v3/type";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/lib/intro";
import type { Photo } from "@/lib/photos";

type HeroProps = {
  /** "\n" breaks the line, *asterisks* set words in italic. */
  title: string;
  lead?: string;
  /** Buttons and links under the lead. */
  actions?: ReactNode;
  /** Without a photograph the page goes straight on after the words. */
  photo?: Photo;
  /** The line of text on the circle, or none. */
  orbit?: string;
  /** A short line under the photograph. */
  caption?: string;
  /** How tall the title is allowed to be. */
  size?: "huge" | "big";
  /** The lead sits under the title instead of opposite it. */
  stack?: boolean;
};

/**
 * Every page opens the same way: the words first, on white, then one
 * photograph set inside the page's gutters with white all around it. The
 * photograph settles into place as it appears and drifts a little inside
 * its frame as you scroll past — and that is all that moves.
 */
export function Hero({ title, lead, actions, photo, orbit, caption, size = "huge", stack = false }: HeroProps) {
  const ready = useIntroDone();
  const frame = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!frame.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: frame },
  );

  return (
    <section className="relative bg-cream text-ink">
      <div className={`${wrap} relative pt-36 sm:pt-44 lg:pt-52`}>
        <SplitText
          as="h1"
          text={title}
          immediate
          ready={ready}
          delay={0.25}
          className={`${size === "huge" ? t.huge : t.big} max-w-[16ch]`}
        />

        {lead || actions ? (
          <div
            className={`mt-10 flex flex-col gap-10 sm:mt-14 ${
              stack ? "" : "lg:flex-row lg:items-end lg:justify-between lg:gap-16"
            }`}
          >
            {lead ? (
              <Reveal delay={0.7}>
                <p className={`${t.lead} max-w-md`}>{lead}</p>
              </Reveal>
            ) : null}
            {actions ? (
              <Reveal delay={0.85}>
                <div className="flex flex-wrap items-center gap-x-10 gap-y-6">{actions}</div>
              </Reveal>
            ) : null}
          </div>
        ) : null}

        {orbit ? (
          <Orbit text={orbit} className="hidden h-36 w-36 lg:right-16 lg:top-[7rem] lg:block lg:h-44 lg:w-44" />
        ) : null}
      </div>

      {photo ? (
        <figure ref={frame} className={`${wrap} mt-20 sm:mt-24 lg:mt-28`}>
          <Reveal y={16} className="overflow-hidden">
            <div ref={inner} className="aspect-[4/5] w-full scale-[1.08] sm:aspect-[3/2] lg:aspect-[16/9]">
              <MediaImage src={photo.src} alt={photo.alt} aspect="h-full" sizes="100vw" priority focus={photo.focus} />
            </div>
          </Reveal>
          {caption ? <figcaption className={`${t.small} mt-4`}>{caption}</figcaption> : null}
        </figure>
      ) : (
        <div className="h-16 sm:h-24" />
      )}
    </section>
  );
}
