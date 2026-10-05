"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SolidButton } from "@/components/ui/Button";

const EXPO = [0.16, 1, 0.3, 1] as const;

const tabs = ["Bestellingen", "Gegevens", "Adressen"] as const;

/**
 * The account page below its title: three tabs and, because nobody can be
 * signed in yet, the logged-out state under them — the login form, on the
 * brand rose, switched off.
 *
 * ACCOUNTS ARE NOT CONNECTED. There is no authentication in the project;
 * this is the shell the roadmap's phase 4 fills in. When a session exists,
 * render the orders as cards here (number, date, status, total) in place of
 * the form. See docs/ECOMMERCE-ROADMAP.md.
 */
export function AccountView() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Bestellingen");

  return (
    <div>
      <div role="tablist" aria-label="Account" className="flex flex-wrap gap-x-9 gap-y-3 border-b border-ink/15">
        {tabs.map((tab) => {
          const selected = tab === active;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab)}
              className={`eyebrow relative pb-5 transition-colors duration-500 ${
                selected ? "text-ink" : "text-stone hover:text-ink"
              }`}
            >
              {tab}
              {selected ? (
                <motion.span
                  layoutId="account-tab"
                  className="absolute inset-x-0 -bottom-px h-px bg-ink"
                  transition={{ duration: 0.7, ease: EXPO }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="font-display text-4xl leading-tight font-light">
            Meld u aan om uw <em>{active.toLowerCase()}</em> te zien
          </p>
          <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
            Accounts openen samen met de webshop. Tot dan rekent u af als gast
            en volgt u uw bestelling via e-mail.
          </p>
        </div>

        <form
          className="bg-blush p-8 sm:p-12 lg:col-span-6 lg:col-start-7"
          onSubmit={(event) => event.preventDefault()}
        >
          <fieldset disabled className="space-y-9 disabled:opacity-60">
            <legend className="eyebrow text-rosewood">Aanmelden</legend>
            <label className="block">
              <span className="eyebrow text-ink-soft">E-mail</span>
              <input className="field" type="email" autoComplete="email" />
            </label>
            <label className="block">
              <span className="eyebrow text-ink-soft">Wachtwoord</span>
              <input className="field" type="password" autoComplete="current-password" />
            </label>
            <SolidButton type="submit" disabled>
              Binnenkort beschikbaar
            </SolidButton>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
