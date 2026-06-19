"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils";

const AURORA_CLASSES = `[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
[--aurora:repeating-linear-gradient(100deg,var(--emerald-500)_10%,var(--cyan-300)_15%,var(--emerald-300)_20%,var(--emerald-400)_25%,var(--cyan-300)_30%)]
[background-image:var(--white-gradient),var(--aurora)]
dark:[background-image:var(--dark-gradient),var(--aurora)]
[background-size:300%,_200%]
[background-position:50%_50%,50%_50%]
filter blur-[10px] invert dark:invert-0
after:content-[""] after:absolute after:inset-0
after:[background-image:var(--white-gradient),var(--aurora)]
after:dark:[background-image:var(--dark-gradient),var(--aurora)]
after:[background-size:200%,_100%]
after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
pointer-events-none absolute -inset-[10px]
opacity-20 will-change-transform`;

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="text-accent font-mono text-sm font-medium tracking-wider uppercase">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-12">
            The short version
          </h2>
        </SectionReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Photo card */}
          <SectionReveal
            delay={0.1}
            className="md:col-span-2 md:row-span-2"
          >
            <div className="relative h-full min-h-[320px] rounded-3xl border border-border overflow-hidden cursor-default">
              <img
                src="/profile.png"
                alt="Yasir Mahmood"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                <p className="text-white font-bold text-lg">
                  Yasir Mahmood
                </p>
                <p className="text-white/60 text-sm">Software Engineer</p>
              </div>
            </div>
          </SectionReveal>

          {/* Bio */}
          <SectionReveal delay={0.15} className="md:col-span-4">
            <div className="relative h-full rounded-3xl bg-card border border-border p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div
                  className={cn(
                    AURORA_CLASSES,
                    "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
                  )}
                />
              </div>
              <div className="relative">
                <p className="text-lg text-secondary leading-relaxed mb-5">
                  I&apos;m a software engineer who builds AI products and the
                  unglamorous business systems that quietly keep companies
                  running.
                </p>
                <p className="text-lg text-secondary leading-relaxed">
                  I care less about technology being clever and more about
                  whether it made someone&apos;s job easier. Most of the
                  problems I find interesting sit right between what a business
                  needs and what&apos;s technically possible — turning a vague
                  operational headache into software people actually use.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Kavtech card */}
          <SectionReveal delay={0.2} className="md:col-span-4">
            <div className="relative rounded-3xl bg-card border border-border p-8 md:p-10 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div
                  className={cn(
                    AURORA_CLASSES,
                    "[mask-image:radial-gradient(ellipse_at_50%_50%,black_10%,var(--transparent)_70%)]"
                  )}
                />
              </div>
              <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    At{" "}
                    <span className="text-accent font-semibold">
                      Kavtech Solutions
                    </span>{" "}
                    I work across the full stack — frontend, cloud
                    architecture, AI, and the integrations that tie real tools
                    together — shipping products that go from idea to
                    something running in production.
                  </p>
                </div>
                <div className="shrink-0 flex md:flex-col items-center gap-2 text-muted">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider">
                    Full Stack
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
