"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (currentScrollY < 20) {
        setShowNavbar(true);
      } else if (delta > 4) {
        setShowNavbar(false);
      } else if (delta < -4) {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-[22px] lg:px-10">
        <Link
          href="/"
          className="text-[13px] font-semibold tracking-[-0.02em]"
        >
          Chasryn
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] md:flex">
          <a
            href="#work"
            className="tracking-wide underline-offset-4 transition-colors hover:underline"
          >
            Work
          </a>

          <a
            href="#experience"
            className="underline-offset-4 transition-colors hover:underline"
          >
            Experience
          </a>

          <a
            href="#contact"
            className="underline-offset-4 transition-colors hover:underline"
          >
            Contact
          </a>
        </nav>

        <a
          href="https://github.com/chsryn"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-[13px] font-medium tracking-wide underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
        >
          GitHub{" "}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>
      </div>
    </header>
  );
}
