import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Toegankelijkheid",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

export default function AccessibilityPage() {
  return <LegalPage title="Toegankelijkheid" sections={legal.accessibility} />;
}
