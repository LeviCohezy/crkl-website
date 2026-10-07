import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage title="Privacyverklaring" sections={legal.privacy} />;
}
