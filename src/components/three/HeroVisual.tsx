"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { CoreFallback } from "./CoreFallback";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

// three.js fica em um chunk separado, baixado apenas no cliente.
const CoreScene = dynamic(() => import("./CoreScene"), {
  ssr: false,
  loading: () => <CoreFallback />,
});

export function HeroVisual() {
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [contextLost, setContextLost] = useState(false);

  const supported = useWebGLSupport();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "80px",
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleContextLost = useCallback(() => setContextLost(true), []);

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="pointer-events-none relative mx-auto aspect-square w-full max-w-[300px] select-none sm:max-w-[400px] lg:max-w-[540px]"
    >
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(74_133_255/0.2)_0%,rgb(139_108_255/0.08)_42%,transparent_68%)] blur-2xl" />

      {supported && !contextLost ? (
        <SceneErrorBoundary fallback={<CoreFallback />}>
          <div className="absolute inset-0">
            <CoreScene
              reducedMotion={reducedMotion}
              compact={compact}
              active={inView}
              onContextLost={handleContextLost}
            />
          </div>
        </SceneErrorBoundary>
      ) : (
        <CoreFallback />
      )}
    </div>
  );
}
