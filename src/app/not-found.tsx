import { MediaImage } from "@/components/media/MediaImage";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { TransitionLink } from "@/components/shell/PageTransition";
import { ArrowLink, SolidLink } from "@/components/ui/Button";
import { shoot } from "@/lib/photos";
import { reserveHref } from "@/lib/site";

const exits = [
  { href: "/menu", label: "Menu", line: "Lunch, diner en dranken" },
  { href: reserveHref("/404"), label: "Reserveer", line: "Een tafel voor uw gezelschap" },
  { href: "/shop", label: "Shop", line: "Geschenkbox en cadeaubon" },
  { href: "/contact", label: "Contact", line: "Adres, uren en route" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-ink text-cream">
          <div className="absolute inset-0 opacity-45">
            <MediaImage
              src={shoot.dec25(10)}
              alt=""
              aspect="h-full"
              sizes="100vw"
              priority
              radius="rounded-none"
            />
          </div>
          <div className="relative mx-auto flex min-h-[80svh] max-w-[100rem] flex-col justify-end px-6 pt-40 pb-20 sm:px-10">
            <p className="eyebrow text-blush">404</p>
            <h1 className="font-display mt-7 max-w-4xl text-[clamp(2.75rem,7vw,7rem)] leading-[1.02] font-light">
              Deze pagina staat niet <em>op het menu</em>
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <SolidLink href="/" tone="light">
                Naar home
              </SolidLink>
              <ArrowLink href="/menu" tone="light">
                Bekijk het menu
              </ArrowLink>
            </div>
          </div>
        </section>

        <section className="bg-cream py-24 text-ink sm:py-32">
          <ul className="mx-auto grid max-w-[100rem] gap-x-8 gap-y-10 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
            {exits.map((exit) => (
              <li key={exit.label}>
                <TransitionLink
                  href={exit.href}
                  className="group block border-t border-line pt-6"
                >
                  <span className="flex items-baseline justify-between gap-6">
                    <span className="font-display text-4xl font-light">{exit.label}</span>
                    <span
                      aria-hidden
                      className="text-lg transition-transform duration-500 ease-expo group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-3 block text-ink-soft">{exit.line}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
