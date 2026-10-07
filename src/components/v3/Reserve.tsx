"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useState } from "react";
import { PinkButton, TextLink } from "@/components/v3/Links";
import { type as t } from "@/components/v3/type";
import { sendEnquiry, type EnquiryState } from "@/lib/enquiry";
import { locale, site } from "@/lib/site";

const EXPO = [0.16, 1, 0.3, 1] as const;
const initial: EnquiryState = { status: "idle" };
const STEPS = ["Gasten", "Datum", "Uur", "Gegevens"] as const;
const DAYS = ["ma", "di", "wo", "do", "vr", "za", "zo"];
/** How far ahead the calendar goes. */
const MONTHS_AHEAD = 4;

/** The week in site.ts starts on Monday; JavaScript's starts on Sunday. */
function dayInfo(date: Date) {
  return site.hours.week[(date.getDay() + 6) % 7];
}

function key(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

function parse(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const longDate = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" });
const shortDate = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" });
const monthName = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });

function Choice({
  selected,
  disabled,
  onClick,
  className = "",
  children,
}: {
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className={`flex items-center justify-center border text-base tabular-nums transition-colors duration-300 disabled:cursor-not-allowed disabled:text-line-strong ${
        selected ? "border-blush bg-blush text-ink" : "border-line text-ink hover:border-blush disabled:hover:border-line"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Booking a table the way a booking tool does it, one choice per screen:
 * how many, which day, what time, and only then who you are. The calendar
 * knows the opening days from site.ts and the times from the services;
 * nothing can be chosen that the house cannot serve.
 *
 * It sends through `sendEnquiry` like every other form. Replace this
 * component with the booking system's own widget when there is one.
 */
export function Reserve() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const errors = state.errors ?? {};

  if (state.status === "sent" || state.status === "unavailable") {
    return (
      <motion.div
        role="status"
        className="flex min-h-[20rem] flex-col items-start justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EXPO }}
      >
        {state.status === "sent" ? (
          <>
            <h2 className={t.h2}>
              Dank u. Uw aanvraag is <em>onderweg</em>.
            </h2>
            <p className={`${t.body} mt-6 max-w-md`}>
              {guests} {guests === 1 ? "persoon" : "personen"}, {date ? longDate.format(parse(date)) : ""}, {time}.
              Uw tafel ligt vast zodra we uw aanvraag bevestigen.
            </p>
          </>
        ) : (
          <>
            <h2 className={t.h2}>
              Nog <em>één</em> stap
            </h2>
            <p className={`${t.body} mt-6 max-w-md`}>
              Online versturen lukt op dit moment niet. Uw aanvraag staat klaar in een e-mail — verstuur ze zelf,
              of bel ons op{" "}
              <a href={`tel:${site.contact.phoneHref}`} className="link-line text-ink">
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  const last = new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD, 1);
  const chosenDay = date ? dayInfo(parse(date)) : null;

  // The calendar grid: leading blanks, then every day of the month.
  const offset = (month.getDay() + 6) % 7;
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: count }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];

  const summary = [
    guests ? `${guests} ${guests === 1 ? "persoon" : "personen"}` : null,
    date ? shortDate.format(parse(date)) : null,
    time,
  ];

  return (
    <form action={action} noValidate>
      <input type="hidden" name="kind" value="reservatie" />
      <input type="hidden" name="guests" value={guests ?? ""} />
      <input type="hidden" name="date" value={date ?? ""} />
      <input type="hidden" name="time" value={time ?? ""} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {/* The steps, with what has been chosen so far. Earlier steps reopen. */}
      <ol className="grid grid-cols-4 gap-4 border-b border-line pb-5 text-sm">
        {STEPS.map((label, index) => {
          const done = index < step;
          return (
            <li key={label}>
              <button
                type="button"
                disabled={!done}
                onClick={() => setStep(index)}
                aria-current={index === step ? "step" : undefined}
                className={`block w-full text-left ${index === step ? "text-ink" : done ? "text-ink-soft" : "text-stone"} ${
                  done ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span className="block tabular-nums">
                  {index + 1} — {label}
                </span>
                <span className="mt-1 block truncate text-ink">{summary[index] ?? " "}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: EXPO }}
          className="pt-12"
        >
          {step === 0 ? (
            <>
              <h2 className={t.h3}>Met hoeveel komt u?</h2>
              <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <Choice
                    key={n}
                    selected={guests === n}
                    onClick={() => {
                      setGuests(n);
                      setStep(1);
                    }}
                    className="aspect-square"
                  >
                    {n}
                  </Choice>
                ))}
              </div>
              <p className={`${t.small} mt-8`}>
                Meer dan twaalf? Dan is er The Room, onze aparte ruimte voor tot 20 gasten.{" "}
                <TextLink href="/the-room" className="text-sm">
                  Vraag The Room aan
                </TextLink>
              </p>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className="flex items-baseline justify-between gap-6">
                <h2 className={t.h3}>Welke dag?</h2>
                <div className="flex items-center gap-2 text-sm">
                  <button
                    type="button"
                    aria-label="Vorige maand"
                    disabled={month <= first}
                    onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                    className="flex h-9 w-9 items-center justify-center border border-line disabled:text-line-strong"
                  >
                    ‹
                  </button>
                  <span className="min-w-[9rem] text-center capitalize tabular-nums">{monthName.format(month)}</span>
                  <button
                    type="button"
                    aria-label="Volgende maand"
                    disabled={month >= last}
                    onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                    className="flex h-9 w-9 items-center justify-center border border-line disabled:text-line-strong"
                  >
                    ›
                  </button>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-7 gap-2">
                {DAYS.map((day) => (
                  <span key={day} className={`${t.small} pb-2 text-center`}>
                    {day}
                  </span>
                ))}
                {cells.map((cell, index) => {
                  if (!cell) return <span key={`blank-${index}`} />;
                  const info = dayInfo(cell);
                  const open = Boolean(info.lunch || info.dinner) && cell >= today;
                  const value = key(cell);
                  return (
                    <Choice
                      key={value}
                      selected={date === value}
                      disabled={!open}
                      onClick={() => {
                        setDate(value);
                        setTime(null);
                        setStep(2);
                      }}
                      className="aspect-square text-sm"
                    >
                      {cell.getDate()}
                    </Choice>
                  );
                })}
              </div>
              <p className={`${t.small} mt-6`}>
                Lunch {site.hours.lunch.days.toLowerCase()} · Diner {site.hours.dinner.days.toLowerCase()}.{" "}
                {site.hours.note}
              </p>
            </>
          ) : null}

          {step === 2 && chosenDay ? (
            <>
              <h2 className={t.h3}>Hoe laat, {date ? longDate.format(parse(date)) : ""}?</h2>
              <div className="mt-8 space-y-8">
                {(["lunch", "dinner"] as const).map((service) => {
                  if (!chosenDay[service === "lunch" ? "lunch" : "dinner"]) return null;
                  const label = service === "lunch" ? "Lunch" : "Diner";
                  return (
                    <div key={service}>
                      <p className={t.small}>{label}</p>
                      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
                        {site.hours[service].slots.map((slot) => {
                          const value = `${label} ${slot}`;
                          return (
                            <Choice
                              key={value}
                              selected={time === value}
                              onClick={() => {
                                setTime(value);
                                setStep(3);
                              }}
                              className="h-12"
                            >
                              {slot}
                            </Choice>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <h2 className={t.h3}>Op wiens naam?</h2>
              <div className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2">
                <label htmlFor="name" className="block">
                  <span className="label">Naam</span>
                  <input id="name" name="name" type="text" autoComplete="name" required className="field" />
                  {errors.name ? <span role="alert" className="mt-2 block text-sm text-clay">{errors.name}</span> : null}
                </label>
                <label htmlFor="email" className="block">
                  <span className="label">E-mail</span>
                  <input id="email" name="email" type="email" autoComplete="email" required className="field" />
                  {errors.email ? <span role="alert" className="mt-2 block text-sm text-clay">{errors.email}</span> : null}
                </label>
                <label htmlFor="phone" className="block sm:col-span-2">
                  <span className="label">Telefoon</span>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
                </label>
                <label htmlFor="message" className="block sm:col-span-2">
                  <span className="label">Allergieën of wensen</span>
                  <textarea id="message" name="message" rows={2} className="field resize-none" />
                </label>
              </div>
              {errors.date || errors.guests || errors.time ? (
                <p role="alert" className="mt-6 text-sm text-clay">
                  Kies eerst het aantal gasten, een dag en een uur.
                </p>
              ) : null}
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
                <PinkButton type="submit" disabled={pending || !guests || !date || !time}>
                  {pending ? "Even geduld" : "Reserveer"}
                </PinkButton>
                <p className={`${t.small} max-w-xs`}>Uw tafel ligt vast na onze bevestiging.</p>
              </div>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </form>
  );
}
