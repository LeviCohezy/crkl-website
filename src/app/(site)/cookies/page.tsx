import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookieverklaring",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookieverklaring" sections={legal.cookies}>
      {/* Reopens the consent manager once there is one. Functional, not a CTA. */}
      <button
        type="button"
        disabled
        className="eyebrow h-12 border border-line-strong px-7 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Beheer voorkeuren
      </button>
    </LegalPage>
  );
}
