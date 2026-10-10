export type ProjectStatus = "Em desenvolvimento" | "Protótipo" | "Concluído";

/** Arte abstrata usada como capa enquanto não houver captura de tela real. */
export type ProjectMotif = "finance" | "education" | "geopolitics" | "broker";

export interface Project {
  slug: string;
  name: string;
  description: string;
  category: string;
  status: ProjectStatus;
  motif: ProjectMotif;
  /** Liste apenas tecnologias confirmadas. Vazio = a linha não é exibida. */
  technologies: string[];
  /** Captura real em /public (ex.: "/projects/kerdos-ai.png"). Sem ela, usa a capa abstrata. */
  image?: string;
  /** Demonstração publicada. Sem URL, o link não é exibido. */
  liveUrl?: string;
  /** Repositório público. Sem URL, o link não é exibido. */
  repoUrl?: string;
}

// Revise o `status` de cada projeto conforme a situação real.
export const projects: Project[] = [
  {
    slug: "kerdos-ai",
    name: "Kerdos AI",
    description:
      "Assistente financeiro com recursos de inteligência artificial para organização e acompanhamento financeiro.",
    category: "Finanças · IA",
    status: "Em desenvolvimento",
    motif: "finance",
    technologies: [],
  },
  {
    slug: "entendai",
    name: "EntendAI",
    description:
      "Assistente educacional com IA para apoiar estudantes na compreensão de exercícios e conteúdos.",
    category: "Educação · IA",
    status: "Em desenvolvimento",
    motif: "education",
    technologies: ["Python"],
    repoUrl: "https://github.com/FelipeCascaMoraes/EntendAI",
  },
  {
    slug: "geopolitical-agent",
    name: "Geopolitical Agent",
    description:
      "Projeto de inteligência geopolítica para organizar informações e explorar análises assistidas por IA.",
    category: "Análise · Agentes",
    status: "Em desenvolvimento",
    motif: "geopolitics",
    technologies: ["TypeScript"],
    repoUrl: "https://github.com/FelipeCascaMoraes/geopolitical-curator-agent",
  },
  {
    slug: "mini-home-broker",
    name: "Mini Home Broker",
    description:
      "Sistema de simulação de operações financeiras, acompanhamento de carteira e cálculo de patrimônio.",
    category: "Finanças · Simulação",
    status: "Em desenvolvimento",
    motif: "broker",
    technologies: ["Python"],
    repoUrl: "https://github.com/FelipeCascaMoraes/MINI_HOME_BROKER",
  },
];
