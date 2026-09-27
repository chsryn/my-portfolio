"use client";

import Image from "next/image";
import { useState } from "react";

import { hasFinePointer, prefersReducedMotion } from "./gsap";

export default function ProfileImageHover() {
  const [flipped, setFlipped] = useState(false);

  const canHover = () => hasFinePointer() && !prefersReducedMotion();

  return (
    <div>
      <div
        className="hero-hover-target relative aspect-square overflow-hidden [perspective:1200px]"
        onMouseEnter={() => {
          if (canHover()) setFlipped(true);
        }}
        onMouseLeave={() => {
          if (canHover()) setFlipped(false);
        }}
      >
        <div
          className={`absolute inset-0 [transform-style:preserve-3d] transition-transform duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
          }`}
        >
          <div className="hero-profile-base absolute inset-0 [backface-visibility:hidden]">
            <Image
              src="/profile.png"
              alt="Muh. Syachran A. Niode"
              fill
              priority
              unoptimized
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 400px, 480px"
            />
          </div>

          <div className="hero-profile-real absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Image
              src="/real-profile.png"
              alt=""
              fill
              priority
              unoptimized
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 400px, 480px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
