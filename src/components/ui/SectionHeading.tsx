import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ id, index, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-dim uppercase">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted text-pretty sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
