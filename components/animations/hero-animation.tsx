"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "./gsap";

export default function HeroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          "[data-hero='eyebrow']",
          { autoAlpha: 0, y: 35 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
        )
          .fromTo(
            ".hero-line",
            { autoAlpha: 0, y: 35 },
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
            "-=0.2",
          )
          .fromTo(
            "[data-hero='intro']",
            { autoAlpha: 0, y: 35 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.35",
          )
          .fromTo(
            "[data-hero='cta']",
            { autoAlpha: 0, y: 35 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.3",
          )
          .fromTo(
            "[data-hero='portrait']",
            { autoAlpha: 0, y: 35 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            "-=0.45",
          );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full max-w-7xl">
      {children}
    </div>
  );
}