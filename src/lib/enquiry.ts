"use server";

import { site } from "@/lib/site";

export type EnquiryState = {
  status: "idle" | "sent" | "invalid" | "unavailable";
  /** Field name → message, when `status` is "invalid". */
  errors?: Record<string, string>;
  /** A ready-made e-mail with the request in it, when nothing can deliver it. */
  mailto?: string;
};

const labels: Record<string, string> = {
  kind: "Aanvraag",
  date: "Datum",
  service: "Moment",
  guests: "Aantal personen",
  name: "Naam",
  email: "E-mail",
  phone: "Telefoon",
  message: "Bericht",
};

function text(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

/**
 * Handles both the reservation request and the contact form.
 *
 * There is no booking system or mail service wired up yet. Until there is,
 * set ENQUIRY_WEBHOOK_URL and each valid request is POSTed there as JSON
 * (Zapier, Make, a Slack webhook, your own endpoint). Without it the form
 * answers honestly — "unavailable" — and hands the visitor an e-mail with
 * their request already written, so nothing is silently dropped.
 */
export async function sendEnquiry(
  _previous: EnquiryState,
  data: FormData,
): Promise<EnquiryState> {
  // Honeypot: real visitors never see this field.
  if (text(data, "website")) return { status: "sent" };

  const kind = text(data, "kind") === "reservatie" ? "reservatie" : "contact";
  const fields: Record<string, string> = {
    kind: kind === "reservatie" ? "Reservatie" : "Contact",
    date: text(data, "date"),
    service: text(data, "service"),
    guests: text(data, "guests"),
    name: text(data, "name"),
    email: text(data, "email"),
    phone: text(data, "phone"),
    message: text(data, "message"),
  };

  const errors: Record<string, string> = {};
  if (!fields.name) errors.name = "Vul uw naam in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Vul een geldig e-mailadres in.";
  }
  if (kind === "reservatie") {
    if (!fields.date) errors.date = "Kies een datum.";
    if (!fields.guests) errors.guests = "Met hoeveel komt u?";
  } else if (!fields.message) {
    errors.message = "Schrijf een kort bericht.";
  }
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const lines = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${labels[key]}: ${value}`);

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, text: lines.join("\n") }),
      });
      if (response.ok) return { status: "sent" };
      console.error("Enquiry webhook answered", response.status);
    } catch (error) {
      console.error("Enquiry webhook failed", error);
    }
  }

  const subject =
    kind === "reservatie"
      ? `Reservatie-aanvraag ${fields.date} — ${fields.name}`
      : `Bericht via de website — ${fields.name}`;

  return {
    status: "unavailable",
    mailto: `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`,
  };
}
