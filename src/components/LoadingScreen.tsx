import React, { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";

const BLUE = "#0512ce";
const BLUE_LIGHT = "#4d7fff";

const SprayDot = ({
  style,
}: {
  style: React.CSSProperties;
}) => (
  <span
    className="absolute rounded-full pointer-events-none"
    style={{
      background: BLUE,
      boxShadow: `0 0 8px ${BLUE}`,
      ...style,
    }}
  />
);

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = useMemo(
    () => ["BOOTING SYSTEMS...", "LOADING MODULES...", "APPLYING PAINT...", "ALMOST DONE..."],
    []
  );

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1500);

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(p + Math.random() * 10 + 6, 100);
      });
    }, 220);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progressTimer);
    };
  }, [messages]);

  return (
    <div
      className="ds-wall fixed inset-0 z-50 flex items-center justify-center overflow-hidden text-white"
    >
      {/* Background spray cloud */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: `radial-gradient(ellipse at center, ${BLUE}18 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Scatter dots — spray overspray */}
      <SprayDot style={{ top: "18%", left: "12%", width: 6, height: 6, opacity: 0.4 }} />
      <SprayDot style={{ top: "24%", left: "22%", width: 3, height: 3, opacity: 0.3 }} />
      <SprayDot style={{ top: "15%", right: "18%", width: 5, height: 5, opacity: 0.35 }} />
      <SprayDot style={{ top: "30%", right: "12%", width: 3, height: 3, opacity: 0.25 }} />
      <SprayDot style={{ bottom: "20%", left: "15%", width: 4, height: 4, opacity: 0.3 }} />
      <SprayDot style={{ bottom: "28%", right: "20%", width: 6, height: 6, opacity: 0.35 }} />

      {/* Corner tag */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute font-marker text-white/10 text-sm"
        style={{ top: "24px", left: "24px", transform: "rotate(-3deg)" }}
      >
        DS.SA
      </p>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm px-6 text-center">
        {/* Logo with spray glow */}
        <div className="relative mb-8 flex justify-center">
          <div
            className="absolute rounded-full"
            style={{
              inset: "-24px",
              background: `radial-gradient(circle, ${BLUE}30 0%, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />
          <img
            src="/dssa-logo.png"
            alt="Digital Solutions SA"
            className="relative h-20 w-auto object-contain"
            style={{ filter: `drop-shadow(0 0 16px rgba(5,18,206,0.5))` }}
          />
        </div>

        {/* Brand name */}
        <h1
          className="font-stencil text-white tracking-wider mb-1"
          style={{ fontSize: "1.6rem", letterSpacing: "0.12em" }}
        >
          DIGITAL SOLUTIONS SA
        </h1>
        <p className="font-marker text-white/40 text-sm mb-8">
          designing the future of your business.
        </p>

        {/* Progress block */}
        <div
          style={{
            background: "rgba(5,18,206,0.08)",
            border: `1px solid rgba(5,18,206,0.25)`,
            padding: "20px",
          }}
        >
          {/* Scan line */}
          <div
            className="pointer-events-none absolute inset-y-0 opacity-20"
            style={{
              width: "40%",
              background: `linear-gradient(90deg, transparent, ${BLUE_LIGHT}55, transparent)`,
              animation: "ds-scan 1.8s ease-in-out infinite",
            }}
          />

          <Progress
            value={progress}
            className="h-2 bg-white/[0.08]"
          />

          {/* Glow under bar */}
          <div
            className="mt-1.5 h-2 rounded-full opacity-40"
            style={{
              background: `linear-gradient(90deg, ${BLUE} 0%, ${BLUE_LIGHT} 100%)`,
              filter: "blur(8px)",
              transform: `scaleX(${Math.max(0.02, progress / 100)})`,
              transformOrigin: "left center",
              transition: "transform 220ms ease",
            }}
          />

          <div className="mt-3 flex justify-between items-center">
            <span
              className="font-stencil"
              style={{ color: BLUE_LIGHT, fontSize: "0.75rem", letterSpacing: "0.1em" }}
            >
              {Math.round(progress)}%
            </span>
            <span
              className="font-marker text-white/40 text-xs ds-loading-pulse"
            >
              {messages[msgIndex]}
            </span>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          className="mt-5 mx-auto"
          style={{
            height: "2px",
            width: "80px",
            background: `linear-gradient(90deg, ${BLUE}, ${BLUE_LIGHT})`,
            boxShadow: `0 0 12px ${BLUE}`,
          }}
        />
      </div>

      <style>{`
        @keyframes ds-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        .ds-loading-pulse {
          animation: ds-txt-pulse 1.5s ease-in-out infinite;
        }
        @keyframes ds-txt-pulse {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ds-loading-pulse { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
