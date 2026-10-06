import { MediaImage } from "@/components/media/MediaImage";
import { Square } from "@/components/motion/Accents";
import { Reveal, Unveil } from "@/components/motion/Reveal";
import { Band, Head, type Tone } from "@/components/sections/Band";
import { MenuGroupList } from "@/components/sections/MenuTabs";
import { ArrowLink } from "@/components/ui/Button";
import { menuTab, type MenuTab } from "@/lib/menu";
import type { Photo } from "@/lib/photos";

type MenuExcerptProps = {
  tab: MenuTab["id"];
  tone?: Tone;
  eyebrow: string;
  title: string;
  /** For `framed`: the photograph beside the list. */
  photo?: Photo;
  /**
   * `columns` — the menus side by side under the title, numbered.
   * `framed`  — one photograph in a slipped frame on the right, the list
   *             on the left, title above (Blanquette).
   */
  variant?: "columns" | "framed";
};

/** One tab of the menu, set out in full, with the way to the rest of it. */
export function MenuExcerpt({ tab, tone = "white", eyebrow, title, photo, variant = "columns" }: MenuExcerptProps) {
  const data = menuTab(tab);
  const link = <ArrowLink href="/menu#kaart">Volledig menu</ArrowLink>;

  if (variant === "framed" && photo) {
    return (
      <Band tone={tone}>
        <Head tone={tone} eyebrow={eyebrow} title={title} aside={link} />
        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-16 lg:col-span-6">
            {data.groups.map((group, index) => (
              <Reveal key={group.name} delay={index * 0.1}>
                <MenuGroupList group={group} index={index} />
              </Reveal>
            ))}
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <Square className="-top-6 -right-6 h-full w-full" />
            <Unveil>
              <MediaImage src={photo.src} alt={photo.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" focus={photo.focus} />
            </Unveil>
          </div>
        </div>
      </Band>
    );
  }

  return (
    <Band tone={tone}>
      <Head tone={tone} eyebrow={eyebrow} title={title} align="center" />
      <div className="mx-auto mt-16 grid max-w-5xl gap-x-20 gap-y-16 lg:grid-cols-2">
        {data.groups.map((group, index) => (
          <Reveal key={group.name} delay={index * 0.1}>
            <MenuGroupList group={group} index={index} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-16 flex justify-center">{link}</Reveal>
    </Band>
  );
}
