"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animações de entrada reutilizáveis. Todas animam apenas opacity e transform,
 * disparam uma única vez ao entrar na viewport e, com `prefers-reduced-motion`,
 * reduzem-se a um fade (ver MotionProvider). Sem JavaScript, o conteúdo é
 * exibido normalmente pela regra `[data-reveal]` do <noscript> no layout.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos. */
  delay?: number;
  /** Deslocamento vertical inicial, em px. */
  distance?: number;
}

/** Entrada simples: sobe alguns pixels enquanto ganha opacidade. */
export function Reveal({ children, className, delay = 0, distance = 20 }: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type StaggerTag = "div" | "ul" | "ol" | "dl";
type StaggerItemTag = "div" | "li";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: StaggerTag;
  /** Intervalo entre os itens, em segundos. */
  gap?: number;
  delay?: number;
  /** Anima ao montar, sem esperar a rolagem (uso no topo da página). */
  onMount?: boolean;
}

/** Contêiner que revela os `StaggerItem` filhos em sequência. */
export function Stagger({
  children,
  className,
  as = "div",
  gap = 0.09,
  delay = 0,
  onMount = false,
}: StaggerProps) {
  const Component = motion[as] as typeof motion.div;
  const trigger = onMount ? { animate: "visible" } : { whileInView: "visible", viewport: VIEWPORT };

  return (
    <Component
      className={className}
      initial="hidden"
      variants={{ visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...trigger}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: StaggerItemTag;
}

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component data-reveal className={className} variants={staggerItem}>
      {children}
    </Component>
  );
}

export interface TextLine {
  text: string;
  className?: string;
}

interface TextRevealProps {
  lines: TextLine[];
  delay?: number;
  onMount?: boolean;
}

/**
 * Título revelado linha a linha por trás de uma máscara. Deve ser usado
 * dentro de um heading (h1, h2…), que continua lendo o texto normalmente.
 */
export function TextReveal({ lines, delay = 0, onMount = false }: TextRevealProps) {
  return (
    <>
      {lines.map((line, index) => {
        const trigger = onMount
          ? { animate: "visible" }
          : { whileInView: "visible", viewport: VIEWPORT };

        return (
          // A máscara é o elemento observado: o texto começa fora dela e, por
          // isso, nunca seria detectado na viewport por conta própria.
          // O respiro inferior evita cortar as descendentes (g, p, q).
          <motion.span
            key={line.text}
            className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
            initial="hidden"
            {...trigger}
          >
            <motion.span
              data-reveal
              className={`block ${line.className ?? ""}`}
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: 0,
                  transition: { duration: 0.9, delay: delay + index * 0.1, ease: EASE },
                },
              }}
            >
              {line.text}
              {index < lines.length - 1 ? " " : null}
            </motion.span>
          </motion.span>
        );
      })}
    </>
  );
}

interface DrawLineProps {
  className?: string;
  delay?: number;
}

/** Linha fina que se desenha da esquerda para a direita. */
export function DrawLine({ className = "", delay = 0 }: DrawLineProps) {
  return (
    <motion.span
      aria-hidden="true"
      data-reveal
      className={`block h-px origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}
