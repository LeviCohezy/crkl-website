import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/shell/Cursor";
import { PageTransition } from "@/components/shell/PageTransition";
import { Preloader } from "@/components/shell/Preloader";
import { ScrollProgress } from "@/components/shell/ScrollProgress";
import { SmoothScroll } from "@/components/shell/SmoothScroll";
import { site, siteUrl } from "@/lib/site";

/**
 * Fraunces, at its lightest and softest: a serif with the warmth of the old
 * faces and none of their stiffness. The optical-size axis sets the large
 * headings in their own cut.
 */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#dfbbb3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl-BE"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll>
          <PageTransition>
            <Preloader />
            {children}
            <ScrollProgress />
            <Cursor />
            <div aria-hidden className="grain-layer" />
          </PageTransition>
        </SmoothScroll>
        {/* Without scripts there is no intro to play, so no curtain either. */}
        <noscript>
          <style>{".preloader{display:none}"}</style>
        </noscript>
      </body>
    </html>
  );
}
