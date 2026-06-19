"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="dark" enableSystem>
      <ParticlesProvider init={initParticles}>
        <SmoothScroll>{children}</SmoothScroll>
      </ParticlesProvider>
    </NextThemesProvider>
  );
}
