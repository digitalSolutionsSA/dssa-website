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

  // Brand palette
  const COLORS = {
    black: "#000000",
    deep: "#061B2D",
    cyan: "#2BC7D6",
    cyan2: "#6FE9F3",
  };

  // Stable particles
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
    <section className="relative overflow-hidden bg-black">
      {/* Fallback background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${COLORS.black} 0%, ${COLORS.deep} 100%)`,
        }}
      />

      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-32 -left-28 h-[420px] w-[420px] rounded-full blur-3xl opacity-25"
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
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:3px_3px]" />

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
        className="relative z-10"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 96px)",
          minHeight: "100svh",
        }}
      >
        <div className="mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 sm:px-6">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl text-center">
              <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl text-white">
                DESIGNING THE FUTURE
                <span className="block mt-2" style={{ color: COLORS.cyan2 }}>
                  OF YOUR BUSINESS.
                </span>
              </h1>

              <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
                Modern websites, apps, automation and marketing that actually
                performs. Clean builds, sharp design, and systems that don’t
                fall apart the moment a client clicks a button.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
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
                className="mt-5 text-sm font-semibold tracking-wide"
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
        @keyframes ds-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
