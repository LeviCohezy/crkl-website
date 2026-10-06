"use client";

import { useRef } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Band, Head, type Tone } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

/** Width, ratio and height in the band for each frame, in turn. */
const frames = [
  "w-[64vw] sm:w-[26vw] aspect-[4/5] self-center",
  "w-[50vw] sm:w-[19vw] aspect-[3/4] self-start",
  "w-[64vw] sm:w-[24vw] aspect-[4/5] self-end",
  "w-[56vw] sm:w-[21vw] aspect-[3/4] self-center",
];

type PinBandProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  intro?: string;
  photos: Photo[];
  captions?: string[];
  link?: { href: string; label: string };
};

/**
 * A gallery that scrolls sideways. The section pins and the page's
 * vertical scroll is spent moving a row of photographs across the screen,
 * hung at different heights; each one also slides a little inside its own
 * frame. Without motion it is an ordinary swipeable row.
 */
export function PinBand({ tone = "white", eyebrow, title, intro, photos, captions, link }: PinBandProps) {
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
            trigger: "[data-stage]",
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
            { xPercent: 6, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: travel, start: "left right", end: "right left", scrub: true } },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <Band tone={tone} bleed className="!py-0">
      <section ref={root}>
        <div className="mx-auto max-w-[100rem] px-6 pt-24 sm:px-10 sm:pt-36 lg:pt-44">
          <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} aside={link ? <ArrowLink href={link.href}>{link.label}</ArrowLink> : undefined} />
        </div>
        <div data-stage className="flex h-svh min-h-[34rem] flex-col justify-center">
          <div className="motion-reduce:overflow-x-auto">
            <div ref={track} className="flex h-[66svh] w-max items-stretch gap-[6vw] px-6 will-change-transform sm:gap-[5vw] sm:px-10">
              {photos.map((photo, index) => (
                <figure key={photo.src} className={`shrink-0 ${frames[index % frames.length]}`}>
                  <div className="h-full w-full overflow-hidden rounded-2xl">
                    <div data-slide className="h-full w-full scale-[1.16]">
                      <MediaImage src={photo.src} alt={photo.alt} aspect="h-full" sizes="(min-width: 640px) 26vw, 64vw" focus={photo.focus} />
                    </div>
                  </div>
                  {captions?.[index] ? <figcaption className="eyebrow mt-4 text-ink-soft">{captions[index]}</figcaption> : null}
                </figure>
              ))}
              <div className="w-[10vw] shrink-0" />
            </div>
          </div>
        </div>
      </section>
    </Band>
  );
}
