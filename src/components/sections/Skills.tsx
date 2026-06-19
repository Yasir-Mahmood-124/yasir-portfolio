"use client";

import { motion } from "framer-motion";
import { Code2, Cloud, Bot, Plug } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TechIcon } from "@/components/ui/TechIcon";
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
opacity-15 will-change-transform`;

const SKILL_ROWS = [
  {
    label: "Frontend",
    icon: Code2,
    skills: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "Redux Toolkit",
      "RTK Query",
    ],
    direction: "left" as const,
    speed: 30,
  },
  {
    label: "Cloud & Backend",
    icon: Cloud,
    skills: [
      "AWS Lambda",
      "API Gateway",
      "S3",
      "Step Functions",
      "DynamoDB",
      "EventBridge",
      "AWS Amplify",
      "Serverless",
      "Django",
      "Python",
    ],
    direction: "right" as const,
    speed: 35,
  },
  {
    label: "AI & Automation",
    icon: Bot,
    skills: [
      "OpenAI APIs",
      "Claude APIs",
      "Grok API",
      "AWS Bedrock",
      "Vector Search / RAG",
      "Prompt Engineering",
    ],
    direction: "left" as const,
    speed: 28,
  },
  {
    label: "Integrations",
    icon: Plug,
    skills: [
      "Google Cloud APIs",
      "Gmail",
      "Google Workspace",
      "YouTube",
      "GA4",
      "WordPress",
      "HubSpot",
      "LinkedIn",
    ],
    direction: "right" as const,
    speed: 32,
  },
];

function MarqueeRow({
  row,
  index,
}: {
  row: (typeof SKILL_ROWS)[0];
  index: number;
}) {
  const Icon = row.icon;
  const doubled = [...row.skills, ...row.skills, ...row.skills];

  return (
    <SectionReveal delay={index * 0.1}>
      <div className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(34,197,94,0.08)]">
        {/* Aurora */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div
            className={cn(
              AURORA_CLASSES,
              "[mask-image:radial-gradient(ellipse_at_50%_50%,black_10%,var(--transparent)_70%)]"
            )}
          />
        </div>

        <div className="relative py-6 px-6">
          {/* Category label */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-bold text-foreground font-mono">
              {row.label}
            </span>
          </div>

          {/* Marquee */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <motion.div
              className="flex gap-3 w-max"
              animate={{
                x:
                  row.direction === "left"
                    ? ["0%", "-33.333%"]
                    : ["-33.333%", "0%"],
              }}
              transition={{
                x: {
                  duration: row.speed,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {doubled.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-glass border border-transparent text-sm font-medium text-secondary whitespace-nowrap cursor-default transition-all duration-200 hover:text-accent hover:bg-accent/10"
                >
                  <TechIcon name={skill} />
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-14">
            <span className="text-accent font-mono text-sm font-medium tracking-wider uppercase">
              Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-secondary text-lg max-w-xl mx-auto">
              The tools and platforms I work with daily.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-4">
          {SKILL_ROWS.map((row, i) => (
            <MarqueeRow key={row.label} row={row} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
