import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  // New overall page palette
  const COLORS = {
    bgA: "#000000",
    bgB: "#061B2D",
    ink: "#071627",
    cyan: "#2BC7D6",
    cyan2: "#6FE9F3",
  };

  // Stable particles (no Math.random in render)
  const particles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      x: (i * 41) % 100,
      y: (i * 57) % 100,
      s: 5 + ((i * 9) % 8),
      o: 0.045 + ((i * 5) % 8) / 100,
      d: i * 0.25,
    }));
  }, []);

  // Console typing animation (attention grabber without being cringe)
  const consoleLines = useMemo(
    () => [
      "Booting Digital Solutions SA...",
      "Loading: Web Development ✓",
      "Loading: Branding & Design ✓",
      "Loading: AI Automation ✓",
      "Loading: Marketing Systems ✓",
      "Status: Ready to build something serious.",
    ],
    []
  );

  const [typed, setTyped] = useState<string[]>([""]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    // initialize typed lines once
    setTyped(["> "]);
    setLineIdx(0);
    setCharIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!consoleLines.length) return;

    const current = consoleLines[lineIdx] ?? "";
    const doneAll = lineIdx >= consoleLines.length;

    if (doneAll) return;

    const timer = setTimeout(() => {
      // Ensure typed array has the current line slot
      setTyped((prev) => {
        const next = [...prev];
        if (!next[lineIdx]) next[lineIdx] = "> ";
        return next;
      });

      // type next character
      if (charIdx < current.length) {
        setTyped((prev) => {
          const next = [...prev];
          next[lineIdx] = (next[lineIdx] ?? "> ") + current[charIdx];
          return next;
        });
        setCharIdx((c) => c + 1);
      } else {
        // move to next line after a short pause
        if (lineIdx < consoleLines.length - 1) {
          setTyped((prev) => [...prev, "> "]);
          setLineIdx((l) => l + 1);
          setCharIdx(0);
        } else {
          // finished
          setLineIdx(consoleLines.length);
        }
      }
    }, charIdx === 0 ? 260 : 22);

    return () => clearTimeout(timer);
  }, [charIdx, consoleLines, lineIdx]);

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-32 -left-28 h-[420px] w-[420px] rounded-full blur-3xl opacity-35"
        style={{
          background: `radial-gradient(circle at center, ${COLORS.cyan2} 0%, transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${COLORS.cyan} 0%, transparent 55%)`,
        }}
      />

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.s}px`,
              height: `${p.s}px`,
              background: COLORS.cyan,
              opacity: p.o,
              animation: `ds-float 6s ease-in-out ${p.d}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 96px)",
          minHeight: "100svh",
        }}
      >
        <div className="mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 sm:px-6">
          <div className="grid w-full items-center gap-10 lg:grid-cols-12">
            {/* LEFT */}
            <div className="lg:col-span-7">
              <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl text-white">
                DESIGNING THE FUTURE
                <span className="block mt-2" style={{ color: COLORS.cyan2 }}>
                  OF YOUR BUSINESS.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/70">
                Modern websites, apps, automation and marketing that actually
                performs. Clean builds, sharp design, and systems that don’t
                fall apart the moment a client clicks a button.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button
                  className="px-7 py-5 text-base text-white"
                  onClick={scrollToContact}
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.cyan2} 100%)`,
                  }}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  onClick={scrollToContact}
                  className="px-7 py-5 text-base border-white/15 bg-white/5 hover:bg-white/10 text-white"
                >
                  Learn More
                </Button>
              </div>

              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: COLORS.cyan }}
              >
                BUILD. BRAND. AUTOMATE.
              </p>
            </div>

            {/* RIGHT: Replace grid block with a Live Console + Proof chips */}
            <div className="lg:col-span-5 lg:col-start-8 flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[430px] rounded-[22px] p-5 sm:p-6"
                style={{
                  background:
                    "radial-gradient(120% 120% at 20% 10%, rgba(43,199,214,0.22) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, rgba(8,28,42,0.60) 0%, rgba(6,22,33,0.38) 100%)",
                  boxShadow:
                    "0 18px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Header bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>

                  <div
                    className="text-xs font-semibold tracking-wide"
                    style={{ color: COLORS.cyan2 }}
                  >
                    LIVE BUILD CONSOLE
                  </div>
                </div>

                {/* Console body */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{ background: COLORS.cyan }}
                    />
                    <div className="text-xs text-white/70">
                      system.dssa • connected
                    </div>
                  </div>

                  <div className="font-mono text-[12px] leading-relaxed text-white/80">
                    {typed.map((line, i) => (
                      <div key={i} className="whitespace-pre-wrap">
                        {line}
                        {i === typed.length - 1 && lineIdx < consoleLines.length && (
                          <span className="ds-caret">▌</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* mini “proof” row */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      "Fast builds",
                      "Mobile-first",
                      "Clean UI",
                      "Automation-ready",
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
                      >
                        <CheckCircle2
                          className="h-4 w-4"
                          style={{ color: COLORS.cyan2 }}
                        />
                        <span className="text-xs text-white/75">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA inside panel */}
                <button
                  onClick={scrollToContact}
                  className="mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.cyan2} 100%)`,
                    boxShadow: "0 10px 30px rgba(43,199,214,0.16)",
                  }}
                >
                  Start a project on WhatsApp →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes ds-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .ds-caret {
          display: inline-block;
          margin-left: 2px;
          animation: ds-blink 1s steps(1) infinite;
          opacity: 0.85;
        }
        @keyframes ds-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
