import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { AddToCart } from "@/components/shop/AddToCart";
import { TextLink } from "@/components/v3/Links";
import { type as t, wrap } from "@/components/v3/type";
import { categoryLabels, getProduct, getProductSlugs } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

/** Pre-render every product at build time. */
export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/v3/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) return { title: "Niet gevonden" };
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/v3/shop/${product.slug}` },
  };
}

export default async function ProductPage(props: PageProps<"/v3/shop/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className={`${wrap} pt-36 pb-32 sm:pt-44 sm:pb-40 lg:pt-52`}>
      <TextLink href="/shop">Terug naar de shop</TextLink>

      <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Unveil>
            <MediaImage
              src={product.image}
              alt={product.imageAlt}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              fallbackLabel={product.name}
            />
          </Unveil>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:py-6">
          <p className={t.small}>{categoryLabels[product.category]}</p>
          <SplitText as="h1" text={product.name} immediate delay={0.3} className={`${t.h2} mt-4`} />
          <Reveal delay={0.2}>
            <p className="font-display mt-6 text-2xl leading-snug font-light italic text-ink-soft">{product.tagline}</p>
          </Reveal>

          {/* The price comes from the catalogue; payment is not connected yet. */}
          <div className="mt-10 border-y border-line py-8">
            {product.commerce ? (
              <>
                <p className="font-display text-4xl font-light tabular-nums">{formatPrice(product.commerce.priceCents)}</p>
                <AddToCart slug={product.slug} className="mt-7" />
              </>
            ) : product.externalUrl ? (
              <>
                <p className="font-display text-4xl font-light">Waarde naar keuze</p>
                <div className="mt-7">
                  <TextLink href={product.externalUrl}>Bestel de cadeaubon</TextLink>
                </div>
              </>
            ) : null}
          </div>

          <p className={`${t.lead} mt-10 max-w-lg`}>{product.description}</p>

          <p className={`${t.small} mt-12`}>Wat zit erin</p>
          <ul className="mt-4 border-t border-line">
            {product.contents.map((item) => (
              <li key={item} className="border-b border-line py-3.5">
                {item}
              </li>
            ))}
          </ul>

          <p className={`${t.small} mt-8`}>Gratis ophalen in het restaurant, of verzending in België.</p>
        </div>
      </div>
    </div>
  );
}
