"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, type ReactNode } from "react";
import { PillButton } from "@/components/ui/Button";
import { sendEnquiry, type EnquiryState } from "@/lib/enquiry";
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
      <span className="eyebrow text-stone">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-2 block text-sm text-rosewood">
          {error}
        </span>
      ) : null}
    </label>
  );
}

/**
 * The reservation request and the contact form are the same form with a
 * different set of fields. Both go through `sendEnquiry`, which says plainly
 * when it could not deliver — see src/lib/enquiry.ts.
 */
export function EnquiryForm({ kind }: { kind: "reservatie" | "contact" }) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const errors = state.errors ?? {};
  const booking = kind === "reservatie";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "sent" || state.status === "unavailable" ? (
        <motion.div
          key="answer"
          role="status"
          className="flex min-h-[24rem] flex-col items-start justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EXPO }}
        >
          <span aria-hidden className="h-4 w-4 rounded-full bg-blush" />
          {state.status === "sent" ? (
            <>
              <h3 className="font-display mt-8 text-4xl leading-tight font-light sm:text-5xl">
                Dank u. Uw aanvraag is <em>onderweg</em>.
              </h3>
              <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
                {booking
                  ? "Uw tafel ligt pas vast zodra we uw aanvraag bevestigen. We nemen zo snel mogelijk contact met u op."
                  : "We lezen uw bericht en antwoorden zo snel mogelijk."}
              </p>
            </>
          ) : (
            <>
              <h3 className="font-display mt-8 text-4xl leading-tight font-light sm:text-5xl">
                Nog <em>één</em> stap
              </h3>
              <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
                Online versturen lukt op dit moment niet. Uw aanvraag staat
                klaar in een e-mail — verstuur ze zelf, of bel ons op{" "}
                <a href={`tel:${site.contact.phoneHref}`} className="link-line text-ink">
                  {site.contact.phone}
                </a>
                .
              </p>
              {state.mailto ? (
                <a
                  href={state.mailto}
                  className="eyebrow mt-8 inline-flex h-12 items-center rounded-full bg-ink px-7 text-cream"
                >
                  Open de e-mail
                </a>
              ) : null}
            </>
          )}
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={action}
          noValidate
          className="grid gap-x-8 gap-y-9 sm:grid-cols-2"
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
        >
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

          {booking ? (
            <>
              <Field label="Datum" name="date" error={errors.date}>
                <input id="date" name="date" type="date" required className="field" />
              </Field>
              <Field label="Moment" name="service">
                <select id="service" name="service" className="field" defaultValue="Diner">
                  <option>Lunch</option>
                  <option>Diner</option>
                </select>
              </Field>
              <Field label="Aantal personen" name="guests" error={errors.guests}>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={20}
                  inputMode="numeric"
                  placeholder="2"
                  required
                  className="field"
                />
              </Field>
              <Field label="Telefoon" name="phone">
                <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
              </Field>
            </>
          ) : null}

          <Field label="Naam" name="name" error={errors.name}>
            <input id="name" name="name" type="text" autoComplete="name" required className="field" />
          </Field>
          <Field label="E-mail" name="email" error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" required className="field" />
          </Field>

          <Field
            label={booking ? "Allergieën of wensen" : "Bericht"}
            name="message"
            error={errors.message}
            className="sm:col-span-2"
          >
            <textarea id="message" name="message" rows={booking ? 2 : 4} className="field resize-none" />
          </Field>

          <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
            <PillButton type="submit" disabled={pending}>
              {pending ? "Even geduld" : booking ? "Vraag uw tafel aan" : "Verstuur"}
            </PillButton>
            {booking ? (
              <p className="max-w-xs text-sm text-stone">
                Dit is een aanvraag. Uw tafel ligt vast na onze bevestiging.
              </p>
            ) : null}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
