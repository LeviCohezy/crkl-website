import type { Metadata } from "next";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { OrderConfirmation } from "@/components/shop/OrderConfirmation";
import { shoot } from "@/lib/photos";
import { reserveHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bestelling bevestigd",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <>
      <OrderConfirmation />

      <SplitMedia
        tone="tint"
        eyebrow="Volgende stap"
        title={"Kom zelf\n*proeven?*"}
        body={[
          "Wat in de box zit, is een voorsmaakje. Het echte werk gebeurt aan tafel, van woensdag tot zaterdag.",
        ]}
        link={{ href: reserveHref("/order-confirmation"), label: "Reserveer een tafel" }}
        photo={{ src: shoot.juli26(54), alt: "Een ronde tafel op het okeren tapijt" }}
      />
    </>
  );
}
