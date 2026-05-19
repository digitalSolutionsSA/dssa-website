import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const BLUE = "#0512ce";
const BLUE_LIGHT = "#4d7fff";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10,10,10,0.95)"
            : "rgba(10,10,10,0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? `1px solid rgba(5,18,206,0.3)`
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled
            ? `0 4px 30px rgba(5,18,206,0.12)`
            : "none",
        }}
      >
        {/* Spray paint accent line at very top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${BLUE} 30%, ${BLUE_LIGHT} 60%, transparent 100%)`,
            opacity: scrolled ? 1 : 0.5,
            transition: "opacity 300ms ease",
          }}
        />

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <a href="/" className="relative flex items-center h-full select-none">
              <img
                src="/dssa-logo.png"
                alt="Digital Solutions SA"
                draggable={false}
                className="pointer-events-none select-none"
                style={{
                  height: "46px",
                  width: "auto",
                  filter: "drop-shadow(0 0 12px rgba(5,18,206,0.3))",
                }}
              />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {["#services", "#about"].map((href) => (
                <a
                  key={href}
                  href={href}
                  className="font-stencil text-sm text-white/70 tracking-widest hover:text-white transition-colors"
                  style={{ letterSpacing: "0.15em" }}
                >
                  {href.replace("#", "").toUpperCase()}
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleContactClick}
                className="font-stencil text-sm text-white/70 tracking-widest hover:text-white transition-colors"
                style={{ letterSpacing: "0.15em" }}
              >
                CONTACT
              </a>

              {/* CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn-spray"
                style={{ padding: "9px 22px", fontSize: "0.8rem" }}
              >
                GET STARTED
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div
              className="md:hidden pb-6"
              style={{
                borderTop: "1px solid rgba(5,18,206,0.2)",
              }}
            >
              <div className="flex flex-col items-center gap-6 pt-6">
                {[
                  { href: "#services", label: "SERVICES" },
                  { href: "#about", label: "ABOUT" },
                ].map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="font-stencil text-sm text-white/70 tracking-widest hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={handleContactClick}
                  className="font-stencil text-sm text-white/70 tracking-widest hover:text-white transition-colors"
                >
                  CONTACT
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-btn-spray"
                  style={{ padding: "10px 28px", fontSize: "0.85rem" }}
                  onClick={closeMenu}
                >
                  GET STARTED
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
