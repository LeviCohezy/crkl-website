import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/shell/PageTransition";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[0.85em] w-[0.85em] shrink-0 transition-transform duration-700 ease-expo group-hover:translate-x-1.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <path d="M3 12h18M14 5l7 7-7 7" />
    </svg>
  );
}

type LinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Hairlines are pink on white and white on the pink. */
type Tone = "white" | "blush";
const hairline: Record<Tone, string> = {
  white: "border-line-strong hover:border-blush",
  blush: "border-white/70 hover:border-ink",
};

function Anchor({ href, className = "", children }: LinkProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={className}>
      {children}
    </TransitionLink>
  );
}

/**
 * The everyday link: a sentence in the reading face, a hairline under it
 * that turns pink, and an arrow that steps forward.
 */
export function TextLink({ href, tone = "white", className = "", children }: LinkProps & { tone?: Tone }) {
  return (
    <Anchor
      href={href}
      className={`group inline-flex items-baseline gap-3 border-b pb-1.5 text-base text-ink transition-colors duration-500 ${hairline[tone]} ${className}`}
    >
      <span>{children}</span>
      <Arrow className="self-center" />
    </Anchor>
  );
}

/** The one filled action per view: a pink rectangle whose fill sweeps on hover. */
export function PinkLink({ href, tone = "white", className = "", children }: LinkProps & { tone?: Tone }) {
  const fill = tone === "blush" ? "bg-cream [--sweep:var(--color-petal)]" : "bg-blush [--sweep:var(--color-line-strong)]";
  return (
    <Magnetic strength={0.12}>
      <Anchor
        href={href}
        className={`group sweep inline-flex h-14 items-center gap-4 px-8 text-base text-ink ${fill} ${className}`}
      >
        <span>{children}</span>
        <Arrow />
      </Anchor>
    </Magnetic>
  );
}

export function PinkButton({
  className = "",
  children,
  ...props
}: ComponentProps<"button">) {
  return (
    <Magnetic strength={0.12}>
      <button
        {...props}
        className={`group sweep inline-flex h-14 items-center gap-4 bg-blush px-8 text-base text-ink [--sweep:var(--color-line-strong)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        <span>{children}</span>
        <Arrow />
      </button>
    </Magnetic>
  );
}

/** A quiet link in a line of text. */
export function InlineLink({ href, className = "", children }: LinkProps) {
  return (
    <Anchor href={href} className={`link-line pb-0.5 text-ink ${className}`}>
      {children}
    </Anchor>
  );
}
