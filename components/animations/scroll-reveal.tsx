"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

export default function ScrollReveal({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.children.length > 0 ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          targets,
          { filter: `blur(${window.innerWidth <= 767 ? 4 : 8}px)`, opacity: 0.65 },
          {
            filter: "blur(0px)",
            opacity: 1,
            ease: "power2.out",
            stagger,
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 30%",
              scrub: 0.6,
            },
          },
        );

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger,
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
            onComplete: () => {
              gsap.set(targets, { clearProps: "transform,opacity,filter" });
            },
          },
        );
      }
    }, el);

    // Re-measure trigger positions once everything settles (fonts, images,
    // layout), otherwise reveals can fire at stale coordinates.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [stagger]);

  return (
    <div data-reveal ref={ref} className={className}>
      {children}
    </div>
  );
}