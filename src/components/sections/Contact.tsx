"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ArrowUpRight, Copy, Check } from "lucide-react";
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
opacity-15 will-change-transform`;

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yasirmahmood124/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Yasir-Mahmood-124",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:yasir.mahmood.3795@gmail.com?subject=${subject}&body=${body}`;
  };

  const inputClass = (field: string) =>
    cn(
      "w-full px-4 py-3 rounded-xl bg-glass border text-foreground text-sm outline-none transition-all duration-300 placeholder:text-muted/50",
      focused === field
        ? "border-accent/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
        : "border-border hover:border-muted/40"
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-mono font-semibold text-muted uppercase tracking-wider mb-2"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          className={inputClass("name")}
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-mono font-semibold text-muted uppercase tracking-wider mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          className={inputClass("email")}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-mono font-semibold text-muted uppercase tracking-wider mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          className={inputClass("message") + " resize-none"}
          placeholder="Tell me about your project..."
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      >
        Send Message
        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.button>
    </form>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("yasir.mahmood.3795@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 text-xs font-mono cursor-pointer transition-all duration-200"
    >
      {copied ? (
        <Check className="w-3 h-3 text-accent" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <span className="text-accent font-mono text-sm font-medium tracking-wider uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-secondary text-lg max-w-2xl mb-12">
            Whether you&apos;ve got a product to build, a workflow to
            automate, or you&apos;re hiring — I&apos;d like to hear about it.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Form card — left */}
          <SectionReveal delay={0.1} className="lg:col-span-3">
            <div className="relative rounded-3xl bg-card border border-border p-8 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div
                  className={cn(
                    AURORA_CLASSES,
                    "[mask-image:radial-gradient(ellipse_at_0%_0%,black_10%,var(--transparent)_50%)]"
                  )}
                />
              </div>
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </SectionReveal>

          {/* Right column — info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Email card */}
            <SectionReveal delay={0.15}>
              <div className="relative rounded-3xl bg-card border border-border p-6 overflow-hidden transition-colors duration-300 hover:border-accent/20">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div
                    className={cn(
                      AURORA_CLASSES,
                      "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
                    )}
                  />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-muted uppercase tracking-wider block">
                        Email
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <a
                      href="mailto:yasir.mahmood.3795@gmail.com"
                      className="text-foreground font-medium text-sm hover:text-accent transition-colors duration-200 cursor-pointer truncate"
                    >
                      yasir.mahmood.3795@gmail.com
                    </a>
                    <CopyEmail />
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Availability card */}
            <SectionReveal delay={0.2}>
              <div className="relative rounded-3xl bg-card border border-border p-6 overflow-hidden transition-colors duration-300 hover:border-accent/20">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div
                    className={cn(
                      AURORA_CLASSES,
                      "[mask-image:radial-gradient(ellipse_at_50%_100%,black_10%,var(--transparent)_70%)]"
                    )}
                  />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                      Available for work
                    </span>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed">
                    Open to remote & freelance. Happy to discuss AI apps, SaaS,
                    automation, or an early-stage idea.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Social links card */}
            <SectionReveal delay={0.25}>
              <div className="relative rounded-3xl bg-card border border-border p-6 overflow-hidden transition-colors duration-300 hover:border-accent/20">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div
                    className={cn(
                      AURORA_CLASSES,
                      "[mask-image:radial-gradient(ellipse_at_100%_100%,black_10%,var(--transparent)_70%)]"
                    )}
                  />
                </div>
                <div className="relative">
                  <span className="text-xs font-mono font-semibold text-muted uppercase tracking-wider block mb-4">
                    Find me on
                  </span>
                  <div className="space-y-2">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between px-4 py-3 rounded-xl bg-glass border border-glass-border cursor-pointer transition-all duration-200 hover:border-accent/30 hover:bg-accent/5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-muted group-hover:text-accent transition-colors duration-200">
                            {social.icon}
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {social.label}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-accent transition-all duration-200" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
