"use client";

import { useSyncExternalStore } from "react";
import { ArrowLink, SolidLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

/**
 * What checkout leaves behind for this page to show. Written to
 * sessionStorage under `crkl-last-order` by the payment step once payments
 * exist — nothing writes it today, so the page shows its "no order" state.
 */
export type PlacedOrder = {
  number: string;
  email: string;
  delivery: string;
  address?: string;
  lines: { name: string; quantity: number; totalCents: number }[];
  totalCents: number;
};

const KEY = "crkl-last-order";

function read(): string | null {
  try {
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** The order just placed in this tab, if there is one. */
function useLastOrder(): PlacedOrder | null {
  const raw = useSyncExternalStore(
    () => () => {},
    read,
    () => null,
  );
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PlacedOrder;
  } catch {
    return null;
  }
}

/** The confirmation statement and the recap under it. */
export function OrderConfirmation() {
  const order = useLastOrder();

  if (!order) {
    return (
      <section className="bg-blush pt-36 pb-24 text-ink sm:pb-32 lg:pt-44">
        <div className="mx-auto max-w-[100rem] px-7 sm:px-10">
          <p className="eyebrow text-stone">Bestelling</p>
          <h1 className="font-display mt-7 max-w-4xl text-[clamp(2.75rem,6.4vw,6rem)] leading-[1.02] font-light">
            We vinden hier geen <em>recente bestelling</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
            Deze pagina toont uw bevestiging vlak na het afrekenen. Een vraag
            over een bestelling? Neem gerust contact op.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <SolidLink href="/shop">Naar de shop</SolidLink>
            <ArrowLink href="/contact">Contacteer ons</ArrowLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-blush pt-36 pb-24 text-ink sm:pb-32 lg:pt-44">
        <div className="mx-auto max-w-[100rem] px-7 sm:px-10">
          <p className="eyebrow text-stone">Bestelling #{order.number}</p>
          <h1 className="font-display mt-7 max-w-4xl text-[clamp(2.75rem,6.4vw,6rem)] leading-[1.02] font-light">
            Bedankt! Uw bestelling is <em>bevestigd</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
            U ontvangt zo een e-mail op {order.email} met alle details.
          </p>
        </div>
      </section>

      <section className="bg-cream py-24 text-ink sm:py-32">
        <div className="mx-auto max-w-3xl px-7 sm:px-10">
          <h2 className="eyebrow text-stone">Overzicht</h2>
          <ul className="mt-6 border-t border-line">
            {order.lines.map((line) => (
              <li key={line.name} className="flex justify-between gap-6 border-b border-line py-4">
                <span>
                  {line.quantity} × {line.name}
                </span>
                <span className="tabular-nums">{formatPrice(line.totalCents)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2">
            <div className="flex justify-between gap-6">
              <dt>Levering</dt>
              <dd>{order.delivery}</dd>
            </div>
            {order.address ? (
              <div className="flex justify-between gap-6">
                <dt>Adres</dt>
                <dd className="text-right">{order.address}</dd>
              </div>
            ) : null}
            <div className="flex items-baseline justify-between gap-6 border-t border-line pt-5">
              <dt>Totaal</dt>
              <dd className="font-display text-4xl font-light tabular-nums">
                {formatPrice(order.totalCents)}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
