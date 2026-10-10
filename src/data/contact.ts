export type ContactChannelId = "whatsapp" | "email" | "github" | "linkedin";

export interface ContactChannel {
  id: ContactChannelId;
  label: string;
  href: string;
}

/**
 * Canais de contato. Um canal com valor `null` não é exibido no site.
 * Este é o único lugar onde o número e a mensagem do WhatsApp são definidos.
 */
const contactConfig = {
  // Número em formato internacional,
  // somente dígitos: 55 + DDD + número. Ex.: "5511912345678"
  // (sem espaços, parênteses, hífens ou sinal de mais).
  whatsapp: "5511945995522" as string | null,
  // Mensagem que já vem escrita na conversa. O visitante ainda precisa enviá-la.
  whatsappMessage:
    "Olá, Felipe! Conheci seu portfólio e gostaria de conversar sobre um projeto. Podemos falar sobre minha ideia?",
  // PLACEHOLDER: e-mail profissional. Ex.: "contato@seudominio.com"
  email: null as string | null,
  github: "https://github.com/FelipeCascaMoraes" as string | null,
  // PLACEHOLDER: URL completa do perfil. Ex.: "https://www.linkedin.com/in/seu-usuario"
  linkedin: null as string | null,
};

/** Monta o link oficial de Click to Chat: https://wa.me/NUMERO?text=MENSAGEM */
export function buildWhatsAppUrl(number: string, message: string): string {
  // 55 + DDD (2 dígitos) + número (8 ou 9 dígitos).
  if (!/^55\d{10,11}$/.test(number)) {
    throw new Error(
      `Número de WhatsApp inválido em src/data/contact.ts: "${number}". ` +
        'Use somente dígitos, no formato 55 + DDD + número (ex.: "5511912345678").',
    );
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Link do WhatsApp, ou `null` enquanto o número não estiver configurado. */
export const whatsappUrl: string | null = contactConfig.whatsapp
  ? buildWhatsAppUrl(contactConfig.whatsapp, contactConfig.whatsappMessage)
  : null;

function buildChannels(): ContactChannel[] {
  const { email, github, linkedin } = contactConfig;
  const channels: ContactChannel[] = [];

  if (whatsappUrl) {
    channels.push({ id: "whatsapp", label: "WhatsApp", href: whatsappUrl });
  }
  if (email) {
    channels.push({ id: "email", label: "E-mail", href: `mailto:${email}` });
  }
  if (github) {
    channels.push({ id: "github", label: "GitHub", href: github });
  }
  if (linkedin) {
    channels.push({ id: "linkedin", label: "LinkedIn", href: linkedin });
  }

  return channels;
}

/** Canais configurados, na ordem de exibição. */
export const contactChannels = buildChannels();

/**
 * Destino do botão "Falar sobre meu projeto": o WhatsApp ou, na falta dele,
 * o primeiro canal de conversa direta. Sem nenhum, o botão não aparece.
 */
export const primaryContact: ContactChannel | null =
  contactChannels.find((channel) => channel.id !== "github") ?? null;

/** Âncora da seção de contato, usada enquanto o WhatsApp não estiver configurado. */
export const CONTACT_ANCHOR = "#contato";
