import type { Metadata } from "next";
import Link from "next/link";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { MediaImage } from "@/components/media/MediaImage";
import { LetterHero } from "@/components/sections/LetterHero";
import { KitchenStatement } from "@/components/sections/KitchenStatement";
import { MenuScroller } from "@/components/sections/MenuScroller";
import { WhiteReveal } from "@/components/sections/WhiteReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getWines, styleLabels, wineTitle } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Homepage — Editorial",
  robots: { index: false, follow: false },
};


/**
 * VERSION 02 — EDITORIAL
 * Light, typographic and calm. Split hero, wines presented as a numbered
 * catalogue rather than cards. Holds up with very little photography.
 */
export default async function VersionTwo() {
  const wines = await getWines();

  return (
    <div className="bg-white">
      <FloatingHeader tone="dark" cta={{ href: "/contact", label: "Book a table" }} />

      <WhiteReveal>
        <LetterHero />
      </WhiteReveal>

      {/* ── Catalogue ────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-bordeaux">The list</p>
              <h2 className="font-display mt-4 text-4xl font-light sm:text-5xl">
                Everything we bottle
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-stone">
              Small lots, released once a year. When a wine is gone it stays
              gone until the next harvest.
            </p>
          </div>

          <ul className="mt-14">
            {wines.map((wine, index) => (
              <li key={wine.slug}>
                <Link
                  href={`/wines/${wine.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 border-t border-ink/15 py-7 transition-colors hover:bg-cream-dim/50 sm:grid-cols-[3rem_1.4fr_1fr_auto_2rem] sm:gap-x-8"
                >
                  <span className="font-display text-xs text-brass tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-display text-2xl font-light transition-colors group-hover:text-bordeaux sm:text-3xl">
                    {wineTitle(wine)}
                  </span>

                  <span className="col-start-2 text-sm text-stone sm:col-start-3">
                    {styleLabels[wine.style]} · {wine.grapes.join(", ")} ·{" "}
                    {wine.region}
                  </span>

                  <span className="col-start-3 row-start-1 text-sm tabular-nums text-ink sm:col-start-4">
                    {wine.commerce ? formatPrice(wine.commerce.priceCents) : "—"}
                  </span>

                  <span
                    aria-hidden
                    className="hidden text-xl text-stone transition-transform duration-300 group-hover:translate-x-1 sm:block"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-ink/15" />
        </Container>
      </section>

      <MenuScroller />

      <KitchenStatement />

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <section className="bg-cream/60 py-24 sm:py-32">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <MediaImage
              src="all/CRKL_Leveranciers_Juni26_LR©Hablar-1.jpg"
              alt="Walking the fields with the growers we buy from"
              aspect="aspect-[3/4]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              fallbackLabel="Photography"
            />
            <div className="lg:py-10">
              <p className="eyebrow text-bordeaux">In the vineyard</p>
              <h2 className="font-display mt-4 text-balance text-4xl leading-tight font-light sm:text-5xl">
                Nothing corrected in the cellar that could have been got right
                outside it
              </h2>
              <p className="mt-8 leading-relaxed text-ink-soft/80">
                Every parcel we work with is farmed organically or better. We
                walk the rows before harvest, pick by hand in the cool of the
                morning, and press within hours.
              </p>
              <blockquote className="font-display mt-10 border-l border-brass pl-6 text-2xl leading-snug font-light">
                &ldquo;Good wine is mostly a sequence of decisions not to
                interfere.&rdquo;
              </blockquote>
              <div className="mt-10">
                <ButtonLink href="/about" variant="outline">
                  Read our story
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <section className="bg-bordeaux py-24 text-cream sm:py-28">
        <Container width="wide">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-cream/60">Trade &amp; private</p>
              <h2 className="font-display mt-4 max-w-xl text-balance text-4xl leading-tight font-light sm:text-5xl">
                Pouring CRKL on your list?
              </h2>
            </div>
            <ButtonLink href="/contact" variant="onDark">
              Request the trade sheet
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ── Light footer ─────────────────────────────────────────────────── */}
      <footer className="py-16">
        <Container width="wide">
          <div className="flex flex-col gap-8 border-t border-ink/15 pt-10 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-display text-2xl tracking-[0.3em]">
                {site.name}
              </p>
              <p className="mt-3 text-sm text-stone">{site.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-ink-soft/75 transition-colors hover:text-bordeaux"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-ink-soft/75 transition-colors hover:text-bordeaux"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
          <p className="mt-10 text-xs text-stone">
            © {new Date().getFullYear()} {site.name}. Enjoy responsibly. 18+
          </p>
        </Container>
      </footer>
    </div>
  );
}
