import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContactIcon } from "@/components/ui/ContactIcon";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactSection } from "@/data/content";
import { contactChannels, primaryContact } from "@/data/contact";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute -top-40 left-1/2 h-80 w-[44rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(74_133_255/0.22),transparent_65%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
            />

            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
              <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-dim uppercase">
                <span className="text-accent">05</span>
                <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                {contactSection.eyebrow}
              </p>
              <h2
                id="contato-title"
                className="mt-5 font-display text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl"
              >
                {contactSection.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted text-pretty sm:text-lg">
                {contactSection.description}
              </p>

              {primaryContact ? (
                <ButtonLink href={primaryContact.href} className="mt-9">
                  {contactSection.primaryCta}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              ) : null}

              {contactChannels.length > 0 ? (
                <ul className="mt-8 flex flex-wrap justify-center gap-3">
                  {contactChannels.map((channel) => (
                    <li key={channel.id}>
                      <ButtonLink href={channel.href} variant="secondary" size="md" className="h-11">
                        <ContactIcon channel={channel.id} className="size-4" />
                        {channel.label}
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
