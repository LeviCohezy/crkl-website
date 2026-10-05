import { WineCard } from "@/components/catalog/WineCard";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { MediaImage } from "@/components/media/MediaImage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedWines } from "@/lib/catalog";
import { heroMedia, site } from "@/lib/site";

export default async function HomePage() {
  const featured = await getFeaturedWines(3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-bordeaux-deep">
        <div className="absolute inset-0 -z-10">
          <BackgroundVideo src={heroMedia.video} poster={heroMedia.poster} />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20"
        />

        <Container width="wide" className="pb-20 pt-32 sm:pb-28">
          <p className="eyebrow text-brass">{site.tagline}</p>
          <h1 className="font-display mt-6 max-w-3xl text-balance text-5xl leading-[1.05] font-light text-cream sm:text-6xl lg:text-7xl">
            Wine that stays awake in the glass
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/wines" variant="onDark">
              The range
            </ButtonLink>
            <ButtonLink href="/about" variant="onDark">
              Our story
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ── Statement ────────────────────────────────────────────────────── */}
      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Who we are"
            title="Five wines. One idea."
            intro={
              <>
                We buy fruit from growers who farm without shortcuts, ferment
                with what is already on the skins, and bottle with as little
                between the vineyard and the glass as we can manage. The result
                is wine with tension — the crackle we named the house after.
              </>
            }
          />
        </Container>
      </section>

      {/* ── Featured wines ───────────────────────────────────────────────── */}
      <section className="bg-cream-dim/40 py-24 sm:py-32">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selection" title="Current bottles" />
            <ButtonLink href="/wines" variant="outline">
              All wines
            </ButtonLink>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((wine) => (
              <WineCard key={wine.slug} wine={wine} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Vineyard ─────────────────────────────────────────────────────── */}
      <section className="bg-cream py-24 sm:py-32">
        <Container width="wide">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <MediaImage
              src="vineyard/old-vines.jpg"
              alt="Old vines on a steep slope"
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              fallbackLabel="Vineyard photography"
            />
            <div>
              <SectionHeading
                eyebrow="In the vineyard"
                title="Farmed by people we know by name"
                intro="Every parcel we work with is farmed organically or better. We walk the rows before harvest, pick by hand, and press within hours. Nothing is corrected in the cellar that could have been got right outside it."
              />
              <div className="mt-10">
                <ButtonLink href="/about" variant="outline">
                  How we work
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Closing band ─────────────────────────────────────────────────── */}
      <section className="bg-ink py-24 text-cream sm:py-32">
        <Container width="narrow" className="text-center">
          <SectionHeading
            align="center"
            tone="light"
            eyebrow="Trade & private"
            title="Pouring CRKL on your list?"
            intro="Restaurants, wine bars and retailers can request the trade sheet and current allocations. Private orders open with the online shop."
          />
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact" variant="onDark">
              Get in touch
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
