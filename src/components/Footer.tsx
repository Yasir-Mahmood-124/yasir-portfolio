"use client";

import { ArrowUpRight, ArrowUp } from "lucide-react";
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
opacity-10 will-change-transform
[mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,var(--transparent)_70%)]`;

const NAV_LINKS = [
  { label: "What I Do", href: "#what-i-do" },
  { label: "About", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yasirmahmood124/" },
  { label: "GitHub", href: "https://github.com/Yasir-Mahmood-124" },
  { label: "Email", href: "mailto:yasir.mahmood.3795@gmail.com" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(AURORA_CLASSES)} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-8">
        {/* Top — logo + nav + socials in one row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <a href="#" className="cursor-pointer shrink-0">
            <img
              src="/logo.png"
              alt="Yasir Mahmood"
              className="h-24 w-auto -ml-5"
            />
          </a>

          {/* Nav links — horizontal */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials — horizontal */}
          <div className="flex items-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-1 text-[13px] text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
              >
                {social.label}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-5 flex items-center justify-between">
          <p className="text-[12px] text-muted/70">
            &copy; {new Date().getFullYear()} Yasir Mahmood
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-1.5 text-[12px] text-muted/70 hover:text-accent font-mono cursor-pointer transition-colors duration-200"
          >
            Back to top
            <ArrowUp className="w-3 h-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
