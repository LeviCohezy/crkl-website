"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Band, Head, tones, type Tone } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type TimelineProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  steps: { title: string; body: string }[];
  last: { title: string; href: string; label: string };
};

/**
 * The day as a line that draws itself: one hairline runs down the page and
 * lengthens as you scroll, and each moment lights up as the line reaches
 * it. The last moment is the next thing to do.
 */
export function Timeline({ tone = "white", eyebrow, title, steps, last }: TimelineProps) {
  const root = useRef<HTMLElement>(null);
  const t = tones[tone];
  const all = [...steps, { title: last.title, body: "" }];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-line]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-list]", start: "top 70%", end: "bottom 60%", scrub: 0.4 } },
        );
        gsap.utils.toArray<HTMLElement>("[data-moment]").forEach((moment) => {
          gsap.fromTo(
            moment.querySelector("[data-dot]"),
            { scale: 0.4, opacity: 0.4 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out", scrollTrigger: { trigger: moment, start: "top 65%", once: true } },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <Band tone={tone}>
      <section ref={root}>
        <Head tone={tone} eyebrow={eyebrow} title={title} align="center" />
        <ol data-list className="relative mx-auto mt-20 max-w-3xl">
          <span aria-hidden className={`absolute top-0 bottom-0 left-6 border-l sm:left-1/2 ${t.rule}`} />
          <span data-line aria-hidden className="absolute top-0 bottom-0 left-6 w-px origin-top bg-blush sm:left-1/2" />
          {all.map((step, index) => {
            const left = index % 2 === 0;
            const isLast = index === all.length - 1;
            return (
              <li key={step.title} data-moment className="relative grid gap-4 py-10 pl-16 sm:grid-cols-2 sm:pl-0">
                <span data-dot className={`ring absolute top-10 left-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center font-display text-lg tabular-nums sm:left-1/2 ${tone === "tint" ? "bg-petal" : "bg-mist"}`}>
                  {index + 1}
                </span>
                <Reveal className={`${left ? "sm:pr-16 sm:text-right" : "sm:col-start-2 sm:pl-16"}`}>
                  <h3 className={`font-display text-3xl font-light ${isLast ? "italic" : ""}`}>{step.title}</h3>
                  {step.body ? <p className={`mt-3 leading-relaxed ${t.muted}`}>{step.body}</p> : null}
                  {isLast ? (
                    <div className={`mt-6 ${left ? "sm:flex sm:justify-end" : ""}`}>
                      <ArrowLink href={last.href}>{last.label}</ArrowLink>
                    </div>
                  ) : null}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>
    </Band>
  );
}
