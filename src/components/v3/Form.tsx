"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useState, type ReactNode } from "react";
import { PinkButton } from "@/components/v3/Links";
import { type as t } from "@/components/v3/type";
import {
  sendEnquiry,
  type EnquiryKind,
  type EnquiryState,
} from "@/lib/enquiry";
import { site } from "@/lib/site";

const EXPO = [0.16, 1, 0.3, 1] as const;
const initial: EnquiryState = { status: "idle" };

function Field({
  label,
  name,
  error,
  children,
  className = "",
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={name} className={`block ${className}`}>
      <span className="label">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-2 block text-sm text-clay">
          {error}
        </span>
      ) : null}
    </label>
  );
}

const occasions: Partial<Record<EnquiryKind, string[]>> = {
  "the-room": [
    "Business diner",
    "Zakenlunch",
    "Vergadering met lunch",
    "Privédiner",
    "Walking dinner",
    "Iets anders",
  ],
  event: [
    "Bedrijfsevent",
    "Verjaardag of jubileum",
    "Communie of babyborrel",
    "Huwelijksfeest",
    "Iets anders",
  ],
  trouwen: [
    "Ceremonie, receptie en diner",
    "Receptie en diner",
    "Enkel diner",
    "Nog te bespreken",
  ],
};

export type FormProps = {
  kind: Exclude<EnquiryKind, "reservatie">;
  submitLabel: string;
  /** Date and guests first, the rest on a second step. */
  steps?: boolean;
  /** One line beside the button. */
  note?: string;
};

/**
 * The three enquiries and the contact form, all through `sendEnquiry`;
 * tables are booked step by step in `Reserve` instead. Labels are plain
 * words, fields are a hairline, and the one button is pink.
 */
export function Form({ kind, submitLabel, steps = false, note }: FormProps) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const [step, setStep] = useState(1);
  const errors = state.errors ?? {};

  const dated = kind !== "contact";
  const kinds = occasions[kind];
  const first = !steps || step === 1 || Boolean(errors.date || errors.guests);

  if (state.status === "sent" || state.status === "unavailable") {
    return (
      <motion.div
        role="status"
        className="flex min-h-[20rem] flex-col items-start justify-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EXPO }}
      >
        {state.status === "sent" ? (
          <>
            <h3 className={t.h2}>
              Dank u. Uw aanvraag is <em>onderweg</em>.
            </h3>
            <p className={`${t.body} mt-6 max-w-md`}>
              We lezen uw bericht en antwoorden zo snel mogelijk.
            </p>
          </>
        ) : (
          <>
            <h3 className={t.h2}>
              Nog <em>één</em> stap
            </h3>
            <p className={`${t.body} mt-6 max-w-md`}>
              Online versturen lukt op dit moment niet. Uw aanvraag staat klaar
              in een e-mail — verstuur ze zelf, of bel ons op{" "}
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="link-line text-ink"
              >
                {site.contact.phone}
              </a>
              .
            </p>
            {state.mailto ? (
              <a
                href={state.mailto}
                className="sweep mt-8 inline-flex h-14 items-center bg-blush px-8 text-base text-ink [--sweep:var(--color-line-strong)]"
              >
                Open de e-mail
              </a>
            ) : null}
          </>
        )}
      </motion.div>
    );
  }

  const grid = "grid gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-9";

  return (
    <form action={action} noValidate>
      <input type="hidden" name="kind" value={kind} />
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {steps ? (
        <p className="mb-10 flex items-center gap-4 text-sm text-stone tabular-nums">
          <span className={first ? "text-ink" : ""}>1 — Datum en gasten</span>
          <span aria-hidden className="h-px w-10 bg-line-strong" />
          <span className={first ? "" : "text-ink"}>2 — Uw gegevens</span>
        </p>
      ) : null}

      {
        <div className={`${grid} ${first ? "" : "hidden"}`}>
          {dated ? (
            <>
              <Field label="Datum" name="date" error={errors.date}>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="field"
                />
              </Field>
              <Field label="Aantal gasten" name="guests" error={errors.guests}>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder="12"
                  required
                  className="field"
                />
              </Field>
            </>
          ) : null}
        </div>
      }

      <AnimatePresence initial={false}>
        {!steps || !first ? (
          <motion.div
            key="details"
            className={`${grid} ${steps ? "" : dated ? "mt-9" : ""}`}
            initial={steps ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EXPO }}
          >
            {kinds ? (
              <Field
                label="Gelegenheid"
                name="occasion"
                className="sm:col-span-2"
              >
                <select id="occasion" name="occasion" className="field">
                  {kinds.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>
            ) : null}
            <Field label="Naam" name="name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="field"
              />
            </Field>
            <Field label="E-mail" name="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="field"
              />
            </Field>
            <Field label="Telefoon" name="phone" className="sm:col-span-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="field"
              />
            </Field>
            <Field
              label="Bericht"
              name="message"
              error={errors.message}
              className="sm:col-span-2"
            >
              <textarea
                id="message"
                name="message"
                rows={3}
                className="field resize-none"
              />
            </Field>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-6">
        {steps && first ? (
          <PinkButton type="button" onClick={() => setStep(2)}>
            Volgende
          </PinkButton>
        ) : (
          <PinkButton type="submit" disabled={pending}>
            {pending ? "Even geduld" : submitLabel}
          </PinkButton>
        )}
        {steps && !first ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="link-line pb-1 text-base"
          >
            Terug
          </button>
        ) : null}
        {note ? <p className={`${t.small} max-w-xs`}>{note}</p> : null}
      </div>
    </form>
  );
}
