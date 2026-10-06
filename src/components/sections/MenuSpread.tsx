"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Hollow, Square } from "@/components/motion/Accents";
import { formatPrice } from "@/lib/format";
import { menu, type MenuGroup } from "@/lib/menu";
import { imageUrl } from "@/lib/media";
import { shoot, type Photo } from "@/lib/photos";
import { site } from "@/lib/site";

const SWEEP = [0.76, 0, 0.24, 1] as const;

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

/** How far a swipe has to travel, or how fast, before it turns the page. */
const SWIPE = { distance: 60, velocity: 400 };

/**
 * The menu as a book you leaf through sideways.
 *
 * Each spread is two halves — the menu and a photograph. On a swipe (or an
 * arrow key, a wheel flick, the arrows, the page numbers) the left half
 * slides up and out while the right half slides down and out, and the next
 * spread arrives the same way with its halves on the other sides: where the
 * menu was, a photograph now is. Turning back runs it in reverse.
 *
 * Only transforms animate, each half is one layer, and the photographs are
 * fetched ahead of time, so the turn stays smooth on a phone.
 */
export function MenuSpread() {
  const [[page, direction], setPage] = useState([0, 1]);
  const root = useRef<HTMLElement>(null);
  const inView = useRef(false);
  const wheelLock = useRef(0);
  const total = spreads.length;
  const spread = spreads[page];
  // Even pages: menu left, photo right. Odd pages: swapped.
  const flipped = page % 2 === 1;

  const go = useCallback(
    (delta: number) => {
      setPage(([current]) => [(current + delta + total) % total, delta > 0 ? 1 : -1]);
    },
    [total],
  );

  // Arrow keys turn the page while the spread is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.intersectionRatio > 0.5;
      },
      { threshold: [0.5] },
    );
    observer.observe(el);

    const onKey = (event: KeyboardEvent) => {
      if (!inView.current) return;
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);

    // Fetch every photograph once, so no turn waits on the network.
    for (const photo of photos) {
      const img = new window.Image();
      img.src = imageUrl(photo.src);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.x) < Math.abs(offset.y)) return;
    if (offset.x < -SWIPE.distance || velocity.x < -SWIPE.velocity) go(1);
    else if (offset.x > SWIPE.distance || velocity.x > SWIPE.velocity) go(-1);
  };

  // A sideways flick on a trackpad turns the page too, once per flick.
  const onWheel = (event: React.WheelEvent) => {
    if (Math.abs(event.deltaX) < 30 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    const now = Date.now();
    if (now - wheelLock.current < 900) return;
    wheelLock.current = now;
    go(event.deltaX > 0 ? 1 : -1);
  };

  /** The left half rises, the right half sinks. Reversed when going back. */
  const column = (side: "left" | "right") => {
    const sign = side === "left" ? -1 : 1;
    return {
      enter: (dir: number) => ({ y: `${-sign * dir * 100}%` }),
      center: { y: "0%" },
      exit: (dir: number) => ({ y: `${sign * dir * 100}%` }),
    };
  };

  const menuPanel = (
    <div className="flex h-full flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
      <p className="eyebrow text-ink-soft">
        {spread.service} · {spread.when}
      </p>
      <Hollow className="mt-8 text-6xl lg:text-7xl">{String(page + 1).padStart(2, "0")}</Hollow>
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
      <dl className="mt-8 max-w-xl">
        {spread.group.lines.map((line) => (
          <div key={line.label} className="flex items-baseline gap-4 py-3">
            <dt className="eyebrow tracking-[0.18em]">
              {line.label}
              {line.note ? <span className="ml-2 font-normal tracking-normal text-stone normal-case">{line.note}</span> : null}
            </dt>
            <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-ink/35" />
            <dd className="font-display text-xl font-light whitespace-nowrap tabular-nums">
              {line.supplement ? "+ " : ""}
              {formatPrice(line.priceCents)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  const photoPanel = (
    <div className="relative h-full p-6 sm:p-10 lg:p-16">
      <div className="relative h-full">
        <Square className={`top-5 h-full w-full ${flipped ? "-left-5" : "-right-5"}`} />
        <div className="relative h-full overflow-hidden bg-petal">
          <Image
            src={imageUrl(spread.photo.src)}
            alt={spread.photo.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={page === 0}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );

  const [leftContent, rightContent] = flipped ? [photoPanel, menuPanel] : [menuPanel, photoPanel];

  return (
    <section
      ref={root}
      id="kaart"
      aria-roledescription="carousel"
      aria-label="Het menu, per formule"
      className="relative scroll-mt-20 overflow-hidden bg-mist text-ink"
      onWheel={onWheel}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.06}
        onDragEnd={onDragEnd}
        className="grid min-h-svh cursor-grab grid-rows-[38svh_1fr] active:cursor-grabbing lg:grid-cols-2 lg:grid-rows-none"
      >
        {(["left", "right"] as const).map((side) => (
          <div
            key={side}
            className={`relative overflow-hidden ${
              (side === "left") === !flipped ? "bg-mist" : "bg-petal"
            } ${side === "left" ? "order-2 lg:order-1" : "order-1 lg:order-2"}`}
          >
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={page}
                custom={direction}
                variants={column(side)}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.95, ease: SWEEP }}
                className="absolute inset-0 will-change-transform"
              >
                {side === "left" ? leftContent : rightContent}
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* ── Chrome: phone, arrows, page numbers ──────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 pb-6 sm:px-10">
        <p className="eyebrow hidden text-ink-soft tabular-nums sm:block">
          Reserveren ·{" "}
          <a href={`tel:${site.contact.phoneHref}`} className="pointer-events-auto link-line text-ink">
            {site.contact.phone}
          </a>
        </p>
        <div className="pointer-events-auto flex items-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Vorige"
            className="ring flex h-11 w-11 items-center justify-center bg-cream/80 transition-transform duration-500 ease-expo hover:scale-105"
          >
            ←
          </button>
          <ol className="flex items-center gap-4">
            {spreads.map((item, index) => (
              <li key={item.group.name}>
                <button
                  type="button"
                  onClick={() => setPage([index, index > page ? 1 : -1])}
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
            onClick={() => go(1)}
            aria-label="Volgende"
            className="ring flex h-11 w-11 items-center justify-center bg-cream/80 transition-transform duration-500 ease-expo hover:scale-105"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
