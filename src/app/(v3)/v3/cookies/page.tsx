import type { Metadata } from "next";
import { Legal } from "@/components/v3/Legal";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookieverklaring",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <Legal title="Cookieverklaring" sections={legal.cookies}>
      {/* Reopens the consent manager once there is one. */}
      <button
        type="button"
        disabled
        className="h-12 border border-line-strong px-7 text-base disabled:cursor-not-allowed disabled:opacity-50"
      >
        Beheer voorkeuren
      </button>
    </Legal>
  );
}
