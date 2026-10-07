"use client";

import { useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/shell/PageTransition";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import type { Photo } from "@/lib/photos";

export type Row = {
  href: string;
  title: string;
  line: string;
  photo: Photo;
};

type IndexRowsProps = {
  rows: Row[];
  tone?: Tone;
  id?: string;
  title?: string;
  intro?: string;
};

/**
 * An index: each entry is a row on a hairline with its name set large. On
 * wide screens one photograph stands still at the right of the list and
 * changes with the row you are on; on a phone each row carries its own,
 * small.
 */
export function IndexRows({ rows, tone = "white", id, title, intro }: IndexRowsProps) {
  const [active, setActive] = useState(0);

  return (
    <Section tone={tone} id={id}>
      {title ? (
        <div className="mb-16 flex flex-col gap-8 sm:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <SplitText text={title} className={`${t.h2} max-w-3xl`} />
          {intro ? (
            <Reveal>
              <p className={`${t.lead} max-w-md`}>{intro}</p>
            </Reveal>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <ul className="border-t border-line lg:col-span-8">
          {rows.map((row, index) => (
            <li key={row.href} className="border-b border-line">
              <TransitionLink
                href={row.href}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 py-8 sm:py-10 lg:py-12"
              >
                <h3 className={`${t.big} transition-colors duration-500 group-hover:text-ink-soft`}>{row.title}</h3>
                <span className="row-span-2 flex items-center gap-6">
                  <MediaImage
                    src={row.photo.src}
                    alt=""
                    aspect="aspect-[4/5]"
                    className="w-20 sm:w-28 lg:hidden"
                    sizes="112px"
                    focus={row.photo.focus}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="hidden h-6 w-6 transition-transform duration-700 ease-expo group-hover:translate-x-2 lg:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    aria-hidden
                  >
                    <path d="M3 12h18M14 5l7 7-7 7" />
                  </svg>
                </span>
                <p className={`${t.body} col-start-1 row-start-2 mt-3`}>{row.line}</p>
              </TransitionLink>
            </li>
          ))}
        </ul>

        {/* One still photograph, crossfading with the row — wide screens only. */}
        <div aria-hidden className="relative hidden aspect-[4/5] lg:col-span-3 lg:col-start-10 lg:block">
          {rows.map((row, index) => (
            <div
              key={row.href}
              className={`absolute inset-0 transition-opacity duration-700 ${active === index ? "opacity-100" : "opacity-0"}`}
            >
              <MediaImage src={row.photo.src} alt="" aspect="h-full" sizes="25vw" focus={row.photo.focus} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
