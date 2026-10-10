import { ArrowDown, ArrowRight } from "lucide-react";
import { HeroVisual } from "@/components/three/HeroVisual";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContactCta } from "@/components/ui/ContactCta";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { Stagger, StaggerItem, TextReveal } from "@/components/ui/Reveal";
import { hero, marqueeItems } from "@/data/content";
import { services } from "@/data/services";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Malha de fundo, desvanecida nas bordas. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)] bg-size-[64px_64px]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(139_108_255/0.1),transparent_65%)]"
      />

      <Container className="relative grid items-center gap-10 pt-28 pb-14 sm:pt-36 lg:min-h-[min(100svh,900px)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pt-28 lg:pb-16">
        <Stagger onMount gap={0.1} delay={0.1}>
          <StaggerItem>
            <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] text-accent-soft uppercase sm:text-xs">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {hero.eyebrow}
            </p>
          </StaggerItem>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.75rem] leading-[1.02] font-bold tracking-[-0.04em] text-balance sm:text-6xl lg:text-[4.75rem]"
          >
            <TextReveal
              onMount
              delay={0.15}
              lines={[
                { text: hero.title },
                {
                  text: hero.titleHighlight,
                  className:
                    "bg-linear-to-r from-accent-soft via-accent to-violet bg-clip-text text-transparent",
                },
              ]}
            />
          </h1>

          <StaggerItem>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
              {hero.description}
            </p>
          </StaggerItem>

          <StaggerItem className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ContactCta variant="secondary">{hero.secondaryCta.label}</ContactCta>
          </StaggerItem>

          <StaggerItem>
            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-7 sm:grid-cols-4">
              {services.map(({ shortLabel, icon: Icon }) => (
                <li key={shortLabel} className="flex items-center gap-2.5 text-sm text-muted">
                  <Icon aria-hidden="true" className="size-4 shrink-0 text-accent" strokeWidth={1.75} />
                  {shortLabel}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <HeroVisual />

        <a
          href="#projetos"
          className="absolute bottom-6 left-8 hidden items-center gap-3 font-mono text-[0.68rem] tracking-[0.2em] text-dim uppercase transition-colors hover:text-fg xl:flex"
        >
          <span className="grid size-8 place-items-center rounded-full border border-line-strong">
            <ArrowDown aria-hidden="true" className="size-3.5 motion-safe:animate-bounce" />
          </span>
          Role para explorar
        </a>
      </Container>

      <Marquee items={marqueeItems} />
    </section>
  );
}
