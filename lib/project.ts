export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  role: string;
  stack: string[];
  image?: string;
  gallery?: string[];
  year?: string;
  liveUrl?: string;
  githubUrl?: string;
  overview?: string;
  problem?: string;
  approach?: string;
  solution?: string;
  outcome?: string;
};

export const projects: Project[] = [
  {
    slug: "dulohupa-ai",
    number: "01",
    title: "Dulohupa AI",
    category: "AI × Tourism",
    description:
      "AI-powered tourism platform for exploring Gorontalo through personalized travel planning, real-time AI assistance, and greater visibility for local businesses.",
    role: "Fullstack Developer / UI Designer",
    stack: ["Next.js", "Tailwind CSS", "OpenAI API", "Python"],
    image: "/projects/dulohupa-ai/cover.png",
    gallery: [
      "/projects/dulohupa-ai/01.png",
      "/projects/dulohupa-ai/02.png",
      "/projects/dulohupa-ai/03.png",
      "/projects/dulohupa-ai/04.png",
    ],
  },
  {
    slug: "sitapus",
    number: "02",
    title: "SITAPUS",
    category: "Information System",
    description:
      "Web-based library information system designed to modernize library operations at KGTK Gorontalo through digital catalog discovery, borrowing, and QR-based return validation.",
    role: "Fullstack Developer",
    stack: ["React", "Node.js", "Express", "MySQL"],
    image: "/projects/sitapus/cover.png",
    gallery: [
      "/projects/sitapus/01.png",
      "/projects/sitapus/02.png",
      "/projects/sitapus/03.png",
    ],
  },
  {
    slug: "erp-tadco",
    number: "03",
    title: "ERP TADCo",
    category: "Enterprise System",
    description:
      "Web-based ERP system for centralizing fleet management, driver scheduling, delivery tracking, and financial reporting.",
    role: "Fullstack Developer",
    stack: ["Next.js", "Laravel", "PostgreSQL", "REST API"],
    image: "/projects/erp-tadco/cover.png",
    gallery: [
      "/projects/erp-tadco/01.png",
      "/projects/erp-tadco/02.png",
      "/projects/erp-tadco/03.png",
    ],
  },
];
