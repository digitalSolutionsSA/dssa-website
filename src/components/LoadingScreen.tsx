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
          background: `radial-gradient(900px 520px at 50% 38%, rgba(111,233,243,0.10) 0%, rgba(0,0,0,0) 55%),
                       linear-gradient(180deg, ${BLACK} 0%, ${DEEP_AZURE} 100%)`,
        }}
      />

      {/* Soft corner vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.85)_60%,rgba(0,0,0,0.95)_100%)]" />

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* Floating blobs (subtle, on-brand) */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <span
          className="absolute left-[12%] top-[18%] h-44 w-44 rounded-full blur-[1px]"
          style={{
            background: DEEP_AZURE,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset",
            opacity: 0.28,
            animation: "dsFloatA 14s ease-in-out infinite",
          }}
        />
        <span
          className="absolute right-[10%] top-[26%] h-32 w-32 rounded-full blur-[1px]"
          style={{
            background: DEEP_AZURE,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset",
            opacity: 0.22,
            animation: "dsFloatB 16s ease-in-out infinite",
          }}
        />
        <span
          className="absolute left-[18%] bottom-[16%] h-28 w-28 rounded-full blur-[1px]"
          style={{
            background: DEEP_AZURE,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset",
            opacity: 0.20,
            animation: "dsFloatC 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {/* Logo + orbit */}
        <div className="relative mb-6 flex justify-center">
          {/* glow */}
          <div
            className="absolute -inset-10 rounded-full blur-2xl opacity-30"
            style={{
              background: `radial-gradient(circle at center, ${LIGHT_BLUE} 0%, transparent 70%)`,
            }}
          />

          {/* orbit ring */}
          <div
            className="absolute -inset-8 rounded-full"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 22px rgba(111,233,243,0.10)",
              animation: "dsOrbit 7.5s linear infinite",
              maskImage:
                "radial-gradient(circle, transparent 56%, black 58%, black 100%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 56%, black 58%, black 100%)",
            }}
          />

          {/* orbit dot */}
          <span
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
            style={{
              background: LIGHT_BLUE,
              boxShadow: `0 0 14px ${LIGHT_BLUE}`,
              transformOrigin: "0 0",
              transform: "translate(-50%, -50%) translateX(88px)",
              animation: "dsOrbit 7.5s linear infinite",
            }}
          />

          <img
            src="/dssa-logo.png"
            alt="Digital Solutions SA"
            className="relative h-20 w-auto object-contain"
            style={{
              filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.55))",
              animation: "dsPop 900ms ease-out both",
            }}
          />
        </div>

        {/* Brand text */}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Digital Solutions SA
        </h1>

        <p className="mt-2 text-sm text-white/65">
          Designing the future of your business.
        </p>

        {/* Progress Card */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
          {/* scan line */}
          <div
            className="pointer-events-none absolute inset-y-0 left-[-40%] w-[40%] opacity-35"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(111,233,243,0.25) 50%, transparent 100%)`,
              animation: "dsScan 1.9s ease-in-out infinite",
            }}
          />

          <Progress
            value={progress}
            className="h-2 rounded-full bg-white/10"
            style={{
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset",
            }}
          />

          {/* glow under bar */}
          <div
            className="pointer-events-none mt-2 h-2 rounded-full opacity-55"
            style={{
              background: `linear-gradient(90deg, ${LIGHT_BLUE} 0%, transparent 70%)`,
              filter: "blur(10px)",
              transform: `scaleX(${Math.max(0.05, progress / 100)})`,
              transformOrigin: "left center",
              transition: "transform 220ms ease",
            }}
          />

          <div className="mt-3 flex justify-between text-xs text-white/60">
            <span>{Math.round(progress)}%</span>
            <span className="ds-pulseText">{loadingText}</span>
          </div>
        </div>

        {/* Micro accent */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <span
            className="h-1.5 w-12 rounded-full"
            style={{ background: LIGHT_BLUE }}
          />
          <span className="h-1.5 w-6 rounded-full bg-white/20" />
          <span
            className="h-1.5 w-2 rounded-full"
            style={{ background: LIGHT_BLUE, opacity: 0.55 }}
          />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes dsPop {
          0% { transform: translateY(6px) scale(0.98); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes dsOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes dsScan {
          0% { transform: translateX(0); }
          100% { transform: translateX(280%); }
        }

        @keyframes dsFloatA {
          0%, 100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(18px, -10px, 0); }
        }
        @keyframes dsFloatB {
          0%, 100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(-14px, 12px, 0); }
        }
        @keyframes dsFloatC {
          0%, 100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(12px, 16px, 0); }
        }

        .ds-pulseText {
          animation: dsTextPulse 1.4s ease-in-out infinite;
        }
        @keyframes dsTextPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.95; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ds-pulseText { animation: none !important; }
          span[style*="dsFloat"], div[style*="dsScan"], div[style*="dsOrbit"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
