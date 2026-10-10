import { Database, Sparkles, Webhook, type LucideIcon } from "lucide-react";
import {
  siDocker,
  siGit,
  siGithub,
  siJavascript,
  siN8n,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
} from "simple-icons";
import type { TechnologyId } from "@/data/technologies";

/** Marcas com SVG oficial (Simple Icons, CC0). */
const brandPaths: Partial<Record<TechnologyId, string>> = {
  python: siPython.path,
  javascript: siJavascript.path,
  postgresql: siPostgresql.path,
  react: siReact.path,
  nextjs: siNextdotjs.path,
  n8n: siN8n.path,
  git: siGit.path,
  github: siGithub.path,
  docker: siDocker.path,
};

/** Conceitos sem marca própria usam ícones do Lucide. */
const genericIcons: Partial<Record<TechnologyId, LucideIcon>> = {
  sql: Database,
  rest: Webhook,
  ai: Sparkles,
};

interface TechIconProps {
  technology: TechnologyId;
  className?: string;
}

export function TechIcon({ technology, className }: TechIconProps) {
  const path = brandPaths[technology];
  if (path) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d={path} />
      </svg>
    );
  }

  const Generic = genericIcons[technology];
  if (Generic) {
    return <Generic aria-hidden="true" className={className} strokeWidth={1.75} />;
  }

  // C# não tem ícone no Simple Icons; o símbolo é desenhado como texto.
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <text
        x="12"
        y="18"
        textAnchor="middle"
        fontSize="16"
        fontWeight="800"
        letterSpacing="-1"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="currentColor"
      >
        C#
      </text>
    </svg>
  );
}
