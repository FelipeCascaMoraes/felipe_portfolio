interface MarqueeProps {
  items: readonly string[];
}

/** Faixa de palavras em movimento contínuo. Decorativa: fica oculta para leitores de tela. */
export function Marquee({ items }: MarqueeProps) {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line py-5 mask-[linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      {/* A lista é duplicada para que o deslocamento de -50% feche o ciclo sem emenda. */}
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center font-display text-lg font-medium tracking-tight whitespace-nowrap text-fg/55 uppercase sm:text-xl"
              >
                {item}
                <span className="mx-7 size-1.5 rotate-45 bg-accent sm:mx-10" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
