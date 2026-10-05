/**
 * Single source of truth for site-wide constants.
 * Anything a non-developer might want changed should live here.
 *
 * Address, phone, hours and links were taken from crkl.eu and the Michelin
 * Guide listing — see CONTENT_TODO.md for what still needs a human check.
 */

import { shoot } from "@/lib/photos";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

/** Used for price and date formatting. Change once, applies everywhere. */
export const locale = "nl-BE";
export const currency = "EUR" as const;

type NavItem = {
  href: string;
  label: string;
  /** Photograph shown beside the link in the full-screen menu. */
  image: string;
};

type Service = {
  /** Shown as written, e.g. "Woensdag – vrijdag". */
  days: string;
  hours: string;
};

type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  nav: NavItem[];
  social: { href: string; label: string }[];
  contact: {
    email: string;
    phone: string;
    /** E.164, for tel: links. */
    phoneHref: string;
    street: string;
    city: string;
    country: string;
    vat: string;
    /** Used for the map and the route links. */
    geo: { lat: number; lng: number };
  };
  hours: {
    lunch: Service;
    dinner: Service;
    closed: string;
    note: string;
  };
  links: {
    giftVoucher: string;
    route: string;
    michelin: string;
    gaultMillau: string;
  };
  hosts: string;
};

export const site: SiteConfig = {
  name: "CRKL",
  tagline: "Gastronomisch restaurant in Roeselare",
  description:
    "CRKL is een gastronomisch restaurant in Roeselare waar verfijning en beleving centraal staan. Lunch en diner met dagverse ingrediënten en een creatieve, moderne visie op gastronomie.",
  nav: [
    { href: "/", label: "Home", image: shoot.jan26(17) },
    { href: "/menu", label: "Menu", image: shoot.maart26(12) },
    {
      href: "/verhaal",
      label: "Verhaal",
      image: shoot.jan26(25),
    },
    {
      href: "/leveranciers",
      label: "Leveranciers",
      image: shoot.leveranciers(112),
    },
    { href: "/wijn", label: "Wijn", image: shoot.juni26(37) },
    {
      href: "/galerij",
      label: "Galerij",
      image: shoot.maart26(50),
    },
    {
      href: "/contact",
      label: "Contact",
      image: shoot.juli26(54),
    },
  ],
  social: [
    { href: "https://www.instagram.com/restaurant_crkl/", label: "Instagram" },
    {
      href: "https://www.facebook.com/CRKL-restaurant-103769980992721",
      label: "Facebook",
    },
  ],
  contact: {
    email: "info@crkl.eu",
    phone: "051 51 08 52",
    phoneHref: "+3251510852",
    street: "Diksmuidsesteenweg 351a",
    city: "8800 Roeselare",
    country: "België",
    vat: "BE 0550.981.180",
    geo: { lat: 50.9517785, lng: 3.0956398 },
  },
  hours: {
    lunch: { days: "Woensdag – vrijdag", hours: "12:00 – 13:00" },
    dinner: { days: "Woensdag – zaterdag", hours: "19:00 – 19:30" },
    closed: "Gesloten op zaterdagmiddag, zondag, maandag en dinsdag",
    note: "Voor groepen en events openen we ook op dinsdag, zaterdagmiddag en zondag.",
  },
  links: {
    giftVoucher: "https://www.tablefever.com/nl/cadeaubon/crkl/9ME69",
    route:
      "https://www.waze.com/ul?ll=50.95177850%2C3.09563980&navigate=yes",
    michelin:
      "https://guide.michelin.com/be/nl/west-vlaanderen/roeselare/restaurant/crkl",
    gaultMillau: "https://www.gaultmillau.be/en/restaurants/crkl-roeselare",
  },
  hosts: "Sam & Jolien",
};

/** Hero loops, cut and compressed from the library — see docs/MEDIA.md. */
export const heroMedia = [
  {
    video: "hero/crkl-hero-keuken.mp4",
    poster: "hero/crkl-hero-keuken.jpg",
  },
  {
    video: "hero/crkl-hero-tafel.mp4",
    poster: "hero/crkl-hero-tafel.jpg",
  },
  {
    video: "hero/crkl-hero-zaal.mp4",
    poster: "hero/crkl-hero-zaal.jpg",
  },
];
