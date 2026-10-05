import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/shell/PageTransition";
import { AddToCart } from "@/components/shop/AddToCart";
import { ArrowLink } from "@/components/ui/Button";
import { categoryLabels, getProduct, getProductSlugs } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

/** Pre-render every product at build time. */
export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/shop/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) return { title: "Niet gevonden" };

  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      url: `/shop/${product.slug}`,
    },
  };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="bg-cream pt-32 pb-24 text-ink sm:pb-36 lg:pt-40">
      <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
        <TransitionLink href="/shop" className="eyebrow link-line pb-1.5 text-clay">
          ← Shop
        </TransitionLink>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <MediaImage
              src={product.image}
              alt={product.imageAlt}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              fallbackLabel={product.name}
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:py-6">
            <p className="eyebrow text-clay">{categoryLabels[product.category]}</p>
            <SplitText
              as="h1"
              text={product.name}
              immediate
              delay={0.4}
              className="font-display mt-6 text-[clamp(2.75rem,5.6vw,5.25rem)] leading-[1.02] font-light"
            />
            <Reveal delay={0.2}>
              <p className="font-display mt-6 text-2xl leading-snug font-light italic text-ink-soft">
                {product.tagline}
              </p>
            </Reveal>

            {/* Commerce block. The price comes from the catalogue; the
                button adds to the browser-side cart. Payment itself is not
                connected yet — see docs/ECOMMERCE-ROADMAP.md. */}
            <div className="mt-10 border-y border-ink/15 py-8">
              {product.commerce ? (
                <>
                  <p className="font-display text-4xl font-light tabular-nums">
                    {formatPrice(product.commerce.priceCents)}
                  </p>
                  <AddToCart slug={product.slug} className="mt-7" />
                </>
              ) : product.externalUrl ? (
                <>
                  <p className="font-display text-4xl font-light">Waarde naar keuze</p>
                  <div className="mt-7">
                    <ArrowLink href={product.externalUrl}>Bestel de cadeaubon</ArrowLink>
                  </div>
                </>
              ) : null}
            </div>

            <p className="mt-10 max-w-lg text-lg leading-relaxed text-ink-soft">
              {product.description}
            </p>

            <p className="eyebrow mt-12 text-clay">Wat zit erin</p>
            <ul className="mt-4 border-t border-ink/15">
              {product.contents.map((item) => (
                <li key={item} className="border-b border-ink/15 py-3.5">
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm leading-relaxed text-ink-soft">
              Gratis ophalen in het restaurant, of verzending in België.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
