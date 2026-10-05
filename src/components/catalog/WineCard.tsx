import Link from "next/link";
import { MediaImage } from "@/components/media/MediaImage";
import { styleLabels, wineTitle, type Wine } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export function WineCard({ wine }: { wine: Wine }) {
  return (
    <Link href={`/wines/${wine.slug}`} className="group block">
      <MediaImage
        src={wine.image}
        alt={`Bottle of ${wineTitle(wine)}`}
        aspect="aspect-[4/5]"
        fallbackLabel={wine.name}
        imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
      />

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-light text-ink">
          {wineTitle(wine)}
        </h3>
        {wine.commerce ? (
          <p className="text-sm text-stone tabular-nums">
            {formatPrice(wine.commerce.priceCents)}
          </p>
        ) : null}
      </div>

      <p className="eyebrow mt-2 text-stone">
        {styleLabels[wine.style]} · {wine.region}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
        {wine.tagline}
      </p>
    </Link>
  );
}
