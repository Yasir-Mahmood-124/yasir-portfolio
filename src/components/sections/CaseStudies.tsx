"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, Layers, Server, GraduationCap } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";

const CASE_STUDIES = [
  {
    id: "cammi",
    num: "01",
    tag: "AI Platform",
    subtitle: "AWS Serverless",
    title: "Cammi",
    headline: "AI Marketing Platform",
    oneLiner:
      "An AI platform that turns a blank page into a complete marketing campaign.",
    sections: [
      {
        label: "Problem",
        text: "Building marketing foundations by hand is slow. A go-to-market strategy, ICP, or messaging framework can take a team hours — and downstream content like case studies, blogs, and landing pages stretches across days of back-and-forth across multiple tools.",
      },
      {
        label: "Solution",
        text: "A platform where users generate complete marketing assets — strategy documents, blogs, landing pages, case studies, and full campaigns — guided by an AI assistant that understands their brand. It connects directly to six tools businesses already use, so content gets published without leaving the app.",
      },
      {
        label: "Hard Part",
        text: "Worked across the full stack: the AI document-generation engine on AWS Bedrock, a context-aware chat assistant grounded in each user's own knowledge base using vector search, and the integration layer wiring six external platforms into one product.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Material UI",
      "Redux",
      "RTK Query",
      "AWS Lambda",
      "Step Functions",
      "Bedrock",
      "DynamoDB",
      "S3",
      "WebSockets",
    ],
    gradient: "from-emerald-500/10 via-cyan-500/5 to-transparent",
    aurora:
      "[--aurora:repeating-linear-gradient(100deg,var(--emerald-500)_10%,var(--cyan-300)_15%,var(--emerald-300)_20%,var(--emerald-400)_25%,var(--cyan-300)_30%)]",
    accentColor: "text-emerald-400",
    borderAccent: "group-hover:border-emerald-500/30",
    icon: Layers,
  },
  {
    id: "inventory",
    num: "02",
    tag: "Internal Tool",
    subtitle: "Workflow Automation",
    title: "Inventory System",
    headline: "Request & Approval Platform",
    oneLiner:
      "A request-and-approval system serving 150+ users that replaced spreadsheets and email chains with one source of truth.",
    sections: [
      {
        label: "Problem",
        text: "Tracking who has which laptop, who requested what, and who still needs to approve it usually lives in scattered spreadsheets and long email threads. At ~150 users across four distinct roles, things get lost, approvals stall, and nobody knows the real state of inventory.",
      },
      {
        label: "Solution",
        text: "A role-based platform serving 150+ users across four roles — employees, PMOs, HR, and admins. Employees request equipment; each request routes automatically through the right approval chain; and admins manage the full inventory lifecycle.",
      },
      {
        label: "Hard Part",
        text: "The multi-role permission system and approval-routing logic — the part that's easy to get subtly wrong and frustrating for users when you do. Built the backend in Django and a clean, responsive interface in Next.js.",
      },
    ],
    stack: ["Django", "Next.js", "TypeScript", "Material UI", "Redux", "RTK Query", "PostgreSQL"],
    gradient: "from-emerald-500/10 via-cyan-500/5 to-transparent",
    aurora:
      "[--aurora:repeating-linear-gradient(100deg,var(--emerald-500)_10%,var(--cyan-300)_15%,var(--emerald-300)_20%,var(--emerald-400)_25%,var(--cyan-300)_30%)]",
    accentColor: "text-emerald-400",
    borderAccent: "group-hover:border-emerald-500/30",
    icon: Server,
  },
  {
    id: "institute",
    num: "03",
    tag: "Full-Stack",
    subtitle: "MERN",
    title: "Institute Management System",
    headline: "Full-Stack Web Platform",
    oneLiner:
      "A complete management system for a computer-courses academy — admin operations, online enrollment, and an AI guide for prospective students, in one platform.",
    sections: [
      {
        label: "Problem",
        text: "A growing training academy was running on manual processes — course records, student registrations, and fee receipts handled by hand, and no real way for prospective students to discover courses or enroll without showing up in person. They needed one system to run operations internally and bring enrollment online.",
      },
      {
        label: "Solution",
        text: "A full-stack platform with two sides. For the academy: an admin dashboard to manage courses, students, and the full fee-and-receipt cycle in one place. For prospective students: a public site with online course registration, an events section showcasing the academy's activities through photo galleries, and a chatbot that guides visitors through the courses on offer — and recommends the right course based on a student's current skill level. Fully responsive across devices.",
      },
      {
        label: "Hard Part",
        text: "Designing one system that served two very different users — staff who needed control and clarity over day-to-day operations, and first-time visitors who needed to be guided, not overwhelmed. The skill-based course-recommendation chatbot was the piece that turned a brochure-style site into something that actually helped people choose.",
      },
    ],
    stack: ["React", "Bootstrap", "Node.js", "Express", "MongoDB"],
    gradient: "from-emerald-500/10 via-cyan-500/5 to-transparent",
    aurora:
      "[--aurora:repeating-linear-gradient(100deg,var(--emerald-500)_10%,var(--cyan-300)_15%,var(--emerald-300)_20%,var(--emerald-400)_25%,var(--cyan-300)_30%)]",
    accentColor: "text-emerald-400",
    borderAccent: "group-hover:border-emerald-500/30",
    icon: GraduationCap,
  },
];

function ProjectCard({
  study,
  isExpanded,
  onToggle,
}: {
  study: (typeof CASE_STUDIES)[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = study.icon;

  return (
    <SectionReveal>
      <motion.div
        layout
        className={`group relative rounded-3xl border border-border bg-card overflow-hidden cursor-pointer transition-colors duration-300 ${study.borderAccent}`}
        onClick={onToggle}
      >
        {/* Aurora light effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
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
              opacity-0 group-hover:opacity-30 transition-opacity duration-700
              will-change-transform
              [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
              study.aurora
            )}
          />
        </div>

        <div className="relative">
          {/* Header — always visible */}
          <div className="p-8 md:p-10">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-6xl font-bold text-border/60 font-mono leading-none select-none">
                  {study.num}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-mono font-medium">
                      {study.tag}
                    </span>
                    <span className="text-muted text-xs font-mono">
                      {study.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {study.title}
                  </h3>
                </div>
              </div>
              <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-glass border border-glass-border items-center justify-center shrink-0">
                <Icon className={`w-5 h-5 ${study.accentColor}`} />
              </div>
            </div>

            <p className={`text-lg md:text-xl font-medium ${study.accentColor} mb-3`}>
              {study.headline}
            </p>
            <p className="text-secondary leading-relaxed max-w-3xl">
              {study.oneLiner}
            </p>

            {/* Expand indicator */}
            <div className="flex items-center gap-2 mt-6 text-muted text-sm font-medium">
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
              {isExpanded ? "Less" : "Read the full story"}
            </div>
          </div>

          {/* Expandable detail */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <div className="px-8 md:px-10 pb-10">
                  <div className="border-t border-border pt-8">
                    {/* Bento-style content blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {study.sections.map((section, i) => (
                        <motion.div
                          key={section.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 + 0.1 }}
                          className="p-5 rounded-2xl bg-glass border border-glass-border"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-1.5 h-1.5 rounded-full bg-accent`} />
                            <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                              {section.label}
                            </span>
                          </div>
                          <p className="text-secondary text-sm leading-relaxed">
                            {section.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies marquee + Links */}
                    <span className="text-xs font-mono font-semibold text-muted uppercase tracking-wider mb-3 block">
                      Technologies
                    </span>
                    <div className="mt-3">
                      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                        <motion.div
                          className="flex gap-2.5 w-max"
                          animate={{ x: ["0%", "-50%"] }}
                          transition={{
                            x: {
                              duration: study.stack.length * 2.5,
                              repeat: Infinity,
                              ease: "linear",
                            },
                          }}
                        >
                          {[...study.stack, ...study.stack].map(
                            (tech, i) => (
                              <span
                                key={`${tech}-${i}`}
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-glass border border-glass-border text-xs font-mono text-secondary whitespace-nowrap"
                              >
                                <TechIcon name={tech} />
                                {tech}
                              </span>
                            )
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-end gap-4 mt-6">
                      <motion.a
                        whileHover={{ x: 4 }}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-accent font-medium text-sm cursor-pointer hover:underline"
                      >
                        View Project
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ x: 4 }}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-muted hover:text-foreground font-medium text-sm cursor-pointer transition-colors duration-200"
                      >
                        Source
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </SectionReveal>
  );
}

export function CaseStudies() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="case-studies" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-accent font-mono text-sm font-medium tracking-wider uppercase">
                Work
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3">
                Case Studies
              </h2>
            </div>
            <span className="hidden sm:block text-muted text-sm font-mono">
              {CASE_STUDIES.length} projects
            </span>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {CASE_STUDIES.map((study) => (
            <ProjectCard
              key={study.id}
              study={study}
              isExpanded={expandedIds.has(study.id)}
              onToggle={() => toggleCard(study.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
