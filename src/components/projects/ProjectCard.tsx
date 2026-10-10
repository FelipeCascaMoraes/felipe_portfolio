import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Project, ProjectStatus } from "@/data/projects";
import { ProjectCover } from "./ProjectCover";

const statusDot: Record<ProjectStatus, string> = {
  "Em desenvolvimento": "bg-accent",
  Protótipo: "bg-violet",
  Concluído: "bg-emerald-400",
};

interface ProjectCardProps {
  project: Project;
  /** Posição na lista, exibida como numeração do card. */
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const links = [
    { label: "Ver projeto", href: project.liveUrl },
    { label: "Ver código", href: project.repoUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-line bg-surface transition-[border-color,transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-accent/45 hover:shadow-[0_32px_70px_-34px_rgb(74_133_255/0.55)]">
      <article className="flex h-full flex-col">
        <div className="relative">
          <ProjectCover project={project} />
          <span
            aria-hidden="true"
            className="absolute top-5 left-5 font-mono text-xs tracking-[0.16em] text-fg/60"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* Selo revelado no hover, apenas quando existe um link para abrir. */}
          {links.length > 0 ? (
            <span
              aria-hidden="true"
              className="absolute top-4 right-4 grid size-10 translate-y-2 scale-90 place-items-center rounded-full bg-fg text-bg opacity-0 transition-[opacity,transform] duration-300 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
            >
              <ArrowUpRight className="size-4.5" />
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-mono text-[0.7rem] tracking-[0.16em] text-dim uppercase">
              {project.category}
            </p>
            <p className="flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
              <span aria-hidden="true" className={`size-1.5 rounded-full ${statusDot[project.status]}`} />
              {project.status}
            </p>
          </div>

          <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[1.7rem]">
            {project.name}
          </h3>
          <p className="mt-3 leading-relaxed text-muted text-pretty">{project.description}</p>

          {project.technologies.length > 0 ? (
            <ul aria-label="Tecnologias" className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-xs text-muted"
                >
                  {technology}
                </li>
              ))}
            </ul>
          ) : null}

          {links.length > 0 ? (
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-7">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label}: ${project.name} (abre em nova aba)`}
                  className="group/link relative z-20 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors hover:text-fg"
                >
                  <span className="relative">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/link:scale-x-100"
                    />
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </SpotlightCard>
  );
}
