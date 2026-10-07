"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TransitionLink, useHrefPrefix } from "@/components/shell/PageTransition";
import { useCartCount } from "@/lib/cart";
import { getLenis } from "@/lib/lenis";
import { site } from "@/lib/site";

const EXPO = [0.16, 1, 0.3, 1] as const;
const SWEEP = [0.76, 0, 0.24, 1] as const;

/**
 * A frosted bar floating a little inside the screen edges — the one piece
 * of glass on the site. Wordmark, the pages in plain words, the phone, and
 * one pink "Reserveer". Below lg the pages move into a white sheet and the
 * reserve button becomes a bar at the foot of the screen.
 */
export function Header() {
  const pathname = usePathname();
  const prefix = useHrefPrefix();
  const count = useCartCount();
  const [open, setOpen] = useState(false);

  // The page as the site knows it, without the version prefix or a trailing slash.
  const path =
    (pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname).replace(/\/+$/, "") || "/";
  /** Tables are booked step by step on their own page. */
  const reserve = "/reserveren";

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

  /** Let the transition curtain cover the screen before the sheet goes. */
  const closeAfterCover = (href: string) => {
    window.setTimeout(() => setOpen(false), href === path ? 0 : 900);
  };

  const current = (href: string) => (path === href ? "page" : undefined);

  return (
    <>
      <header className="glass fixed inset-x-4 top-4 z-[70] text-ink sm:inset-x-6 sm:top-6">
        <div className="flex h-16 items-center justify-between gap-6 px-5 sm:px-7 lg:h-[4.5rem]">
          <TransitionLink
            href="/"
            aria-label="CRKL — naar de startpagina"
            onClick={() => closeAfterCover("/")}
            className="font-display text-[1.375rem] leading-none font-light tracking-[0.06em]"
          >
            CRKL
          </TransitionLink>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    aria-current={current(item.href)}
                    className="link-line pb-1 text-[0.9375rem] text-ink-soft transition-colors duration-500 hover:text-ink aria-[current=page]:text-ink"
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
              className="link-line hidden pb-1 text-[0.9375rem] tabular-nums xl:inline"
            >
              {site.contact.phone}
            </a>
            {count > 0 ? (
              <TransitionLink href="/cart" className="link-line pb-1 text-[0.9375rem]">
                Mand ({count})
              </TransitionLink>
            ) : null}
            <TransitionLink
              href={reserve}
              className="sweep hidden h-10 items-center bg-blush px-5 text-[0.9375rem] text-ink [--sweep:var(--color-line-strong)] sm:inline-flex"
            >
              Reserveer
            </TransitionLink>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex h-10 items-center gap-3 text-[0.9375rem] lg:hidden"
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

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            id="site-menu"
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto bg-cream text-ink lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.85, ease: SWEEP }}
          >
            <div className="flex min-h-full flex-col px-6 pt-32 pb-32 sm:px-10">
              <nav aria-label="Hoofdnavigatie">
                <ul>
                  {[...site.nav, ...site.more].map((item, index) => (
                    <li key={item.href} className="overflow-hidden border-b border-line">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, delay: 0.2 + index * 0.04, ease: EXPO }}
                      >
                        <TransitionLink
                          href={item.href}
                          aria-current={current(item.href)}
                          onClick={() => closeAfterCover(item.href)}
                          className={`font-display flex items-baseline justify-between py-4 text-[clamp(2rem,8vw,3.25rem)] leading-[1.1] font-light ${
                            path === item.href ? "italic" : ""
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
                className="mt-12 text-base leading-relaxed text-ink-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.55 }}
              >
                <p>
                  {site.contact.street}, {site.contact.city}
                  <br />
                  <a href={`tel:${site.contact.phoneHref}`} className="link-line text-ink">
                    {site.contact.phone}
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <TransitionLink
        href={reserve}
        onClick={() => closeAfterCover(reserve)}
        className="glass fixed inset-x-4 bottom-4 z-[65] flex h-14 items-center justify-center text-base text-ink sm:hidden"
      >
        Reserveer een tafel
      </TransitionLink>
    </>
  );
}
