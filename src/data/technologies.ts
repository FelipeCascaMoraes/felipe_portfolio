export type TechnologyId =
  | "python"
  | "csharp"
  | "javascript"
  | "sql"
  | "postgresql"
  | "react"
  | "nextjs"
  | "rest"
  | "n8n"
  | "git"
  | "github"
  | "docker"
  | "ai";

export interface Technology {
  id: TechnologyId;
  label: string;
}

// Mantenha aqui apenas o que você realmente usa nos projetos.
// Para remover uma tecnologia, apague a linha e as referências a ela abaixo.
export const technologies: Technology[] = [
  { id: "python", label: "Python" },
  { id: "csharp", label: "C#" },
  { id: "javascript", label: "JavaScript" },
  { id: "sql", label: "SQL" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "rest", label: "APIs REST" },
  { id: "n8n", label: "n8n" },
  { id: "git", label: "Git" },
  { id: "github", label: "GitHub" },
  { id: "docker", label: "Docker" },
  { id: "ai", label: "Ferramentas de IA" },
];

export interface SkillGroup {
  label: string;
  technologies: TechnologyId[];
}

/** Linhas do painel de competências: tecnologias agrupadas por especialidade. */
export const skillGroups: SkillGroup[] = [
  { label: "IA & Automações", technologies: ["ai", "n8n"] },
  { label: "Desenvolvimento", technologies: ["python", "csharp", "javascript", "react", "nextjs"] },
  { label: "Dados & APIs", technologies: ["sql", "postgresql", "rest"] },
  { label: "Infraestrutura", technologies: ["git", "github", "docker"] },
];

export interface FloatingIcon {
  technology: TechnologyId;
  /** Posição em telas largas (a partir de 1024px), em % da seção. */
  top: string;
  left: string;
  /** Posição no celular e no tablet. Sem ela, o ícone fica oculto nessas telas. */
  mobile?: { top: string; left: string };
  /** Lado do bloco, em px. */
  size: number;
  /** 1 = ao fundo (menor, mais apagado) · 3 = à frente (maior, mais nítido). */
  depth: 1 | 2 | 3;
  /** Inclinação em graus: [eixo X, eixo Y, rotação]. */
  tilt: [number, number, number];
}

/**
 * Ícones decorativos ao redor da seção. Ocupam as faixas livres acima e
 * abaixo do conteúdo e as margens laterais, sem passar por cima dos textos.
 */
export const floatingIcons: FloatingIcon[] = [
  { technology: "python", top: "7%", left: "5%", mobile: { top: "1.6%", left: "7%" }, size: 76, depth: 3, tilt: [14, -18, -8] },
  { technology: "react", top: "4%", left: "38%", mobile: { top: "2.6%", left: "44%" }, size: 52, depth: 2, tilt: [-10, 14, 10] },
  { technology: "ai", top: "9%", left: "63%", size: 40, depth: 1, tilt: [8, 10, -12] },
  { technology: "docker", top: "5%", left: "86%", mobile: { top: "1.2%", left: "76%" }, size: 84, depth: 3, tilt: [12, 20, 7] },
  { technology: "postgresql", top: "46%", left: "95.5%", size: 54, depth: 2, tilt: [-8, -22, 6] },
  { technology: "git", top: "50%", left: "0.8%", size: 40, depth: 1, tilt: [10, 20, -10] },
  { technology: "github", top: "86%", left: "9%", mobile: { top: "96.4%", left: "12%" }, size: 58, depth: 2, tilt: [-12, 16, 9] },
  { technology: "n8n", top: "88%", left: "43%", mobile: { top: "95.8%", left: "68%" }, size: 68, depth: 3, tilt: [-14, -12, -6] },
  { technology: "nextjs", top: "91%", left: "70%", size: 40, depth: 1, tilt: [10, -16, 12] },
  { technology: "javascript", top: "84%", left: "89%", size: 60, depth: 2, tilt: [-10, 18, -9] },
];
