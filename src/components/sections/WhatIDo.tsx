"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Link2, Wrench } from "lucide-react";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    icon: Brain,
    title: "AI-Powered Applications",
    description:
      "Applications that use AI to improve productivity and decision-making: content assistants, marketing assistants, business intelligence, and knowledge management tools.",
    aurora:
      "[--aurora:repeating-linear-gradient(100deg,var(--emerald-500)_10%,var(--cyan-300)_15%,var(--emerald-300)_20%,var(--emerald-400)_25%,var(--cyan-300)_30%)]",
  },
  {
    icon: Zap,
    title: "AI Automation",
    description:
      "Automating the repetitive work that drains a team's time: meeting intelligence, lead qualification, email and content generation, CRM and reporting automation.",
    aurora:
      "[--aurora:repeating-linear-gradient(100deg,var(--emerald-500)_10%,var(--cyan-300)_15%,var(--emerald-300)_20%,var(--emerald-400)_25%,var(--cyan-300)_30%)]",
  },
  {
    icon: Link2,
    title: "System Integrations",
    description:
      "Connecting the tools a business already uses into one seamless workflow: Gmail, Google Workspace, WordPress, GA4, CRMs, and custom APIs.",
    aurora:
      "[--aurora:repeating-linear-gradient(100deg,var(--emerald-500)_10%,var(--cyan-300)_15%,var(--emerald-300)_20%,var(--emerald-400)_25%,var(--cyan-300)_30%)]",
  },
  {
    icon: Wrench,
    title: "Custom Internal Tools",
    description:
      "Software that makes internal operations run smoother: dashboards, admin portals, reporting systems, workflow and inventory management platforms.",
    aurora:
      "[--aurora:repeating-linear-gradient(100deg,var(--emerald-400)_10%,var(--emerald-300)_15%,var(--cyan-300)_20%,var(--emerald-500)_25%,var(--emerald-300)_30%)]",
  },
];

function ServiceCard({
  icon: Icon,
  title,
  description,
  aurora,
}: (typeof SERVICES)[0]) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative p-8 rounded-2xl bg-card border border-border backdrop-blur-sm cursor-pointer overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] hover:border-accent/30"
    >
      {/* Aurora light effect — always visible */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
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
            opacity-20 group-hover:opacity-40 transition-opacity duration-700
            will-change-transform
            [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            aurora
          )}
        />
      </div>

      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-accent">{title}</h3>
        <p className="text-secondary leading-relaxed text-[15px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function WhatIDo() {
  return (
    <section id="what-i-do" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="text-accent font-mono text-sm font-medium tracking-wider uppercase">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              What I Do
            </h2>
            <p className="text-secondary text-lg max-w-xl mx-auto">
              Four ways I help businesses turn problems into working software.
            </p>
          </div>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
