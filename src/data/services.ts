import { Blocks, Bot, LayoutDashboard, Workflow, type LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  /** Rótulo curto usado nas especialidades do hero. */
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Soluções de IA",
    shortLabel: "IA e agentes",
    description:
      "Assistentes inteligentes, agentes especializados e integração de modelos de linguagem.",
    icon: Bot,
  },
  {
    title: "Automações",
    shortLabel: "Automações",
    description:
      "Fluxos automatizados, integração de ferramentas e otimização de processos operacionais.",
    icon: Workflow,
  },
  {
    title: "CRMs e sistemas personalizados",
    shortLabel: "CRMs e ERPs",
    description:
      "Sistemas de gestão, aplicações web, painéis e ferramentas adaptadas às necessidades do negócio.",
    icon: LayoutDashboard,
  },
  {
    title: "Integrações e APIs",
    shortLabel: "Integrações",
    description:
      "Conexão entre plataformas, serviços externos, bancos de dados e sistemas existentes.",
    icon: Blocks,
  },
];
