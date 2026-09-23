import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Project from "@/components/sections/project";
import Experience from "@/components/sections/experience";
import Capabilities from "@/components/sections/capabilities";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Project />
        <Experience />
        <Capabilities />
        <Contact />
      </main>
    </>
  );
}
