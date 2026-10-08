"use client";

import { useRef, type ReactNode } from "react";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Word = { text: string; italic: boolean; key: number };

/** Break a paragraph into words; *asterisks* open and close an italic run. */
function parse(text: string): Word[][] {
  let key = 0;
  let slanted = false;
  return text.split("\n").map((line) =>
    line.split(" ").map((raw) => {
      if (raw.startsWith("*")) slanted = true;
      const italic = slanted;
      if (/\*[.,;:!?]?$/.test(raw)) slanted = false;
      return { text: raw.replace(/\*/g, ""), italic, key: key++ };
    }),
  );
}

type StatementProps = {
  /** "\n" breaks the line, *asterisks* set words in italic. */
  text: string;
  size?: "huge" | "big" | "h2";
  as?: "h2" | "p";
  tone?: Tone;
  id?: string;
  align?: "left" | "center" | "right";
  /** Reading-size copy or links under the statement. */
  children?: ReactNode;
  className?: string;
};

/**
 * A whole section that is one sentence. The words are on the page from the
 * start, faint, and ink in one after another as the sentence crosses the
 * middle of the screen — so you read it at the speed you scroll.
 */
export function Statement({
  text,
  size = "big",
  as: Tag = "p",
  tone = "white",
  id,
  align = "left",
  children,
  className = "",
}: StatementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lines = parse(text);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const words = ref.current?.querySelectorAll("[data-word]");
        if (!words?.length) return;
        gsap.set(words, { opacity: 0.14 });
        gsap.to(words, {
          opacity: 1,
          ease: "none",
          stagger: 0.6,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            end: "bottom 42%",
            scrub: 0.5,
          },
        });
      });
    },
    { scope: ref },
  );

  const sizes = { huge: t.huge, big: t.big, h2: t.h2 };
  const aligns = {
    left: "",
    center: "mx-auto text-center",
    right: "ml-auto text-right",
  };
  // `ch` is read against the heading's own size, so the measure scales with it.
  const measure = size === "h2" ? "max-w-[34ch]" : "max-w-[21ch]";

  return (
    <Section tone={tone} id={id} className={className}>
      <div ref={ref} className={align === "center" ? "text-center" : align === "right" ? "text-right" : ""}>
        {/* The words stay real text: only their opacity moves. */}
        <Tag className={`${sizes[size]} ${measure} ${aligns[align]}`}>
          {lines.map((line, index) => (
            <span key={index} className="block">
              {line.map((word) => (
                <span key={word.key} data-word className={`inline-block ${word.italic ? "italic" : ""}`}>
                  {word.text}
                  {" "}
                </span>
              ))}
            </span>
          ))}
        </Tag>
      </div>
      {children ? <div className={`mt-16 sm:mt-20 ${aligns[align]}`}>{children}</div> : null}
    </Section>
  );
}
