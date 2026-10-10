export interface TechnologyGroup {
  label: string;
  items: string[];
}

// Mantenha aqui apenas o que você realmente usa nos projetos.
export const technologyGroups: TechnologyGroup[] = [
  {
    label: "Linguagens",
    items: ["Python", "C#", "JavaScript", "SQL"],
  },
  {
    label: "Dados e APIs",
    items: ["PostgreSQL", "APIs REST"],
  },
  {
    label: "IA e automação",
    items: ["n8n", "Ferramentas de IA generativa"],
  },
  {
    label: "Infraestrutura",
    items: ["Git e GitHub", "Docker"],
  },
];
