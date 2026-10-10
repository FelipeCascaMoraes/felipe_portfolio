import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsSection } from "@/data/content";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="projetos-title"
          index="01"
          eyebrow={projectsSection.eyebrow}
          title={projectsSection.title}
          subtitle={projectsSection.subtitle}
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={(index % 2) * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
