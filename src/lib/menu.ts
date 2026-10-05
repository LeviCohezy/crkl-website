/**
 * The menu as published on crkl.eu, arranged in the three tabs the wireframe
 * asks for. Prices are integer cents — format them with `formatPrice()`.
 *
 * `courses` is empty everywhere: the kitchen serves a fixed menu that changes
 * with the season and the current dishes were not available when the site
 * was built. Fill them in and each one renders as "dish · line", with its
 * allergens. See CONTENT_TODO.md.
 */
export type Course = {
  name: string;
  line: string;
  /** Short codes, e.g. "gluten", "melk", "schaaldieren". */
  allergens?: string[];
};

export type MenuLine = {
  label: string;
  note?: string;
  priceCents: number;
  /** "+" for a supplement on top of the menu price. */
  supplement?: boolean;
};

export type MenuGroup = {
  name: string;
  intro?: string;
  courses: Course[];
  lines: MenuLine[];
};

export type MenuTab = {
  id: "lunch" | "diner" | "dranken";
  label: string;
  when: string;
  groups: MenuGroup[];
};

export const menu: MenuTab[] = [
  {
    id: "lunch",
    label: "Lunch",
    when: "Woensdag tot vrijdag · 12:00 – 13:00",
    groups: [
      {
        name: "Lunchformule",
        intro:
          "Kwaliteit, finesse en een vlotte service — ideaal voor een ontspannen middag of een zakelijke afspraak.",
        courses: [],
        lines: [
          { label: "Voorgerecht & hoofdgerecht", priceCents: 4200 },
          { label: "Drie gangen", note: "met dessert", priceCents: 5600 },
        ],
      },
      {
        name: "Menu Carré+",
        intro:
          "Vier gangen, bereid met dagverse en seizoensgebonden ingrediënten.",
        courses: [],
        lines: [
          { label: "Vier gangen", priceCents: 7900 },
          { label: "Kaasbord", priceCents: 1500 },
          { label: "Kaas in plaats van dessert", priceCents: 1000 },
        ],
      },
    ],
  },
  {
    id: "diner",
    label: "Diner",
    when: "Woensdag tot zaterdag · 19:00 – 19:30",
    groups: [
      {
        name: "Menu CRKL+",
        intro:
          "Het tasting menu van het huis, waar seizoensgebonden ingrediënten en verfijnde smaken centraal staan.",
        courses: [],
        lines: [
          { label: "Vijf gangen", priceCents: 9500 },
          {
            label: "Het signature gerecht van de chef",
            priceCents: 3100,
            supplement: true,
          },
          { label: "Kaasbord", priceCents: 1500 },
          { label: "Kaas in plaats van dessert", priceCents: 1000 },
        ],
      },
    ],
  },
  {
    id: "dranken",
    label: "Dranken",
    when: "Bij elk menu",
    groups: [
      {
        name: "Wijnpairing",
        intro: "Geschonken tot en met het hoofdgerecht.",
        courses: [],
        lines: [
          { label: "Bij Menu Carré+", priceCents: 3000 },
          { label: "Bij Menu CRKL+", priceCents: 4000 },
        ],
      },
      {
        name: "Zonder alcohol",
        courses: [],
        lines: [{ label: "Aangepast non-alcoholisch sap", priceCents: 650 }],
      },
    ],
  },
];

export function menuTab(id: MenuTab["id"]): MenuTab {
  return menu.find((tab) => tab.id === id) ?? menu[0];
}
