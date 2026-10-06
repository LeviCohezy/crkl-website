"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Square } from "@/components/motion/Accents";
import { Band, Head } from "@/components/sections/Band";

const EXPO = [0.16, 1, 0.3, 1] as const;

export type FaqItem = { question: string; answer: string };

/**
 * Questions on hairlines. One answer is open at a time; it unfolds to its
 * own height rather than snapping.
 */
export function Faq({ title = "Goed om te *weten*", items }: { title?: string; items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Band tone="white">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-4">
          <Square className="-top-10 -left-8 h-40 w-40 hidden lg:block" />
          <Head eyebrow="Veelgestelde vragen" title={title} />
        </div>

        <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
          {items.map((item, index) => {
            const active = open === index;
            return (
              <li key={item.question} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(active ? null : index)}
                    aria-expanded={active}
                    aria-controls={`faq-${index}`}
                    className="group flex w-full items-baseline justify-between gap-8 py-7 text-left"
                  >
                    <span className="font-display text-2xl leading-snug font-light sm:text-[1.75rem]">
                      {item.question}
                    </span>
                    <span aria-hidden className="relative block h-3 w-3 shrink-0">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-blush" />
                      <span
                        className={`absolute inset-y-0 left-1/2 w-px bg-blush transition-transform duration-500 ease-expo ${
                          active ? "scale-y-0" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {active ? (
                    <motion.div
                      id={`faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-8 text-lg leading-relaxed text-ink-soft">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Band>
  );
}
