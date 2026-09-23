"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap, hasFinePointer, prefersReducedMotion } from "./gsap";

export default function ProfileImageHover() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const profile = el.querySelector(".hero-profile-base");
      const real = el.querySelector(".hero-profile-real");
      const target = el.querySelector<HTMLElement>(".hero-hover-target");
      if (!profile || !real || !target) return;

      if (!hasFinePointer() || prefersReducedMotion()) return;

      gsap.set(real, { autoAlpha: 0 });

      const enter = () => {
        gsap.to(real, {
          autoAlpha: 1,
          duration: 1.3,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(profile, {
          autoAlpha: 0,
          duration: 1.3,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      const leave = () => {
        gsap.to(real, {
          autoAlpha: 0,
          duration: 1.3,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(profile, {
          autoAlpha: 1,
          duration: 1.3,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);

      return () => {
        target.removeEventListener("mouseenter", enter);
        target.removeEventListener("mouseleave", leave);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <div className="hero-hover-target relative aspect-square overflow-hidden">
        <div className="hero-parallax absolute inset-0">
          <Image
            src="/profile.png"
            alt="Muh. Syachran A. Niode"
            fill
            priority
            unoptimized
            className="hero-profile-base object-contain"
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 400px, 480px"
          />

          <Image
            src="/real-profile.png"
            alt=""
            fill
            priority
            unoptimized
            className="hero-profile-real object-contain opacity-0"
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 400px, 480px"
          />
        </div>
      </div>
    </div>
  );
}
