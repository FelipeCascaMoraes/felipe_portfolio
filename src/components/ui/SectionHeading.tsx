import { Reveal, TextReveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ id, index, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <Reveal distance={12}>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-dim uppercase">
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </p>
      </Reveal>
      <h2
        id={id}
        className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl"
      >
        <TextReveal lines={[{ text: title }]} delay={0.05} />
      </h2>
      {subtitle ? (
        <Reveal delay={0.18} distance={14}>
          <p className="mt-5 text-base leading-relaxed text-muted text-pretty sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
