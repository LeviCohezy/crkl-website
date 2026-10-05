"use client";

import { useRef } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Drift, Parallax } from "@/components/motion/Parallax";
import { Reveal, Unveil } from "@/components/motion/Reveal";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

/** crkl.eu, word for word. */
const statement =
  "CRKL is een gastronomisch restaurant in Roeselare waar verfijning en beleving centraal staan. In een stijlvolle en rustige setting creëren we een totaalervaring waarbij smaak, service en sfeer samenkomen.";

const facts = [
  { label: "Keuken", value: "Modern & creatief" },
  { label: "Menu", value: "Vier of vijf gangen" },
  { label: "Gastheer & gastvrouw", value: site.hosts },
  { label: "Erkend door", value: "Michelin · Gault&Millau" },
];

/**
 * The house in two sentences. The words start as a faint impression and ink
 * in one by one as the paragraph crosses the screen, flanked by a round
 * photograph and a block that drift at their own speeds.
 */
export function Manifest() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: {
              trigger: "[data-statement]",
              start: "top 82%",
              end: "bottom 48%",
              scrub: 0.4,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-mist py-28 sm:py-40">
      <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow text-rosewood">Het huis</p>
            </Reveal>
            <p
              data-statement
              className="font-display mt-8 text-[clamp(1.9rem,4.1vw,4rem)] leading-[1.14] font-light text-ink"
            >
              {statement.split(" ").map((word, index) => (
                <span key={index} data-word>
                  {word}{" "}
                </span>
              ))}
            </p>
          </div>

          {/* A circle and a block, overlapping, each on its own clock. */}
          <div className="relative lg:col-span-4">
            <Drift distance={50} className="ml-auto w-[62%] lg:w-[84%]">
              <Unveil shape="circle" className="rounded-full">
                <Parallax className="aspect-square rounded-full">
                  <MediaImage
                    src={shoot.jan26(17)}
                    alt="Ronde tafel voor het koperen cirkelpaneel in de zaal"
                    aspect="h-full"
                    sizes="(min-width: 1024px) 28vw, 62vw"
                  />
                </Parallax>
              </Unveil>
            </Drift>
            <Drift distance={-40} className="-mt-[22%] w-[46%] lg:w-[58%]">
              <Unveil delay={0.15}>
                <MediaImage
                  src={shoot.juli26(65)}
                  alt="Glazen en het CRKL-servet in het zonlicht"
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 19vw, 46vw"
                />
              </Unveil>
            </Drift>
          </div>
        </div>

        <dl className="mt-24 grid gap-x-8 gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 0.08}>
              <dt className="eyebrow text-stone">{fact.label}</dt>
              <dd className="font-display mt-3 text-2xl font-light sm:text-[1.75rem]">
                {fact.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
