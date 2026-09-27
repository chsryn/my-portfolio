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

    // PROJECT LIST — short
    description:
      "An AI-powered tourism platform designed to help travelers discover Gorontalo through personalized digital experiences.",

    role: "Frontend Developer",

    stack: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "MySQL"],

    image: "/projects/dulohupa-ai/cover-dulohupa.png",

    githubUrl: "https://github.com/chsryn/Dulohupa-AI",

    gallery: [
      "/projects/dulohupa-ai/cover-dulohupa.png",
      // "/projects/dulohupa-ai/admin-login.png",
    ],

    // PROJECT DETAIL — longer
    overview:
      "Dulohupa AI is an integrated web-based tourism platform that modernizes how travelers explore Gorontalo Province. Built around the Tourism 5.0 concept, the platform integrates Artificial Intelligence to personalize travel itineraries, provide real-time answers to questions about local tourism, and increase digital visibility for local culinary and handicraft MSMEs.",
  },

  {
    slug: "sitapus",
    number: "02",
    title: "SITAPUS",
    category: "Information System",

    // PROJECT LIST — short
    description:
      "A web-based library information system that digitizes catalog discovery, borrowing, and QR-based return validation.",

    role: "Fullstack Developer",

    stack: ["Laravel", "Blade", "Tailwind CSS", "MySQL", "QR Code", "Cron Job"],

    image: "/projects/sitapus/cover-sitapus.png",

    githubUrl: "https://github.com/chsryn/KGTK-Library",

    gallery: [
      "/projects/sitapus/cover-sitapus.png",
      "/projects/sitapus/sitapus-02.png",
      "/projects/sitapus/sitapus-03.png",
    ],

    // PROJECT DETAIL — longer
    overview:
      "SITAPUS is a web-based library information system developed to modernize library operations at KGTK Gorontalo. The platform provides digital catalog discovery, borrowing management, and QR-based return validation to support a more efficient library experience.",
  },

  {
    slug: "erp-tadco",
    number: "03",
    title: "ERP TADCo",
    category: "Enterprise System",

    // PROJECT LIST — short
    description:
      "An enterprise resource planning system for managing fleet operations, drivers, deliveries, and financial workflows.",

    role: "Fullstack Developer",

    stack: ["Laravel", "Tailwind CSS", "MySQL", "REST API"],

    image: "/projects/tadco/cover-tadco.png",

    githubUrl: "https://github.com/chsryn/ERP-Tadco",

    gallery: [
      "/projects/tadco/cover-tadco.png",
      "/projects/tadco/tadco-02.png",
      "/projects/tadco/tadco-03.png",
    ],

    // PROJECT DETAIL — longer
    overview:
      "ERP TADCo is a web-based enterprise resource planning system designed to centralize operational information within TADCo. The system brings together fleet management, driver scheduling, delivery tracking, and financial reporting into a centralized digital workflow.",
  },
];
