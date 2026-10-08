import type { Metadata } from "next";
import { HrefPrefix } from "@/components/shell/PageTransition";
import { Footer } from "@/components/v3/Footer";
import { Header } from "@/components/v3/Header";

/**
 * The V3 design, as a complete site under /v3 beside the current one.
 *
 * Every page here is written with the site's own hrefs ("/menu",
 * "/reserveren"); `HrefPrefix` keeps them under /v3 for as long as this is
 * a version. Promoting it is moving the pages into (site) and dropping the
 * provider. Until then the pages are kept out of search engines, so they do
 * not compete with the live ones.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V3Layout({ children }: LayoutProps<"/v3">) {
  return (
    <HrefPrefix prefix="/v3">
      <div className="v3-scope flex min-h-svh flex-1 flex-col bg-cream">
        <Header />
        <main className="v3 flex-1">{children}</main>
        <Footer />
      </div>
    </HrefPrefix>
  );
}
