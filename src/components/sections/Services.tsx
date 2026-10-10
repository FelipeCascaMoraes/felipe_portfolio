import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesSection } from "@/data/content";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="servicos-title"
          index="02"
          eyebrow={servicesSection.eyebrow}
          title={servicesSection.title}
          subtitle={servicesSection.subtitle}
        />

        {/* Grade única com divisórias de 1px: os cards compartilham as bordas. */}
        <Reveal className="mt-12 lg:mt-16">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className="group relative flex flex-col bg-bg p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-accent to-violet transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-white/[0.03] text-accent-soft transition-colors duration-300 group-hover:border-accent/50 group-hover:text-fg">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
                  </span>
                  <span aria-hidden="true" className="font-mono text-xs text-dim">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-lg leading-snug font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
