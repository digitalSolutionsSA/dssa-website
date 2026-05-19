import React, { useMemo } from "react";
import { ArrowRight } from "lucide-react";

const BLUE = "#0512ce";
const BLUE_LIGHT = "#4d7fff";

const PaintDrips = ({ color, count = 7 }: { color: string; count?: number }) => {
  const drips = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      left: `${4 + i * (92 / (count - 1))}%`,
      height: `${22 + ((i * 43 + i * i * 11) % 40)}px`,
      width: `${3 + (i % 3)}px`,
      opacity: 0.55 + (i % 3) * 0.12,
    })), [count]
  );
  return (
    <div className="pointer-events-none absolute left-0 right-0" style={{ top: "100%" }}>
      {drips.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-b-full"
          style={{
            top: 0,
            left: d.left,
            width: d.width,
            height: d.height,
            background: `linear-gradient(to bottom, ${color}, transparent)`,
            boxShadow: `0 0 6px ${color}88`,
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  );
};

const SpraySplatter = ({
  color,
  size,
  style,
}: {
  color: string;
  size: number;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    aria-hidden="true"
    style={{ position: "absolute", ...style }}
  >
    <g fill={color}>
      <ellipse cx="50" cy="50" rx="26" ry="20" transform="rotate(12 50 50)" />
      <ellipse cx="50" cy="50" rx="16" ry="28" transform="rotate(-22 50 50)" />
      <circle cx="18" cy="30" r="6" />
      <circle cx="80" cy="22" r="4" />
      <circle cx="85" cy="68" r="7" />
      <circle cx="22" cy="78" r="4" />
      <circle cx="52" cy="12" r="3" />
      <circle cx="88" cy="50" r="3" />
      <circle cx="12" cy="55" r="5" />
      <ellipse cx="72" cy="88" rx="5" ry="3" transform="rotate(25 72 88)" />
    </g>
  </svg>
);

const Hero = () => {
  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const BRAND_LOGOS = useMemo(
    () => [
      { src: "/bj.png", alt: "BJ" },
      { src: "/blixim.png", alt: "Blixim" },
      { src: "/cas.png", alt: "Canvas & Sign" },
      { src: "/decm.png", alt: "DECM" },
      { src: "/ghv.png", alt: "GHV" },
      { src: "/hermau.png", alt: "Hermau" },
      { src: "/loka.png", alt: "Loka" },
      { src: "/mav.png", alt: "MAV" },
      { src: "/mcr.png", alt: "MCR" },
      { src: "/PD.png", alt: "PD" },
      { src: "/PRG.png", alt: "PRG" },
      { src: "/strictly.png", alt: "Strictly" },
      { src: "/tk.png", alt: "TK" },
      { src: "/trailers.png", alt: "Trailers" },
    ],
    []
  );

  return (
    <section className="ds-wall relative overflow-hidden" style={{ minHeight: "100svh" }}>
      {/* Background spray clouds */}
      <div className="pointer-events-none absolute inset-0">
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-8%",
            width: "55%",
            height: "70%",
            background: `radial-gradient(ellipse at top right, ${BLUE}20 0%, transparent 60%)`,
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-8%",
            width: "45%",
            height: "50%",
            background: `radial-gradient(ellipse at bottom left, ${BLUE_LIGHT}12 0%, transparent 60%)`,
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Decorative splatters */}
      <SpraySplatter
        color={`${BLUE}1A`}
        size={260}
        style={{ top: "4%", right: "1%", opacity: 0.9 }}
      />
      <SpraySplatter
        color="rgba(255,255,255,0.025)"
        size={180}
        style={{ top: "35%", left: "0%", opacity: 0.8 }}
      />
      <SpraySplatter
        color={`${BLUE_LIGHT}12`}
        size={150}
        style={{ bottom: "18%", right: "8%" }}
      />

      {/* Corner tag — like a quick marker tag on a wall */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute font-marker text-white/15 text-sm hidden sm:block"
        style={{ top: "96px", left: "28px", transform: "rotate(-4deg)" }}
      >
        DS.SA // EST.2024
      </p>

      {/* MAIN CONTENT */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6"
        style={{ minHeight: "88svh", paddingTop: "104px", paddingBottom: "185px" }}
      >
        {/* Spray-painted label tag */}
        <div className="ds-label-tag mb-8">DIGITAL SOLUTIONS SA</div>

        {/* Headline */}
        <div className="relative">
          {/* Spray glow cloud behind headline */}
          <div
            className="pointer-events-none absolute"
            style={{
              inset: "-40px -80px",
              background: `radial-gradient(ellipse at center, ${BLUE}28 0%, transparent 60%)`,
              filter: "blur(55px)",
            }}
          />

          <h1
            className="relative font-stencil leading-[0.9] ds-spray-white ds-grunge-heading"
            style={{ fontSize: "clamp(3.6rem, 12vw, 10.5rem)", letterSpacing: "0.04em" }}
          >
            <span className="block">DESIGNING</span>
            <span className="block ds-spray-blue" style={{ fontSize: "1.06em" }}>
              THE FUTURE
            </span>
          </h1>

          {/* Paint drips from blue line */}
          <div className="relative" style={{ height: 0 }}>
            <PaintDrips color={BLUE} count={9} />
          </div>
        </div>

        {/* Hand-tagged subtitle */}
        <p
          className="font-marker text-white/80 mt-10"
          style={{ fontSize: "clamp(1.5rem, 4.5vw, 3rem)" }}
        >
          of your business.
        </p>

        {/* Body copy */}
        <p className="mt-6 max-w-xl text-white/50 text-base sm:text-lg leading-relaxed font-inter">
          Modern websites, apps, automation and marketing that actually performs.
          Clean builds. Sharp design. Systems that don't fall apart.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <button onClick={scrollToContact} className="ds-btn-spray">
            GET STARTED <ArrowRight className="inline ml-2 h-4 w-4" />
          </button>
          <button onClick={scrollToContact} className="ds-btn-stencil">
            LEARN MORE
          </button>
        </div>

        {/* Tagline marker tag */}
        <p
          className="mt-10 font-marker ds-spray-blue tracking-wider"
          style={{ fontSize: "1.25rem" }}
        >
          BUILD. BRAND. AUTOMATE.
        </p>
      </div>

      {/* BRAND MARQUEE */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="ds-drip-divider" />
        <div className="ds-wall border-t border-white/[0.05] bg-black/75 backdrop-blur-md">
          <p className="text-center pt-3 pb-1 font-marker text-white/35 text-sm tracking-widest">
            // trusted by //
          </p>
          <div className="relative overflow-hidden py-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/90 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/90 to-transparent z-10" />
            <div className="ds-marquee">
              {[0, 1].map((g) => (
                <div
                  key={g}
                  className="ds-marqueeGroup"
                  aria-hidden={g === 1 ? "true" : undefined}
                >
                  {BRAND_LOGOS.map((logo) => (
                    <div key={`${logo.src}-${g}`} className="ds-logoWrap">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="ds-logoImg"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --logo-h: 42px;
          --logo-box-w: 150px;
          --logo-gap: 44px;
        }
        @media (max-width: 640px) {
          :root { --logo-h: 34px; --logo-box-w: 120px; --logo-gap: 32px; }
        }
        @keyframes ds-marquee-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ds-marquee {
          display: flex; width: 200%;
          will-change: transform;
          animation: ds-marquee-rtl 28s linear infinite;
        }
        .ds-marqueeGroup {
          flex: 0 0 50%; display: flex;
          align-items: center; justify-content: space-around;
          gap: var(--logo-gap); padding: 0 24px;
        }
        .ds-logoWrap {
          flex: 0 0 auto;
          width: var(--logo-box-w); height: var(--logo-h);
          display: flex; align-items: center; justify-content: center;
        }
        .ds-logoImg {
          width: 100%; height: 100%; object-fit: contain;
          opacity: 0.8;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.55));
          transition: opacity 200ms ease;
        }
        @media (hover: hover) {
          .ds-marquee:hover { animation-play-state: paused; }
          .ds-logoImg:hover { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ds-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
