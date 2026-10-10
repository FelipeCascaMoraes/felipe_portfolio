import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectStatus } from "@/data/projects";
import { ProjectCover } from "./ProjectCover";

const statusDot: Record<ProjectStatus, string> = {
  "Em desenvolvimento": "bg-accent",
  Protótipo: "bg-violet",
  Concluído: "bg-emerald-400",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const links = [
    { label: "Ver projeto", href: project.liveUrl },
    { label: "Ver código", href: project.repoUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_rgb(74_133_255/0.45)]">
      <ProjectCover project={project} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="font-mono text-[0.7rem] tracking-[0.16em] text-dim uppercase">
            {project.category}
          </p>
          <p className="flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
            <span aria-hidden="true" className={`size-1.5 rounded-full ${statusDot[project.status]}`} />
            {project.status}
          </p>
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-2.5 leading-relaxed text-muted text-pretty">{project.description}</p>

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
          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label}: ${project.name} (abre em nova aba)`}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors hover:text-fg"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
