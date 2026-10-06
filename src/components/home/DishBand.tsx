"use client";

import { useRef } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { ArrowLink } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { dishes } from "@/lib/photos";

/** Width, ratio and height in the band for each frame, in turn. */
const frames = [
  "w-[64vw] sm:w-[26vw] aspect-[4/5] self-center",
  "w-[50vw] sm:w-[19vw] aspect-[3/4] self-start",
  "w-[64vw] sm:w-[24vw] aspect-[4/5] self-end",
  "w-[56vw] sm:w-[21vw] aspect-[3/4] self-center",
];

/**
 * The dishes, sideways. The section pins and the page's vertical scroll is
 * spent moving a row of photographs across the screen, hung at different
 * heights like pictures on a wall. Each one also slides a little inside its
 * own frame, so the row has depth rather than just travel.
 */
export function DishBand() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const band = track.current;
      if (!band) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const distance = () => band.scrollWidth - window.innerWidth;

        const travel = gsap.to(band, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((slide) => {
          gsap.fromTo(
            slide,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: travel,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-cream text-ink">
      <div className="flex h-svh min-h-[36rem] flex-col justify-center">
        {/* Without motion this is an ordinary swipeable row. */}
        <div className="motion-reduce:overflow-x-auto">
          <div
            ref={track}
            className="flex h-[70svh] w-max items-stretch gap-[6vw] px-6 will-change-transform sm:gap-[5vw] sm:px-10"
          >
            <div className="flex w-[78vw] shrink-0 flex-col justify-center sm:w-[30vw]">
              <p className="eyebrow text-stone">Gerechten</p>
              <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.06] font-light">
                Wat het seizoen
                <br />
                <em>aanreikt</em>
              </h2>
              <p className="mt-7 max-w-sm text-lg leading-relaxed text-ink-soft">
                Dagverse ingrediënten en een creatieve, moderne visie op
                gastronomie. Het menu wisselt mee met wat op zijn best is.
              </p>
            </div>

            {dishes.map((dish, index) => (
              <div
                key={dish.src}
                className={`shrink-0 overflow-hidden rounded-2xl ${frames[index % frames.length]}`}
              >
                <div data-slide className="h-full w-full scale-[1.16]">
                  <MediaImage
                    src={dish.src}
                    alt={dish.alt}
                    aspect="h-full"
                    sizes="(min-width: 640px) 26vw, 64vw"
                  />
                </div>
              </div>
            ))}

            <div className="flex w-[72vw] shrink-0 flex-col items-start justify-center sm:w-[26vw]">
              <p className="font-display text-4xl leading-tight font-light sm:text-5xl">
                En wat staat er <em>nu</em> op?
              </p>
              <div className="mt-9">
                <ArrowLink href="/menu">Ontdek de gerechten op het menu</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
