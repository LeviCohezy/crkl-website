import type { Metadata } from "next";
import { CartView } from "@/components/shop/CartView";
import { PageTitle } from "@/components/v3/PageTitle";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Winkelmand",
  robots: { index: false, follow: false },
};

export default async function CartPage() {
  const products = await getProducts();
  return (
    <PageTitle title="Winkelmand">
      <CartView products={products} />
    </PageTitle>
  );
}
