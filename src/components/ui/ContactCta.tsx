import type { ReactNode } from "react";
import { CONTACT_ANCHOR, whatsappUrl } from "@/data/contact";
import { ButtonLink } from "./ButtonLink";
import { ContactIcon } from "./ContactIcon";

interface ContactCtaProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
}

/**
 * Botão de contato usado em todo o site. Com o WhatsApp configurado em
 * src/data/contact.ts, abre a conversa em nova aba com a mensagem preenchida;
 * sem ele, leva à seção de contato da própria página.
 */
export function ContactCta({ children, variant, size, className }: ContactCtaProps) {
  return (
    <ButtonLink href={whatsappUrl ?? CONTACT_ANCHOR} variant={variant} size={size} className={className}>
      {whatsappUrl ? <ContactIcon channel="whatsapp" className="size-[1.1em]" /> : null}
      {children}
      {whatsappUrl ? <span className="sr-only"> (abre o WhatsApp em nova aba)</span> : null}
    </ButtonLink>
  );
}
