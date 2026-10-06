import type { Metadata } from "next";
import { SplitText } from "@/components/motion/Reveal";
import { Band } from "@/components/sections/Band";
import { CartView } from "@/components/shop/CartView";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Winkelmand",
  robots: { index: false, follow: false },
};

const promises = [
  "Veilig betalen",
  "Gratis ophalen in het restaurant",
  "Verzending in België",
];

export default async function CartPage() {
  const products = await getProducts();

  return (
    <>
      <section className="bg-cream pt-36 pb-24 text-ink sm:pb-36 lg:pt-44">
        <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
          <p className="eyebrow text-clay">Shop</p>
          <SplitText
            as="h1"
            text="Winkelmand"
            immediate
            delay={0.4}
            className="font-display mt-7 text-[clamp(3rem,7.4vw,7.5rem)] leading-[1] font-light"
          />
          <div className="mt-14">
            <CartView products={products} />
          </div>
        </div>
      </section>

      <Band tone="white" compact className="border-t border-ink/10">
        <ul className="flex flex-col items-center justify-center gap-x-14 gap-y-4 md:flex-row">
          {promises.map((promise, index) => (
            <li key={promise} className="flex items-center gap-x-14">
              {index > 0 ? (
                <span aria-hidden className="ring hidden h-2 w-2 md:block" />
              ) : null}
              <span className="eyebrow">{promise}</span>
            </li>
          ))}
        </ul>
      </Band>
    </>
  );
}
