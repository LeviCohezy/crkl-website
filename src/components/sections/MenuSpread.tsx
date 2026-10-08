"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Hollow, Square } from "@/components/motion/Accents";
import { formatPrice } from "@/lib/format";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { menu, type MenuGroup } from "@/lib/menu";
import { imageUrl } from "@/lib/media";
import { shoot, type Photo } from "@/lib/photos";
import { site } from "@/lib/site";

/** One spread per menu: its service, the menu, and the photograph beside it. */
type Spread = { service: string; when: string; group: MenuGroup; photo: Photo };

const photos: Photo[] = [
  { src: shoot.mei25(22), alt: "Witte asperge met citroen en dille" },
  { src: shoot.mei25(31), alt: "Kleurrijk voorgerecht in het zonlicht" },
  { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" },
  { src: shoot.juni25(6), alt: "De sommelier proeft een glas witte wijn" },
  { src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht" },
];

const spreads: Spread[] = menu.flatMap((tab) =>
  tab.groups.map((group) => ({ service: tab.label, when: tab.when, group, photo: photos[0] })),
).map((spread, index) => ({ ...spread, photo: photos[index % photos.length] }));

const total = spreads.length;

/** How much of the viewport's height one page turn costs in scroll. */
const STEP = 0.9;

/**
 * The left half of a spread leaves upwards and the right half downwards, so
 * the next spread's halves arrive from the opposite edges: where the left
 * one rose out, the next rises in from below; where the right one sank
 * out, the next sinks in from above.
 */
const away = (side: "left" | "right") => (side === "left" ? -100 : 100);

/**
 * The menu as a book you leaf through by scrolling.
 *
 * The section pins for a few screens' worth of scroll, and that scroll is
 * spent turning the pages: each spread is two halves — the menu and a
 * photograph — and as you scroll down, the left half slides up and out
 * while the right half slides down and out, with the next spread's halves
 * following them in. Scrolling back up runs it in reverse. Every spread
 * swaps its halves: where the menu was, a photograph now is.
 *
 * Only transforms animate and every half is its own layer, so the turn
 * stays smooth on a phone. Without motion the spreads stack one under the
 * other, as plain pages.
 */
export function MenuSpread() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [page, setPage] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOTION_OK);
    const update = () => setStill(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (still) return;
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const panel = (side: "left" | "right", index: number) =>
          el.querySelector<HTMLElement>(`[data-side="${side}"][data-page="${index}"]`);

        const tl = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * STEP * (total - 1))}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setPage(Math.round(self.progress * (total - 1))),
          },
        });
        trigger.current = tl.scrollTrigger ?? null;

        // The first spread sits in place; the others wait beyond the edges.
        // `y: 0` clears the inline placeholder transform, which GSAP would
        // otherwise read as pixels and keep underneath its own percentage.
        for (let i = 1; i < total; i++) {
          gsap.set(panel("left", i), { y: 0, yPercent: -away("left") });
          gsap.set(panel("right", i), { y: 0, yPercent: -away("right") });
        }

        // One turn per step: the current halves leave, the next ones arrive.
        for (let i = 0; i < total - 1; i++) {
          for (const side of ["left", "right"] as const) {
            tl.to(panel(side, i), { yPercent: away(side) }, i);
            tl.to(panel(side, i + 1), { yPercent: 0 }, i);
          }
        }

        return () => {
          trigger.current = null;
        };
      });
    },
    { scope: root, dependencies: [still] },
  );

  /** Scroll to the point where that spread is fully in place. */
  const goTo = (index: number) => {
    const st = trigger.current;
    const target = Math.max(0, Math.min(total - 1, index));
    if (!st) {
      document.getElementById(`kaart-${target}`)?.scrollIntoView({ block: "start" });
      return;
    }
    const y = st.start + ((st.end - st.start) * target) / (total - 1);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const menuPanel = (spread: Spread, index: number) => (
    <div className="flex h-full flex-col justify-start px-7 pt-10 pb-28 sm:justify-center sm:px-12 sm:py-16 lg:px-20">
      <p className="eyebrow text-ink-soft">
        {spread.service} · {spread.when}
      </p>
      <Hollow className="mt-5 text-5xl sm:mt-8 sm:text-6xl lg:text-7xl">{String(index + 1).padStart(2, "0")}</Hollow>
      <h3 className="font-display mt-4 text-[clamp(2rem,3.4vw,3.25rem)] leading-tight font-light">
        {spread.group.name}
      </h3>
      {spread.group.intro ? (
        <p className="mt-4 max-w-md leading-relaxed text-ink-soft">{spread.group.intro}</p>
      ) : null}
      {spread.group.courses.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {spread.group.courses.map((course) => (
            <li key={course.name}>
              <p className="eyebrow tracking-[0.2em]">{course.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{course.line}</p>
            </li>
          ))}
        </ul>
      ) : null}
      <dl className="mt-6 max-w-xl sm:mt-8">
        {spread.group.lines.map((line) => (
          <div key={line.label} className="flex items-baseline gap-4 py-2.5 sm:py-3">
            <dt className="eyebrow tracking-[0.18em]">
              {line.label}
              {line.note ? <span className="ml-2 font-normal tracking-normal text-stone normal-case">{line.note}</span> : null}
            </dt>
            <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-line-strong" />
            <dd className="font-display text-xl font-light whitespace-nowrap tabular-nums">
              {line.supplement ? "+ " : ""}
              {formatPrice(line.priceCents)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  const photoPanel = (spread: Spread, index: number, flipped: boolean) => (
    <div className="relative h-full p-6 sm:p-10 lg:p-16">
      <div className="relative h-full">
        <Square className={`top-5 h-full w-full ${flipped ? "-left-5" : "-right-5"}`} />
        <div className="relative h-full overflow-hidden bg-petal">
          <Image
            src={imageUrl(spread.photo.src)}
            alt={spread.photo.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={index === 0}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );

  /**
   * Even pages: menu left, photo right. Odd pages swap them — on desktop.
   * A phone stacks the columns, photograph on top, and keeps that on every
   * page: the swapped halves are rendered for `lg` only.
   */
  type Half = { content: ReactNode; className: string };
  const halves = (spread: Spread, index: number): Record<"left" | "right", Half[]> => {
    const flipped = index % 2 === 1;
    const menuHalf = { content: menuPanel(spread, index), className: "bg-mist" };
    const photoHalf = { content: photoPanel(spread, index, flipped), className: "bg-petal" };
    if (!flipped) return { left: [menuHalf], right: [photoHalf] };
    return {
      left: [
        { ...menuHalf, className: `${menuHalf.className} lg:hidden` },
        { ...photoHalf, className: `${photoHalf.className} hidden lg:block` },
      ],
      right: [
        { ...photoHalf, className: `${photoHalf.className} lg:hidden` },
        { ...menuHalf, className: `${menuHalf.className} hidden lg:block` },
      ],
    };
  };

  const render = (list: Half[]) =>
    list.map((half, i) => (
      <div key={i} className={`h-full ${half.className}`}>
        {half.content}
      </div>
    ));

  const columnOrder = (side: "left" | "right") => (side === "left" ? "order-2 lg:order-1" : "order-1 lg:order-2");
  const stage = "grid min-h-svh grid-rows-[28svh_1fr] sm:grid-rows-[42svh_1fr] lg:grid-cols-2 lg:grid-rows-none";

  // Without motion: every spread its own page, one under the other.
  if (still) {
    return (
      <section id="kaart" aria-label="Het menu, per formule" className="scroll-mt-20 bg-mist text-ink">
        {spreads.map((spread, index) => {
          const { left, right } = halves(spread, index);
          return (
            <div key={spread.group.name} id={`kaart-${index}`} className={stage}>
              <div className={columnOrder("left")}>{render(left)}</div>
              <div className={columnOrder("right")}>{render(right)}</div>
            </div>
          );
        })}
      </section>
    );
  }

  return (
    <section
      ref={root}
      id="kaart"
      aria-roledescription="carousel"
      aria-label="Het menu, per formule"
      className="relative scroll-mt-20 overflow-hidden bg-mist text-ink"
    >
      <div className={`${stage} h-svh`}>
        {(["left", "right"] as const).map((side) => (
          <div key={side} className={`relative overflow-hidden ${columnOrder(side)}`}>
            {spreads.map((spread, index) => (
              <div
                key={spread.group.name}
                data-side={side}
                data-page={index}
                aria-hidden={index !== page ? "true" : undefined}
                className="absolute inset-0 overflow-hidden will-change-transform"
                // Before the scene starts, the first spread shows and the rest wait off-stage.
                style={index === 0 ? undefined : { transform: `translateY(${-away(side)}%)` }}
              >
                {render(halves(spread, index)[side])}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── Chrome: phone, arrows, page numbers. On phones the scroll alone turns the pages. ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden items-end justify-between px-7 pb-7 sm:flex sm:px-10 sm:pb-6">
        <p className="eyebrow hidden text-ink-soft tabular-nums sm:block">
          Reserveren ·{" "}
          <a href={`tel:${site.contact.phoneHref}`} className="pointer-events-auto link-line text-ink">
            {site.contact.phone}
          </a>
        </p>
        <div className="pointer-events-auto flex items-center gap-6">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            aria-label="Vorige"
            className="frame glass flex h-11 w-11 items-center justify-center transition-transform duration-500 ease-expo hover:scale-105"
          >
            ←
          </button>
          <ol className="flex items-center gap-4">
            {spreads.map((item, index) => (
              <li key={item.group.name}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${item.group.name}, pagina ${index + 1}`}
                  aria-current={index === page ? "true" : undefined}
                  className={`font-display pb-1 text-lg tabular-nums transition-colors duration-500 ${
                    index === page ? "border-b border-clay text-ink" : "text-stone hover:text-ink"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            aria-label="Volgende"
            className="frame glass flex h-11 w-11 items-center justify-center transition-transform duration-500 ease-expo hover:scale-105"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
