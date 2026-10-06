"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/shell/PageTransition";
import { useCartCount } from "@/lib/cart";
import { getLenis } from "@/lib/lenis";
import { reserveHref, site } from "@/lib/site";

const EXPO = [0.16, 1, 0.3, 1] as const;
const SWEEP = [0.76, 0, 0.24, 1] as const;

function Monogram() {
  return (
    <span
      aria-hidden
      className="font-display grid grid-cols-2 place-items-center gap-x-1.5 gap-y-0.5 text-[0.9375rem] leading-none"
    >
      <span>C</span>
      <span>R</span>
      <span>K</span>
      <span>L</span>
    </span>
  );
}

/**
 * The sticky header: monogram, the seven pages, the phone number and one
 * filled "Reserveer" — reservation and phone are always one click away.
 *
 * Over the homepage hero it is clear with white type; everywhere else, and
 * as soon as you scroll, it is a pale bar with a hairline under it. On a
 * phone the pages move into a full-screen sheet and "Reserveer" becomes a
 * bar pinned to the bottom of the screen.
 */
export function Header() {
  const pathname = usePathname();
  const count = useCartCount();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the sheet; the page behind it holds still.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    getLenis()?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      getLenis()?.start();
    };
  }, [open]);

  const reserve = reserveHref(pathname);
  const clear = pathname === "/" && !scrolled && !open;

  /** Let the page-transition curtain cover the screen before the sheet goes. */
  const closeAfterCover = (href: string) => {
    window.setTimeout(() => setOpen(false), href === pathname ? 0 : 900);
  };

  return (
    <>
      <header
        className={`fixed z-[70] transition-colors duration-700 max-sm:inset-x-4 max-sm:top-4 sm:inset-x-0 sm:top-0 ${
          clear ? "text-white" : "glass text-ink"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between gap-6 px-7 sm:px-10 lg:h-20">
          <TransitionLink
            href="/"
            aria-label="CRKL — naar de startpagina"
            onClick={() => closeAfterCover("/")}
          >
            <Monogram />
          </TransitionLink>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="eyebrow link-line pb-1.5"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5 sm:gap-7">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="link-line hidden pb-1 text-sm tabular-nums xl:inline"
            >
              {site.contact.phone}
            </a>
            {count > 0 ? (
              <TransitionLink href="/cart" className="eyebrow link-line pb-1.5">
                Mand ({count})
              </TransitionLink>
            ) : null}
            <TransitionLink
              href={reserve}
              className={`eyebrow sweep hidden h-10 items-center px-5 transition-colors duration-500 sm:flex ${
                clear
                  ? "glass-dark text-white [--sweep:rgb(255_255_255/0.22)]"
                  : "bg-blush text-ink [--sweep:var(--color-line-strong)]"
              }`}
            >
              Reserveer
            </TransitionLink>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="eyebrow group flex h-10 items-center gap-3 lg:hidden"
            >
              <span>{open ? "Sluit" : "Menu"}</span>
              <span aria-hidden className="relative block h-2.5 w-6">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-expo ${
                    open ? "translate-y-[4.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-expo ${
                    open ? "-translate-y-[4.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── The sheet, below lg ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            id="site-menu"
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto bg-mist text-ink lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.85, ease: SWEEP }}
          >
            <div className="flex min-h-full flex-col px-8 pt-32 pb-32 sm:px-10">
              <nav aria-label="Hoofdnavigatie">
                <ul>
                  {site.nav.map((item, index) => (
                    <li key={item.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 0.9,
                          delay: 0.2 + index * 0.05,
                          ease: EXPO,
                        }}
                      >
                        <TransitionLink
                          href={item.href}
                          aria-current={pathname === item.href ? "page" : undefined}
                          onClick={() => closeAfterCover(item.href)}
                          className={`font-display block py-2.5 text-[clamp(2.25rem,9vw,3.5rem)] leading-[1.1] font-light ${
                            pathname === item.href ? "italic" : ""
                          }`}
                        >
                          {item.label}
                        </TransitionLink>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="mt-10 border-t border-line pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.55 }}
              >
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  {site.more.map((item) => (
                    <li key={item.href}>
                      <TransitionLink
                        href={item.href}
                        onClick={() => closeAfterCover(item.href)}
                        className="eyebrow"
                      >
                        {item.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm leading-relaxed text-ink-soft">
                  {site.contact.street}, {site.contact.city}
                  <br />
                  <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ── Reserve bar, phones only ─────────────────────────────────────── */}
      <TransitionLink
        href={reserve}
        onClick={() => closeAfterCover(reserve)}
        className="eyebrow glass fixed inset-x-6 bottom-6 z-[65] flex h-14 items-center justify-center text-ink sm:hidden"
      >
        Reserveer een tafel
      </TransitionLink>
    </>
  );
}
