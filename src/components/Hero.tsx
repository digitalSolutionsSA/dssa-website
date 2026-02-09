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
    deep: "#061B2D",
    cyan: "#2BC7D6",
    cyan2: "#6FE9F3",
  };

  const blobs = useMemo(
    () => [
      { x: 8, y: 18, s: 140, o: 0.42, d: 0.0, dur: 12 },
      { x: 22, y: 72, s: 90, o: 0.35, d: 0.7, dur: 11 },
      { x: 70, y: 22, s: 110, o: 0.38, d: 0.3, dur: 13 },
      { x: 88, y: 60, s: 150, o: 0.3, d: 1.0, dur: 14 },
      { x: 55, y: 80, s: 70, o: 0.36, d: 0.5, dur: 10 },
    ],
    []
  );

  const BRAND_LOGOS = useMemo(
    () => [
      { src: "/bj.png", alt: "BJ" },
      { src: "/blixim.png", alt: "Blixim" },
      { src: "/cas.png", alt: "Canvas & Sign" },
      { src: "/hermau.png", alt: "Hermau" },
      { src: "/mcr.png", alt: "MCR" },
      { src: "/PD.png", alt: "PD" },
      { src: "/tk.png", alt: "TK" },
      { src: "/trailers.png", alt: "Trailers" },
    ],
    []
  );

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black" />

      {/* Floating blobs */}
      <div className="pointer-events-none absolute inset-0">
        {blobs.map((b, i) => (
          <span
            key={i}
            className="ds-float absolute rounded-full"
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

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:3px_3px]" />

      {/* HERO CONTENT */}
      <div
        className="relative z-10"
        style={{
          paddingTop:
            "calc(env(safe-area-inset-top, 0px) + var(--hero-top))",
          minHeight: "var(--hero-h)",
        }}
      >
        <div
          className="mx-auto flex min-h-[var(--hero-h)] max-w-7xl items-center px-4 sm:px-6"
          style={{ paddingBottom: "var(--hero-bottom)" }}
        >
          <div className="w-full text-center">
            <h1 className="mt-2 font-extrabold tracking-tight leading-[1.05] text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              DESIGNING THE FUTURE
              <span className="block mt-2" style={{ color: COLORS.cyan2 }}>
                OF YOUR BUSINESS.
              </span>
            </h1>

            <p className="mt-4 mx-auto max-w-3xl text-base sm:text-lg lg:text-xl text-white/70">
              Modern websites, apps, automation and marketing that actually
              performs. Clean builds, sharp design, and systems that don’t fall
              apart the moment a client clicks a button.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
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
                className="px-7 py-5 text-base border-white/20 bg-white/5 text-white hover:bg-white hover:text-black"
              >
                Learn More
              </Button>
            </div>

            <p
              className="mt-5 text-sm sm:text-base font-semibold tracking-wide"
              style={{ color: COLORS.cyan }}
            >
              BUILD. BRAND. AUTOMATE.
            </p>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="border-t border-white/10 bg-black/55 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 pt-3">
              <p className="text-center text-xs sm:text-sm text-white/70">
                If these brands can trust us,{" "}
                <span style={{ color: COLORS.cyan2 }}>so can you.</span>
              </p>
            </div>

            <div className="relative overflow-hidden py-5">
              {/* edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/90 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/90 to-transparent" />

              {/* The track */}
              <div className="ds-marquee">
                {/* Group A */}
                <div className="ds-marqueeGroup">
                  {BRAND_LOGOS.map((logo) => (
                    <div key={logo.src} className="ds-logoWrap" title={logo.alt}>
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="ds-logoImg"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>

                {/* Group B (duplicate of A) */}
                <div className="ds-marqueeGroup" aria-hidden="true">
                  {BRAND_LOGOS.map((logo) => (
                    <div
                      key={`${logo.src}-dup`}
                      className="ds-logoWrap"
                      title={logo.alt}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="ds-logoImg"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        :root {
          --hero-h: 88svh;
          --hero-top: 96px;
          --hero-bottom: 140px;

          /* Big logos */
          --logo-h: 56px;
          --logo-maxw: 320px;

          /* spacing */
          --logo-gap: 64px;
        }

        @media (max-width: 1024px) {
          :root {
            --hero-h: 84svh;
            --hero-top: 80px;
            --hero-bottom: 120px;
            --logo-h: 48px;
            --logo-maxw: 260px;
            --logo-gap: 54px;
          }
        }

        @media (max-width: 640px) {
          :root {
            --hero-h: 74svh;
            --hero-top: 64px;
            --hero-bottom: 108px;
            --logo-h: 42px;
            --logo-maxw: 220px;
            --logo-gap: 44px;
          }
        }

        @keyframes ds-circle-float {
          0%, 100% { transform: translate(-50%, -50%) translate3d(0,0,0); }
          50% { transform: translate(-50%, -50%) translate3d(18px,-14px,0); }
        }

        /* Continuous right -> left with exact 2-group looping */
        @keyframes ds-marquee-rtl {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .ds-marquee {
          display: flex;
          width: 200%;
          will-change: transform;
          animation: ds-marquee-rtl 22s linear infinite;
        }

        .ds-marqueeGroup {
          flex: 0 0 50%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: var(--logo-gap);
          padding: 0 24px;
        }

        .ds-logoWrap {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ds-logoImg {
          height: var(--logo-h);
          max-width: var(--logo-maxw);
          width: auto;
          object-fit: contain;
          opacity: 0.92;
          filter: grayscale(1);
          transition: opacity 220ms ease, filter 220ms ease, transform 220ms ease;
        }

        @media (hover: hover) {
          .ds-marquee:hover { animation-play-state: paused; }
          .ds-logoImg:hover {
            opacity: 1;
            filter: grayscale(0);
            transform: translateY(-2px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ds-float, .ds-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
