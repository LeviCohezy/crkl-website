"use client";

import { useRef, type ReactNode } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

type FeatureProps = {
  tone?: Tone;
  id?: string;
  /** "\n" breaks the line, *asterisks* set words in italic. */
  title: string;
  body: string[];
  /** Short facts, set in one line with dots between them. */
  facts?: string[];
  /** Links under the copy. */
  actions?: ReactNode;
  photo: Photo;
  /** The copy sits at the right edge instead of the left. */
  flip?: boolean;
  /** Photograph ratio on wide screens. */
  ratio?: "wide" | "cinema";
};

/**
 * Words above, one photograph below, both inside the page's gutters. The
 * picture drifts a little inside its frame as the page scrolls; nothing
 * else about it moves.
 */
export function Feature({ tone = "white", id, title, body, facts, actions, photo, flip = false, ratio = "wide" }: FeatureProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
    <Section tone={tone} id={id}>
      <div className={flip ? "flex justify-end" : ""}>
        <div className="max-w-3xl">
          <SplitText text={title} className={t.h2} />
          {facts?.length ? (
            <Reveal delay={0.1}>
              <p className={`${t.small} mt-6`}>{facts.join("  ·  ")}</p>
            </Reveal>
          ) : null}
          <Reveal delay={0.15}>
            <div className={`${t.lead} mt-10 max-w-xl space-y-6`}>
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          {actions ? (
            <Reveal delay={0.25}>
              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">{actions}</div>
            </Reveal>
          ) : null}
        </div>
      </div>

      <Reveal y={16} className="mt-20 sm:mt-24">
        <div ref={frame} className="overflow-hidden">
          <div
            ref={inner}
            className={`w-full scale-[1.08] ${ratio === "cinema" ? "aspect-[4/5] sm:aspect-[21/9]" : "aspect-[4/5] sm:aspect-[16/9]"}`}
          >
            <MediaImage src={photo.src} alt={photo.alt} aspect="h-full" sizes="100vw" focus={photo.focus} />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
