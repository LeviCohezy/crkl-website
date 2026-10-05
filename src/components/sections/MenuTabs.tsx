"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { menu, type MenuGroup, type MenuTab } from "@/lib/menu";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** One menu: its dishes if they are known, then what it costs. */
export function MenuGroupList({ group }: { group: MenuGroup }) {
  return (
    <div>
      <h3 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-tight font-light">
        {group.name}
      </h3>
      {group.intro ? (
        <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">{group.intro}</p>
      ) : null}

      {group.courses.length > 0 ? (
        <ul className="mt-8 space-y-5">
          {group.courses.map((course) => (
            <li key={course.name}>
              <p className="font-display text-2xl font-light">{course.name}</p>
              <p className="mt-1 text-sm text-ink-soft">
                {course.line}
                {course.allergens?.length ? (
                  <span className="eyebrow ml-3 text-stone">
                    {course.allergens.join(" · ")}
                  </span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="mt-8 border-t border-ink/15">
        {group.lines.map((line) => (
          <div
            key={line.label}
            className="flex items-baseline gap-4 border-b border-ink/15 py-4"
          >
            <dt>
              {line.label}
              {line.note ? <span className="ml-2 text-sm text-stone">{line.note}</span> : null}
            </dt>
            <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-ink/25" />
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
 * The menu itself, in three tabs. The marker under the active tab slides to
 * the next one, and the panels cross over rather than cut.
 */
export function MenuTabs() {
  const [active, setActive] = useState<MenuTab["id"]>("lunch");
  const tab = menu.find((item) => item.id === active) ?? menu[0];

  return (
    <div>
      <div role="tablist" aria-label="Menu" className="flex gap-10 border-b border-ink/15">
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
                  className="absolute inset-x-0 -bottom-px h-px bg-ink"
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
          className="pt-10"
        >
          <p className="eyebrow text-clay">{tab.when}</p>
          <div className="mt-12 grid gap-x-16 gap-y-16 lg:grid-cols-2">
            {tab.groups.map((group) => (
              <MenuGroupList key={group.name} group={group} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
