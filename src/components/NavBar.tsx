import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // WhatsApp setup
  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const closeMenu = () => setIsMenuOpen(false);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const isHomepage = location.pathname === "/";
    const contactSection = document.getElementById("contact");

    if (isHomepage && contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    } else {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  const NavLinkItem = ({
    href,
    label,
    onClick,
  }: {
    href: string;
    label: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) onClick(e);
        else closeMenu();
      }}
      className="ds-nav-ink text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
    >
      {label}
    </a>
  );

  // Glass CTA so gradient flows underneath
  const GetStartedButton = ({
    className = "",
    onClick,
  }: {
    className?: string;
    onClick?: () => void;
  }) => (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onClick?.()}
      className={[
        "inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold",
        "border border-white/20 bg-white/10 backdrop-blur-md",
        "transition-all hover:bg-white/15",
        "shadow-[0_10px_25px_rgba(0,0,0,0.25)]",
        "ds-nav-ink",
        className,
      ].join(" ")}
      aria-label="Get Started on WhatsApp"
    >
      Get Started
    </a>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10">
        {/* Seamless flowing gradient */}
        <div className="ds-nav-wrap">
          <div className="ds-nav-conveyor" aria-hidden="true">
            <div className="ds-nav-strip" />
            <div className="ds-nav-strip" />
          </div>

          {/* readability tint */}
          <div className="ds-nav-tint" aria-hidden="true" />

          <div className="relative container mx-auto px-4 md:px-6">
            {/* LOCKED HEIGHT */}
            <div className="flex justify-between items-center h-[72px]">
              {/* LOGO (bigger, no layout impact) */}
              <a href="/" className="relative h-full flex items-center select-none">
                <img
  src="/dssa-logo.png"
  alt="Digital Solutions SA"
  draggable={false}
  className="
    h-[48px] md:h-[56px] w-auto
    -translate-y-[1px]
    drop-shadow-[0_6px_16px_rgba(0,0,0,0.40)]
    pointer-events-none
    select-none
  "
/>

              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <NavLinkItem href="#services" label="Services" />
                <NavLinkItem href="#about" label="About" />
                <a
                  href="#contact"
                  onClick={handleContactClick}
                  className="ds-nav-ink text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
                >
                  Contact
                </a>

                <GetStartedButton />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  className="ds-nav-ink hover:bg-white/10 rounded-xl"
                  onClick={() => setIsMenuOpen((v) => !v)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4">
                <div className="flex flex-col items-center gap-6 py-6 bg-black/70 backdrop-blur-md rounded-2xl border border-white/10">
                  <NavLinkItem href="#services" label="Services" />
                  <NavLinkItem href="#work" label="Our Work" />
                  <NavLinkItem href="#about" label="About" />
                  <a
                    href="#contact"
                    onClick={handleContactClick}
                    className="ds-nav-ink text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
                  >
                    Contact
                  </a>

                  <GetStartedButton className="px-6" onClick={closeMenu} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* LOCAL CSS */}
      <style>{`
        .ds-nav-wrap {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.45);
        }

        .ds-nav-conveyor {
          position: absolute;
          inset: 0;
          display: flex;
          width: 200%;
          animation: ds-conveyor 14s linear infinite;
          will-change: transform;
        }

        .ds-nav-strip {
          width: 50%;
          height: 100%;
          background-image: linear-gradient(
            90deg,
            #000000 0%,
            #061B2D 35%,
            #6FE9F3 60%,
            #ffffff 75%,
            #6FE9F3 88%,
            #061B2D 96%,
            #000000 100%
          );
        }

        @keyframes ds-conveyor {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ds-nav-tint {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.28) 0%,
            rgba(0,0,0,0.12) 55%,
            rgba(0,0,0,0.22) 100%
          );
        }

        /* AUTO INVERT TEXT */
        .ds-nav-ink {
          color: #ffffff;
          mix-blend-mode: difference;
        }

        @media (prefers-reduced-motion: reduce) {
          .ds-nav-conveyor { animation: none; }
        }
      `}</style>
    </>
  );
};

export default NavBar;
