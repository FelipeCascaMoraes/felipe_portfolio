import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContactIcon } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { contactSection } from "@/data/content";
import { contactChannels, primaryContact } from "@/data/contact";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative py-24 sm:py-32">
      <SectionDivider />
      <Container>
        <Reveal distance={32}>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 sm:px-12 sm:py-24">
            <div
              aria-hidden="true"
              className="absolute -top-40 left-1/2 h-80 w-[44rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(74_133_255/0.24),transparent_65%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
            />
            {/* Anéis decorativos nos cantos, em profundidades diferentes. */}
            <Parallax distance={30} className="pointer-events-none absolute -right-24 -bottom-28">
              <div aria-hidden="true" className="size-72 rounded-full border border-violet/25" />
            </Parallax>
            <Parallax distance={-22} className="pointer-events-none absolute -bottom-40 -left-20">
              <div aria-hidden="true" className="size-80 rounded-full border border-accent/20" />
            </Parallax>

            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
              <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-dim uppercase">
                <span className="text-accent">05</span>
                <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                {contactSection.eyebrow}
              </p>
              <h2
                id="contato-title"
                className="mt-6 font-display text-5xl leading-none font-bold tracking-[-0.04em] text-balance sm:text-7xl"
              >
                <TextReveal lines={[{ text: contactSection.title }]} delay={0.1} />
              </h2>
              <Reveal delay={0.25} distance={14}>
                <p className="mt-6 text-base leading-relaxed text-muted text-pretty sm:text-lg">
                  {contactSection.description}
                </p>
              </Reveal>

              {primaryContact ? (
                <Reveal delay={0.35} distance={14}>
                  <ButtonLink href={primaryContact.href} className="mt-9">
                    {primaryContact.id === "whatsapp" ? (
                      <ContactIcon channel="whatsapp" className="size-[1.1em]" />
                    ) : null}
                    {contactSection.primaryCta}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    {primaryContact.id === "whatsapp" ? (
                      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                    ) : null}
                  </ButtonLink>
                </Reveal>
              ) : null}

              {contactChannels.length > 0 ? (
                <Stagger as="ul" gap={0.07} delay={0.4} className="mt-8 flex flex-wrap justify-center gap-3">
                  {contactChannels.map((channel) => (
                    <StaggerItem key={channel.id} as="li">
                      <ButtonLink href={channel.href} variant="secondary" size="md" className="h-11">
                        <ContactIcon channel={channel.id} className="size-4" />
                        {channel.label}
                      </ButtonLink>
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
