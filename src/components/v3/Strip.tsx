"use client";

import { useRef } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { MediaImage } from "@/components/media/MediaImage";
import { SplitText } from "@/components/motion/Reveal";
import { TextLink } from "@/components/v3/Links";
import { type as t, wrap } from "@/components/v3/type";
import { tones, type Tone } from "@/components/v3/Section";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

export type StripItem =
  | {
      kind: "photo";
      photo: Photo;
      caption?: string;
      /** Frame size in the row. */
      size?: "s" | "m" | "l";
      /** Where the frame hangs. */
      hang?: "top" | "middle" | "bottom";
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      caption?: string;
      hang?: "top" | "middle" | "bottom";
    }
  | {
      kind: "text";
      title: string;
      body: string;
      link?: { href: string; label: string };
    };

/** Frame heights as a share of the row; the width follows from the ratio. */
const sizes = {
  s: "h-[76%] aspect-[3/4]",
  m: "h-full aspect-[4/5]",
  l: "h-[84%] aspect-[4/3]",
};

const hangs = { top: "justify-start", middle: "justify-center", bottom: "justify-end" };

type StripProps = {
  items: StripItem[];
  tone?: Tone;
  id?: string;
  /** Set above the row, in the page's gutters. */
  title?: string;
  intro?: string;
};

/**
 * A row that scrolls sideways: the section pins and the page's vertical
 * scroll is spent moving photographs — and the odd paragraph — across the
 * screen, hung at different heights. Nothing else moves. Without motion,
 * or on a phone, it is a row you swipe.
 */
export function Strip({ items, tone = "white", id, title, intro }: StripProps) {
  const root = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const band = row.current;
      if (!band) return;
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 640px)`, () => {
        const distance = () => band.scrollWidth - window.innerWidth;
        gsap.to(band, {
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
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id={id} className={`relative scroll-mt-28 ${tones[tone]}`}>
      {/* The title pins with the row, so the two are on screen together. */}
      <div data-stage className="flex flex-col justify-center gap-12 py-32 sm:h-svh sm:min-h-[40rem] sm:gap-12 sm:py-0 sm:pt-16">
        {title ? (
          <div className={wrap}>
            <SplitText text={title} className={`${t.h2} max-w-3xl`} />
            {intro ? <p className={`${t.lead} mt-6 max-w-md`}>{intro}</p> : null}
          </div>
        ) : null}

        <div className="max-sm:overflow-x-auto max-sm:[scrollbar-width:none] motion-reduce:overflow-x-auto">
          <div
            ref={row}
            className={`flex w-max items-stretch gap-[6vw] px-6 will-change-transform sm:gap-[4.5vw] sm:px-10 lg:px-16 ${
              title ? "h-[50svh] min-h-[24rem]" : "h-[66svh] min-h-[30rem]"
            }`}
          >
            {items.map((item, index) => {
              if (item.kind === "text") {
                return (
                  <div key={index} className="flex w-[78vw] shrink-0 flex-col justify-center sm:w-[28vw] sm:min-w-[22rem]">
                    <h3 className={t.h2}>{item.title}</h3>
                    <p className={`${t.body} mt-6 max-w-sm`}>{item.body}</p>
                    {item.link ? (
                      <div className="mt-8">
                        <TextLink href={item.link.href}>{item.link.label}</TextLink>
                      </div>
                    ) : null}
                  </div>
                );
              }
              const hang = hangs[item.hang ?? "middle"];
              const frame = item.kind === "photo" ? sizes[item.size ?? "m"] : sizes.m;
              return (
                <figure key={index} className={`flex h-full shrink-0 flex-col ${hang}`}>
                  <div className={`relative overflow-hidden ${frame}`}>
                    <div className="absolute inset-0">
                      {item.kind === "photo" ? (
                        <MediaImage
                          src={item.photo.src}
                          alt={item.photo.alt}
                          aspect="h-full"
                          sizes="(min-width: 640px) 40vw, 85vw"
                          focus={item.photo.focus}
                        />
                      ) : (
                        <BackgroundVideo src={item.src} poster={item.poster} />
                      )}
                    </div>
                  </div>
                  {item.caption ? <figcaption className={`${t.small} mt-4`}>{item.caption}</figcaption> : null}
                </figure>
              );
            })}
            <div className="w-[8vw] shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
