export type ContactChannelId = "whatsapp" | "email" | "github" | "linkedin";

export interface ContactChannel {
  id: ContactChannelId;
  label: string;
  href: string;
}

/**
 * Canais de contato. Um canal com valor `null` não é exibido no site.
 */
const contactConfig = {
  // PLACEHOLDER: número com DDI e DDD, apenas dígitos. Ex.: "5511999999999"
  whatsapp: null as string | null,
  whatsappMessage: "Olá, Felipe! Vi seu portfólio e gostaria de conversar sobre um projeto.",
  // PLACEHOLDER: e-mail profissional. Ex.: "contato@seudominio.com"
  email: null as string | null,
  github: "https://github.com/FelipeCascaMoraes" as string | null,
  // PLACEHOLDER: URL completa do perfil. Ex.: "https://www.linkedin.com/in/seu-usuario"
  linkedin: null as string | null,
};

function buildChannels(): ContactChannel[] {
  const { whatsapp, whatsappMessage, email, github, linkedin } = contactConfig;
  const channels: ContactChannel[] = [];

  if (whatsapp) {
    channels.push({
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
    });
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
 * Destino do botão "Falar sobre meu projeto": o primeiro canal de conversa
 * direta disponível. Sem WhatsApp, e-mail ou LinkedIn, o botão não aparece.
 */
export const primaryContact: ContactChannel | null =
  contactChannels.find((channel) => channel.id !== "github") ?? null;
