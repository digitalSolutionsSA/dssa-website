import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  // WhatsApp setup
  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      className="text-white/85 hover:text-digital-teal transition-colors text-sm font-medium tracking-wide"
    >
      {label}
    </a>
  );

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
        // match the “pill” look + spacing similar to your old Button
        "inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold",
        "bg-white hover:bg-white/90 transition-colors",
        // subtle depth to feel like the original
        "shadow-[0_10px_25px_rgba(0,0,0,0.25)]",
        className,
      ].join(" ")}
      aria-label="Get Started on WhatsApp"
    >
      <span
        className="bg-clip-text text-transparent"
        style={{
          // black -> deep-azure gradient for the text
          backgroundImage: "linear-gradient(90deg, #000000 0%, #051c2e 100%)",
        }}
      >
        Get Started
      </span>
    </a>
  );

  return (
    <nav
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-2 bg-digital-navy/90 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "py-4 bg-digital-navy/60 backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center select-none">
            <img
              src="/dssa-logo.png"
              alt="Digital Solutions SA"
              className="h-8 md:h-10 w-auto"
              draggable={false}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinkItem href="#services" label="Services" />
            <NavLinkItem href="#work" label="Our Work" />
            <NavLinkItem href="#about" label="About" />
            <a
              href="#contact"
              onClick={handleContactClick}
              className="text-white/85 hover:text-digital-teal transition-colors text-sm font-medium tracking-wide"
            >
              Contact
            </a>

            {/* Manual white button with gradient text */}
            <GetStartedButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 rounded-xl"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col items-center gap-6 py-6 bg-digital-navy/92 backdrop-blur-md rounded-2xl border border-white/10">
              <NavLinkItem href="#services" label="Services" />
              <NavLinkItem href="#work" label="Our Work" />
              <NavLinkItem href="#about" label="About" />
              <a
                href="#contact"
                onClick={handleContactClick}
                className="text-white/85 hover:text-digital-teal transition-colors text-sm font-medium tracking-wide"
              >
                Contact
              </a>

              {/* Manual white button with gradient text (mobile) */}
              <GetStartedButton
                className="px-6"
                onClick={() => closeMenu()}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
