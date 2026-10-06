"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useState, type ReactNode } from "react";
import { SolidButton } from "@/components/ui/Button";
import { sendEnquiry, type EnquiryKind, type EnquiryState } from "@/lib/enquiry";
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
      <span className="eyebrow text-ink-soft">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-2 block text-sm text-stone">
          {error}
        </span>
      ) : null}
    </label>
  );
}

type EnquiryFormProps = {
  kind: EnquiryKind;
  submitLabel: string;
  /** Reservation only: which service is selected when the form opens. */
  service?: "lunch" | "diner";
  /**
   * Ask for date and guests first and everything else on a second step —
   * the small yes before the larger one.
   */
  steps?: boolean;
  /** One line of reassurance beside the button. */
  note?: string;
};

const occasions: Partial<Record<EnquiryKind, string[]>> = {
  "the-room": ["Privédiner", "Walking dinner", "Meeting met lunch", "Iets anders"],
  event: ["Bedrijfsevent", "Verjaardag of jubileum", "Communie of babyborrel", "Iets anders"],
  trouwen: ["Ceremonie, receptie en diner", "Receptie en diner", "Enkel diner", "Nog te bespreken"],
};

/**
 * Every form on the site is this one, with a different set of fields: the
 * table reservation, the three event enquiries and the contact form. All of
 * them go through `sendEnquiry`, which says plainly when it could not
 * deliver — see src/lib/enquiry.ts.
 */
export function EnquiryForm({
  kind,
  submitLabel,
  service = "diner",
  steps = false,
  note,
}: EnquiryFormProps) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const [step, setStep] = useState(1);
  const [moment, setMoment] = useState<"lunch" | "diner">(service);
  const errors = state.errors ?? {};

  const dated = kind !== "contact";
  const booking = kind === "reservatie";
  const kinds = occasions[kind];
  // A server-side error on a first-step field brings that step back.
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
            <h3 className="font-display text-4xl leading-tight font-light sm:text-5xl">
              Dank u. Uw aanvraag is <em>onderweg</em>.
            </h3>
            <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
              {booking
                ? "Uw tafel ligt vast zodra we uw aanvraag bevestigen. We nemen zo snel mogelijk contact met u op."
                : "We lezen uw bericht en antwoorden zo snel mogelijk."}
            </p>
          </>
        ) : (
          <>
            <h3 className="font-display text-4xl leading-tight font-light sm:text-5xl">
              Nog <em>één</em> stap
            </h3>
            <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
              Online versturen lukt op dit moment niet. Uw aanvraag staat klaar
              in een e-mail — verstuur ze zelf, of bel ons op{" "}
              <a href={`tel:${site.contact.phoneHref}`} className="link-line text-ink">
                {site.contact.phone}
              </a>
              .
            </p>
            {state.mailto ? (
              <a
                href={state.mailto}
                className="eyebrow sweep mt-8 inline-flex h-14 items-center rounded-full bg-blush px-9 text-ink [--sweep:var(--color-line-strong)]"
              >
                Open de e-mail
              </a>
            ) : null}
          </>
        )}
      </motion.div>
    );
  }

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
        <p className="eyebrow mb-8 flex items-center gap-4 text-ink-soft tabular-nums">
          <span className={first ? "text-ink" : ""}>01 Datum &amp; gasten</span>
          <span aria-hidden className="h-px w-10 bg-line-strong" />
          <span className={first ? "" : "text-ink"}>02 Uw gegevens</span>
        </p>
      ) : null}

      {/* Both steps stay in the form so one submit carries every field. */}
      {booking ? (
        /* The table, as the reference lays it out: who, how many, when. */
        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
          <Field label="Naam" name="name" error={errors.name} className="sm:col-span-2">
            <input id="name" name="name" type="text" autoComplete="name" required className="field" />
          </Field>
          <Field label="Aantal gasten" name="guests" error={errors.guests}>
            <select id="guests" name="guests" className="field" defaultValue="2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "persoon" : "personen"}
                </option>
              ))}
              <option value="meer dan 12">Meer dan 12 — The Room</option>
            </select>
          </Field>
          <Field label="Moment" name="service">
            <select
              id="service"
              name="service"
              className="field"
              value={moment}
              onChange={(event) => setMoment(event.target.value === "lunch" ? "lunch" : "diner")}
            >
              <option value="lunch">Lunch · {site.hours.lunch.days}</option>
              <option value="diner">Diner · {site.hours.dinner.days}</option>
            </select>
          </Field>
          <Field label="Datum" name="date" error={errors.date}>
            <input id="date" name="date" type="date" required className="field" />
          </Field>
          <Field label="Uur" name="time" error={errors.time}>
            <select id="time" name="time" className="field" key={moment}>
              {(moment === "lunch" ? site.hours.lunch.slots : site.hours.dinner.slots).map((slot) => (
                <option key={slot}>
                  {moment === "lunch" ? "Lunch" : "Diner"} {slot}
                </option>
              ))}
            </select>
          </Field>
          <Field label="E-mail" name="email" error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" required className="field" />
          </Field>
          <Field label="Telefoon" name="phone">
            <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
          </Field>
          <Field label="Allergieën of wensen" name="message" className="sm:col-span-2">
            <textarea id="message" name="message" rows={1} className="field resize-none" />
          </Field>
        </div>
      ) : (
        <div className={`grid gap-x-8 gap-y-9 sm:grid-cols-2 ${first ? "" : "hidden"}`}>
          {dated ? (
            <>
              <Field label="Datum" name="date" error={errors.date}>
                <input id="date" name="date" type="date" required className="field" />
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
      )}

      <AnimatePresence initial={false}>
        {!booking && (!steps || !first) ? (
          <motion.div
            key="details"
            className={`grid gap-x-8 gap-y-9 sm:grid-cols-2 ${steps ? "" : dated ? "mt-9" : ""}`}
            initial={steps ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EXPO }}
          >
            {kinds ? (
              <Field label="Soort gelegenheid" name="occasion" className="sm:col-span-2">
                <select id="occasion" name="occasion" className="field">
                  {kinds.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>
            ) : null}
            <Field label="Naam" name="name" error={errors.name}>
              <input id="name" name="name" type="text" autoComplete="name" required className="field" />
            </Field>
            <Field label="E-mail" name="email" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" required className="field" />
            </Field>
            <Field label="Telefoon" name="phone" className="sm:col-span-2">
              <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
            </Field>
            <Field label="Bericht" name="message" error={errors.message} className="sm:col-span-2">
              <textarea id="message" name="message" rows={3} className="field resize-none" />
            </Field>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
        {steps && first ? (
          <SolidButton type="button" onClick={() => setStep(2)}>
            Volgende
          </SolidButton>
        ) : (
          <SolidButton type="submit" disabled={pending} outlined={booking}>
            {pending ? "Even geduld" : submitLabel}
          </SolidButton>
        )}
        {steps && !first ? (
          <button type="button" onClick={() => setStep(1)} className="eyebrow link-line pb-1.5">
            Terug
          </button>
        ) : null}
        {note ? <p className="max-w-xs text-sm text-ink-soft">{note}</p> : null}
      </div>
    </form>
  );
}
