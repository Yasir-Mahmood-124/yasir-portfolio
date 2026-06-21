"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  Briefcase,
  User,
  FolderOpen,
  Cpu,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

const NAV_LINKS = [
  { label: "What I Do", href: "#what-i-do", icon: Briefcase },
  { label: "About", href: "#about", icon: User },
  { label: "Case Studies", href: "#case-studies", icon: FolderOpen },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Contact", href: "#contact", icon: Mail },
];

const THEME_TABS = [
  { title: "Light", icon: Sun },
  { title: "Dark", icon: Moon },
  { title: "System", icon: Monitor },
] as const;

const THEME_KEYS = ["light", "dark", "system"] as const;

function ThemeExpandable() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-24 h-9" />;

  const activeIndex = THEME_KEYS.indexOf(
    theme as (typeof THEME_KEYS)[number]
  );

  return (
    <ExpandableTabs
      tabs={[...THEME_TABS]}
      activeIndex={activeIndex === -1 ? 2 : activeIndex}
      activeColor="text-accent"
      className="border-0 bg-transparent shadow-none py-0 px-0 rounded-full"
      onChange={(index) => {
        if (index !== null) {
          setTheme(THEME_KEYS[index]);
        }
      }}
    />
  );
}

function MobileThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <button
      onClick={cycle}
      className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent cursor-pointer transition-colors duration-200 hover:bg-accent/20 shrink-0"
      aria-label={`Current theme: ${theme}. Click to cycle.`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveTab("#" + top.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 transition-all duration-300 rounded-2xl ${
        scrolled
          ? "bg-glass backdrop-blur-xl border border-glass-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        <a
          href="#"
          onClick={() => setActiveTab("")}
          className="cursor-pointer block shrink-0"
        >
          <img
            src="/logo.png"
            alt="Yasir Mahmood"
            className="h-28 sm:h-44 w-auto -my-8 sm:-my-[4.5rem] -ml-6 sm:-ml-12"
          />
        </a>

        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => {
            const isActive = activeTab === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveTab(link.href)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200",
                  "text-muted hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="tubelight"
                    className="absolute inset-0 w-full bg-accent/10 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-t-full">
                      <div className="absolute w-12 h-6 bg-accent/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-accent/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-accent/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:block">
          <ThemeExpandable />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <MobileThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-glass backdrop-blur-xl border-t border-glass-border rounded-b-2xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.href;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(link.href);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 cursor-pointer",
                      isActive
                        ? "text-foreground bg-accent/10"
                        : "text-muted hover:text-foreground hover:bg-glass"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
