"use client";

import { SparklesCore } from "@/components/ui/sparkles";

export function SparkleDivider() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl h-40 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-emerald-300 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-emerald-300 to-transparent h-px w-1/4" />

        <SparklesCore
          id="divider-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={600}
          className="w-full h-full"
          particleColor="#22C55E"
          speed={1.2}
        />

        <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
    </div>
  );
}
