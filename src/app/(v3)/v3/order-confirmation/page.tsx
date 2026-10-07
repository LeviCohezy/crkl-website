import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/shop/OrderConfirmation";
import { TextLink } from "@/components/v3/Links";
import { Statement } from "@/components/v3/Statement";

export const metadata: Metadata = {
  title: "Bestelling bevestigd",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <>
      <OrderConfirmation />
      <Statement
        as="h2"
        tone="blush"
        text={"Wat in de box zit, is een voorsmaakje. Het echte werk gebeurt *aan tafel*, van woensdag tot zaterdag."}
      >
        <TextLink href="/reserveren" tone="blush">
          Reserveer een tafel
        </TextLink>
      </Statement>
    </>
  );
}
