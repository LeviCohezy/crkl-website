import { Reveal } from "@/components/motion/Reveal";
import { Band, Head, type Tone } from "@/components/sections/Band";
import { MenuGroupList } from "@/components/sections/MenuTabs";
import { ArrowLink } from "@/components/ui/Button";
import { menuTab, type MenuTab } from "@/lib/menu";

type MenuExcerptProps = {
  tab: MenuTab["id"];
  tone?: Tone;
  eyebrow: string;
  title: string;
};

/** One tab of the menu, set out in full, with the way to the rest of it. */
export function MenuExcerpt({ tab, tone = "white", eyebrow, title }: MenuExcerptProps) {
  const data = menuTab(tab);

  return (
    <Band tone={tone}>
      <Head
        tone={tone}
        eyebrow={eyebrow}
        title={title}
        aside={<ArrowLink href="/menu#kaart">Volledig menu</ArrowLink>}
      />
      <div className="mt-16 grid gap-x-16 gap-y-16 lg:grid-cols-2">
        {data.groups.map((group, index) => (
          <Reveal key={group.name} delay={index * 0.1}>
            <MenuGroupList group={group} />
          </Reveal>
        ))}
      </div>
    </Band>
  );
}
