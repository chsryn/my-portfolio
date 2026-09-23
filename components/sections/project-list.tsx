import Link from "next/link";

import ScrollReveal from "@/components/animations/scroll-reveal";
import type { Project } from "@/lib/project";

export default function ProjectList({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="border-t border-line">
      {projects.map((project) => (
        <ScrollReveal key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="group block border-b border-line py-9 transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-soft/[0.045] md:py-10"
          >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            {/* number — editorial metadata */}
            <span className="shrink-0 font-mono text-xs tracking-[0.12em] text-faint md:w-[48px] md:pt-2">
              {project.number}
            </span>

            {/* category + title + description — title is dominant */}
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint/80">
                {project.category}
              </p>

              <h3 className="mt-2 max-w-[14ch] text-[2rem] font-semibold leading-[0.92] tracking-[-0.035em] underline decoration-transparent underline-offset-[6px] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-hover:decoration-foreground/25 md:text-[2.5rem] lg:text-[2.75rem]">
                {project.title}
              </h3>

              <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.7] text-muted">
                {project.description}
              </p>
            </div>

            {/* inline image — only if exists, editorial inline, no popup */}
            <div
              aria-hidden="true"
              className="hidden h-[84px] w-0 shrink-0 self-center overflow-hidden border border-line/0 bg-soft/40 opacity-0 transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:pointer-fine:block lg:group-hover:w-[132px] lg:group-hover:border-line lg:group-hover:opacity-100"
            >
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            {/* action — single, far right */}
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start pt-1 text-sm font-medium tracking-wide md:self-center">
              <span className="underline decoration-foreground/20 underline-offset-4 transition-colors duration-[600ms] group-hover:decoration-foreground/60">
                View
              </span>
              <span className="inline-block text-xs transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </span>
          </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}