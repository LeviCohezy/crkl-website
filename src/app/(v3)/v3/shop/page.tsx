import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { PageTitle } from "@/components/v3/PageTitle";
import { Section } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "De shop van CRKL: geschenkboxen en de cadeaubon. Gratis ophalen in het restaurant in Roeselare of verzending in België.",
  alternates: { canonical: "/v3/shop" },
};

const promises = ["Verzending in België", "Gratis ophalen in het restaurant", "Veilig betalen"];

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <PageTitle title={"Voor thuis,\n*of om te geven*"}>
        <ShopGrid products={products} />
      </PageTitle>

      <Section tone="petal" flush className="py-12">
        <ul className={`${t.small} flex flex-col items-center justify-center gap-x-14 gap-y-3 text-ink md:flex-row`}>
          {promises.map((promise) => (
            <li key={promise}>{promise}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
