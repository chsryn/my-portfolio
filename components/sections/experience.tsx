import ScrollReveal from "@/components/animations/scroll-reveal";

const experiences = [
  {
    number: "01",
    role: "Software Developer",
    company: "Kantor Guru dan Tenaga Kependidikan",
    type: "Internship",
    date: "Oct 2025 — Nov 2025",
    location: "Gorontalo Regency, Gorontalo, Indonesia · On-site",
    description:
      "Completed an internship at KGTK Prov. Gorontalo, contributing to the development of SITAPUS — Sistem Informasi Tata Kelola Perpustakaan.",
  },
  {
    number: "02",
    role: "Multimedia Editor",
    company: "CV. Alam Tunggal Perkasa",
    type: "Freelance",
    date: "May 2025 — Jun 2025",
    location: "Gorontalo, Indonesia · On-site",
    description:
      "Managing the entire post-production pipeline, I deliver polished office branding, banners, and custom video content. I ensure strict adherence to project requirements, helping businesses secure winning tenders and captivate audiences.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
                Experience
              </p>
              <h2 className="text-[2rem] font-semibold leading-none tracking-[-0.032em] md:text-[2.5rem]">
                Where I&apos;ve worked.
              </h2>
            </div>
            <span className="hidden shrink-0 font-mono text-xs text-faint md:block">
              2022 — Present
            </span>
          </div>
        </ScrollReveal>

        <div className="border-t border-line">
          {experiences.map((item) => (
            <ScrollReveal key={item.number}>
              <div className="grid gap-2 border-b border-line py-7 md:grid-cols-[220px_1fr] md:gap-6 md:py-8">
                <div>
                  <span className="font-mono text-xs tracking-wide text-faint">
                    {item.number}
                  </span>
                  <p className="mt-3 text-[13px] leading-5 text-foreground/80">
                    {item.date}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-faint">
                    {item.location}
                  </p>
                </div>

                <div>
                  <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] md:text-[22px]">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-6 text-foreground/80">
                    {item.company}{" "}
                    <span className="text-faint">· {item.type}</span>
                  </p>
                  <p className="mt-3 max-w-[56ch] text-[14px] leading-7 text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 md:mt-14">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint">
              Education
            </p>
            <div className="mt-5 grid gap-2 border-t border-line pt-6 md:grid-cols-[220px_1fr] md:gap-6">
              <p className="font-mono text-xs tracking-wide text-faint">
                2022 — Present
              </p>
              <div>
                <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.02em] md:text-[18px]">
                  Universitas Negeri Gorontalo
                </h3>
                <p className="mt-1.5 text-[14px] leading-6 text-muted">
                  Bachelor of Science in Information, Information System
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
