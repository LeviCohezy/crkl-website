import { FormSection } from "@/components/v3/FormSection";
import type { Tone } from "@/components/v3/Section";

/**
 * The end of every page: a plain contact form. Tables are not booked here
 * — that goes through the step-by-step tool on /reserveren — so this one
 * asks for nothing but a message.
 */
export function ContactSection({ tone = "white" }: { tone?: Tone }) {
  return (
    <FormSection
      id="contact"
      tone={tone}
      title={"Een vraag?\n*Schrijf ons*"}
      intro="Een tafel reserveert u in een paar stappen via Reserveer. Voor al de rest: schrijf of bel, we antwoorden zo snel mogelijk."
      form={{ kind: "contact", submitLabel: "Stuur bericht" }}
    />
  );
}
