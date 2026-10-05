import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/shell/PageTransition";
import { PillButton, PillLink } from "@/components/ui/Button";
import { getWine, getWineSlugs, styleLabels, wineTitle } from "@/lib/catalog";
import { formatPrice, formatVolume } from "@/lib/format";

/** Pre-render every wine at build time. */
export async function generateStaticParams() {
  const slugs = await getWineSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/wijn/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const wine = await getWine(slug);
  if (!wine) return { title: "Wijn niet gevonden" };

  return {
    title: wineTitle(wine),
    description: wine.tagline,
    alternates: { canonical: `/wijn/${wine.slug}` },
    openGraph: {
      title: wineTitle(wine),
      description: wine.tagline,
      url: `/wijn/${wine.slug}`,
    },
  };
}

export default async function WineDetailPage(props: PageProps<"/wijn/[slug]">) {
  const { slug } = await props.params;
  const wine = await getWine(slug);
  if (!wine) notFound();

  const specs = [
    { label: "Stijl", value: styleLabels[wine.style] },
    { label: "Streek", value: wine.region },
    { label: "Druiven", value: wine.grapes.join(", ") },
    { label: "Jaargang", value: wine.vintage ? String(wine.vintage) : "Zonder jaargang" },
    { label: "Alcohol", value: `${wine.abv}%` },
    { label: "Fles", value: formatVolume(wine.volumeMl) },
  ];

  return (
    <div className="bg-mist pt-36 pb-28 sm:pb-40">
      <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
        <TransitionLink href="/wijn" className="eyebrow link-line text-rosewood">
          ← Alle wijnen
        </TransitionLink>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-24">
          <MediaImage
            src={wine.image}
            alt={`Fles ${wineTitle(wine)}`}
            aspect="aspect-[3/4]"
            className="rounded-t-full"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            fallbackLabel={wine.name}
          />

          <div className="lg:py-10">
            <p className="eyebrow text-rosewood">{styleLabels[wine.style]}</p>
            <SplitText
              as="h1"
              text={wineTitle(wine)}
              immediate
              delay={0.4}
              className="font-display mt-5 text-[clamp(2.75rem,6vw,5.5rem)] leading-[1] font-light"
            />
            <Reveal delay={0.2}>
              <p className="font-display mt-6 text-2xl leading-snug font-light italic text-ink-soft">
                {wine.tagline}
              </p>
            </Reveal>

            {/* Commerce block. Price comes from the catalogue today; the
                button becomes a real add-to-cart once Stripe is wired up.
                See docs/ECOMMERCE-ROADMAP.md. */}
            {wine.commerce ? (
              <div className="mt-10 border-y border-ink/15 py-7">
                <p className="font-display text-4xl font-light tabular-nums">
                  {formatPrice(wine.commerce.priceCents)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <PillButton disabled>Webshop opent binnenkort</PillButton>
                  <p className="text-sm text-stone">
                    {wine.commerce.inStock ? "Nu in de kelder" : "Momenteel uitverkocht"}
                  </p>
                </div>
              </div>
            ) : null}

            <p className="mt-10 max-w-lg text-lg leading-relaxed text-ink-soft">
              {wine.description}
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/15 pt-8">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="eyebrow text-stone">{spec.label}</dt>
                  <dd className="font-display mt-2 text-xl font-light">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-stone">Proefnotities</p>
                <ul className="mt-3 space-y-1.5 text-ink-soft">
                  {wine.tastingNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow text-stone">Lekker bij</p>
                <ul className="mt-3 space-y-1.5 text-ink-soft">
                  {wine.pairings.map((pairing) => (
                    <li key={pairing}>{pairing}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-14">
              <PillLink href="/contact">Bestel via het restaurant</PillLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
