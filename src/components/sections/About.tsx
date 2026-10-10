import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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
        <circle cx="160" cy="170" r="108" stroke="rgb(74 133 255 / 0.3)" />
        <circle cx="160" cy="170" r="66" stroke="rgb(139 108 255 / 0.35)" />
        <circle cx="268" cy="170" r="4" fill="#dfe9ff" />
        <circle cx="113" cy="123" r="3.5" fill="#b9a8ff" />
        <path d="M0 330h320M0 362h320" stroke="rgb(255 255 255 / 0.05)" />
      </svg>
      <span className="absolute top-[42.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl font-semibold tracking-tight text-fg/90">
        {site.initials}
      </span>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="border-t border-line py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <SectionHeading id="sobre-title" index="04" eyebrow={about.eyebrow} title={about.title} />
          <Reveal delay={0.08} className="mt-7 max-w-xl space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted text-pretty sm:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
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
