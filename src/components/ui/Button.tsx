import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/shell/PageTransition";

type Tone = "ink" | "light";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <path d="M3 12h18M14 5l7 7-7 7" />
    </svg>
  );
}

const line: Record<Tone, string> = {
  /** On the light rose backgrounds. */
  ink: "border-line-strong text-ink hover:border-blush",
  /** On the brand pink and over photography. */
  light: "border-white/55 text-white hover:border-white",
};

const solid: Record<Tone, string> = {
  /** Pink, filling to a deeper pink from the left on hover. */
  ink: "sweep bg-blush text-ink [--sweep:var(--color-line-strong)]",
  /** Frosted white, over photography. */
  light: "sweep glass-dark text-white [--sweep:rgb(255_255_255/0.22)]",
};

const lineBase =
  "group eyebrow inline-flex items-center gap-4 border-b pb-3 transition-colors duration-500";
const solidBase =
  "group eyebrow inline-flex h-14 items-center gap-5 px-9 transition-colors duration-500";

type LinkProps = {
  href: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

function Anchor({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);

  return (
    <Magnetic strength={0.3}>
      {external ? (
        <a
          href={href}
          className={className}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {children}
          <Arrow />
        </a>
      ) : (
        <TransitionLink href={href} className={className}>
          {children}
          <Arrow />
        </TransitionLink>
      )}
    </Magnetic>
  );
}

/**
 * The site's everyday link: small capitals on a hairline, with an arrow that
 * steps forward on hover. It leans slightly towards the pointer. Internal
 * links get the page transition; external ones are ordinary anchors.
 */
export function ArrowLink({ href, tone = "ink", className = "", children }: LinkProps) {
  return (
    <Anchor href={href} className={`${lineBase} ${line[tone]} ${className}`}>
      {children}
    </Anchor>
  );
}

/** The one filled button per view — reserving a table, mostly. */
export function SolidLink({ href, tone = "ink", className = "", children }: LinkProps) {
  return (
    <Anchor href={href} className={`${solidBase} ${solid[tone]} ${className}`}>
      {children}
    </Anchor>
  );
}

/** `outlined`: a hairline button inside a second, slipped hairline. */
export function SolidButton({
  tone = "ink",
  outlined = false,
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { tone?: Tone; outlined?: boolean }) {
  return (
    <Magnetic strength={0.2}>
      <button
        {...props}
        className={`${solidBase} ${
          outlined
            ? "sweep border border-blush text-ink outline outline-1 outline-offset-4 outline-blush/50 [--sweep:var(--color-blush)]"
            : solid[tone]
        } disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {children}
        <Arrow />
      </button>
    </Magnetic>
  );
}
