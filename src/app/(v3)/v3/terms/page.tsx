import type { Metadata } from "next";
import { Legal } from "@/components/v3/Legal";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <Legal title="Algemene voorwaarden" sections={legal.terms} />
  );
}
