import type { Metadata } from "next";
import { WineCard } from "@/components/catalog/WineCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWines } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Wines",
  description:
    "The current CRKL range — low-intervention red, white, rosé, orange and sparkling wine.",
};

export default async function WinesPage() {
  const wines = await getWines();

  return (
    <div className="bg-cream py-20 sm:py-28">
      <Container width="wide">
        <SectionHeading
          as="h1"
          eyebrow="The range"
          title="Every bottle we make"
          intro="Small lots, bottled once a year. When a wine is gone it stays gone until the next harvest."
        />

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {wines.map((wine) => (
            <WineCard key={wine.slug} wine={wine} />
          ))}
        </div>
      </Container>
    </div>
  );
}
