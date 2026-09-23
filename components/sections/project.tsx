import ScrollReveal from "@/components/animations/scroll-reveal";

import ProjectList from "./project-list";
import { projects } from "@/lib/project";

export default function Projects() {
  return (
    <section id="work" className="px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-10 border-b border-line pb-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
              Selected work
            </p>
            <div className="mt-3 flex items-baseline justify-between gap-6">
              <h2 className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] md:text-[3rem]">
                Projects
              </h2>
              <span className="shrink-0 font-mono text-xs tracking-wide text-faint">
                03 — 2025 → 2026
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
