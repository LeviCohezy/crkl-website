"use client";

import { useRef } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Eyebrow, Ring } from "@/components/motion/Accents";
import { Drift } from "@/components/motion/Parallax";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { Band } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

type StatementProps = {
  eyebrow?: string;
  /** "\n" breaks the line, *asterisks* set words in italic. */
  text: string;
  links?: { href: string; label: string }[];
  /** One or two photographs, depending on the variant. */
  photos?: Photo[];
  /**
   * `inset` — the one dark moment on the page, kept to a panel set in from
   *           the edges, with a photograph breaking over its corner
   *           (Tuscany, "fresh, seasonal").
   * `type`  — large type on the pink with two photographs tucked behind
   *           and in front of it (Tastavents).
   * `fade`  — a paragraph that inks in word by word as it crosses the
   *           screen (Pistroa).
   */
  variant?: "inset" | "type" | "fade";
};

/** A single message, large, with nothing competing. */
export function Statement({ eyebrow, text, links, photos = [], variant = "inset" }: StatementProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (variant !== "fade") return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: root.current, start: "top 78%", end: "bottom 50%", scrub: 0.4 },
          },
        );
      });
    },
    { scope: root, dependencies: [variant] },
  );

  const actions = links ? (
    <Reveal delay={0.25} className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
      {links.map((link) => (
        <ArrowLink key={link.href} href={link.href} tone={variant === "inset" ? "light" : "ink"}>
          {link.label}
        </ArrowLink>
      ))}
    </Reveal>
  ) : null;

  /* ── fade ───────────────────────────────────────────────────────────── */
  if (variant === "fade") {
    const [a, b] = photos;
    return (
      <Band tone="tint">
        <div ref={root}>
          {eyebrow ? (
            <Reveal>
              <Eyebrow className="text-ink-soft">{eyebrow}</Eyebrow>
            </Reveal>
          ) : null}
          <p className="font-display mt-8 max-w-5xl text-[clamp(1.9rem,4.2vw,4.1rem)] leading-[1.16] font-light">
            {text.replace(/\n/g, " ").split(" ").map((word, index) => (
              <span key={index} data-word>
                {word.replace(/\*/g, "")}{" "}
              </span>
            ))}
          </p>
          {actions}
          {a || b ? (
            <div className="mt-20 grid grid-cols-12 gap-6">
              {a ? (
                <div className="col-span-7 col-start-2 lg:col-span-5 lg:col-start-3">
                  <Unveil><MediaImage src={a.src} alt={a.alt} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 60vw" focus={a.focus} /></Unveil>
                </div>
              ) : null}
              {b ? (
                <div className="col-span-4 col-start-9 -mt-24 lg:col-span-3 lg:col-start-10">
                  <Drift distance={-30}><Unveil delay={0.2}><MediaImage src={b.src} alt={b.alt} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 24vw, 33vw" focus={b.focus} /></Unveil></Drift>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Band>
    );
  }

  /* ── type ───────────────────────────────────────────────────────────── */
  if (variant === "type") {
    const [a, b] = photos;
    return (
      <Band tone="white">
        <div className="relative mx-auto max-w-5xl py-10 text-center lg:py-20">
          {a ? (
            <Drift distance={30} className="absolute top-0 left-0 hidden w-[34%] lg:-left-16 lg:block lg:w-[30%]">
              <Unveil><MediaImage src={a.src} alt={a.alt} aspect="aspect-[4/3]" sizes="30vw" focus={a.focus} /></Unveil>
            </Drift>
          ) : null}
          <div className="relative z-10 lg:pt-16">
            {eyebrow ? (
              <Reveal>
                <Eyebrow className="justify-center text-ink-soft">{eyebrow}</Eyebrow>
              </Reveal>
            ) : null}
            <SplitText
              text={text}
              className="font-display mt-8 text-[clamp(2.4rem,6vw,6rem)] leading-[1.06] font-light"
            />
            <div className="flex justify-center">{actions}</div>
          </div>
          {b ? (
            <Drift distance={-40} className="absolute right-0 -bottom-6 hidden w-[30%] lg:-right-20 lg:block lg:w-[26%]">
              <Unveil delay={0.2}><MediaImage src={b.src} alt={b.alt} aspect="aspect-[3/4]" sizes="26vw" focus={b.focus} /></Unveil>
            </Drift>
          ) : null}
        </div>
      </Band>
    );
  }

  /* ── inset ──────────────────────────────────────────────────────────── */
  const photo = photos[0];
  return (
    <Band tone="white" bleed className="!py-0">
      <div className="mx-auto max-w-[100rem] px-6 py-24 sm:px-10 sm:py-32 lg:py-40">
        <div className="relative">
          <Ring className="-top-10 -left-6 h-40 w-40" dot={120} />
          <div className="relative grid bg-ink px-6 py-20 text-cream sm:px-12 lg:grid-cols-12 lg:px-20 lg:py-28">
            <div className="lg:col-span-7">
              {eyebrow ? (
                <Reveal>
                  <Eyebrow className="text-blush">{eyebrow}</Eyebrow>
                </Reveal>
              ) : null}
              <SplitText
                text={text}
                className="font-display mt-8 text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[1.06] font-light"
              />
              {actions}
            </div>
            {photo ? (
              <div className="mt-12 lg:col-span-4 lg:col-start-9 lg:-mt-40 lg:-mb-16">
                <Drift distance={-24}>
                  <Unveil delay={0.15}>
                    <MediaImage src={photo.src} alt={photo.alt} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 30vw, 100vw" focus={photo.focus} />
                  </Unveil>
                </Drift>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Band>
  );
}
