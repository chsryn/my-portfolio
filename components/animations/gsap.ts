"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

function mediaQueryMatches(query: string): boolean {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }
  return window.matchMedia(query).matches;
}

export function prefersReducedMotion(): boolean {
  return mediaQueryMatches("(prefers-reduced-motion: reduce)");
}

export function hasFinePointer(): boolean {
  return mediaQueryMatches("(pointer: fine)");
}