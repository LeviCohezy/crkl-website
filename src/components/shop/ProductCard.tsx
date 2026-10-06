import { MediaImage } from "@/components/media/MediaImage";
import { Unveil } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/shell/PageTransition";
import { AddToCart } from "@/components/shop/AddToCart";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
  /** Show the add-to-cart button on the card itself. */
  buyable?: boolean;
  delay?: number;
};

/** A product: its picture, its name on a hairline, and what it costs. */
export function ProductCard({ product, buyable = false, delay = 0 }: ProductCardProps) {
  return (
    <article>
      <TransitionLink href={`/shop/${product.slug}`} className="group block">
        <Unveil delay={delay}>
          <MediaImage
            src={product.image}
            alt={product.imageAlt}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
            imageClassName="transition-transform duration-[1600ms] ease-expo group-hover:scale-[1.04]"
            fallbackLabel={product.name}
          />
        </Unveil>
        <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-line pb-5">
          <h3 className="font-display text-3xl leading-tight font-light">{product.name}</h3>
          <p className="font-display text-xl font-light whitespace-nowrap tabular-nums">
            {product.commerce ? formatPrice(product.commerce.priceCents) : "Waarde naar keuze"}
          </p>
        </div>
      </TransitionLink>
      <p className="mt-4 leading-relaxed text-ink-soft">{product.tagline}</p>

      {buyable ? (
        <div className="mt-6">
          {product.commerce ? (
            <AddToCart slug={product.slug} />
          ) : product.externalUrl ? (
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="eyebrow sweep inline-flex h-12 items-center rounded-full bg-blush px-7 text-ink [--sweep:var(--color-line-strong)]"
            >
              Bestel de bon
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
