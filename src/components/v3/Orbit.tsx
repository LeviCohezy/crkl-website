import { useId } from "react";

type OrbitProps = {
  /** Keep it to about eight words; it is spaced out to fill the circle. */
  text: string;
  /** Size and position, e.g. "h-40 w-40 right-10 top-20". */
  className?: string;
};

/**
 * A line of text set on a circle: the one thing on the site that moves in
 * a curve. It turns slowly on its own — a full turn takes over a minute —
 * and its ring is the same hairline as every other accent.
 */
export function Orbit({ text, className = "" }: OrbitProps) {
  const id = `orbit-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div aria-hidden className={`pointer-events-none absolute text-clay ${className}`}>
      <svg viewBox="0 0 200 200" className="orbit-spin h-full w-full overflow-visible motion-reduce:animate-none">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeOpacity="0.32" />
        <text
          className="fill-current font-sans text-[10.5px] uppercase"
          style={{ letterSpacing: "0.3em" }}
          textLength="488"
          lengthAdjust="spacing"
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
    </div>
  );
}
