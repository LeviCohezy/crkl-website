import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  solid: "bg-bordeaux text-cream hover:bg-bordeaux-deep",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  onDark: "border border-cream/35 text-cream hover:bg-cream hover:text-ink",
};

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "solid",
  className = "",
  children,
}: ButtonAsLink) {
  const external = /^https?:\/\//.test(href) || href.startsWith("mailto:");
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} rel="noreferrer noopener">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
