"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { TextScramble } from "@/components/ui/TextScramble";
import { ParticleField } from "@/components/three/ParticleField";

function AnimatedTitles() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "Business Solutions",
      "Automation Systems",
      "Cloud Applications",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
      &nbsp;
      {titles.map((title, index) => (
        <motion.span
          key={index}
          className="absolute font-semibold text-accent"
          initial={{ opacity: 0, y: "-100" }}
          transition={{ type: "spring", stiffness: 50 }}
          animate={
            titleNumber === index
              ? { y: 0, opacity: 1 }
              : { y: titleNumber > index ? -150 : 150, opacity: 0 }
          }
        >
          {title}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <ParticleField />


      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8">
          <TextScramble
            text="Building AI-Powered"
            className="block text-foreground"
            delay={400}
            speed={25}
          />
          <AnimatedTitles />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          I help businesses streamline operations, automate repetitive
          workflows, and build scalable software using AI, cloud technologies,
          and modern web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="w-full sm:w-auto">
            <a
              href="#case-studies"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-sm sm:text-base cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-hover via-accent to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                View My Work
              </span>
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="w-full sm:w-auto">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-full border border-border text-foreground font-semibold text-sm sm:text-base cursor-pointer overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
            >
              <span className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-accent">
                Start a Conversation
                <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
