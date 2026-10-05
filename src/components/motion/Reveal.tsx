"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Distance travelled, in pixels. */
  y?: number;
  className?: string;
};

/** Fades and lifts its children into place the first time they are seen. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, delay, ease: EXPO }}
    >
      {children}
    </motion.div>
  );
}

type SplitTextProps = {
  /** Use "\n" for a line break and *asterisks* for an italic word. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on mount instead of waiting for the viewport. */
  immediate?: boolean;
  /** With `immediate`: hold the words back until this turns true. */
  ready?: boolean;
};

/**
 * A heading whose words rise out of their own baseline, one after another.
 * Each word sits in a clipped box, so nothing is visible until it moves.
 */
export function SplitText({
  text,
  as = "h2",
  className = "",
  delay = 0,
  immediate = false,
  ready = true,
}: SplitTextProps) {
  const Tag = motion[as];
  const lines = text.split("\n");
  let index = 0;

  const state = immediate
    ? { animate: ready ? ("shown" as const) : ("hidden" as const) }
    : {
        whileInView: "shown" as const,
        viewport: { once: true, margin: "0px 0px -10% 0px" },
      };

  return (
    <Tag className={className} initial="hidden" {...state} aria-label={text.replace(/[*\n]/g, " ")}>
      {lines.map((line, l) => (
        <span key={l} aria-hidden className="block">
          {line.split(" ").map((raw, w) => {
            const italic = /^\*.*\*[.,]?$/.test(raw);
            const word = raw.replace(/\*/g, "");
            const order = index++;
            return (
              <span
                key={w}
                className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom"
              >
                <motion.span
                  className={`inline-block ${italic ? "italic" : ""}`}
                  variants={{
                    hidden: { y: "115%" },
                    shown: {
                      y: "0%",
                      transition: {
                        duration: 1.15,
                        delay: delay + order * 0.055,
                        ease: EXPO,
                      },
                    },
                  }}
                >
                  {word}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

type UnveilProps = {
  children: ReactNode;
  /** `circle` opens from the centre, `block` wipes up from the bottom edge. */
  shape?: "block" | "circle";
  delay?: number;
  className?: string;
};

/**
 * Uncovers an image the first time it is seen, while the picture inside
 * settles back from a slight zoom — the frame opens, the photograph lands.
 *
 * The clip lives on an inner element on purpose: browsers count an element's
 * own `clip-path` when deciding whether it is on screen, so a fully clipped
 * frame would never report itself visible and never open.
 */
export function Unveil({
  children,
  shape = "block",
  delay = 0,
  className = "",
}: UnveilProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const hidden =
    shape === "circle" ? "circle(0% at 50% 50%)" : "inset(100% 0% 0% 0%)";
  const shown =
    shape === "circle" ? "circle(75% at 50% 50%)" : "inset(0% 0% 0% 0%)";

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full"
        initial={{ clipPath: hidden }}
        animate={{ clipPath: seen ? shown : hidden }}
        transition={{ duration: 1.5, delay, ease: EXPO }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.25 }}
          animate={{ scale: seen ? 1 : 1.25 }}
          transition={{ duration: 1.9, delay, ease: EXPO }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
