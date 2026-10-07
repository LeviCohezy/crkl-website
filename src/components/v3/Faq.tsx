"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SplitText } from "@/components/motion/Reveal";
import type { FaqItem } from "@/components/sections/Faq";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Questions on hairlines, one open at a time. The answers are in the page
 * for search engines whether or not they are unfolded.
 */
export function Faq({ items, tone = "white", title = "Goed om\n*te weten*" }: { items: FaqItem[]; tone?: Tone; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone={tone}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SplitText text={title} className={t.h2} />
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
                    className="flex w-full items-baseline justify-between gap-8 py-7 text-left"
                  >
                    <span className={t.h3}>{item.question}</span>
                    <span aria-hidden className="relative mt-3 block h-3 w-3 shrink-0">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-clay" />
                      <span
                        className={`absolute inset-y-0 left-1/2 w-px bg-clay transition-transform duration-500 ease-expo ${
                          active ? "scale-y-0" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                {/* Closed answers stay in the page, folded to no height. */}
                <motion.div
                  id={`faq-${index}`}
                  aria-hidden={!active}
                  initial={false}
                  animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: EXPO }}
                  className="overflow-hidden"
                >
                  <p className={`${t.body} max-w-xl pb-9`}>{item.answer}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
