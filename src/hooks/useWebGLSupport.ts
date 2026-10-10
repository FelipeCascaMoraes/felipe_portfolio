"use client";

import { useSyncExternalStore } from "react";

let cachedSupport: boolean | undefined;

function detectWebGL(): boolean {
  if (cachedSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2");
      cachedSupport = context !== null;
      // Libera o contexto de teste para não competir com o canvas real.
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      cachedSupport = false;
    }
  }
  return cachedSupport;
}

const subscribe = () => () => {};

/** `true` apenas no cliente e quando o navegador consegue criar um contexto WebGL2. */
export function useWebGLSupport(): boolean {
  return useSyncExternalStore(subscribe, detectWebGL, () => false);
}
