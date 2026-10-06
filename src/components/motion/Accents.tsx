/**
 * The "find it" accents: hairline geometry placed where you only notice it
 * on the second look. Each section uses at most one.
 *
 * - `Ring`: a thin circle, usually large and half off the edge, sometimes
 *   with one dot sitting on it.
 * - `Square`: a faint outlined square, set slightly off a heading or an
 *   image, like a frame that slipped.
 * - `Eyebrow`: the small-caps label with a short rule and a tiny ring in
 *   front of it.
 * - `Hollow`: an outlined numeral.
 */

type RingProps = {
  /** Tailwind positioning and size, e.g. "-right-24 top-10 h-72 w-72". */
  className: string;
  /** Draw one small dot on the ring, at this angle in degrees. */
  dot?: number;
};

export function Ring({ className, dot }: RingProps) {
  return (
    <span aria-hidden className={`ring pointer-events-none absolute ${className}`}>
      {dot !== undefined ? (
        <span
          className="absolute top-1/2 left-1/2 h-full w-full"
          style={{ transform: `translate(-50%, -50%) rotate(${dot}deg)` }}
        >
          <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay" />
        </span>
      ) : null}
    </span>
  );
}

export function Square({ className }: { className: string }) {
  return <span aria-hidden className={`frame pointer-events-none absolute ${className}`} />;
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden className="flex items-center">
        <span className="h-px w-8 bg-current opacity-50" />
        <span className="ring h-2 w-2 shrink-0" />
      </span>
      <span>{children}</span>
    </p>
  );
}

export function Hollow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span aria-hidden className={`hollow font-display font-light tabular-nums ${className}`}>
      {children}
    </span>
  );
}
