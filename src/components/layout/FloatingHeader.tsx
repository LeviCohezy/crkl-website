"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Tone = "dark" | "light";

type FloatingHeaderProps = {
  /** `dark` = frosted ink bar with cream type, for use over imagery. */
  tone?: Tone;
  /** `floating` = inset frosted pill. `bar` = full-width solid bar. */
  variant?: "floating" | "bar";
  cta?: { href: string; label: string };
  /** Optional second, outlined action shown beside the main one. */
  secondary?: { href: string; label: string };
  /** Small links on the far left of the bar variant. */
  links?: { href: string; label: string }[];
  className?: string;
};

const tones = {
  dark: {
    bar: "glass-dark",
    text: "text-cream",
    button: "border-cream/45 text-cream hover:bg-cream hover:text-ink",
    bars: "bg-cream",
  },
  light: {
    bar: "glass-light",
    text: "text-ink",
    button: "border-ink/30 text-ink hover:bg-ink hover:text-cream",
    bars: "bg-ink",
  },
} as const;

/**
 * Inset, frosted navigation bar: outlined action left, letterspaced wordmark
 * centred, menu toggle right. Sits over the hero rather than above it.
 */
export function FloatingHeader({
  tone = "dark",
  variant = "floating",
  cta = { href: "/contact", label: "Enquire" },
  secondary,
  links,
  className = "",
}: FloatingHeaderProps) {
  const [open, setOpen] = useState(false);
  const t = tones[tone];
  const bar = variant === "bar";

  // Escape closes the menu; the page behind it shouldn't scroll.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header
        className={
          bar
            ? `fixed inset-x-0 top-0 z-50 bg-ink ${className}`
            : `fixed inset-x-3 top-3 z-50 sm:inset-x-6 sm:top-6 ${className}`
        }
      >
        <div
          className={
            bar
              ? "grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5 sm:h-[4.5rem] sm:px-8"
              : `grid h-16 grid-cols-[1fr_auto_1fr] items-center rounded-lg px-4 sm:h-20 sm:px-6 ${t.bar}`
          }
        >
          <div className="flex items-center gap-7 justify-self-start">
            {bar && links
              ? links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="eyebrow hidden text-cream/60 transition-colors hover:text-cream lg:inline-block"
                  >
                    {link.label}
                  </a>
                ))
              : null}
            {!bar ? (
              <Link
                href={cta.href}
                className={`hidden rounded-xs border px-6 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 sm:inline-block ${t.button}`}
              >
                {cta.label}
              </Link>
            ) : null}
          </div>

          <Link
            href="/"
            className={`font-display text-2xl font-light leading-none tracking-[0.3em] sm:text-3xl ${bar ? "text-cream" : t.text}`}
          >
            {site.name}
          </Link>

          <div className="flex items-center gap-3 justify-self-end">
            {bar ? (
              <>
                <Link
                  href={cta.href}
                  className="hidden rounded-full bg-cream px-7 py-3 text-[0.6875rem] font-medium tracking-[0.22em] text-ink uppercase transition-colors duration-300 hover:bg-blush hover:text-white sm:inline-block"
                >
                  {cta.label}
                </Link>
                {secondary ? (
                  <Link
                    href={secondary.href}
                    className="hidden rounded-full border border-cream/45 px-7 py-3 text-[0.6875rem] font-medium tracking-[0.22em] text-cream uppercase transition-colors duration-300 hover:bg-cream hover:text-ink lg:inline-block"
                  >
                    {secondary.label}
                  </Link>
                ) : null}
              </>
            ) : null}

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label="Open menu"
              className={
                bar
                  ? "flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-full border border-cream/45 transition-colors hover:bg-cream/10"
                  : "group flex h-10 w-12 flex-col items-end justify-center gap-[7px]"
              }
            >
              <span className={`h-px transition-all duration-300 ${bar ? "w-5 bg-cream" : `w-11 ${t.bars}`}`} />
              <span className={`h-px transition-all duration-300 ${bar ? "w-5 bg-cream" : `w-11 group-hover:w-7 ${t.bars}`}`} />
              <span className={`h-px transition-all duration-300 ${bar ? "w-5 bg-cream" : `w-11 ${t.bars}`}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        id="site-menu"
        hidden={!open}
        className="fixed inset-0 z-[60] bg-ink/97 text-cream"
      >
        <div className="grain relative flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-7 sm:h-20 sm:px-12">
            <span className="font-display text-2xl font-light tracking-[0.3em] sm:text-3xl">
              {site.name}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="eyebrow text-cream/70 transition-colors hover:text-cream"
            >
              Close
            </button>
          </div>

          <nav
            aria-label="Main"
            className="flex flex-1 flex-col justify-center px-7 sm:px-12"
          >
            <ul className="space-y-2">
              {site.nav.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 py-2"
                  >
                    <span className="font-display text-xs text-brass tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-4xl font-light transition-colors duration-300 group-hover:text-brass sm:text-6xl">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4 px-7 pb-10 text-sm text-cream/55 sm:px-12">
            <a
              href={`mailto:${site.contact.email}`}
              className="transition-colors hover:text-cream"
            >
              {site.contact.email}
            </a>
            <div className="flex gap-6">
              {site.social.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-cream"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
