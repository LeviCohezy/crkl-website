"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCartLines, type Delivery } from "@/components/shop/CartView";
import { SolidButton, SolidLink } from "@/components/ui/Button";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { imageUrl } from "@/lib/media";
import { site } from "@/lib/site";

const EXPO = [0.16, 1, 0.3, 1] as const;

const steps = ["Gegevens", "Levering", "Betaling"];

type Details = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
};

/**
 * The checkout tunnel: three steps in one column, one at a time, with the
 * order beside it.
 *
 * PAYMENT IS NOT CONNECTED. The first two steps work; the third says so
 * plainly and offers the order as a pre-written e-mail instead of taking
 * money. Replace `PaymentStep` with a Stripe Checkout redirect when the shop
 * opens — see docs/ECOMMERCE-ROADMAP.md, phase 2.
 */
export function CheckoutFlow({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const { lines, subtotal, count } = useCartLines(products);
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState<Delivery>(
    params.get("levering") === "verzending" ? "verzending" : "ophalen",
  );
  const [details, setDetails] = useState<Details>({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
  });

  const set = (key: keyof Details) => (event: FormEvent<HTMLInputElement>) => {
    // Read the value now: the event's target is gone by the time React runs
    // the updater.
    const { value } = event.currentTarget;
    setDetails((current) => ({ ...current, [key]: value }));
  };

  if (count === 0) {
    return (
      <div className="py-16">
        <p className="font-display text-4xl font-light sm:text-5xl">
          Uw winkelmand is <em>leeg</em>
        </p>
        <div className="mt-10">
          <SolidLink href="/shop">Naar de shop</SolidLink>
        </div>
      </div>
    );
  }

  const order = [
    ...lines.map(
      (line) =>
        `${line.quantity} × ${line.product.name} — ${formatPrice(line.priceCents * line.quantity)}`,
    ),
    `Totaal: ${formatPrice(subtotal)}`,
    `Levering: ${delivery === "ophalen" ? "ophalen in het restaurant" : "verzending"}`,
    "",
    `Naam: ${details.name}`,
    `E-mail: ${details.email}`,
    details.phone ? `Telefoon: ${details.phone}` : "",
    delivery === "verzending" ? `Adres: ${details.street}, ${details.city}` : "",
  ]
    .filter((line, index) => line || index === lines.length + 2)
    .join("\n");

  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Bestelling — ${details.name}`)}&body=${encodeURIComponent(order)}`;

  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        {/* ── Step indicator ───────────────────────────────────────────── */}
        <ol className="flex items-center gap-4 border-b border-line pb-6">
          {steps.map((label, index) => (
            <li key={label} className="flex items-center gap-4">
              {index > 0 ? <span aria-hidden className="h-px w-6 bg-ink/25 sm:w-10" /> : null}
              <button
                type="button"
                disabled={index >= step}
                onClick={() => setStep(index)}
                aria-current={index === step ? "step" : undefined}
                className={`eyebrow tabular-nums ${index === step ? "text-ink" : "text-stone"} ${
                  index < step ? "link-line pb-1" : ""
                }`}
              >
                {String(index + 1).padStart(2, "0")} {label}
              </button>
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: EXPO }}
            className="pt-12"
          >
            {step === 0 ? (
              <form onSubmit={next} className="space-y-9">
                <h2 className="font-display text-4xl font-light">Uw gegevens</h2>
                <label className="block">
                  <span className="eyebrow text-ink-soft">Naam</span>
                  <input className="field" required autoComplete="name" value={details.name} onInput={set("name")} />
                </label>
                <label className="block">
                  <span className="eyebrow text-ink-soft">E-mail</span>
                  <input className="field" type="email" required autoComplete="email" value={details.email} onInput={set("email")} />
                </label>
                <label className="block">
                  <span className="eyebrow text-ink-soft">Telefoon</span>
                  <input className="field" type="tel" autoComplete="tel" value={details.phone} onInput={set("phone")} />
                </label>
                <p className="text-sm text-ink-soft">
                  U rekent af als gast. Een account is niet nodig.
                </p>
                <SolidButton type="submit">Volgende — levering</SolidButton>
              </form>
            ) : null}

            {step === 1 ? (
              <form onSubmit={next} className="space-y-9">
                <h2 className="font-display text-4xl font-light">Levering</h2>
                <fieldset className="space-y-4">
                  <label className="flex cursor-pointer items-baseline justify-between gap-6 border-b border-line pb-4">
                    <span className="flex items-baseline gap-3">
                      <input type="radio" name="delivery" className="accent-ink" checked={delivery === "ophalen"} onChange={() => setDelivery("ophalen")} />
                      Ophalen in het restaurant
                    </span>
                    <span className="text-sm">Gratis</span>
                  </label>
                  <label className="flex cursor-pointer items-baseline justify-between gap-6 border-b border-line pb-4">
                    <span className="flex items-baseline gap-3">
                      <input type="radio" name="delivery" className="accent-ink" checked={delivery === "verzending"} onChange={() => setDelivery("verzending")} />
                      Verzending in België
                    </span>
                    <span className="text-sm">Prijs volgt</span>
                  </label>
                </fieldset>
                {delivery === "verzending" ? (
                  <>
                    <label className="block">
                      <span className="eyebrow text-ink-soft">Straat en nummer</span>
                      <input className="field" required autoComplete="street-address" value={details.street} onInput={set("street")} />
                    </label>
                    <label className="block">
                      <span className="eyebrow text-ink-soft">Postcode en gemeente</span>
                      <input className="field" required autoComplete="postal-code" value={details.city} onInput={set("city")} />
                    </label>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {site.contact.street}, {site.contact.city}. We laten weten
                    wanneer uw bestelling klaarstaat.
                  </p>
                )}
                <SolidButton type="submit">Volgende — betaling</SolidButton>
              </form>
            ) : null}

            {step === 2 ? (
              <div className="space-y-8">
                <h2 className="font-display text-4xl font-light">Betaling</h2>
                <div className="rounded-2xl border border-line-strong p-7">
                  <p className="font-display text-2xl leading-snug font-light">
                    Online betalen is nog niet actief.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-soft">
                    Tot de webshop opent, bestelt u rechtstreeks bij het
                    restaurant. Uw bestelling staat klaar in een e-mail — of
                    bel ons op{" "}
                    <a href={`tel:${site.contact.phoneHref}`} className="link-line text-ink">
                      {site.contact.phone}
                    </a>
                    .
                  </p>
                  <a
                    href={mailto}
                    className="eyebrow sweep mt-7 inline-flex h-14 items-center rounded-full bg-blush px-9 text-ink [--sweep:var(--color-line-strong)]"
                  >
                    Bestel per e-mail
                  </a>
                </div>
                <SolidButton type="button" disabled>
                  Betaal {formatPrice(subtotal)}
                </SolidButton>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Order summary ────────────────────────────────────────────── */}
      <aside className="lg:col-span-5 lg:col-start-8">
        <details open className="rounded-3xl bg-petal p-8 sm:p-10 lg:sticky lg:top-28">
          <summary className="eyebrow flex cursor-pointer items-baseline justify-between text-stone">
            <span>Uw bestelling ({count})</span>
            <span className="font-display text-2xl tracking-normal text-ink normal-case tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </summary>
          <ul className="mt-7 space-y-5">
            {lines.map(({ product, quantity, priceCents }) => (
              <li key={product.slug} className="flex items-center gap-5">
                <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-blush">
                  <Image src={imageUrl(product.image)} alt="" fill sizes="4rem" className="object-cover" />
                </div>
                <p className="flex-1">
                  {product.name}
                  <span className="block text-sm text-ink-soft tabular-nums">× {quantity}</span>
                </p>
                <p className="tabular-nums">{formatPrice(priceCents * quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-7 space-y-2 border-t border-line pt-6 text-sm">
            <div className="flex justify-between">
              <dt>Levering</dt>
              <dd>{delivery === "ophalen" ? "Ophalen — gratis" : "Verzending — prijs volgt"}</dd>
            </div>
          </dl>
        </details>
      </aside>
    </div>
  );
}
