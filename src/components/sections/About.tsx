import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Parallax } from "@/components/ui/Parallax";
import { DrawLine, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/content";
import { site } from "@/data/site";

/** Composição temporária exibida enquanto `about.photo` não for definido. */
function PortraitPlaceholder() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgb(74_133_255/0.22),transparent_60%)]" />
      <svg viewBox="0 0 320 400" fill="none" className="absolute inset-0 h-full w-full">
        <circle cx="160" cy="170" r="150" stroke="rgb(255 255 255 / 0.06)" />
        <path d="M0 330h320M0 362h320" stroke="rgb(255 255 255 / 0.05)" />
        <g className="origin-[160px_170px] motion-safe:animate-orbit">
          <circle cx="160" cy="170" r="108" stroke="rgb(74 133 255 / 0.3)" />
          <circle cx="268" cy="170" r="4" fill="#dfe9ff" />
        </g>
        <g className="origin-[160px_170px] motion-safe:animate-orbit [animation-direction:reverse] [animation-duration:32s]">
          <circle cx="160" cy="170" r="66" stroke="rgb(139 108 255 / 0.35)" />
          <circle cx="113" cy="123" r="3.5" fill="#b9a8ff" />
        </g>
      </svg>
      <span className="absolute top-[42.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl font-bold tracking-tight text-fg/90">
        {site.initials}
      </span>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative overflow-hidden py-24 sm:py-32">
      <SectionDivider />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <SectionHeading id="sobre-title" index="04" eyebrow={about.eyebrow} title={about.title} />
          <Stagger gap={0.12} delay={0.15} className="mt-8 max-w-xl space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <StaggerItem key={paragraph}>
                <p
                  className={`leading-relaxed text-pretty ${
                    index === 0 ? "text-lg text-fg/90 sm:text-xl" : "text-base text-muted sm:text-lg"
                  }`}
                >
                  {paragraph}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
          <DrawLine delay={0.3} className="mt-10 max-w-xl bg-linear-to-r from-line-strong to-transparent" />
        </div>

        <Reveal delay={0.1} distance={32} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          {/* Moldura deslocada ao fundo, com leve paralaxe em relação ao retrato. */}
          <Parallax distance={18} className="absolute inset-0 translate-x-4 translate-y-4">
            <div aria-hidden="true" className="h-full rounded-3xl border border-accent/25" />
          </Parallax>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface">
            {about.photo ? (
              <Image
                src={about.photo}
                alt={about.photoAlt}
                fill
                sizes="(min-width: 1024px) 440px, 384px"
                className="object-cover"
              />
            ) : (
              <PortraitPlaceholder />
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-bg/70 px-5 py-4 backdrop-blur-md">
              <span className="text-sm font-medium">{site.name}</span>
              <span className="font-mono text-[0.68rem] tracking-[0.16em] text-dim uppercase">
                {site.role}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
