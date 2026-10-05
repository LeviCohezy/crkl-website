"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/shell/PageTransition";
import { getLenis } from "@/lib/lenis";
import { site } from "@/lib/site";

const EXPO = [0.16, 1, 0.3, 1] as const;
const SWEEP = [0.76, 0, 0.24, 1] as const;

/** Frosted chip the three header pieces share. */
const chip =
  "pointer-events-auto bg-cream/80 text-ink backdrop-blur-md transition-colors duration-500 hover:bg-cream";

function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`font-display grid grid-cols-2 place-items-center leading-none ${className}`}
    >
      <span>C</span>
      <span>R</span>
      <span>K</span>
      <span>L</span>
    </span>
  );
}

/**
 * Three floating pieces instead of a bar: reserve on the left, the monogram
 * in a circle at the centre, the menu on the right. They slip away while you
 * scroll down and return the moment you scroll up.
 *
 * The menu itself is a full-screen rose sheet that opens as a circle from the
 * menu button, with a round photograph that follows the link you are on.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [preview, setPreview] = useState(0);

  // Hide on the way down, show on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setTucked(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu; the page behind it holds still.
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

  const toggle = () => {
    if (!open) {
      const current = site.nav.findIndex((item) => item.href === pathname);
      setPreview(current < 0 ? 0 : current);
    }
    setOpen((value) => !value);
  };

  /** Let the page-transition circle cover the screen before the sheet goes. */
  const closeAfterCover = (href: string) => {
    window.setTimeout(() => setOpen(false), href === pathname ? 0 : 950);
  };

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-[70] grid grid-cols-[1fr_auto_1fr] items-center p-4 transition-transform duration-700 ease-expo sm:p-6 ${
          tucked && !open ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div className="justify-self-start">
          <Magnetic strength={0.25}>
            <TransitionLink
              href="/reserveren"
              onClick={() => closeAfterCover("/reserveren")}
              className={`${chip} eyebrow flex h-12 items-center rounded-full px-5 sm:px-7`}
            >
              Reserveer
            </TransitionLink>
          </Magnetic>
        </div>

        <Magnetic strength={0.25}>
          <TransitionLink
            href="/"
            aria-label="CRKL — naar de startpagina"
            onClick={() => closeAfterCover("/")}
            className={`${chip} flex h-14 w-14 items-center justify-center rounded-full`}
          >
            <Monogram className="gap-x-1.5 gap-y-0.5 text-[0.8125rem]" />
          </TransitionLink>
        </Magnetic>

        <div className="justify-self-end">
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`${chip} eyebrow group flex h-12 items-center gap-4 rounded-full pr-4 pl-5 sm:pl-7`}
            >
              <span className="hidden sm:inline">{open ? "Sluit" : "Menu"}</span>
              <span className="sr-only sm:hidden">{open ? "Sluit menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-expo ${
                    open ? "translate-y-[5.5px] rotate-45" : "group-hover:translate-x-1"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-expo ${
                    open ? "-translate-y-[5.5px] -rotate-45" : "group-hover:-translate-x-1"
                  }`}
                />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            id="site-menu"
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto bg-blush text-white"
            initial={{ clipPath: "circle(0% at 94% 6%)" }}
            animate={{ clipPath: "circle(150% at 94% 6%)" }}
            exit={{ clipPath: "circle(0% at 94% 6%)" }}
            transition={{ duration: 0.95, ease: SWEEP }}
          >
            <div className="mx-auto flex min-h-full max-w-[100rem] flex-col px-6 pt-28 pb-8 sm:px-10 lg:pt-32">
              <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
                <nav aria-label="Hoofdnavigatie">
                  <ul>
                    {site.nav.map((item, index) => {
                      const current = item.href === pathname;
                      return (
                        <li key={item.href} className="overflow-hidden">
                          <motion.div
                            initial={{ y: "110%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-110%" }}
                            transition={{
                              duration: 0.9,
                              delay: 0.25 + index * 0.06,
                              ease: EXPO,
                            }}
                          >
                            <TransitionLink
                              href={item.href}
                              aria-current={current ? "page" : undefined}
                              onClick={() => closeAfterCover(item.href)}
                              onMouseEnter={() => setPreview(index)}
                              onFocus={() => setPreview(index)}
                              className="group flex items-baseline gap-5 py-1.5 sm:gap-8"
                            >
                              <span className="eyebrow w-6 text-white/70 tabular-nums">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={`font-display text-[clamp(2.4rem,7.2vh,5.25rem)] leading-[1.05] font-light transition-[translate,opacity] duration-700 ease-expo group-hover:translate-x-3 ${
                                  current ? "italic" : "opacity-90 group-hover:opacity-100"
                                }`}
                              >
                                {item.label}
                              </span>
                            </TransitionLink>
                          </motion.div>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* The photograph that follows the link you are on. */}
                <motion.div
                  className="relative mx-auto hidden aspect-square w-[min(34vw,62vh)] lg:block"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 1.1, delay: 0.2, ease: EXPO }}
                >
                  {site.nav.map((item, index) => (
                    <div
                      key={item.href}
                      className={`absolute inset-0 overflow-hidden rounded-full transition-[opacity,scale] duration-700 ease-expo ${
                        index === preview ? "scale-100 opacity-100" : "scale-110 opacity-0"
                      }`}
                    >
                      <MediaImage
                        src={item.image}
                        alt=""
                        aspect="h-full"
                        sizes="34vw"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="mt-10 grid gap-6 border-t border-white/35 pt-6 text-sm sm:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: EXPO }}
              >
                <p>
                  {site.contact.street}
                  <br />
                  {site.contact.city}
                </p>
                <p>
                  <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                    {site.contact.phone}
                  </a>
                  <br />
                  <a href={`mailto:${site.contact.email}`} className="link-line">
                    {site.contact.email}
                  </a>
                </p>
                <p className="flex gap-6 sm:justify-end">
                  {site.social.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-line self-start"
                    >
                      {item.label}
                    </a>
                  ))}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
