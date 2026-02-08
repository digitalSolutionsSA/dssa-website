import React, { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";

const LoadingScreen = () => {
  // Locked brand palette (no deviations)
  const BLACK = "#000000";
  const DEEP_AZURE = "#061B2D";
  const LIGHT_BLUE = "#6FE9F3";

  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Booting systems...");

  const messages = useMemo(
    () => [
      "Booting systems...",
      "Loading core modules...",
      "Optimising performance...",
      "Almost there...",
    ],
    []
  );

  useEffect(() => {
    let msgIndex = 0;

    const messageTimer = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      setLoadingText(messages[msgIndex]);
    }, 1400);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + Math.random() * 10 + 6, 100);
      });
    }, 220);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [messages]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden text-white">
      {/* Base background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${BLACK} 0%, ${DEEP_AZURE} 100%)`,
        }}
      />

      {/* Subtle glow only in brand blue */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[120px] opacity-25"
        style={{
          background: `radial-gradient(circle at center, ${LIGHT_BLUE} 0%, transparent 65%)`,
        }}
      />

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {/* Logo */}
        <div className="relative mb-6 flex justify-center">
          <div
            className="absolute -inset-6 rounded-full blur-2xl opacity-30"
            style={{
              background: `radial-gradient(circle at center, ${LIGHT_BLUE} 0%, transparent 70%)`,
            }}
          />
          <img
            src="/dssa-logo.png"
            alt="Digital Solutions SA"
            className="relative h-20 w-auto object-contain"
          />
        </div>

        {/* Brand text */}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Digital Solutions SA
        </h1>

        <p className="mt-2 text-sm text-white/65">
          Designing the future of your business.
        </p>

        {/* Progress */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
          <Progress
            value={progress}
            className="h-2 rounded-full bg-white/10"
          />

          <div className="mt-3 flex justify-between text-xs text-white/60">
            <span>{Math.round(progress)}%</span>
            <span className="animate-pulse">{loadingText}</span>
          </div>
        </div>

        {/* Micro accent */}
        <div className="mt-6 flex justify-center gap-2">
          <span
            className="h-1.5 w-12 rounded-full"
            style={{ background: LIGHT_BLUE }}
          />
          <span className="h-1.5 w-6 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
