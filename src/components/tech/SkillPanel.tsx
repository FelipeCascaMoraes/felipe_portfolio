import { DrawLine, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { skillGroups, technologies, type TechnologyId } from "@/data/technologies";

const labelOf = (id: TechnologyId) =>
  technologies.find((technology) => technology.id === id)?.label ?? id;

/**
 * Painel de competências: uma linha por especialidade. Os pontos indicam
 * quantas tecnologias compõem o grupo, não um nível de domínio.
 */
export function SkillPanel() {
  return (
    <div className="relative rounded-3xl border border-line bg-surface/80 p-6 backdrop-blur-md sm:p-9">
      <div
        aria-hidden="true"
        className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent"
      />
      <div className="flex items-center justify-between font-mono text-[0.68rem] tracking-[0.18em] text-dim uppercase">
        <span>Especialidades</span>
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_1px_rgb(74_133_255/0.8)] motion-safe:animate-pulse" />
          {String(skillGroups.length).padStart(2, "0")} áreas
        </span>
      </div>

      <Stagger as="ul" gap={0.12} delay={0.1} className="mt-7">
        {skillGroups.map((group, index) => (
          <StaggerItem key={group.label} as="li" className="group/row py-5 first:pt-0 last:pb-0">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                {group.label}
              </h3>
              <span aria-hidden="true" className="font-mono text-xs text-dim">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div aria-hidden="true" className="relative mt-4 h-px bg-line">
              <DrawLine
                delay={0.25 + index * 0.12}
                className="absolute inset-0 bg-linear-to-r from-accent via-accent/50 to-violet/70"
              />
              {/* Régua: marcações finas acima da linha. */}
              <span className="absolute -top-[5px] left-0 h-[5px] w-full bg-[repeating-linear-gradient(90deg,var(--color-line-strong)_0_1px,transparent_1px_10%)]" />
              <span className="absolute -top-[3px] right-0 size-[7px] rounded-full bg-violet shadow-[0_0_12px_2px_rgb(139_108_255/0.75)] transition-transform duration-300 group-hover/row:scale-150" />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm leading-relaxed text-muted">
                {group.technologies.map(labelOf).join(" · ")}
              </p>
              <span aria-hidden="true" className="flex shrink-0 gap-1.5">
                {group.technologies.map((id) => (
                  <span
                    key={id}
                    className="size-1.5 rounded-full bg-accent-soft shadow-[0_0_6px_rgb(143_178_255/0.8)]"
                  />
                ))}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
