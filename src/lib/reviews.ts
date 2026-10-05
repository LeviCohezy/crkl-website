/**
 * Guest reviews and quotes.
 *
 * Everything here is EMPTY ON PURPOSE. The wireframe asks for real quotes
 * with names on several pages; none were supplied, and a review is not
 * something to make up. Each section that reads from this file renders
 * nothing until its list has entries — add them here and the sections appear
 * in the place the wireframe gives them. See CONTENT_TODO.md.
 */
export type Review = {
  quote: string;
  name: string;
  /** e.g. "Google", "Tripadvisor". */
  source?: string;
};

/** Where review cards appear, and which guests each page should quote. */
export const reviews: Record<"home" | "lunch" | "diner" | "geschenkbox", Review[]> = {
  home: [],
  lunch: [],
  diner: [],
  geschenkbox: [],
};

export type Quote = {
  quote: string;
  /** "naam, gelegenheid" — as the wireframe labels it. */
  attribution: string;
};

/** One full quote, shown large on a dark band right before an enquiry form. */
export const spotlights: Record<"the-room" | "events" | "trouwen" | "pompadour", Quote | null> = {
  "the-room": null,
  events: null,
  trouwen: null,
  pompadour: null,
};
