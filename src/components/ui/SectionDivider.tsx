import { DrawLine } from "./Reveal";

/** Divisor entre seções: uma linha que se desenha ao entrar na tela, com um ponto de luz. */
export function SectionDivider() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-0">
      <div className="h-px bg-line" />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="relative -mt-px">
          <DrawLine className="w-40 bg-linear-to-r from-accent to-transparent sm:w-64" />
          <span className="absolute -top-[2px] left-0 size-[5px] rounded-full bg-accent-soft shadow-[0_0_10px_2px_rgb(74_133_255/0.7)]" />
        </div>
      </div>
    </div>
  );
}
