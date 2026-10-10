"use client";

import type { PointerEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Superfície com um foco de luz que acompanha o cursor. A posição é gravada
 * em variáveis CSS direto no elemento, sem re-renderizar o React.
 */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div onPointerMove={handlePointerMove} className={`group relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,0%),rgb(96_140_255/0.13),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}
