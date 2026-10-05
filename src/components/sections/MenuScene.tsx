"use client";

import { useEffect, useRef, useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/format";
import { menus } from "@/lib/menu";

/**
 * The three menus as a sticky scene: a round photograph holds still on the
 * left and changes with whichever menu is crossing the middle of the screen,
 * while the menus themselves scroll past on the right as tall blocks.
 */
export function MenuScene() {
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    for (const card of cards.current) {
      if (card) observer.observe(card);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[100rem] px-6 sm:px-10 lg:grid lg:grid-cols-12 lg:gap-8">
        {/* ── Sticky plate, desktop only ───────────────────────────────── */}
        <div className="hidden lg:sticky lg:top-0 lg:col-span-5 lg:flex lg:h-svh lg:items-center">
          <div className="relative aspect-square w-full max-w-[32rem]">
            {menus.map((menu, index) => (
              <div
                key={menu.id}
                className={`absolute inset-0 overflow-hidden rounded-full transition-[clip-path,opacity] duration-[1100ms] ease-expo ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  clipPath:
                    index === active
                      ? "circle(50% at 50% 50%)"
                      : "circle(18% at 50% 50%)",
                }}
              >
                <MediaImage
                  src={menu.photo.src}
                  alt={menu.photo.alt}
                  aspect="h-full"
                  sizes="40vw"
                  imageClassName={`transition-transform duration-[1600ms] ease-expo ${
                    index === active ? "scale-100" : "scale-125"
                  }`}
                />
              </div>
            ))}
            <p className="font-display absolute -right-2 -bottom-2 flex h-24 w-24 items-center justify-center rounded-full bg-blush text-2xl font-light text-white tabular-nums">
              {String(active + 1).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* ── The menus ────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 lg:col-start-7">
          {menus.map((menu, index) => (
            <article
              key={menu.id}
              id={menu.id}
              data-index={index}
              ref={(el) => {
                cards.current[index] = el;
              }}
              className="flex min-h-[90svh] flex-col justify-center border-b border-ink/15 py-20 last:border-b-0"
            >
              <Reveal className="lg:hidden">
                <MediaImage
                  src={menu.photo.src}
                  alt={menu.photo.alt}
                  aspect="aspect-square"
                  className="mb-10 w-2/3 rounded-full"
                  sizes="66vw"
                />
              </Reveal>

              <Reveal>
                <p className="eyebrow text-rosewood">
                  {menu.service} · {menu.when}
                </p>
                <h2 className="font-display mt-5 text-[clamp(2.75rem,6vw,5.5rem)] leading-[1] font-light">
                  {menu.name}
                </h2>
                <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
                  {menu.intro}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="mt-10">
                  {menu.options.map((option) => (
                    <div
                      key={option.label}
                      className="flex items-baseline gap-4 border-t border-ink/15 py-5"
                    >
                      <dt className="font-display text-2xl font-light sm:text-3xl">
                        {option.label}
                        {option.note ? (
                          <span className="mt-1 block font-sans text-sm text-stone">
                            {option.note}
                          </span>
                        ) : null}
                      </dt>
                      <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-ink/30" />
                      <dd className="font-display text-2xl font-light tabular-nums sm:text-3xl">
                        {formatPrice(option.priceCents)}
                      </dd>
                    </div>
                  ))}
                </dl>

                {menu.extras.length > 0 ? (
                  <ul className="border-t border-ink/15 pt-5 text-sm">
                    {menu.extras.map((extra) => (
                      <li key={extra.label} className="flex items-baseline gap-4 py-1.5 text-ink-soft">
                        <span>{extra.label}</span>
                        <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-ink/20" />
                        <span className="whitespace-nowrap tabular-nums text-ink">
                          {extra.priceCents === null
                            ? ""
                            : `${extra.supplement ? "+ " : ""}${formatPrice(extra.priceCents)}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
