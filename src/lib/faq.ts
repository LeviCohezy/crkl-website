import type { FaqItem } from "@/components/sections/Faq";
import { site } from "@/lib/site";

/**
 * The questions under each page, by the topics the wireframe lists.
 *
 * Only what could be answered from crkl.eu is answered as a fact; the rest
 * points the visitor to the restaurant instead of guessing. Every answer
 * here needs a read-through by the house — see CONTENT_TODO.md.
 */
const ask = `Bel ons op ${site.contact.phone} of mail naar ${site.contact.email}; we bekijken het graag met u.`;

const allergies: FaqItem = {
  question: "Kan de keuken rekening houden met allergieën of dieetwensen?",
  answer:
    "Laat het ons weten bij uw reservatie, in het veld voor allergieën en wensen. Zo kan de keuken zich voorbereiden.",
};

const seasons: FaqItem = {
  question: "Hoe vaak verandert het menu?",
  answer:
    "Het menu is seizoensgebonden: de gerechten volgen wat op dat moment dagvers en op zijn best is.",
};

const parking: FaqItem = {
  question: "Kan ik parkeren aan het restaurant?",
  answer:
    "Ja. CRKL ligt centraal in Roeselare en heeft ruime parkeermogelijkheden.",
};

const groups: FaqItem = {
  question: "Kunnen we met een groep komen?",
  answer:
    "Voor gezelschappen is er The Room, onze aparte ruimte voor tot 20 gasten. Voor groepen en events openen we ook op dinsdag, zaterdagmiddag en zondag.",
};

export const faq: Record<string, FaqItem[]> = {
  menu: [
    allergies,
    {
      question: "Is er een vegetarisch menu?",
      answer: `Geef uw wens door bij de reservatie. ${ask}`,
    },
    seasons,
  ],
  lunch: [
    {
      question: "Wanneer kan ik lunchen?",
      answer: `Van ${site.hours.lunch.days.toLowerCase()}, met aankomst tussen ${site.hours.lunch.hours.replace(" – ", " en ")} uur.`,
    },
    groups,
    {
      question: "Zijn kinderen welkom?",
      answer: `Laat bij uw reservatie weten met wie u komt. ${ask}`,
    },
    parking,
  ],
  diner: [
    {
      question: "Wanneer kan ik komen dineren?",
      answer: `Van ${site.hours.dinner.days.toLowerCase()}, met aankomst tussen ${site.hours.dinner.hours.replace(" – ", " en ")} uur.`,
    },
    allergies,
    groups,
  ],
  "the-room": [
    {
      question: "Voor hoeveel gasten is The Room geschikt?",
      answer: "De ruimte biedt plaats aan tot 20 personen.",
    },
    {
      question: "Welke menu's zijn mogelijk?",
      answer: `Dat stemmen we af op uw gezelschap en gelegenheid. ${ask}`,
    },
    {
      question: "Is er audiovisueel materiaal?",
      answer: "Ja, The Room is uitgerust met audiovisueel materiaal voor meetings en presentaties.",
    },
    {
      question: "Hebben we de ruimte voor ons alleen?",
      answer: "The Room is een aparte, exclusieve ruimte: u zit er met uw eigen gezelschap.",
    },
  ],
  events: [
    {
      question: "Wat bepaalt het budget?",
      answer: `Het aantal gasten, het menu en de formule. ${ask}`,
    },
    {
      question: "Op welke dagen kan een event doorgaan?",
      answer:
        "Tijdens onze gewone openingsuren, en voor groepen en events ook op dinsdag, zaterdagmiddag en zondag.",
    },
    {
      question: "Met hoeveel kunnen we komen?",
      answer: `In The Room ontvangen we tot 20 gasten. Voor grotere gezelschappen bekijken we de mogelijkheden samen. ${ask}`,
    },
  ],
  trouwen: [
    {
      question: "Hebben we het restaurant voor ons alleen?",
      answer: `Dat bespreken we graag met jullie, afhankelijk van de dag en het gezelschap. Bel ons op ${site.contact.phone}.`,
    },
    {
      question: "Met hoeveel gasten kunnen we komen?",
      answer:
        "CRKL is een plek voor kleinschalige huwelijksfeesten. Het precieze aantal bekijken we samen.",
    },
    {
      question: "Kan de ceremonie ter plaatse?",
      answer: `Vertel ons hoe jullie de dag zien; we laten weten wat mogelijk is. Mail naar ${site.contact.email}.`,
    },
    {
      question: "Hoe lang op voorhand leggen we de datum vast?",
      answer: "Hoe vroeger, hoe meer keuze. Stuur jullie datum door en we antwoorden zo snel mogelijk.",
    },
  ],
  geschenkbox: [
    {
      question: "Hoe lang is een cadeaubon geldig?",
      answer: "De cadeaubon is één jaar geldig. De waarde kiest u volledig zelf.",
    },
    {
      question: "Kan de box verzonden worden?",
      answer: `U kan uw bestelling gratis ophalen in het restaurant. Voor verzending: ${ask}`,
    },
    {
      question: "Kan ik de box personaliseren?",
      answer: `Een persoonlijke boodschap of een andere samenstelling? ${ask}`,
    },
  ],
  contact: [
    parking,
    {
      question: "Wanneer zijn jullie open?",
      answer: `Lunch van ${site.hours.lunch.days.toLowerCase()} (${site.hours.lunch.hours}), diner van ${site.hours.dinner.days.toLowerCase()} (${site.hours.dinner.hours}). ${site.hours.note}`,
    },
    groups,
    {
      question: "Waar haal ik een bestelde geschenkbox op?",
      answer: `In het restaurant, ${site.contact.street} in Roeselare, tijdens de openingsuren.`,
    },
  ],
};
