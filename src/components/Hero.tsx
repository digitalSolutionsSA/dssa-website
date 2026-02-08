import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  const COLORS = {
    black: "#000000",
    deep: "#061B2D", // deep-azure circles
    cyan: "#2BC7D6",
    cyan2: "#6FE9F3",
  };

  // Visible floating circles (deterministic)
  const blobs = useMemo(() => {
    return [
      { x: 8, y: 18, s: 140, o: 0.42, d: 0.0, dur: 12 },
      { x: 22, y: 72, s: 90, o: 0.35, d: 0.7, dur: 11 },
      { x: 70, y: 22, s: 110, o: 0.38, d: 0.3, dur: 13 },
      { x: 88, y: 60, s: 150, o: 0.30, d: 1.0, dur: 14 },
      { x: 55, y: 80, s: 70, o: 0.36, d: 0.5, dur: 10 },
      { x: 92, y: 88, s: 22, o: 0.75, d: 0.2, dur: 9 },
    ];
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Solid black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Floating circles */}
      <div className="pointer-events-none absolute inset-0">
        {blobs.map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.s}px`,
              height: `${b.s}px`,
              transform: "translate(-50%, -50%)",
              background: COLORS.deep,
              opacity: b.o,
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 22px rgba(6,27,45,0.35)",
              animation: `ds-circle-float ${b.dur}s ease-in-out ${b.d}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Subtle grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* Content */}
      <div
        className="relative z-10"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 96px)",
          minHeight: "100svh",
        }}
      >
        <div className="mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 sm:px-6">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl text-center">
              <h1
                className="
                  mt-4
                  font-extrabold
                  tracking-tight
                  leading-[1.05]
                  text-white
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                "
              >
                DESIGNING THE FUTURE
                <span className="block mt-2" style={{ color: COLORS.cyan2 }}>
                  OF YOUR BUSINESS.
                </span>
              </h1>

              <p
                className="
                  mt-4
                  mx-auto
                  max-w-3xl
                  text-base
                  sm:text-lg
                  lg:text-xl
                  leading-relaxed
                  text-white/70
                "
              >
                Modern websites, apps, automation and marketing that actually
                performs. Clean builds, sharp design, and systems that don’t
                fall apart the moment a client clicks a button.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
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
                  className="
                    px-7 py-5 text-base
                    border-white/20
                    bg-white/5
                    text-white
                    transition-all
                    hover:bg-white
                    hover:text-black
                    hover:border-white
                  "
                >
                  Learn More
                </Button>
              </div>

              <p
                className="mt-6 text-sm sm:text-base font-semibold tracking-wide"
                style={{ color: COLORS.cyan }}
              >
                BUILD. BRAND. AUTOMATE.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes ds-circle-float {
          0%, 100% { transform: translate(-50%, -50%) translate3d(0, 0, 0); }
          50% { transform: translate(-50%, -50%) translate3d(18px, -14px, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          span[style*="ds-circle-float"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
