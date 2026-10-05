import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaImage } from "@/components/media/MediaImage";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  getWine,
  getWineSlugs,
  styleLabels,
  wineTitle,
} from "@/lib/catalog";
import { formatPrice, formatVolume } from "@/lib/format";

/** Pre-render every wine at build time. */
export async function generateStaticParams() {
  const slugs = await getWineSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/wines/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const wine = await getWine(slug);
  if (!wine) return { title: "Wine not found" };

  return {
    title: wineTitle(wine),
    description: wine.tagline,
    openGraph: {
      title: wineTitle(wine),
      description: wine.tagline,
      url: `/wines/${wine.slug}`,
    },
  };
}

export default async function WinePage(props: PageProps<"/wines/[slug]">) {
  const { slug } = await props.params;
  const wine = await getWine(slug);
  if (!wine) notFound();

  const specs = [
    { label: "Style", value: styleLabels[wine.style] },
    { label: "Region", value: wine.region },
    { label: "Grapes", value: wine.grapes.join(", ") },
    { label: "Vintage", value: wine.vintage ? String(wine.vintage) : "Non-vintage" },
    { label: "Alcohol", value: `${wine.abv}%` },
    { label: "Bottle", value: formatVolume(wine.volumeMl) },
  ];

  return (
    <div className="bg-cream py-12 sm:py-16">
      <Container width="wide">
        <Link
          href="/wines"
          className="eyebrow text-stone transition-colors hover:text-bordeaux"
        >
          ← All wines
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <MediaImage
            src={wine.image}
            alt={`Bottle of ${wineTitle(wine)}`}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            fallbackLabel={wine.name}
          />

          <div className="lg:py-6">
            <p className="eyebrow text-bordeaux">{styleLabels[wine.style]}</p>
            <h1 className="font-display mt-4 text-4xl leading-tight font-light sm:text-5xl">
              {wineTitle(wine)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft/85">
              {wine.tagline}
            </p>

            {/* Commerce block. Price comes from the catalogue today; the
                button becomes a real add-to-cart once Stripe is wired up.
                See docs/ECOMMERCE-ROADMAP.md. */}
            {wine.commerce ? (
              <div className="mt-8 border-y border-ink/10 py-6">
                <p className="font-display text-3xl font-light tabular-nums">
                  {formatPrice(wine.commerce.priceCents)}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Button disabled>Online shop opening soon</Button>
                  <p className="text-sm text-stone">
                    {wine.commerce.inStock
                      ? "In the cellar now"
                      : "Currently allocated"}
                  </p>
                </div>
              </div>
            ) : null}

            <p className="mt-8 leading-relaxed text-ink-soft/85">
              {wine.description}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/10 pt-8">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="eyebrow text-stone">{spec.label}</dt>
                  <dd className="mt-1.5 text-sm text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-stone">Tasting notes</p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-soft/85">
                  {wine.tastingNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-stone">Drink it with</p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-soft/85">
                  {wine.pairings.map((pairing) => (
                    <li key={pairing}>{pairing}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <ButtonLink href="/contact" variant="outline">
                Order by enquiry
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
