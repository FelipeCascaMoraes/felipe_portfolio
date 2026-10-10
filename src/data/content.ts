/** Textos das seções. Edite aqui sem tocar nos componentes. */

export const hero = {
  eyebrow: "Desenvolvimento · Inteligência Artificial",
  title: "Tecnologia que resolve",
  titleHighlight: "problemas reais.",
  description:
    "Desenvolvo soluções em inteligência artificial, automações, CRMs e sistemas personalizados para empresas que querem evoluir com tecnologia.",
  primaryCta: { label: "Ver projetos", href: "#projetos" },
  // O destino dos botões de contato é definido em contact.ts.
  secondaryCta: { label: "Entrar em contato" },
} as const;

export const projectsSection = {
  eyebrow: "Projetos",
  title: "Alguns dos meus trabalhos",
  subtitle: "Projetos que exploram tecnologia para resolver problemas concretos.",
} as const;

export const servicesSection = {
  eyebrow: "Serviços",
  title: "O que eu desenvolvo",
  subtitle:
    "Do primeiro protótipo à operação do dia a dia, com soluções pensadas para o contexto de cada negócio.",
} as const;

export const technologiesSection = {
  index: "03",
  eyebrow: "Stack",
  titleTop: "Ferramentas",
  titleBottom: "& Skills",
  subtitle:
    "Utilizo ferramentas modernas para construir soluções digitais, da automação de processos às aplicações web.",
} as const;

/** Faixa em movimento entre o hero e os projetos. */
export const marqueeItems = [
  "Inteligência artificial",
  "Agentes",
  "Automações",
  "CRMs e ERPs",
  "Sistemas sob medida",
  "Integrações e APIs",
] as const;

export const about = {
  eyebrow: "Sobre",
  title: "Quem sou eu?",
  // Adicione novos parágrafos para contar trajetória, experiência e objetivos.
  paragraphs: [
    "Sou Felipe Cascaioli, desenvolvedor focado em criar soluções digitais inteligentes e eficientes. Tenho interesse em inteligência artificial, automação de processos e desenvolvimento de sistemas que resolvam problemas reais.",
  ],
  // Foto profissional em /public (ex.: "/felipe.jpg"). Com `null`, é exibida uma composição abstrata.
  photo: null as string | null,
  photoAlt: "Retrato de Felipe Cascaioli",
};

export const contactSection = {
  eyebrow: "Contato",
  title: "Vamos conversar?",
  description:
    "Tem um projeto em mente ou quer automatizar algum processo? Entre em contato para conversarmos sobre uma solução para o seu negócio.",
  primaryCta: "Falar sobre meu projeto",
} as const;
