import HeroAnimation from "@/components/animations/hero-animation";
import ProfileImageHover from "@/components/animations/profile-image-hover";

export default function Hero() {
  return (
    <section className="flex min-h-[88vh] items-end px-6 pb-12 pt-28 lg:px-10 lg:pb-16">
      <HeroAnimation>
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-end lg:gap-12 xl:grid-cols-[1fr_480px]">
          <div className="lg:-translate-y-5">
            <p
              data-hero="eyebrow"
              className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.2em] text-faint"
            >
              Information Systems Student
            </p>

            <h1 className="max-w-6xl text-balance text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] max-sm:text-[min(11vw,3rem)]">
              <span className="hero-line block">I build</span>
              <span className="hero-line block whitespace-nowrap">
                digital{" "}
                <span className="-my-[0.06em] inline-block bg-foreground px-[0.14em] pb-[0.06em] leading-[0.95] text-background [text-shadow:none]">
                  products
                </span>
              </span>
              <span className="hero-line block">
                for real{" "}
                <em className="font-medium not-italic text-foreground/90">
                  problems.
                </em>
              </span>
            </h1>

            <p
              data-hero="intro"
              className="mt-8 max-w-[48ch] text-pretty text-[15px] leading-[1.8] tracking-[-0.005em] text-muted"
            >
              I&apos;m Chasryn — an Information Systems student and full-stack
              developer with a background in multimedia and graphic design.{" "}
              <br></br>I build web applications and with a focus on creating
              intuitive and engaging user experiences.
            </p>
          </div>

          <div data-hero="portrait">
            <ProfileImageHover />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-6 border-t border-line pt-5 lg:mt-0">
          <p className="font-mono text-xs tracking-wide text-faint">
            Based in Gorontalo — Indonesia.
          </p>
        </div>
      </HeroAnimation>
    </section>
  );
}
