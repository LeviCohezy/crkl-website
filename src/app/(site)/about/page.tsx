import type { Metadata } from "next";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { MediaImage } from "@/components/media/MediaImage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Story",
  description:
    "How CRKL works: the growers, the cellar, and why our wine keeps its tension.",
};

const steps = [
  {
    title: "Source",
    body: "We work with a short list of growers farming organically on soils we believe in. No brokers, no bulk lots.",
  },
  {
    title: "Pick",
    body: "Hand-harvested in the cool of the morning, sorted twice, and pressed the same day.",
  },
  {
    title: "Ferment",
    body: "Wild yeast only, in neutral vessels. We intervene when the wine asks for it and not before.",
  },
  {
    title: "Bottle",
    body: "Unfined, lightly filtered or not at all, with a minimal sulphur addition at bottling.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream py-20 sm:py-28">
        <Container width="wide">
          <SectionHeading
            as="h1"
            eyebrow="Our story"
            title="A small house, built around one stubborn preference"
            intro="We like wine that moves. Bright, savoury, a little unresolved — the kind you keep going back to rather than admiring from a distance. Everything we do in the cellar is in service of keeping that liveliness intact."
          />
        </Container>
      </section>

      {/* Film strip — a good home for the longer footage. */}
      <section className="relative isolate h-[55svh] overflow-hidden bg-ink">
        <div className="absolute inset-0 -z-10">
          <BackgroundVideo
            src="clips/cellar-work.mp4"
            poster="vineyard/cellar.jpg"
          />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/35" />
        <Container width="wide" className="flex h-full items-end pb-12">
          <p className="font-display max-w-lg text-2xl leading-snug font-light text-cream sm:text-3xl">
            &ldquo;Good wine is mostly a sequence of decisions not to
            interfere.&rdquo;
          </p>
        </Container>
      </section>

      <section className="bg-cream py-24 sm:py-32">
        <Container width="wide">
          <SectionHeading eyebrow="How we work" title="Four steps, no shortcuts" />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-ink/15 pt-6">
                <p className="font-display text-brass text-sm tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-2xl font-light">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-cream-dim/40 py-24 sm:py-32">
        <Container width="wide">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <SectionHeading
                eyebrow="The people"
                title="Everyone here has pruned a vine"
                intro="CRKL is a handful of people who met over other people's wine. We split our year between the vineyards we buy from and the cellar where the wine is raised."
              />
              <div className="mt-10">
                <ButtonLink href="/contact" variant="outline">
                  Work with us
                </ButtonLink>
              </div>
            </div>
            <MediaImage
              src="people/team.jpg"
              alt="The CRKL team in the cellar"
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="order-1 lg:order-2"
              fallbackLabel="Team photography"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
