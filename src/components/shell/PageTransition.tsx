"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

type Navigate = (href: string) => void;

const TransitionContext = createContext<Navigate | null>(null);

/**
 * A prefix every internal link under it is rewritten with. Design versions
 * live under their own path (/v3) but are written with the site's own hrefs
 * ("/menu", "/#reserveer"), so promoting one to the root is a matter of
 * removing the provider — nothing in the pages changes.
 */
const PrefixContext = createContext("");

export function HrefPrefix({ prefix, children }: { prefix: string; children: ReactNode }) {
  return <PrefixContext.Provider value={prefix}>{children}</PrefixContext.Provider>;
}

export function useHrefPrefix(): string {
  return useContext(PrefixContext);
}

/** `withPrefix("/v3", "/menu")` → `/v3/menu`; hashes, mail and external URLs pass through. */
export function withPrefix(prefix: string, href: string): string {
  if (!prefix || !href.startsWith("/")) return href;
  if (href === prefix || href.startsWith(`${prefix}/`) || href.startsWith(`${prefix}#`)) return href;
  if (href === "/") return `${prefix}/`;
  if (href.startsWith("/#")) return `${prefix}/${href.slice(1)}`;
  return `${prefix}${href}`;
}

const LETTERS = ["C", "R", "K", "L"];

/** Bring a #hash target into view, or go to the top when there is none. */
function settleScroll() {
  const id = window.location.hash.slice(1);
  const target = id ? document.getElementById(id) : null;
  const lenis = getLenis();

  if (target) {
    if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
    else target.scrollIntoView();
  } else if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  }
}

/**
 * Route changes as one slow gesture: a rose curtain rises over the page with
 * the monogram on it, the route swaps underneath, and the curtain carries on
 * upwards off the new page.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const phase = useRef<"idle" | "covering" | "covered" | "revealing">("idle");
  const arrived = useRef(false);
  const failsafe = useRef(0);

  const reveal = useCallback(() => {
    const el = curtain.current;
    if (!el || phase.current !== "covered") return;
    phase.current = "revealing";
    window.clearTimeout(failsafe.current);

    settleScroll();
    ScrollTrigger.refresh();

    gsap.to(el.querySelectorAll("[data-letter]"), {
      yPercent: -110,
      duration: 0.5,
      ease: "power3.in",
      stagger: 0.04,
    });
    gsap.to(el, {
      yPercent: -100,
      duration: 1.05,
      delay: 0.2,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(el, { autoAlpha: 0 });
        phase.current = "idle";
        getLenis()?.start();
      },
    });
  }, []);

  const navigate = useCallback<Navigate>(
    (href) => {
      const el = curtain.current;
      const target = new URL(href, window.location.href);
      const samePage = target.pathname === window.location.pathname;
      const still = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!el || samePage || still) {
        router.push(href);
        return;
      }
      if (phase.current !== "idle") return;

      phase.current = "covering";
      arrived.current = false;
      getLenis()?.stop();

      const letters = el.querySelectorAll("[data-letter]");
      gsap.set(el, { autoAlpha: 1, yPercent: 100 });
      gsap.set(letters, { yPercent: 110 });

      gsap.to(letters, {
        yPercent: 0,
        duration: 0.8,
        delay: 0.35,
        ease: "expo.out",
        stagger: 0.06,
      });
      gsap.to(el, {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.inOut",
        onComplete: () => {
          phase.current = "covered";
          router.push(href);
          // Never leave the curtain down if the route fails to arrive.
          failsafe.current = window.setTimeout(reveal, 6000);
          if (arrived.current) reveal();
        },
      });
    },
    [router, reveal],
  );

  // The new route has rendered: give it two frames to lay out, then lift.
  useEffect(() => {
    arrived.current = true;
    if (phase.current !== "covered") return;

    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(reveal);
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [pathname, reveal]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}

      <div
        ref={curtain}
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[90] flex items-center justify-center bg-blush text-ink"
      >
        <div className="font-display grid grid-cols-2 gap-x-5 gap-y-1 text-4xl leading-none font-light sm:text-5xl">
          {LETTERS.map((letter) => (
            <span key={letter} className="block overflow-hidden py-1">
              <span data-letter className="block">
                {letter}
              </span>
            </span>
          ))}
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

/**
 * `next/link` with the page transition. Use it for every internal link;
 * same-page hash links and modified clicks fall through to the normal
 * behaviour.
 */
export function TransitionLink({
  href,
  onNavigate,
  ...props
}: ComponentProps<typeof Link>) {
  const navigate = useContext(TransitionContext);
  const prefix = useContext(PrefixContext);
  const resolved = typeof href === "string" ? withPrefix(prefix, href) : href;

  return (
    <Link
      href={resolved}
      {...props}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (!navigate || typeof resolved !== "string" || resolved.startsWith("#")) return;
        event.preventDefault();
        navigate(resolved);
      }}
    />
  );
}
