/**
 * Single source of truth for site-wide constants.
 * Anything a non-developer might want changed should live here.
 *
 * Address, phone, hours and links were taken from crkl.eu; the page list and
 * the two credentials come from the wireframe (v3). See CONTENT_TODO.md for
 * what still needs a human check.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

/** Used for price and date formatting. Change once, applies everywhere. */
export const locale = "nl-BE";
export const currency = "EUR" as const;

type Link = { href: string; label: string };

type Service = {
  /** Shown as written, e.g. "Woensdag – vrijdag". */
  days: string;
  hours: string;
  /** Arrival times offered in the reservation form. */
  slots: string[];
};

type Day = { day: string; lunch: string | null; dinner: string | null };

export const site = {
  name: "CRKL",
  tagline: "Gastronomisch restaurant in Roeselare",
  description:
    "CRKL is een gastronomisch restaurant in Roeselare waar verfijning en beleving centraal staan. Lunch en diner met dagverse ingrediënten en een creatieve, moderne visie op gastronomie.",
  hosts: "Sam & Jolien",

  /** The header, in wireframe order. */
  nav: [
    { href: "/menu", label: "Menu" },
    { href: "/lunch", label: "Lunch" },
    { href: "/diner", label: "Diner" },
    { href: "/the-room", label: "The Room" },
    { href: "/events", label: "Events" },
    { href: "/trouwen", label: "Trouwen" },
    { href: "/shop", label: "Shop" },
  ] satisfies Link[],

  /** Pages that are not in the header but belong in the menu and footer. */
  more: [
    { href: "/over-ons", label: "Over ons" },
    { href: "/geschenkbox", label: "Geschenkbox" },
    { href: "/contact", label: "Contact" },
  ] satisfies Link[],

  credentials: [
    { href: "/champagne-pompadour", label: "Ambassadeur Champagne Pompadour" },
    { href: "/gastro-rsl", label: "Lid van Gastro RSL" },
  ] satisfies Link[],

  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Voorwaarden" },
    { href: "/cookies", label: "Cookies" },
    { href: "/accessibility", label: "Toegankelijkheid" },
  ] satisfies Link[],

  social: [
    { href: "https://www.instagram.com/restaurant_crkl/", label: "Instagram" },
    {
      href: "https://www.facebook.com/CRKL-restaurant-103769980992721",
      label: "Facebook",
    },
  ] satisfies Link[],

  contact: {
    email: "info@crkl.eu",
    phone: "051 51 08 52",
    /** E.164, for tel: links. */
    phoneHref: "+3251510852",
    street: "Diksmuidsesteenweg 351a",
    city: "8800 Roeselare",
    country: "België",
    vat: "BE 0550.981.180",
    /** Used for structured data and the route link. */
    geo: { lat: 50.9517785, lng: 3.0956398 },
  },

  hours: {
    lunch: {
      days: "Woensdag – vrijdag",
      hours: "12:00 – 13:00",
      slots: ["12:00", "12:30", "13:00"],
    } satisfies Service,
    dinner: {
      days: "Woensdag – zaterdag",
      hours: "19:00 – 19:30",
      slots: ["19:00", "19:30"],
    } satisfies Service,
    week: [
      { day: "Maandag", lunch: null, dinner: null },
      { day: "Dinsdag", lunch: null, dinner: null },
      { day: "Woensdag", lunch: "12:00 – 13:00", dinner: "19:00 – 19:30" },
      { day: "Donderdag", lunch: "12:00 – 13:00", dinner: "19:00 – 19:30" },
      { day: "Vrijdag", lunch: "12:00 – 13:00", dinner: "19:00 – 19:30" },
      { day: "Zaterdag", lunch: null, dinner: "19:00 – 19:30" },
      { day: "Zondag", lunch: null, dinner: null },
    ] satisfies Day[],
    note: "Voor groepen en events openen we ook op dinsdag, zaterdagmiddag en zondag.",
  },

  links: {
    giftVoucher: "https://www.tablefever.com/nl/cadeaubon/crkl/9ME69",
    route: "https://www.waze.com/ul?ll=50.95177850%2C3.09563980&navigate=yes",
    michelin:
      "https://guide.michelin.com/be/nl/west-vlaanderen/roeselare/restaurant/crkl",
    gaultMillau: "https://www.gaultmillau.be/en/restaurants/crkl-roeselare",
    /**
     * The Google rating shown in the trust band, as Google Maps displayed it
     * on 6 October 2026 (4.7 from 463 reviews). The wireframe says 4,9 —
     * keep this in step with Google, or empty it to hide the figure.
     */
    googleRating: "4,7",
    googleReviews:
      "https://www.google.com/maps/search/?api=1&query=CRKL+restaurant+Diksmuidsesteenweg+351a+Roeselare",
  },
};

/**
 * Pages with a reservation form on them. "Reserveer" in the header scrolls
 * to that form; everywhere else it goes to the one on the homepage.
 */
const reservable = [
  "/",
  "/menu",
  "/lunch",
  "/diner",
  "/champagne-pompadour",
  "/gastro-rsl",
];

export function reserveHref(pathname: string): string {
  return reservable.includes(pathname) ? "#reserveer" : "/#reserveer";
}
