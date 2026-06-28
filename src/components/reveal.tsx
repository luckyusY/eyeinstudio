"use client";

import { ElementType, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  /** vertical offset to travel from */
  y?: number;
  delay?: number;
  /** stagger direct children instead of animating the wrapper as one block */
  stagger?: boolean;
  duration?: number;
};

/**
 * Scroll-triggered entrance animation. When `stagger` is set, each direct child
 * animates in sequence (ideal for grids and lists); otherwise the whole block
 * fades + rises as one. Honours prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  y = 28,
  delay = 0,
  stagger = false,
  duration = 0.9,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("is-ready");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : el;
      gsap.set(el, { autoAlpha: 1 }); // clear the pre-hide guard
      gsap.fromTo(
        targets,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);

    el.classList.add("is-ready");
    return () => ctx.revert();
  }, [y, delay, stagger, duration]);

  return (
    <Tag ref={ref} className={`gsap-reveal ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
