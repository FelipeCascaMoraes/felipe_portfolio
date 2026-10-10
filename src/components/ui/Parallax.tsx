"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Deslocamento total, em px, ao longo da passagem pela viewport. */
  distance?: number;
}

/** Desloca o conteúdo verticalmente conforme a rolagem, para sugerir profundidade. */
export function Parallax({ children, className, distance = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} className={className} style={reducedMotion ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
