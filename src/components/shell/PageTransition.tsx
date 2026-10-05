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

/** Navigate with the circle wipe from anywhere, e.g. after closing the menu. */
export function useTransitionNavigate(): Navigate {
  const router = useRouter();
  const navigate = useContext(TransitionContext);
  return navigate ?? ((href) => router.push(href));
}

const LETTERS = ["C", "R", "K", "L"];

/**
 * Route changes as one gesture: a rose circle opens from wherever you clicked
 * until it covers the screen, the route swaps underneath, and a hole opens
 * from the centre onto the new page.
 *
 * Covering uses `clip-path`, uncovering uses a radial mask — the same circle,
 * once as the shape and once as the hole in it.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const phase = useRef<"idle" | "covering" | "covered" | "revealing">("idle");
  const arrived = useRef(false);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const failsafe = useRef(0);

  useEffect(() => {
    const onDown = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  const reveal = useCallback(() => {
    const el = overlay.current;
    if (!el || phase.current !== "covered") return;
    phase.current = "revealing";
    window.clearTimeout(failsafe.current);

    getLenis()?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();

    const reach = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 60;
    const hole = { r: 0 };
    const letters = el.querySelectorAll("[data-letter]");

    el.style.clipPath = "none";
    gsap.to(letters, {
      yPercent: -110,
      duration: 0.5,
      ease: "power3.in",
      stagger: 0.04,
    });
    gsap.to(hole, {
      r: reach,
      duration: 1.1,
      delay: 0.25,
      ease: "power3.inOut",
      onUpdate: () => {
        const mask = `radial-gradient(circle at 50% 50%, transparent ${hole.r}px, #000 ${hole.r + 1.5}px)`;
        el.style.maskImage = mask;
        el.style.webkitMaskImage = mask;
      },
      onComplete: () => {
        gsap.set(el, { autoAlpha: 0 });
        el.style.maskImage = "";
        el.style.webkitMaskImage = "";
        phase.current = "idle";
        getLenis()?.start();
      },
    });
  }, []);

  const navigate = useCallback<Navigate>(
    (href) => {
      const el = overlay.current;
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

      const { innerWidth: w, innerHeight: h } = window;
      const { x, y } = pointer.current ?? { x: w / 2, y: h / 2 };
      const reach = Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 20;
      const circle = { r: 0 };
      const letters = el.querySelectorAll("[data-letter]");

      gsap.set(el, { autoAlpha: 1 });
      gsap.set(letters, { yPercent: 110 });
      el.style.clipPath = `circle(0px at ${x}px ${y}px)`;

      gsap.to(letters, {
        yPercent: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "expo.out",
        stagger: 0.06,
      });
      gsap.to(circle, {
        r: reach,
        duration: 0.9,
        ease: "power3.inOut",
        onUpdate: () => {
          el.style.clipPath = `circle(${circle.r}px at ${x}px ${y}px)`;
        },
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

  // The new route has rendered: give it two frames to lay out, then open.
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
        ref={overlay}
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[90] flex items-center justify-center bg-blush-deep text-cream"
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
 * `next/link` with the circle wipe. Use it for every internal link; hash
 * links and modified clicks fall through to the normal behaviour.
 */
export function TransitionLink({
  href,
  onNavigate,
  ...props
}: ComponentProps<typeof Link>) {
  const navigate = useContext(TransitionContext);

  return (
    <Link
      href={href}
      {...props}
      onNavigate={(event) => {
        onNavigate?.(event);
        // Outside the provider (e.g. the 404 page) this is a plain link.
        if (!navigate || typeof href !== "string" || href.startsWith("#")) return;
        event.preventDefault();
        navigate(href);
      }}
    />
  );
}
