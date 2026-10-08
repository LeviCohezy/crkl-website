import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutFlow } from "@/components/shop/CheckoutFlow";
import { type as t, wrap } from "@/components/v3/type";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Afrekenen",
  robots: { index: false, follow: false },
};

const trust = ["Bancontact", "Kredietkaart", "Beveiligde betaling", "14 dagen herroepingsrecht"];

export default async function CheckoutPage() {
  const products = await getProducts();

  return (
    <div className={`${wrap} py-24`}>
      <h1 className={t.big}>Afrekenen</h1>
      <div className="mt-12">
        {/* useSearchParams needs a boundary to prerender around. */}
        <Suspense fallback={null}>
          <CheckoutFlow products={products} />
        </Suspense>
      </div>

      <ul className={`${t.small} mt-20 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-8`}>
        {trust.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
