import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(whatsappUrl, "_blank");
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

  return (
    <section className="relative overflow-hidden">
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

      {/* Content: one screen */}
      <div className="relative h-[100svh]">
        <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
          <div className="grid w-full items-center gap-10 lg:grid-cols-12">
            {/* LEFT */}
            <div className="lg:col-span-7">
              

             <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl text-white">
  DESIGNING THE FUTURE
  <span className="block mt-2 text-cyan-400">
    OF YOUR BUSINESS.
  </span>
</h1>


              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/70">
                Modern websites, apps, automation and marketing that actually performs.
                Clean builds, sharp design, and systems that don’t fall apart the moment
                a client clicks a button.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button
                  className="px-7 py-5 text-base text-white"
                  onClick={scrollToContact}
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.cyan2} 100%)`,
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  onClick={scrollToContact}
                  className="px-7 py-5 text-base border-white/15 bg-white/5 hover:bg-white/10 text-white"
                >
                  Learn More
                </Button>
              </div>

              <p className="mt-4 text-sm font-semibold" style={{ color: COLORS.cyan }}>
                BUILD. BRAND. AUTOMATE.
              </p>
            </div>

            {/* RIGHT: EXACT block vibe (no header/counters) */}
            <div className="lg:col-span-5 lg:col-start-8 flex justify-center lg:justify-end">
              {/* Block wrapper to match screenshot feel */}
              <div
                className="relative rounded-[22px] p-6"
                style={{
                  // the block in your screenshot has its own soft teal haze
                  background:
                    "radial-gradient(120% 120% at 20% 10%, rgba(43,199,214,0.22) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, rgba(8,28,42,0.55) 0%, rgba(6,22,33,0.35) 100%)",
                  boxShadow:
                    "0 18px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* 3x3 grid sized like your screenshot */}
                <div className="grid grid-cols-3 gap-5">
                  {Array.from({ length: 9 }).map((_, i) => {
                    const isCenter = i === 4;

                    return (
                      <div
                        key={i}
                        className="relative rounded-[18px]"
                        style={{
                          width: "96px",
                          height: "96px",
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                          boxShadow:
                            "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 0 0 2px rgba(43,199,214,0.10)",
                          border: "1px solid rgba(43,199,214,0.18)",
                        }}
                      >
                        {/* inner glow rim like screenshot */}
                        <div
                          className="absolute inset-[6px] rounded-[14px]"
                          style={{
                            boxShadow:
                              "inset 0 0 0 1px rgba(255,255,255,0.08)",
                            background:
                              "linear-gradient(135deg, rgba(43,199,214,0.10) 0%, rgba(0,0,0,0) 55%)",
                            opacity: 0.85,
                          }}
                        />

                        {/* tiny center dot for non-logo tiles */}
                        {!isCenter && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          </div>
                        )}

                        {/* center logo tile with stronger glow */}
                        {isCenter && (
                          <>
                            <div
                              className="absolute inset-0 rounded-[18px]"
                              style={{
                                boxShadow:
                                  "0 0 0 2px rgba(43,199,214,0.25) inset, 0 0 26px rgba(43,199,214,0.22)",
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="rounded-[14px] bg-white/95 p-2 shadow-md">
                                <img
                                  src="/lovable-uploads/bf327e4b-7c8f-4fdb-919e-2662d244e513.png"
                                  alt="Digital Solutions SA Logo"
                                  className="h-12 w-12 object-contain"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Responsive scaling without changing the look */}
                <div className="mt-0 hidden" />
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

        @media (max-width: 640px) {
          /* scale the entire block down a bit on phones while keeping proportions */
          .ds-block-scale {
            transform: scale(0.92);
            transform-origin: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
