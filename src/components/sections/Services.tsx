import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { servicesSection } from "@/data/content";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative py-24 sm:py-32">
      <SectionDivider />
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* O título acompanha a rolagem enquanto os cards passam ao lado. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="servicos-title"
            index="02"
            eyebrow={servicesSection.eyebrow}
            title={servicesSection.title}
            subtitle={servicesSection.subtitle}
          />
        </div>

        <Stagger as="ul" gap={0.1} className="grid gap-5 sm:grid-cols-2">
          {services.map(({ title, description, icon: Icon }, index) => (
            <StaggerItem key={title} as="li" className="sm:even:translate-y-10">
              <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-[border-color,transform] duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-accent to-violet transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                {/* Numeral grande ao fundo: reforça a ordem sem competir com o texto. */}
                <span
                  aria-hidden="true"
                  className="absolute -top-3 right-4 font-display text-[6.5rem] leading-none font-extrabold tracking-[-0.06em] text-white/[0.035] transition-colors duration-500 group-hover:text-accent/15"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative grid size-12 place-items-center rounded-2xl border border-line-strong bg-linear-to-br from-white/[0.08] to-transparent text-accent-soft shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] transition-[border-color,color,transform,box-shadow] duration-500 group-hover:-rotate-6 group-hover:border-accent/60 group-hover:text-fg group-hover:shadow-[0_0_28px_-6px_rgb(74_133_255/0.8),inset_0_1px_0_rgb(255_255_255/0.2)]">
                  <Icon aria-hidden="true" className="size-5.5" strokeWidth={1.6} />
                </span>
                <h3 className="relative mt-10 font-display text-xl leading-snug font-semibold tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="relative mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">
                  {description}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
      <div aria-hidden="true" className="hidden h-10 sm:block" />
    </section>
  );
}
