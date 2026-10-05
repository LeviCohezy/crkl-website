/**
 * Single source of truth for site-wide constants.
 * Anything a non-developer might want changed should live here.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

/** Used for price and date formatting. Change once, applies everywhere. */
export const locale = "nl-BE";
export const currency = "EUR" as const;

type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  nav: { href: string; label: string }[];
  social: { href: string; label: string }[];
  contact: {
    email: string;
    /** Leave empty to hide the phone number everywhere. */
    phone: string;
    address: string[];
  };
};

export const site: SiteConfig = {
  name: "CRKL",
  tagline: "Wine with a crackle",
  description:
    "CRKL is a small-batch wine house. We work with low-intervention growers and bottle wine that stays lively in the glass.",
  nav: [
    { href: "/wines", label: "Wines" },
    { href: "/about", label: "Story" },
    { href: "/contact", label: "Contact" },
  ],
  social: [
    { href: "https://instagram.com/", label: "Instagram" },
    { href: "https://linkedin.com/", label: "LinkedIn" },
  ],
  contact: {
    email: "hello@crkl.wine",
    phone: "",
    address: ["CRKL", "Belgium"],
  },
};

/**
 * Hero media. Drop the files at public/videos/hero/ and public/images/hero/
 * and they appear automatically — the hero falls back to a plain colour wash
 * for as long as they are missing.
 */
export const heroMedia = {
  video: "hero/crkl-hero.mp4",
  poster: "hero/crkl-hero.jpg",
};
