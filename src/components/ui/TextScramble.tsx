"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 30,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const totalFrames = text.length;

    const interval = setInterval(() => {
      frame++;
      const resolved = text.slice(0, frame);
      const scrambled = Array.from({ length: Math.min(3, totalFrames - frame) })
        .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
        .join("");
      setDisplayed(resolved + scrambled);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayed}
    </motion.span>
  );
}
