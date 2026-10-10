import { FloatingIcons } from "@/components/tech/FloatingIcons";
import { SkillPanel } from "@/components/tech/SkillPanel";
import { TechIcon } from "@/components/tech/TechIcon";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { technologiesSection } from "@/data/content";
import { floatingIcons, technologies } from "@/data/technologies";

export function Technologies() {
  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-title"
      className="relative overflow-hidden py-36 sm:py-44 lg:py-56"
    >
      <SectionDivider />

      {/* Iluminação de fundo e malha, desvanecidas nas bordas. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-[12%] h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(74_133_255/0.13),transparent_65%)]" />
        <div className="absolute top-[30%] right-[4%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(139_108_255/0.11),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] mask-[radial-gradient(ellipse_75%_65%_at_50%_50%,black,transparent)] bg-size-[28px_28px]" />
      </div>

      <FloatingIcons icons={floatingIcons} />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <Reveal distance={12}>
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-dim uppercase">
              <span className="text-accent">{technologiesSection.index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              {technologiesSection.eyebrow}
            </p>
          </Reveal>

          <h2
            id="tecnologias-title"
            className="mt-6 font-display text-[2.7rem] leading-[0.92] font-extrabold tracking-[-0.045em] uppercase sm:text-7xl lg:text-[5.25rem]"
          >
            <TextReveal
              lines={[
                { text: technologiesSection.titleTop },
                {
                  text: technologiesSection.titleBottom,
                  className:
                    "bg-linear-to-r from-accent via-accent-soft to-violet bg-clip-text text-transparent",
                },
              ]}
            />
          </h2>

          <Reveal delay={0.2} distance={14}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted text-pretty sm:text-lg">
              {technologiesSection.subtitle}
            </p>
          </Reveal>

          <Stagger as="ul" gap={0.035} delay={0.25} className="mt-9 flex max-w-xl flex-wrap gap-2.5">
            {technologies.map((technology) => (
              <StaggerItem key={technology.id} as="li">
                <span className="group/chip flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] py-2 pr-4 pl-3 text-sm text-fg transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/[0.1]">
                  <TechIcon
                    technology={technology.id}
                    className="size-4 text-accent-soft transition-colors duration-300 group-hover/chip:text-fg"
                  />
                  {technology.label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.15} distance={32}>
          <SkillPanel />
        </Reveal>
      </Container>
    </section>
  );
}
