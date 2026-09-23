import ScrollReveal from "@/components/animations/scroll-reveal";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-20 lg:px-10 lg:py-24">
      <ScrollReveal className="mx-auto max-w-7xl">
        <div className="border-t border-line pt-10">
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
            Contact
          </p>

          <h2 className="max-w-[14ch] text-balance text-[2.2rem] font-semibold leading-[0.95] tracking-[-0.032em] md:text-5xl">
            Have a project in mind?
            <br />
            Let&apos;s talk.
          </h2>

          <div className="mt-8 flex flex-wrap gap-5">
            <a
              href="mailto:your-email@example.com"
              className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-wide underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Email
              <span className="inline-block text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            <a
              href="https://github.com/chsrynini"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-wide underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              GitHub
              <span className="inline-block text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/syachranniode/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-wide underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              LinkedIn
              <span className="inline-block text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>

          <p className="mt-10 max-w-md border-t border-line pt-6 font-mono text-xs leading-5 text-faint">
            Gorontalo — Indonesia · Usually replies within a day. Open to
            freelance, collaborations, and early-stage product work.
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}