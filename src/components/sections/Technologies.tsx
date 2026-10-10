import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologiesSection } from "@/data/content";
import { technologyGroups } from "@/data/technologies";

export function Technologies() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-title"
      className="border-t border-line py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="tecnologias-title"
          index="03"
          eyebrow={technologiesSection.eyebrow}
          title={technologiesSection.title}
          subtitle={technologiesSection.subtitle}
        />

        <dl className="border-t border-line">
          {technologyGroups.map((group, index) => (
            <Reveal
              key={group.label}
              delay={index * 0.05}
              className="grid gap-3 border-b border-line py-6 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-6"
            >
              <dt className="font-mono text-xs tracking-[0.16em] text-dim uppercase">
                {group.label}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line-strong bg-white/[0.02] px-3.5 py-1.5 text-sm text-fg transition-colors duration-200 hover:border-accent/50 hover:bg-accent/[0.08]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
