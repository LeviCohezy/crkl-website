import type { Metadata } from "next";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Band } from "@/components/sections/Band";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "De shop van CRKL: geschenkboxen en de cadeaubon. Gratis ophalen in het restaurant in Roeselare of verzending in België.",
  alternates: { canonical: "/shop" },
};

const promises = [
  "Verzending in België",
  "Gratis ophalen in het restaurant",
  "Veilig betalen",
];

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <section className="bg-cream pt-36 pb-24 text-ink sm:pb-36 lg:pt-44">
        <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
          <p className="eyebrow text-stone">Shop</p>
          <SplitText
            as="h1"
            text={"Voor thuis,\n*of om te geven*"}
            immediate
            delay={0.4}
            className="font-display mt-7 text-[clamp(3rem,7.4vw,7.5rem)] leading-[1] font-light"
          />
          <Reveal delay={0.3} className="mt-16">
            <ShopGrid products={products} />
          </Reveal>
        </div>
      </section>

      <Band tone="tint" compact>
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
