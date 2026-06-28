import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
