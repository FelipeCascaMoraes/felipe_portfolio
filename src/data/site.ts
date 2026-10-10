export interface NavItem {
  label: string;
  href: `#${string}`;
}

/**
 * URL pública do site, usada em metadados e Open Graph.
 * Defina NEXT_PUBLIC_SITE_URL na Vercel quando tiver um domínio próprio.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Felipe Cascaioli",
  initials: "FC",
  role: "Dev & IA",
  title: "Felipe Cascaioli — Desenvolvimento & Inteligência Artificial",
  description:
    "Desenvolvo soluções em inteligência artificial, automações, CRMs e sistemas personalizados para empresas que querem evoluir com tecnologia.",
  url: resolveSiteUrl(),
  locale: "pt_BR",
} as const;

export const navigation: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];
