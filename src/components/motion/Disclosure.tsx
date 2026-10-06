"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const;

export type DisclosureItem = { title: string; summary: string; body: string[] };

/**
 * Progressive disclosure: a short line you can read at a glance, and the
 * full paragraphs folded under it. The folded text is always in the page —
 * search engines read it, people open what interests them.
 */
export function Disclosure({ items, tone = "light" }: { items: DisclosureItem[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  const rule = tone === "dark" ? "border-cream/20" : "border-ink/15";
  const muted = tone === "dark" ? "text-cream/70" : "text-ink-soft";

  return (
    <ul className={`border-t ${rule}`}>
      {items.map((item, index) => {
        const active = open === index;
        return (
          <li key={item.title} className={`border-b ${rule}`}>
            <button
              type="button"
              onClick={() => setOpen(active ? null : index)}
              aria-expanded={active}
              aria-controls={`${id}-${index}`}
              className="group grid w-full gap-x-6 py-5 text-left sm:grid-cols-[1fr_auto]"
            >
              <span>
                <span className="font-display block text-2xl leading-snug font-light">{item.title}</span>
                <span className={`mt-1 block text-sm ${muted}`}>{item.summary}</span>
              </span>
              <span aria-hidden className="relative mt-2 block h-3 w-3 justify-self-end">
                <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                <span className={`absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-500 ease-expo ${active ? "scale-y-0" : ""}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {active ? (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: EXPO }}
                  className="overflow-hidden"
                >
                  <div id={`${id}-${index}`} className={`max-w-xl space-y-4 pb-7 leading-relaxed ${muted}`}>
                    {item.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Folded, but present for anyone reading the page source. */
                <div id={`${id}-${index}`} hidden>
                  {item.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/** A row of short use cases, set as hairline pills. */
export function Pills({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="eyebrow border border-ink/25 px-4 py-2.5 tracking-[0.16em]">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** One sentence set apart, between paragraphs. */
export function PullQuote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <blockquote className={`border-l border-clay/60 pl-6 ${className}`}>
      <p className="font-display text-2xl leading-snug font-light italic sm:text-3xl">{children}</p>
    </blockquote>
  );
}

/** Tabs inside a section. Every panel stays in the page; only one shows. */
export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <div>
      <div role="tablist" className="flex gap-8 border-b border-ink/15">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`${id}-panel-${index}`}
            onClick={() => setActive(index)}
            className={`eyebrow relative pb-4 transition-colors duration-500 ${index === active ? "text-ink" : "text-stone hover:text-ink"}`}
          >
            {tab.label}
            {index === active ? (
              <motion.span layoutId={`${id}-marker`} className="absolute inset-x-0 -bottom-px h-px bg-clay" transition={{ duration: 0.6, ease: EXPO }} />
            ) : null}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== active}
          className="pt-8"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
