"use client";

import { useRef } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { PillLink } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { shoot } from "@/lib/photos";

type Frame = {
  src: string;
  alt: string;
  caption: string;
  /** Sizing for the frame; circles and blocks alternate along the band. */
  frame: string;
  /** Vertical placement inside the band. */
  place: string;
  round?: boolean;
};

const frames: Frame[] = [
  { src: shoot.juni26(8), alt: "Tafels onder het ronde wandpaneel", caption: "De zaal", frame: "w-[66vw] sm:w-[30vw] aspect-[3/4]", place: "self-center" },
  { src: shoot.juli26(54), alt: "Ronde tafel op het okeren tapijt", caption: "Aan tafel", frame: "w-[44vw] sm:w-[19vw] aspect-square", place: "self-start mt-[4svh]", round: true },
  { src: shoot.juli26(18), alt: "Het terras onder de witte luifel", caption: "Het terras", frame: "w-[60vw] sm:w-[25vw] aspect-[4/5]", place: "self-end" },
  { src: shoot.juni25(35), alt: "Cocktail in de zon tegen een witte muur", caption: "Het aperitief", frame: "w-[48vw] sm:w-[21vw] aspect-square", place: "self-center", round: true },
  { src: shoot.dec25(1), alt: "Doorkijk naar een tafel tussen de gordijnen", caption: "Tussen de gordijnen", frame: "w-[66vw] sm:w-[28vw] aspect-[3/4]", place: "self-start" },
  { src: shoot.juni25(19), alt: "Achter de bar, onder de boog", caption: "De bar", frame: "w-[56vw] sm:w-[23vw] aspect-[4/5]", place: "self-end" },
  { src: shoot.mei25(11), alt: "Boeket in de zaal", caption: "Bloemen", frame: "w-[40vw] sm:w-[17vw] aspect-square", place: "self-center", round: true },
  { src: shoot.okt25(1), alt: "De lange tafel in The Room", caption: "The Room", frame: "w-[66vw] sm:w-[29vw] aspect-[3/4]", place: "self-center" },
];

/**
 * The room, sideways. The section pins and the page's vertical scroll is
 * spent moving a band of photographs across the screen — blocks and circles
 * at different heights — while one oversized word drifts the other way
 * behind them. Each picture also slides a little inside its own frame, so
 * the band has depth rather than just travel.
 */
export function GalleryBand() {
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

        gsap.to("[data-ghost]", {
          xPercent: -28,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: () => `+=${distance() + window.innerHeight * 2}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((slide) => {
          gsap.fromTo(
            slide,
            { xPercent: -7 },
            {
              xPercent: 7,
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
    <section ref={root} className="relative overflow-hidden bg-mist">
      <div className="relative flex h-svh min-h-[36rem] flex-col justify-center">
        <p
          data-ghost
          aria-hidden
          className="font-display outline-text pointer-events-none absolute top-1/2 left-[8vw] -translate-y-1/2 text-[34vw] leading-none font-light whitespace-nowrap text-blush/70 italic select-none"
        >
          Sfeer &amp; smaak
        </p>

        {/* Without motion this is an ordinary swipeable row. */}
        <div className="motion-reduce:overflow-x-auto">
          <div
            ref={track}
            className="relative flex h-[72svh] w-max items-stretch gap-[6vw] px-[8vw] will-change-transform sm:gap-[4.5vw]"
          >
            <div className="flex w-[78vw] shrink-0 flex-col justify-center sm:w-[30vw]">
              <p className="eyebrow text-rosewood">Galerij</p>
              <h2 className="font-display mt-6 text-[clamp(2.5rem,5.2vw,5rem)] leading-[1.04] font-light">
                Een zaal in
                <br />
                <em>pastel</em> en cirkels
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
                Achter de strakke gevel wacht een licht, speels interieur:
                gordijnen in twee tinten roze, ronde tafels, zacht licht.
              </p>
            </div>

            {frames.map((frame) => (
              <figure
                key={frame.src}
                className={`shrink-0 ${frame.place}`}
                data-cursor="Sleep"
              >
                <div
                  className={`overflow-hidden ${frame.frame} ${frame.round ? "rounded-full" : ""}`}
                >
                  <div data-slide className="h-full w-full scale-[1.18]">
                    <MediaImage
                      src={frame.src}
                      alt={frame.alt}
                      aspect="h-full"
                      sizes="(min-width: 640px) 30vw, 66vw"
                    />
                  </div>
                </div>
                <figcaption className="eyebrow mt-4 text-stone">
                  {frame.caption}
                </figcaption>
              </figure>
            ))}

            <div className="flex w-[70vw] shrink-0 flex-col items-start justify-center sm:w-[26vw]">
              <p className="font-display text-4xl leading-tight font-light sm:text-5xl">
                Meer zien?
              </p>
              <div className="mt-8">
                <PillLink href="/galerij">Open de galerij</PillLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
