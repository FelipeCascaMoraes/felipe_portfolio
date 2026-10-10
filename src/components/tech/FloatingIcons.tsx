"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type CSSProperties } from "react";
import type { FloatingIcon } from "@/data/technologies";
import { TechIcon } from "./TechIcon";

/** Aparência por nível de profundidade: quanto mais ao fundo, menor o contraste. */
const depthStyles: Record<FloatingIcon["depth"], string> = {
  1: "opacity-40 blur-[1px]",
  2: "opacity-70",
  3: "opacity-100",
};

interface FloatingTileProps {
  icon: FloatingIcon;
  index: number;
  scrollProgress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  animated: boolean;
}

function FloatingTile({
  icon,
  index,
  scrollProgress,
  pointerX,
  pointerY,
  animated,
}: FloatingTileProps) {
  // Camadas da frente percorrem uma distância maior que as do fundo.
  const scrollRange = icon.depth * 26;
  const pointerRange = icon.depth * 7;
  const scrollY = useTransform(scrollProgress, [0, 1], [scrollRange, -scrollRange]);
  const x = useTransform(pointerX, (value) => value * pointerRange);
  const y = useTransform(pointerY, (value) => value * pointerRange);

  const [tiltX, tiltY, rotate] = icon.tilt;
  const position = {
    "--top": icon.top,
    "--left": icon.left,
    "--m-top": icon.mobile?.top ?? "0",
    "--m-left": icon.mobile?.left ?? "0",
  } as CSSProperties;

  return (
    <motion.div
      style={{ ...position, ...(animated ? { y: scrollY } : {}) }}
      className={`absolute top-(--m-top) left-(--m-left) lg:top-(--top) lg:left-(--left) ${
        icon.mobile ? "" : "hidden lg:block"
      }`}
    >
      <motion.div
        data-reveal
        style={animated ? { x, y } : undefined}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.9, delay: 0.15 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="animate-float scale-[0.62] lg:scale-100"
          style={{ animationDuration: `${7 + (index % 4) * 1.5}s`, animationDelay: `${index * -1.3}s` }}
        >
          <div
            className={`relative grid place-items-center rounded-[26%] border border-white/12 bg-linear-to-br from-[#1b2542] via-[#0f1528] to-[#090c18] text-[#cfdcff] shadow-[0_6px_0_0_#070a14,0_26px_44px_-14px_rgb(0_0_0/0.9),0_0_34px_-8px_rgb(74_133_255/0.5),inset_0_1px_0_rgb(255_255_255/0.22),inset_0_-10px_18px_-10px_rgb(139_108_255/0.35)] ${depthStyles[icon.depth]}`}
            style={{
              width: icon.size,
              height: icon.size,
              transform: `perspective(520px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(${rotate}deg)`,
            }}
          >
            <TechIcon technology={icon.technology} className="size-[48%] drop-shadow-[0_2px_6px_rgb(74_133_255/0.55)]" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface FloatingIconsProps {
  icons: FloatingIcon[];
}

/**
 * Camada decorativa da seção de tecnologias. Fica atrás do conteúdo, não
 * recebe eventos e reage à rolagem e ao cursor apenas com transform.
 */
export function FloatingIcons({ icons }: FloatingIconsProps) {
  const layer = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const animated = !reducedMotion;

  const { scrollYProgress } = useScroll({ target: layer, offset: ["start end", "end start"] });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 50, damping: 18, mass: 0.6 });
  const pointerY = useSpring(rawY, { stiffness: 50, damping: 18, mass: 0.6 });

  useEffect(() => {
    const element = layer.current;
    if (!animated || !element || !window.matchMedia("(pointer: fine)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    // Só escuta o cursor enquanto a seção está visível.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      } else {
        window.removeEventListener("pointermove", onPointerMove);
      }
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [animated, rawX, rawY]);

  return (
    <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {icons.map((icon, index) => (
        <FloatingTile
          key={icon.technology}
          icon={icon}
          index={index}
          scrollProgress={scrollYProgress}
          pointerX={pointerX}
          pointerY={pointerY}
          animated={animated}
        />
      ))}
    </div>
  );
}
