import ScrollReveal from "@/components/animations/scroll-reveal";

const capabilities = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Building responsive and polished interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
  },
  {
    number: "02",
    title: "Backend Development",
    description:
      "Developing APIs and backend systems with Node.js, Express, Laravel, and relational databases.",
  },
  {
    number: "03",
    title: "UI/UX & Graphic Design",
    description:
      "Designing intuitive interfaces and creating custom web assets with Figma, Photoshop, and Illustrator.",
  },
  {
    number: "04",
    title: "System Development",
    description:
      "Turning real-world business and organizational problems into structured digital solutions.",
  },
];

export default function Capabilities() {
  return (
    <section className="px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
                Capabilities
              </p>
              <h2 className="text-[2rem] font-semibold leading-none tracking-[-0.032em] md:text-[2.5rem]">
                What I do.
              </h2>
            </div>
            <span className="hidden font-mono text-xs text-faint md:block">
              01 — 04
            </span>
          </div>
        </ScrollReveal>

        <div className="border-t border-line">
          {capabilities.map((item) => (
            <ScrollReveal key={item.number}>
              <div className="grid gap-3 border-b border-line py-7 md:grid-cols-[72px_1.1fr_1.35fr] md:gap-6 md:py-8">
                <span className="font-mono text-xs tracking-wide text-faint">
                  {item.number}
                </span>

                <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.02em] md:text-[18px]">
                  {item.title}
                </h3>

                <p className="max-w-[48ch] text-[14px] leading-6 text-muted">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
