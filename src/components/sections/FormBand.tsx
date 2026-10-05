import type { ComponentProps, ReactNode } from "react";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Band } from "@/components/sections/Band";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { site } from "@/lib/site";

type FormBandProps = {
  id: string;
  eyebrow: string;
  /** "\n" breaks the line, *asterisks* set a word in italic. */
  title: string;
  intro?: string;
  /** Anything to show above the form — a link for misrouted visitors. */
  before?: ReactNode;
  form: ComponentProps<typeof EnquiryForm>;
};

/**
 * Where a page converts. Always on the brand rose, always a form in the page
 * itself rather than a button to somewhere else — title and hours on the
 * left, the form on the right.
 */
export function FormBand({ id, eyebrow, title, intro, before, form }: FormBandProps) {
  return (
    <Band tone="brand" id={id}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow text-rosewood">{eyebrow}</p>
          </Reveal>
          <SplitText
            text={title}
            className="font-display mt-6 text-[clamp(2.6rem,5.2vw,5rem)] leading-[1.02] font-light"
          />
          {intro ? (
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-sm leading-relaxed text-ink-soft">{intro}</p>
            </Reveal>
          ) : null}
          <Reveal delay={0.2} className="mt-10 border-t border-ink/20 pt-7 text-sm leading-relaxed">
            <p className="eyebrow text-rosewood">Liever rechtstreeks</p>
            <p className="mt-3">
              <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                {site.contact.phone}
              </a>
              <br />
              <a href={`mailto:${site.contact.email}`} className="link-line">
                {site.contact.email}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          {before ? <div className="mb-10">{before}</div> : null}
          <EnquiryForm {...form} />
        </Reveal>
      </div>
    </Band>
  );
}

/**
 * The table reservation, as it appears on the homepage and on Menu, Lunch,
 * Diner and the two credential pages. `id="reserveer"` is what the header
 * button scrolls to.
 */
export function ReservationBand({
  title = "Reserveer\n*een tafel*",
  submitLabel = "Reserveer een tafel",
  service,
}: {
  title?: string;
  submitLabel?: string;
  service?: "lunch" | "diner";
}) {
  return (
    <FormBand
      id="reserveer"
      eyebrow="Reserveren"
      title={title}
      intro={`Lunch van ${site.hours.lunch.days.toLowerCase()}, diner van ${site.hours.dinner.days.toLowerCase()}.`}
      form={{
        kind: "reservatie",
        submitLabel,
        service,
        note: "Uw tafel ligt vast na onze bevestiging.",
      }}
    />
  );
}
