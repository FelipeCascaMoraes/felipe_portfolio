import { ArrowRight } from "lucide-react";
import { HeroVisual } from "@/components/three/HeroVisual";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/content";
import { services } from "@/data/services";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Malha de fundo, desvanecida nas bordas. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)] bg-size-[64px_64px]"
      />

      <Container className="relative grid items-center gap-12 pt-28 pb-16 sm:pt-36 lg:min-h-[min(100svh,880px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-28 lg:pb-20">
        <div className="animate-rise">
          <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] text-accent-soft uppercase sm:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            {hero.title}{" "}
            <span className="bg-linear-to-r from-accent-soft to-violet bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-7 sm:grid-cols-4">
            {services.map(({ shortLabel, icon: Icon }) => (
              <li key={shortLabel} className="flex items-center gap-2.5 text-sm text-muted">
                <Icon aria-hidden="true" className="size-4 shrink-0 text-accent" strokeWidth={1.75} />
                {shortLabel}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
