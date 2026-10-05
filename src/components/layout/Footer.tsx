import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream">
      <Container width="wide">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-3xl tracking-[0.2em]">{site.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              {site.tagline}. {site.description}
            </p>
          </div>

          <div>
            <p className="eyebrow text-brass">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-brass">Reach us</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-cream/70 transition-colors hover:text-cream"
                >
                  {site.contact.email}
                </a>
              </li>
              {site.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    rel="noreferrer noopener"
                    className="text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/15 py-8 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Enjoy responsibly. 18+</p>
        </div>
      </Container>
    </footer>
  );
}
