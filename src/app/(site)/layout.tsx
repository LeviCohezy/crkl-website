import type { ReactNode } from "react";
import { Cursor } from "@/components/shell/Cursor";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { PageTransition } from "@/components/shell/PageTransition";
import { Preloader } from "@/components/shell/Preloader";
import { ScrollProgress } from "@/components/shell/ScrollProgress";
import { SmoothScroll } from "@/components/shell/SmoothScroll";

/**
 * Chrome for the public site: smooth scroll, the page-transition circle, the
 * opening curtain, floating header, footer, cursor and grain.
 *
 * Checkout and account routes get their own route groups and their own
 * chrome — see src/app/(shop) and src/app/(account).
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <PageTransition>
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollProgress />
        <Cursor />
        <div aria-hidden className="grain-layer" />
      </PageTransition>
    </SmoothScroll>
  );
}
