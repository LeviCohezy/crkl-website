"use client";

import { useRef } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { MediaImage } from "@/components/media/MediaImage";
import { Unveil } from "@/components/motion/Reveal";
import { Band, Head, type Tone } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

type CinematicProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  intro?: string;
  /** The picture that opens from the centre. */
  feature: Photo;
  /** A silent loop instead of the picture; the picture is its poster. */
  video?: string;
  /** Two lines set over the opened picture. */
  lines: [string, string];
  /** The pictures under it. */
  photos: Photo[];
  captions?: string[];
  link?: { href: string; label: string };
};

/**
 * A cinematic reveal: the section pins while a full-width picture opens
 * from a thin slit at its centre to the whole screen, with two lines of
 * type arriving over it. Then the gallery follows, as a row.
 */
export function Cinematic({ tone = "white", eyebrow, title, intro, feature, video, lines, photos, captions, link }: CinematicProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-stage]",
            start: "top top",
            end: "+=1500",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });
        tl.fromTo("[data-frame]", { clipPath: "inset(46% 8% 46% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.inOut" }, 0)
          .fromTo("[data-picture]", { scale: 1.3 }, { scale: 1, duration: 0.7, ease: "power2.inOut" }, 0)
          .fromTo("[data-word]", { yPercent: 110 }, { yPercent: 0, duration: 0.2, stagger: 0.06, ease: "power3.out" }, 0.55)
          .to({}, { duration: 0.2 });
      });
    },
    { scope: root },
  );

  return (
    <Band tone={tone} bleed className="!py-0">
      <section ref={root}>
        <div className="mx-auto max-w-[100rem] px-7 pt-32 pb-16 sm:px-10 sm:pt-36 lg:pt-44">
          <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} aside={link ? <ArrowLink href={link.href}>{link.label}</ArrowLink> : undefined} />
        </div>

        <div data-stage className="relative h-svh overflow-hidden">
          <div data-frame className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: "inset(46% 8% 46% 8%)" }}>
            <div data-picture className="absolute inset-0 will-change-transform">
              {video ? (
                <BackgroundVideo src={video} poster={feature.src} />
              ) : (
                <MediaImage src={feature.src} alt={feature.alt} aspect="h-full" sizes="100vw" focus={feature.focus} />
              )}
              <div aria-hidden className="absolute inset-0 bg-ink/25" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
            <p className="font-display text-[clamp(2.2rem,6.5vw,7rem)] leading-[1.06] font-light">
              {lines.map((line, index) => (
                <span key={line} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                  <span data-word className={`block ${index === 1 ? "italic" : ""}`}>
                    {line}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {photos.slice(0, 4).map((photo, index) => (
            <li key={photo.src} className="relative">
              <Unveil delay={index * 0.08}>
                <MediaImage src={photo.src} alt={photo.alt} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 25vw, 50vw" focus={photo.focus} />
              </Unveil>
              {captions?.[index] ? (
                <p className="eyebrow pointer-events-none absolute bottom-6 left-6 text-white drop-shadow">{captions[index]}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </Band>
  );
}
