import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Homepage concepts",
  robots: { index: false, follow: false },
};

const versions = [
  {
    href: "/v2",
    number: "02",
    name: "Editorial",
    pitch:
      "Letter hero on the brand pink, scroll-driven white reveal, sticky menu with the dishes swapping as you scroll, and a full-viewport statement.",
    needs: "The real menu, and real opening hours.",
  },
];

export default function VersionsIndex() {
  return (
    <main className="min-h-svh bg-cream py-24">
      <Container>
        <p className="eyebrow text-bordeaux">Internal preview</p>
        <h1 className="font-display mt-4 text-4xl font-light sm:text-5xl">
          Homepage direction
        </h1>
        <p className="mt-5 max-w-xl text-stone">
          The surviving direction. V1 and V3 were deleted.
        </p>

        <ul className="mt-14 space-y-px">
          {versions.map((version) => (
            <li key={version.href}>
              <Link
                href={version.href}
                className="group flex flex-col gap-3 border-t border-ink/15 py-8 transition-colors hover:bg-cream-dim/40 sm:flex-row sm:gap-10"
              >
                <span className="font-display text-brass text-sm tabular-nums sm:w-12">
                  {version.number}
                </span>
                <span className="flex-1">
                  <span className="font-display block text-3xl font-light transition-colors group-hover:text-bordeaux">
                    {version.name}
                  </span>
                  <span className="mt-3 block max-w-xl text-sm leading-relaxed text-ink-soft/80">
                    {version.pitch}
                  </span>
                  <span className="eyebrow mt-4 block text-stone">
                    {version.needs}
                  </span>
                </span>
                <span className="self-center text-2xl text-stone transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
