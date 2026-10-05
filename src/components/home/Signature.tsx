"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLink } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { imageUrl } from "@/lib/media";
import { shoot } from "@/lib/photos";

/** Radius of the window at rest, as a share of the viewport's short side. */
const REST = 0.16;
/** Where the window sits at rest, as a share of viewport height. */
const REST_Y = 0.66;

/**
 * The signature dish, and the one circle on the page.
 *
 * At rest: the brand rose, the word "Signature", and a round window onto the
 * dish. Scrolling opens the window until the photograph is the whole screen
 * and the line about the dish rises over it. The section is pinned for the
 * length of the scene; the window is a single `clip-path` circle driven by
 * one number.
 */
export function Signature() {
  const root = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const picture = useRef<HTMLDivElement>(null);
  const scene = useRef({ open: 0 });

  const paint = () => {
    const el = windowRef.current;
    if (!el) return;
    const { open } = scene.current;
    const { innerWidth: w, innerHeight: h } = window;
    const rest = Math.min(w, h) * REST;
    const full = Math.hypot(w, h) / 2 + 4;
    const radius = rest + (full - rest) * open;
    const centre = h * (REST_Y + (0.5 - REST_Y) * open);
    el.style.clipPath = `circle(${radius.toFixed(1)}px at 50% ${centre.toFixed(1)}px)`;

    // Keep the dish behind the window while it is small, then let the
    // photograph settle back to full frame as it opens.
    if (picture.current) {
      const shift = h * (REST_Y - 0.5) * (1 - open) ** 2;
      const zoom = 1.35 - 0.35 * open;
      picture.current.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(${zoom.toFixed(4)})`;
    }
  };

  useGSAP(
    () => {
      paint();
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onRefresh: paint,
          },
        });

        tl.to(scene.current, { open: 1, duration: 0.6, ease: "power2.inOut", onUpdate: paint }, 0)
          .to("[data-word]", { autoAlpha: 0, scale: 1.08, duration: 0.3 }, 0.05)
          .fromTo("[data-scrim]", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.35)
          .fromTo(
            "[data-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 0.2, stagger: 0.05, ease: "power3.out" },
            0.55,
          )
          .fromTo("[data-after]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.72)
          // Hold the finished frame before the page moves on.
          .to({}, { duration: 0.14 });
      });

      window.addEventListener("resize", paint);
      return () => window.removeEventListener("resize", paint);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="signature-track relative bg-blush text-ink">
      <div className="sticky top-0 flex h-svh min-h-[34rem] items-center justify-center overflow-hidden">
        {/* The word, behind the window. */}
        <div
          data-word
          className="pointer-events-none absolute inset-x-0 top-[17svh] px-6 text-center"
        >
          <p className="eyebrow text-rosewood">Van de chef</p>
          <p
            aria-hidden
            className="font-display mt-5 text-[clamp(3.75rem,13vw,13rem)] leading-[0.9] font-light italic"
          >
            Signature
          </p>
        </div>

        {/* The window onto the dish. */}
        <div
          ref={windowRef}
          className="absolute inset-0"
          style={{ clipPath: "circle(16vmin at 50% 66%)" }}
        >
          <div ref={picture} className="absolute inset-0 will-change-transform">
            <Image
              src={imageUrl(shoot.maart26(12))}
              alt="Langoustine van de grill, voor het roze gordijn"
              fill
              sizes="100vw"
              className="object-cover object-[50%_64%]"
            />
          </div>
          <div data-scrim className="absolute inset-0 bg-ink/55 opacity-0 motion-reduce:hidden" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white motion-reduce:hidden">
            <h2 className="font-display text-[clamp(2.4rem,6.4vw,6.5rem)] leading-[1.04] font-light">
              <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <span data-line className="block">
                  Het signature gerecht
                </span>
              </span>
              <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <span data-line className="block italic">
                  van de chef
                </span>
              </span>
            </h2>
            <div data-after className="invisible mt-10">
              <p className="mx-auto max-w-sm leading-relaxed text-white/90">
                Eén gerecht waar de keuken voor staat — te proeven als extra
                gang bij Menu CRKL+.
              </p>
              <div className="mt-9 flex justify-center">
                <ArrowLink href="#reserveer" tone="light">
                  Proef het — reserveer
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
