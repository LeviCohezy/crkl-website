import type { ElementType, ReactNode } from "react";
import { wrap } from "@/components/v3/type";

/**
 * Soft white carries the site; "blush" is the one other background — a
 * soft rose, light enough to keep the page airy — and appears once on a
 * page. Petal is the faintest tint, for a band of small print.
 */
export type Tone = "white" | "blush" | "petal";

export const tones: Record<Tone, string> = {
  white: "bg-cream text-ink",
  blush: "bg-rose text-ink",
  petal: "bg-petal text-ink",
};

type SectionProps = {
  tone?: Tone;
  id?: string;
  as?: ElementType;
  /** No gutters: the children reach both edges of the screen. */
  bleed?: boolean;
  /** No vertical rhythm of its own — for scenes that set their own height. */
  flush?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * One section of a page. The space between sections is the design: a lot
 * of it on a desktop, and still plenty on a phone.
 */
export function Section({
  tone = "white",
  id,
  as: Tag = "section",
  bleed = false,
  flush = false,
  className = "",
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`relative scroll-mt-28 ${tones[tone]} ${
        flush ? "" : "py-32 sm:py-40 lg:py-56"
      } ${className}`}
    >
      {bleed ? children : <div className={wrap}>{children}</div>}
    </Tag>
  );
}
