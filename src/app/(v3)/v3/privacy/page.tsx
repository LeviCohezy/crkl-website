import type { Metadata } from "next";
import { Legal } from "@/components/v3/Legal";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Legal title="Privacyverklaring" sections={legal.privacy} />
  );
}
