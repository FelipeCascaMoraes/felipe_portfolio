import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsSection } from "@/data/content";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projetos-title"
            index="01"
            eyebrow={projectsSection.eyebrow}
            title={projectsSection.title}
            subtitle={projectsSection.subtitle}
          />
          <p aria-hidden="true" className="hidden font-mono text-xs tracking-[0.18em] text-dim uppercase lg:block">
            {String(projects.length).padStart(2, "0")} projetos
          </p>
        </div>

        {/* A segunda coluna é deslocada para quebrar a grade e dar ritmo à leitura. */}
        <Stagger as="ul" gap={0.14} className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8 lg:mt-20">
          {projects.map((project, index) => (
            <StaggerItem key={project.slug} as="li" className="md:even:translate-y-14">
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
        <div aria-hidden="true" className="hidden h-14 md:block" />
      </Container>
    </section>
  );
}
