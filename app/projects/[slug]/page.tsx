import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectGallery from "@/components/ui/project-gallery";
import { projects } from "@/lib/project";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Chasryn`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];

  if (!project || idx === -1) notFound();

  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
      {/* Back */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-faint underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/30"
      >
        <span aria-hidden>←</span> Selected work
      </Link>

      {/* Header — editorial */}
      <header className="mt-8">
        <div className="flex items-baseline gap-3 font-mono text-xs tracking-[0.14em] text-faint">
          <span>{project.number}</span>
          <span className="h-px w-6 bg-line" aria-hidden />
          <span className="uppercase">{project.category}</span>
        </div>

        <h1 className="mt-4 max-w-[12ch] text-balance text-[clamp(2.2rem,6vw,3.9rem)] font-semibold leading-[0.92] tracking-[-0.04em] md:text-[clamp(2.6rem,5vw,4.4rem)]">
          {project.title}
        </h1>

        <p className="mt-5 max-w-[60ch] text-[15px] leading-7 text-muted">
          {project.description}
        </p>

        <dl className="mt-8 grid gap-6 border-y border-line py-6 text-sm md:grid-cols-[1fr_1fr] md:gap-10">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
              Role
            </dt>
            <dd className="mt-2 leading-6 text-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
              Stack
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-line px-2.5 py-1 font-mono text-xs tracking-wide text-muted"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </header>

      {/* Gallery — editorial frame, scrollable */}
      {(() => {
        const galleryImages =
          project.gallery && project.gallery.length > 0
            ? project.gallery
            : project.image
              ? [project.image]
              : [];
        return galleryImages.length > 0 ? (
          <div className="mt-10">
            <ProjectGallery images={galleryImages} title={project.title} />
          </div>
        ) : (
          <div className="mt-10 border border-line bg-soft/[0.06]">
            <div className="aspect-[16/9.5] w-full md:aspect-[16/8.5]">
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                  Visual — to be replaced
                </p>
                <p className="max-w-md text-sm leading-6 text-muted">
                  Drop the final project cover or gallery here. This frame
                  preserves the editorial rhythm until the real image is ready.
                </p>
                <span className="mt-2 border border-line px-3 py-1 font-mono text-xs text-faint">
                  16 × 9 · {project.title}
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Project information — restrained */}
      <section className="mt-12 grid gap-10 md:grid-cols-[1.35fr_0.85fr] md:gap-12">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
            Overview
          </h2>
          <p className="mt-3 max-w-[58ch] text-[15px] leading-7 text-muted">
            {project.overview ?? project.description}
          </p>
        </div>

        <div className="space-y-8 border-t border-line pt-8 md:border-t-0 md:pt-0">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
              Role
            </h3>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {project.role}
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
              Technology
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {project.stack.join(" · ")}
            </p>
          </div>
          {project.year && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                Year
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {project.year}
              </p>
            </div>
          )}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border border-line px-3 py-1.5 text-xs font-medium tracking-wide underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  Live ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border border-line px-3 py-1.5 text-xs font-medium tracking-wide underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Case study — only when data exists, no placeholders */}
      {(project.problem ||
        project.approach ||
        project.solution ||
        project.outcome) && (
        <section className="mt-12 space-y-10 border-t border-line pt-10">
          {project.problem && (
            <div className="grid gap-3 md:grid-cols-[160px_1fr]">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                Problem
              </h2>
              <p className="max-w-[60ch] text-[15px] leading-7 text-muted">
                {project.problem}
              </p>
            </div>
          )}
          {project.approach && (
            <div className="grid gap-3 md:grid-cols-[160px_1fr]">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                Approach
              </h2>
              <p className="max-w-[60ch] text-[15px] leading-7 text-muted">
                {project.approach}
              </p>
            </div>
          )}
          {project.solution && (
            <div className="grid gap-3 md:grid-cols-[160px_1fr]">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                Solution
              </h2>
              <p className="max-w-[60ch] text-[15px] leading-7 text-muted">
                {project.solution}
              </p>
            </div>
          )}
          {project.outcome && (
            <div className="grid gap-3 md:grid-cols-[160px_1fr]">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                Outcome
              </h2>
              <p className="max-w-[60ch] text-[15px] leading-7 text-muted">
                {project.outcome}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Navigation */}
      <nav
        aria-label="Project navigation"
        className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between"
      >
        <div className="min-w-0 flex-1">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group block"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                Previous
              </span>
              <span className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-xs text-faint">
                  {prev.number}
                </span>
                <span className="text-base font-medium tracking-tight underline decoration-transparent underline-offset-4 group-hover:decoration-foreground/20 md:text-lg">
                  {prev.title}
                </span>
                <span
                  aria-hidden
                  className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5"
                >
                  ←
                </span>
              </span>
              <span className="mt-1 block font-mono text-xs text-faint/70">
                {prev.category}
              </span>
            </Link>
          ) : (
            <span className="font-mono text-xs text-faint/50">—</span>
          )}
        </div>

        <div className="min-w-0 flex-1 md:text-right">
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group block md:ml-auto"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                Next
              </span>
              <span className="mt-1 flex items-baseline gap-2 md:justify-end">
                <span className="text-base font-medium tracking-tight underline decoration-transparent underline-offset-4 group-hover:decoration-foreground/20 md:text-lg">
                  {next.title}
                </span>
                <span className="font-mono text-xs text-faint">
                  {next.number}
                </span>
                <span
                  aria-hidden
                  className="text-xs transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
              <span className="mt-1 block font-mono text-xs text-faint/70 md:text-right">
                {next.category}
              </span>
            </Link>
          ) : (
            <span className="font-mono text-xs text-faint/50 md:block md:text-right">
              —
            </span>
          )}
        </div>
      </nav>

      <div className="mt-10">
        <Link
          href="/#work"
          className="font-mono text-xs tracking-wide text-faint underline decoration-transparent underline-offset-4 hover:text-foreground hover:decoration-foreground/30"
        >
          ← Back to selected work
        </Link>
      </div>
    </main>
  );
}
