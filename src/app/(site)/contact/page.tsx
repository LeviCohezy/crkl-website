import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Trade enquiries, allocations and press requests for CRKL wine.",
};

const enquiries = [
  {
    title: "Trade & on-trade",
    body: "Restaurants, wine bars and retailers: ask for the current trade sheet, allocations and sample availability.",
  },
  {
    title: "Private orders",
    body: "Case orders by email until the online shop opens. Tell us what you are after and we will come back with what is in the cellar.",
  },
  {
    title: "Press",
    body: "Tasting samples, high-resolution images and founder interviews on request.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-cream py-20 sm:py-28">
      <Container width="wide">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Talk to us directly"
          intro="We answer our own email, usually within two working days."
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow text-stone">Email</p>
            <a
              href={`mailto:${site.contact.email}`}
              className="font-display mt-3 block text-2xl font-light break-all text-ink transition-colors hover:text-bordeaux sm:text-3xl"
            >
              {site.contact.email}
            </a>

            {site.contact.phone ? (
              <>
                <p className="eyebrow mt-10 text-stone">Phone</p>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="mt-3 block text-lg text-ink transition-colors hover:text-bordeaux"
                >
                  {site.contact.phone}
                </a>
              </>
            ) : null}

            <p className="eyebrow mt-10 text-stone">Where we are</p>
            <address className="mt-3 text-sm leading-relaxed text-ink-soft/85 not-italic">
              {site.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <div className="mt-10">
              <ButtonLink href={`mailto:${site.contact.email}`}>
                Write to us
              </ButtonLink>
            </div>
          </div>

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {enquiries.map((item) => (
              <li
                key={item.title}
                className="border-t border-ink/15 pt-6 lg:max-w-xl"
              >
                <h2 className="font-display text-xl font-light">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
