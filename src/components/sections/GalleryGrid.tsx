"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLenis } from "@/lib/lenis";
import { imageUrl } from "@/lib/media";
import { gallery, galleryCategories, type GalleryCategory } from "@/lib/photos";

const EXPO = [0.16, 1, 0.3, 1] as const;

type Filter = GalleryCategory | "alles";

/**
 * The gallery: a wall of blocks with a circle every few frames, filtered by
 * subject. Tiles rearrange themselves when the filter changes, and a tile
 * grows into the lightbox rather than being replaced by it — the thumbnail
 * and the enlargement share one layout id.
 */
export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("alles");
  const [open, setOpen] = useState<string | null>(null);

  const visible = useMemo(
    () => gallery.filter((photo) => filter === "alles" || photo.category === filter),
    [filter],
  );
  const current = visible.findIndex((photo) => photo.src === open);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (current < 0) return;
      const next = (current + direction + visible.length) % visible.length;
      setOpen(visible[next].src);
    },
    [current, visible],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    getLenis()?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [open, step]);

  const filters: { id: Filter; label: string }[] = [
    { id: "alles", label: "Alles" },
    ...galleryCategories,
  ];

  return (
    <section className="bg-mist pt-16 pb-28 sm:pb-40">
      <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
        <div role="tablist" aria-label="Filter de galerij" className="flex flex-wrap gap-2">
          {filters.map((item) => {
            const selected = item.id === filter;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(item.id)}
                className={`eyebrow relative h-11 rounded-full px-6 transition-colors duration-500 ${
                  selected ? "text-cream" : "text-ink hover:text-rosewood"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: 0.7, ease: EXPO }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full border border-ink/20" />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((photo, index) => (
              <motion.li
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.86 }}
                transition={{ duration: 0.8, ease: EXPO, delay: Math.min(index, 12) * 0.03 }}
                className="flex items-center"
              >
                <button
                  type="button"
                  onClick={() => setOpen(photo.src)}
                  data-cursor="Bekijk"
                  aria-label={`Vergroot: ${photo.alt}`}
                  className="group block w-full"
                >
                  <motion.div
                    layoutId={`photo-${photo.src}`}
                    className={`relative overflow-hidden bg-petal ${
                      photo.shape === "circle" ? "aspect-square" : "aspect-[4/5]"
                    }`}
                    style={{ borderRadius: photo.shape === "circle" ? 9999 : 0 }}
                    transition={{ duration: 0.9, ease: EXPO }}
                  >
                    <Image
                      src={imageUrl(photo.src)}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                      className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-105"
                    />
                  </motion.div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && current >= 0 ? (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal
            aria-label={visible[current].alt}
            className="fixed inset-0 z-[75] flex items-center justify-center p-4 sm:p-10"
            onClick={() => setOpen(null)}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-blush"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.97 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              layoutId={`photo-${open}`}
              className="relative aspect-[2/3] h-full max-h-[86svh] max-w-full overflow-hidden"
              style={{ borderRadius: 0 }}
              transition={{ duration: 0.9, ease: EXPO }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={imageUrl(open)}
                alt={visible[current].alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-white sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="max-w-[60%] text-sm">{visible[current].alt}</p>
              <p className="font-display text-xl font-light tabular-nums">
                {String(current + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </p>
            </motion.div>

            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                aria-label={direction === 1 ? "Volgende foto" : "Vorige foto"}
                onClick={(event) => {
                  event.stopPropagation();
                  step(direction);
                }}
                className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink transition-transform duration-500 ease-expo hover:scale-110 ${
                  direction === 1 ? "right-3 sm:right-8" : "left-3 sm:left-8"
                }`}
              >
                {direction === 1 ? "→" : "←"}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="eyebrow absolute top-5 right-5 flex h-12 items-center rounded-full bg-cream/90 px-6 text-ink sm:top-8 sm:right-8"
            >
              Sluit
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
