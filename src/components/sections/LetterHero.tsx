"use client";

import Image from "next/image";
import { useState } from "react";
import { imageUrl } from "@/lib/media";

/**
 * ONE SWITCH: "white" or "ink" (near-black). Changes the letters, the caption
 * and the column rules together.
 */
const GLYPH: "white" | "ink" = "white";

/**
 * Four columns, one letter each, on the brand pink. At rest the letters are
 * hairline outlines. Hovering a column fills its letter and reveals that
 * column's image, masked so it dissolves into the background top and bottom.
 *
 * Images are referenced straight out of public/images/all/. Swap a filename
 * below to change what a column reveals; a missing file falls back to a blush
 * wash so the interaction still reads.
 */
const columns = [
  {
    letter: "C",
    subject: "food",
    image: "all/CRKL_Maart26©Hablar_Lr-54.jpg",
    alt: "A dish being finished at the table",
    /** Measured off the reference, as a share of viewport height. */
    offset: "md:-translate-y-[14svh]",
  },
  {
    letter: "R",
    subject: "room",
    image: "all/CRKL_dec25©Hablar_lr-1.jpg",
    alt: "The dining room",
    offset: "",
  },
  {
    letter: "K",
    subject: "cocktail",
    image: "all/CRKL_Maart26©Hablar_Lr-69.jpg",
    alt: "A cocktail at the bar",
    offset: "md:-translate-y-[2svh]",
    caption: ["Fine", "Dining"],
  },
  {
    letter: "L",
    subject: "chef",
    image: "all/CRKL_Mei25_LR©HABLAR-59.jpg",
    alt: "The chef in the dining room",
    offset: "md:translate-y-[4svh]",
  },
];

export function LetterHero() {
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  return (
    <section
      className="letter-hero relative isolate bg-blush"
      data-glyph={GLYPH}
    >
      <h1 className="sr-only">CRKL — fine dining</h1>

      <div className="grid h-svh min-h-[34rem] grid-cols-2 md:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column.letter}
            className="letter-col flex items-center justify-center border-r border-b md:border-b-0"
          >
            {/* The column's image, shown clean — nothing layered over it. */}
            {!failed[column.letter] ? (
              <Image
                src={imageUrl(column.image)}
                alt={column.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                onError={() =>
                  setFailed((prev) => ({ ...prev, [column.letter]: true }))
                }
                className="letter-reveal letter-image object-cover"
              />
            ) : (
              /* Only if the file is missing: a wash, so hover still reads. */
              <div
                aria-hidden
                className="letter-reveal wash-reveal absolute inset-0"
              />
            )}

            <div
              className={`relative z-10 flex flex-col items-center ${column.offset}`}
            >
              <span
                aria-hidden
                className="letter-glyph font-display block text-[26vw] leading-[0.8] font-light md:text-[17vw]"
              >
                {column.letter}
              </span>

              {column.caption ? (
                <p
                  aria-hidden
                  className="letter-caption font-display mt-[7svh] text-center text-[clamp(1rem,4vw,3.4rem)] leading-[1.15] font-light tracking-[0.06em] uppercase md:mt-[11svh]"
                >
                  {column.caption.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
