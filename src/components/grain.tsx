"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/use-isomorphic-layout-effect";

/**
 * Animated film-grain overlay rendered to a small offscreen tile and stamped
 * across a full-screen canvas. Very low opacity (set in globals.css) so it adds
 * texture without touching legibility. Disabled for reduced-motion users.
 */
export function Grain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const TILE = 140;
    const tile = document.createElement("canvas");
    tile.width = TILE;
    tile.height = TILE;
    const tileCtx = tile.getContext("2d");
    if (!tileCtx) return;

    let raf = 0;
    let frame = 0;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / 2);
      canvas.height = Math.ceil(window.innerHeight / 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      // Regenerate noise ~20fps for a lively but cheap grain.
      frame += 1;
      if (frame % 3 === 0) {
        const image = tileCtx.createImageData(TILE, TILE);
        const buf = image.data;
        for (let i = 0; i < buf.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          buf[i] = buf[i + 1] = buf[i + 2] = v;
          buf[i + 3] = 255;
        }
        tileCtx.putImageData(image, 0, 0);
        const pattern = ctx.createPattern(tile, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="grain-canvas" aria-hidden="true" />;
}
