"use client";

import Image from "next/image";
import { useRef } from "react";
import { RotatingBadge } from "@/components/motion/RotatingBadge";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/lib/intro";
import { imageUrl, videoUrl } from "@/lib/media";
import { shoot } from "@/lib/photos";
import { heroMedia, site } from "@/lib/site";
import { playMuted } from "@/lib/video";

/**
 * Four columns, one letter each. Swap a photograph here to change what a
 * column reveals on hover.
 */
const columns = [
  {
    letter: "C",
    image: shoot.maart26(54),
    alt: "Saus wordt aan tafel bij het gerecht geschonken",
    /** Measured off the reference, as a share of viewport height. */
    offset: "md:-translate-y-[14svh]",
  },
  {
    letter: "R",
    image: shoot.dec25(1),
    alt: "De zaal, gezien tussen de gordijnen",
    offset: "",
  },
  {
    letter: "K",
    image: shoot.maart26(69),
    alt: "Een cocktail op de bar",
    offset: "md:-translate-y-[2svh]",
  },
  {
    letter: "L",
    image: shoot.mei25(59),
    alt: "Chef Sam in de zaal",
    offset: "md:translate-y-[4svh]",
  },
];

const headline = ["Waar verfijning", "en beleving", "centraal staan"];

/** Porthole radius at rest, as a share of the viewport's short side. */
const REST = 0.085;
/** Where the porthole sits at rest, as a share of viewport height. */
const REST_Y = 0.84;

