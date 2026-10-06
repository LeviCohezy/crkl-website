import type { ComponentProps, ReactNode } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Eyebrow, Ring, Square } from "@/components/motion/Accents";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Band } from "@/components/sections/Band";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import type { Photo } from "@/lib/photos";
import { site } from "@/lib/site";

type FormBandProps = {
  id: string;
  eyebrow: string;
  /** "\n" breaks the line, *asterisks* set words in italic. */
  title: string;
  intro?: string;
  /** Anything to show above the form — a link for misrouted visitors. */
  before?: ReactNode;
  form: ComponentProps<typeof EnquiryForm>;
  /** For `card`: the photograph behind the card. */
  photo?: Photo;
  /**
   * `card`  — the form in a cream card over a softened photograph, with the
   *           hours and the phone number each in a thin ring beside it (Armelio).
   * `split` — the title centred, the form left and a framed square right
   *           holding a photograph and the contact lines (Tastavents).
   * `plain` — title left, form right, on the brand rose.
   */
  variant?: "plain" | "card" | "split";
};

function Direct({ className = "" }: { className?: string }) {
  return (
    <div className={`text-sm leading-relaxed ${className}`}>
      <p className="eyebrow text-stone">Liever rechtstreeks</p>
      <p className="mt-3">
        <a href={`tel:${site.contact.phoneHref}`} className="link-line tabular-nums">
          {site.contact.phone}
        </a>
        <br />
        <a href={`mailto:${site.contact.email}`} className="link-line">
          {site.contact.email}
        </a>
      </p>
    </div>
  );
}

/**
 * Where a page converts. Always on the brand rose, always a form in the page
 * itself rather than a button to somewhere else.
 */
export function FormBand({ id, eyebrow, title, intro, before, form, photo, variant = "plain" }: FormBandProps) {
  /* ── card ───────────────────────────────────────────────────────────── */
  if (variant === "card" && photo) {
    return (
      <section id={id} className="relative scroll-mt-20 overflow-hidden bg-blush text-ink">
        <div className="absolute inset-0 opacity-70">
          <MediaImage src={photo.src} alt="" aspect="h-full" sizes="100vw" imageClassName="scale-110 blur-sm" focus={photo.focus} />
          <div aria-hidden className="absolute inset-0 bg-blush/55" />
        </div>

        <div className="relative mx-auto grid max-w-[100rem] items-center gap-20 px-7 py-32 sm:gap-12 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:py-40">
          {/* Hours, in a ring. */}
          <Reveal className="hidden lg:col-span-3 lg:flex lg:justify-center">
            <div className="relative flex aspect-square w-72 flex-col items-center justify-center text-center">
              <Ring className="inset-0" dot={215} />
              <p className="eyebrow text-stone">Openingsuren</p>
              <dl className="mt-5 space-y-2 text-sm">
                <div>
                  <dt className="text-ink-soft">Lunch · {site.hours.lunch.days}</dt>
                  <dd className="font-display text-xl">{site.hours.lunch.hours}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Diner · {site.hours.dinner.days}</dt>
                  <dd className="font-display text-xl">{site.hours.dinner.hours}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-4">
            <div className="bg-cream/95 px-7 py-16 shadow-[0_30px_80px_-40px_rgb(42_28_26/0.25)] sm:px-12 sm:py-16">
              <div className="text-center">
                <Eyebrow className="justify-center text-ink-soft">{eyebrow}</Eyebrow>
                <SplitText
                  text={title}
                  className="font-display mt-6 text-[clamp(2.4rem,4.4vw,4.25rem)] leading-[1.04] font-light"
                />
                {intro ? <p className="mx-auto mt-6 max-w-sm leading-relaxed text-ink-soft">{intro}</p> : null}
              </div>
              <div className="mt-12">
                {before ? <div className="mb-10">{before}</div> : null}
                <EnquiryForm {...form} />
              </div>
            </div>
          </Reveal>

          {/* Phone and address, in a ring. */}
          <Reveal delay={0.2} className="hidden lg:col-span-3 lg:col-start-10 lg:flex lg:justify-center">
            <div className="relative flex aspect-square w-72 flex-col items-center justify-center text-center">
              <Ring className="inset-0" dot={40} />
              <p className="eyebrow text-stone">Liever rechtstreeks</p>
              <p className="font-display mt-5 text-2xl tabular-nums">
                <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                {site.contact.street}
                <br />
                {site.contact.city}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ── split ──────────────────────────────────────────────────────────── */
  if (variant === "split") {
    return (
      <Band tone="brand" id={id}>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center text-stone">{eyebrow}</Eyebrow>
          </Reveal>
          <SplitText
            text={title}
            className="font-display mt-6 text-[clamp(2.75rem,6vw,6rem)] leading-[1.02] font-light"
          />
          {intro ? (
            <Reveal delay={0.15}>
              <p className="mx-auto mt-7 max-w-md leading-relaxed text-ink-soft">{intro}</p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-20 grid gap-20 sm:gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.1} className="lg:col-span-7">
            {before ? <div className="mb-10">{before}</div> : null}
            <EnquiryForm {...form} />
          </Reveal>
          <Reveal delay={0.2} className="relative lg:col-span-4 lg:col-start-9">
            <Square className="-top-4 -right-4 h-full w-full" />
            <div className="relative border border-white/70 bg-white/40 p-6 sm:p-8">
              {photo ? (
                <MediaImage src={photo.src} alt={photo.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, 100vw" focus={photo.focus} />
              ) : null}
              <dl className="mt-8 divide-y divide-line text-sm">
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="eyebrow text-stone">Telefoon</dt>
                  <dd className="tabular-nums"><a href={`tel:${site.contact.phoneHref}`} className="link-line">{site.contact.phone}</a></dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="eyebrow text-stone">E-mail</dt>
                  <dd><a href={`mailto:${site.contact.email}`} className="link-line">{site.contact.email}</a></dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="eyebrow text-stone">Adres</dt>
                  <dd className="text-right">{site.contact.street}, {site.contact.city}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Band>
    );
  }

  /* ── plain ──────────────────────────────────────────────────────────── */
  return (
    <Band tone="brand" id={id}>
      <div className="grid gap-20 sm:gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow className="text-stone">{eyebrow}</Eyebrow>
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
          <Reveal delay={0.2}>
            <Direct className="mt-10 border-t border-line-strong pt-7" />
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
  variant = "split",
  photo,
}: {
  title?: string;
  submitLabel?: string;
  service?: "lunch" | "diner";
  variant?: FormBandProps["variant"];
  photo?: Photo;
}) {
  return (
    <FormBand
      id="reserveer"
      eyebrow="Reserveren"
      title={title}
      intro={`Lunch van ${site.hours.lunch.days.toLowerCase()}, diner van ${site.hours.dinner.days.toLowerCase()}.`}
      variant={variant}
      photo={photo}
      form={{
        kind: "reservatie",
        submitLabel,
        service,
        note: "Uw tafel ligt vast na onze bevestiging.",
      }}
    />
  );
}
