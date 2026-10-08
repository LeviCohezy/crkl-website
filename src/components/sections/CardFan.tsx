"use client";

import { useRef } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Band, Head, type Tone } from "@/components/sections/Band";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

export type FanCard = { title: string; body: string; detail?: string; photo: Photo };

type CardFanProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  intro?: string;
  cards: FanCard[];
};

/**
 * Three cards that start as one stack and fan out as the page scrolls — a
 * hand of cards laid on the table. The section pins for the length of the
 * move; without motion the cards simply sit side by side.
 */
export function CardFan({ tone = "white", eyebrow, title, intro, cards }: CardFanProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-card]");
        const spread = 36; // vw between neighbours when fanned
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-stage]",
            start: "top top+=80",
            end: "+=1400",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        items.forEach((card, index) => {
          const offset = index - (items.length - 1) / 2;
          tl.fromTo(
            card,
            { xPercent: -50, x: 0, rotate: 0, y: index * 10, scale: 1 - (items.length - 1 - index) * 0.03 },
            {
              x: `${offset * spread}vw`,
              rotate: offset * 5,
              y: Math.abs(offset) * 28,
              scale: 1,
              ease: "power2.inOut",
              duration: 1,
            },
            0,
          );
        });
        tl.to({}, { duration: 0.35 });
      });
    },
    { scope: root },
  );

  return (
    <Band tone={tone} bleed className="!py-0">
      <section ref={root}>
        <div className="mx-auto max-w-[100rem] px-7 pt-32 sm:px-10 sm:pt-36 lg:pt-44">
          <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} align="center" />
        </div>

        <div data-stage className="relative mx-auto max-w-[100rem] px-7 pt-20 pb-32 sm:px-10 sm:pt-16 sm:pb-24 lg:h-svh lg:pt-20 lg:pb-0">
          <ul className="grid gap-12 md:grid-cols-3 md:gap-8 lg:block">
            {cards.map((card, index) => (
              <li
                key={card.title}
                data-card
                className=" bg-cream p-4 shadow-[0_30px_80px_-40px_rgb(42_28_26/0.3)] lg:absolute lg:top-24 lg:left-1/2 lg:w-[22rem] lg:origin-bottom lg:will-change-transform"
                style={{ zIndex: index }}
              >
                <MediaImage src={card.photo.src} alt={card.photo.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 22rem, 100vw" focus={card.photo.focus} />
                <div className="px-2 pt-6 pb-3">
                  <p className="eyebrow text-ink-soft tabular-nums">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="font-display mt-3 text-3xl leading-tight font-light">{card.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{card.body}</p>
                  {card.detail ? <p className="mt-3 text-sm leading-relaxed text-stone">{card.detail}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </section>
    </Band>
  );
}
