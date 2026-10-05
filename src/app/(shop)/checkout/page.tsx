import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFlow } from "@/components/shop/CheckoutFlow";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Afrekenen",
  robots: { index: false, follow: false },
};

const trust = ["Bancontact", "Kredietkaart", "Beveiligde betaling", "14 dagen herroepingsrecht"];

export default async function CheckoutPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-[100rem] px-6 py-16 sm:px-10 sm:py-24">
      <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1] font-light">
        Afrekenen
      </h1>
      <div className="mt-12">
        {/* useSearchParams needs a boundary to prerender around. */}
        <Suspense fallback={null}>
          <CheckoutFlow products={products} />
        </Suspense>
      </div>

      <ul className="mt-20 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/15 pt-8">
        {trust.map((item) => (
          <li key={item} className="eyebrow text-ink-soft">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
