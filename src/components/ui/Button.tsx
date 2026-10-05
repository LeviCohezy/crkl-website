import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/shell/PageTransition";

type Tone = "ink" | "light" | "solid";

const tones: Record<Tone, { pill: string; disc: string }> = {
  /** Dark hairline on the light rose backgrounds. */
  ink: {
    pill: "border-ink/30 text-ink hover:border-ink",
    disc: "bg-ink text-cream",
  },
  /** White hairline on the brand pink and over photography. */
  light: {
    pill: "border-white/60 text-white hover:border-white",
    disc: "bg-white text-ink",
  },
  solid: {
    pill: "border-ink bg-ink text-cream",
    disc: "bg-cream text-ink",
  },
};

const pill =
  "group inline-flex items-center gap-4 rounded-full border py-2 pr-2 pl-6 text-[0.6875rem] font-medium tracking-[0.22em] uppercase transition-colors duration-500";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Inner({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-expo group-hover:scale-110 ${tones[tone].disc}`}
      >
        <Arrow />
      </span>
    </>
  );
}

type PillLinkProps = {
  href: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

/**
 * The site's call to action: a hairline pill that ends in a filled disc, and
 * leans towards the pointer. Internal links get the page transition; external
 * ones open as ordinary anchors.
 */
export function PillLink({
  href,
  tone = "ink",
  className = "",
  children,
}: PillLinkProps) {
  const classes = `${pill} ${tones[tone].pill} ${className}`;
  const external = /^(https?:|mailto:|tel:)/.test(href);

  return (
    <Magnetic>
      {external ? (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          <Inner tone={tone}>{children}</Inner>
        </a>
      ) : (
        <TransitionLink href={href} className={classes}>
          <Inner tone={tone}>{children}</Inner>
        </TransitionLink>
      )}
    </Magnetic>
  );
}

export function PillButton({
  tone = "solid",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { tone?: Tone }) {
  return (
    <Magnetic>
      <button
        {...props}
        className={`${pill} ${tones[tone].pill} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        <Inner tone={tone}>{children}</Inner>
      </button>
    </Magnetic>
  );
}
