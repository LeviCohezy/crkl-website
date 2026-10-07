"use client";

import { useRef } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

/** Each column drifts at its own pace, in percent of its own height. */
const SPEEDS = [-5, 3, -2];
const RATIOS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]"];

type VisualsProps = {
  photos: Photo[];
  tone?: Tone;
  id?: string;
  title?: string;
  /** A line under the photographs, usually a link. */
  after?: React.ReactNode;
};

/**
 * A lot of photographs at once: three columns at slightly different
 * heights, each moving at its own speed as the page scrolls, so the grid
 * breathes instead of sitting still. Two columns on a phone, without the
 * drift.
 */
export function Visuals({ photos, tone = "white", id, title, after }: VisualsProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-column]").forEach((column, index) => {
          const amount = SPEEDS[index % SPEEDS.length];
          gsap.fromTo(
            column,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  const columns = [0, 1, 2].map((c) => photos.filter((_, i) => i % 3 === c));

  return (
    <Section tone={tone} id={id}>
      {title ? <SplitText text={title} className={`${t.h2} mb-16 max-w-3xl sm:mb-24`} /> : null}

      <div ref={root}>
        {/* Desktop: three drifting columns. */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-3 lg:gap-8">
          {columns.map((column, c) => (
            <div key={c} data-column className={`flex flex-col gap-8 ${c === 1 ? "mt-32" : c === 2 ? "mt-12" : ""}`}>
              {column.map((photo, i) => (
                <Reveal key={photo.src} delay={i * 0.04}>
                  <MediaImage
                    src={photo.src}
                    alt={photo.alt}
                    aspect={RATIOS[(c + i) % RATIOS.length]}
                    sizes="31vw"
                    focus={photo.focus}
                  />
                </Reveal>
              ))}
            </div>
          ))}
        </div>

        {/* Phone and tablet: two still columns. */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:hidden">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 2) * 0.06} className={i % 2 === 1 ? "mt-10" : ""}>
              <MediaImage src={photo.src} alt={photo.alt} aspect={RATIOS[i % RATIOS.length]} sizes="50vw" focus={photo.focus} />
            </Reveal>
          ))}
        </div>
      </div>

      {after ? <div className="mt-16 flex justify-end sm:mt-24">{after}</div> : null}
    </Section>
  );
}
