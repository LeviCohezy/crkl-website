import type { ReactNode } from "react";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";

/**
 * Chrome for the public site: the sticky header and the footer. Smooth
 * scroll, the page transition and the opening curtain live one level up, in
 * the root layout, so they survive a move between route groups.
 *
 * Checkout has its own, barer chrome — see src/app/(shop).
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