/**
 * The opening scene, pinned for three screens.
 *
 * At rest: the brand pink, four hairline letters that fill and reveal a
 * photograph on hover, and a small round window onto the kitchen at the
 * bottom of the screen. Scrolling opens that window until it is the whole
 * viewport — three films side by side — and the house line rises over it.
 *
 * The window is one `clip-path` circle whose radius and centre are driven by
 * two numbers: `intro` (the entrance, after the curtain lifts) and `open`
 * (the scroll). Everything else in the scene is plain transforms.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const porthole = useRef<HTMLDivElement>(null);
  const films = useRef<HTMLDivElement>(null);
  const scene = useRef({ intro: 0, open: 0 });
  const introDone = useIntroDone();

  const paint = () => {
    const el = porthole.current;
    if (!el) return;
    const { intro, open } = scene.current;
    const { innerWidth: w, innerHeight: h } = window;
    const rest = Math.min(w, h) * REST * intro;
    const full = Math.hypot(w, h) / 2 + 4;
    const radius = rest + (full - rest) * open;
    const centre = h * (REST_Y + (0.5 - REST_Y) * open);
    el.style.clipPath = `circle(${radius.toFixed(1)}px at 50% ${centre.toFixed(1)}px)`;

    // Keep the middle of the films behind the window while it is small, and
    // let them settle back to full frame as it opens.
    if (films.current) {
      const shift = h * (REST_Y - 0.5) * (1 - open) ** 2;
      const zoom = 1.3 - 0.3 * open;
      films.current.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(${zoom.toFixed(4)})`;
    }
  };

  // The scroll scene.
  useGSAP(
    () => {
      const videos = gsap.utils.toArray<HTMLVideoElement>("video", root.current);
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

        tl.to(scene.current, { open: 1, duration: 0.56, ease: "power2.inOut", onUpdate: paint }, 0)
          .to("[data-meta]", { autoAlpha: 0, duration: 0.1 }, 0)
          .to("[data-badge]", { autoAlpha: 0, scale: 1.5, duration: 0.14 }, 0)
          .to("[data-letters]", { scale: 1.14, duration: 0.5 }, 0)
          .to("[data-letters]", { autoAlpha: 0, duration: 0.2 }, 0.3)
          .fromTo("[data-scrim]", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.3)
          .fromTo(
            "[data-line]",
            { yPercent: 115 },
            { yPercent: 0, duration: 0.2, stagger: 0.045, ease: "power3.out" },
            0.5,
          )
          .fromTo("[data-sub]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.68)
          // Hold the finished frame before the page moves on.
          .to({}, { duration: 0.14 });

        // Three films are only worth decoding while the scene is on screen.
        const observer = new IntersectionObserver(([entry]) => {
          for (const video of videos) {
            if (entry.isIntersecting) playMuted(video);
            else video.pause();
          }
        });
        if (root.current) observer.observe(root.current);

        return () => {
          observer.disconnect();
          for (const video of videos) video.pause();
        };
      });

      window.addEventListener("resize", paint);
      return () => window.removeEventListener("resize", paint);
    },
    { scope: root },
  );

  // The entrance, once the curtain has lifted.
  useGSAP(
    () => {
      if (!introDone) return;

      if (!window.matchMedia(MOTION_OK).matches) {
        scene.current.intro = 1;
        paint();
        gsap.set("[data-rise], [data-meta]", { autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        "[data-rise]",
        { autoAlpha: 0, yPercent: 28 },
        { autoAlpha: 1, yPercent: 0, duration: 1.7, stagger: 0.11, ease: "expo.out", delay: 0.15 },
      );
      gsap.to(scene.current, {
        intro: 1,
        duration: 1.6,
        delay: 0.55,
        ease: "expo.out",
        onUpdate: paint,
      });
      gsap.fromTo(
        "[data-meta], [data-badge]",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.2, delay: 1.1, ease: "power2.out" },
      );
    },
    { scope: root, dependencies: [introDone] },
  );

  return (
    <section ref={root} className="hero-track relative bg-blush">
      <h1 className="sr-only">
        {site.name} — {site.tagline}
      </h1>

      <div className="sticky top-0 h-svh min-h-[34rem] overflow-hidden bg-blush">
        {/* ── The letters ──────────────────────────────────────────────── */}
        <div data-letters className="grid h-full grid-cols-2 md:grid-cols-4">
          {columns.map((column) => (
            <div
              key={column.letter}
              className="letter-col flex items-center justify-center border-r border-b last:border-r-0 md:border-b-0"
            >
              <Image
                src={imageUrl(column.image)}
                alt={column.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="letter-reveal letter-image object-cover"
              />
              <span
                data-rise
                aria-hidden
                className={`invisible relative z-10 block ${column.offset}`}
              >
                <span className="letter-glyph font-display block text-[26vw] leading-[0.8] font-light md:text-[17vw]">
                  {column.letter}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* ── The window onto the kitchen ──────────────────────────────── */}
        <div
          ref={porthole}
          className="pointer-events-none absolute inset-0 z-20"
          style={{ clipPath: "circle(0px at 50% 84%)" }}
        >
          <div ref={films} className="absolute inset-0 grid will-change-transform md:grid-cols-3">
            {heroMedia.map((film, index) => (
              <video
                key={film.video}
                // On a phone one portrait film fills the screen by itself.
                className={`h-full w-full object-cover ${index === 1 ? "" : "hidden md:block"}`}
                src={videoUrl(film.video)}
                poster={imageUrl(film.poster)}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
                tabIndex={-1}
              />
            ))}
          </div>
          <div data-scrim className="absolute inset-0 bg-ink/40 opacity-0" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white motion-reduce:hidden">
            <p className="font-display text-[clamp(2.6rem,8.2vw,8rem)] leading-[1.02] font-light">
              {headline.map((line, index) => (
                <span key={line} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                  <span data-line className={`block ${index === 1 ? "italic" : ""}`}>
                    {line}
                  </span>
                </span>
              ))}
            </p>
            <p data-sub className="eyebrow invisible mt-10 text-white/85">
              Lunch &amp; diner · {site.contact.city.replace(/^\d+\s/, "")}
            </p>
          </div>
        </div>

        {/* ── Ring of type around the window ───────────────────────────── */}
        <div
          data-badge
          className="pointer-events-none invisible absolute top-[84%] left-1/2 z-30 h-[30vmin] w-[30vmin] -translate-x-1/2 -translate-y-1/2 text-white motion-reduce:hidden"
        >
          <RotatingBadge text="Scroll · Ontdek" className="h-full w-full" />
        </div>

        <p
          data-meta
          className="eyebrow invisible absolute bottom-6 left-6 z-10 hidden text-white sm:block"
        >
          Gastronomisch restaurant
        </p>
        <p
          data-meta
          className="eyebrow invisible absolute right-6 bottom-6 z-10 hidden text-white sm:block"
        >
          Roeselare · West-Vlaanderen
        </p>
      </div>
    </section>
  );
}
