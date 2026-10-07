import type { Metadata } from "next";
import { Legal } from "@/components/v3/Legal";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Toegankelijkheid",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

export default function AccessibilityPage() {
  return (
    <Legal title="Toegankelijkheid" sections={legal.accessibility} />
  );
}
