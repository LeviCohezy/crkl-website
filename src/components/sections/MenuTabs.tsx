"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Hollow, Square } from "@/components/motion/Accents";
import { formatPrice } from "@/lib/format";
import { menu, type MenuGroup, type MenuTab } from "@/lib/menu";
import { shoot, type Photo } from "@/lib/photos";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** The photograph beside each tab, and which side it sits on. */
const sides: Record<MenuTab["id"], { photo: Photo; flip: boolean }> = {
  lunch: { photo: { src: shoot.mei25(22), alt: "Witte asperge met citroen en dille" }, flip: false },
  diner: { photo: { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" }, flip: true },
  dranken: { photo: { src: shoot.juni25(6), alt: "De sommelier proeft een glas witte wijn" }, flip: false },
};

/** One menu: an outlined number, its dishes if they are known, what it costs. */
export function MenuGroupList({ group, index }: { group: MenuGroup; index: number }) {
  return (
    <div>
      <Hollow className="text-6xl">{String(index + 1).padStart(2, "0")}</Hollow>
      <h3 className="font-display mt-4 text-[clamp(1.9rem,3.2vw,2.9rem)] leading-tight font-light">
        {group.name}
      </h3>
      {group.intro ? (
        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{group.intro}</p>
      ) : null}

      {group.courses.length > 0 ? (
        <ul className="mt-8 space-y-5">
          {group.courses.map((course) => (
            <li key={course.name}>
              <p className="eyebrow tracking-[0.2em]">{course.name}</p>
              <p className="mt-1 text-sm text-ink-soft">
                {course.line}
                {course.allergens?.length ? (
                  <span className="eyebrow ml-3 text-stone">{course.allergens.join(" · ")}</span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="mt-8">
        {group.lines.map((line) => (
          <div key={line.label} className="flex items-baseline gap-4 py-3">
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
}

/**
 * The menu itself, in three tabs. Each tab is a spread: a photograph in a
 * thin frame that sits slightly off it on one side, the numbered menus with
 * dotted leaders on the other (Blanquette). The sides swap from tab to tab.
 */
export function MenuTabs() {
  const [active, setActive] = useState<MenuTab["id"]>("lunch");
  const tab = menu.find((item) => item.id === active) ?? menu[0];
  const side = sides[tab.id];

  return (
    <div>
      <div role="tablist" aria-label="Menu" className="flex gap-10 border-b border-line">
        {menu.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={`font-display relative pb-5 text-3xl font-light transition-colors duration-500 sm:text-4xl ${
                selected ? "text-ink" : "text-stone hover:text-ink"
              }`}
            >
              {item.label}
              {selected ? (
                <motion.span
                  layoutId="menu-tab"
                  className="absolute inset-x-0 -bottom-px h-px bg-blush"
                  transition={{ duration: 0.7, ease: EXPO }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: EXPO }}
          className="grid gap-14 pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-20"
        >
          <div className={`relative lg:col-span-5 ${side.flip ? "lg:order-2 lg:col-start-8" : ""}`}>
            <Square className={`top-6 h-full w-full ${side.flip ? "-right-6" : "-left-6"}`} />
            <MediaImage
              src={side.photo.src}
              alt={side.photo.alt}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className={`lg:col-span-6 ${side.flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
            <p className="eyebrow text-ink-soft">{tab.when}</p>
            <div className="mt-10 space-y-16">
              {tab.groups.map((group, index) => (
                <MenuGroupList key={group.name} group={group} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
