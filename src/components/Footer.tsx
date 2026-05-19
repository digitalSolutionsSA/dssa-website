import React, { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import TermsOfService from "./legal/TermsOfService";
import CookiePolicy from "./legal/CookiePolicy";

const BLUE = "#0512ce";
const BLUE_LIGHT = "#4d7fff";

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.321 5.562a5.109 5.109 0 0 1-3.01-1.003 5.12 5.12 0 0 1-1.845-2.526h-2.91v13.03a2.792 2.792 0 1 1-2.79-2.793c.24 0 .475.03.703.083V9.21a5.71 5.71 0 0 0-.703-.043A5.903 5.903 0 0 0 .875 15.07a5.905 5.905 0 0 0 11.664 1.01c.015-.113.025-.228.032-.343V8.345a8.01 8.01 0 0 0 4.69 1.504V6.99c.683.34 1.45.53 2.26.53V5.562z" />
  </svg>
);

const Footer = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  const openServiceDialog = (serviceId: string) => {
    const serviceCard = document.querySelector(`#${serviceId}`);
    const btn = serviceCard?.querySelector("button");
    btn?.click();
  };

  return (
    <footer
      className="ds-wall relative overflow-hidden text-white"
      style={{ borderTop: `1px solid rgba(5,18,206,0.25)` }}
    >
      {/* Top drip divider */}
      <div className="ds-drip-divider" />

      {/* Background spray */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-20%",
          right: "-5%",
          width: "40%",
          height: "80%",
          background: `radial-gradient(ellipse at top right, ${BLUE}14 0%, transparent 55%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Big stencil tag in background */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute font-stencil text-white/[0.025] select-none hidden lg:block"
        style={{
          fontSize: "16rem",
          bottom: "-30px",
          right: "-20px",
          lineHeight: 1,
          letterSpacing: "0.05em",
        }}
      >
        DSSA
      </p>

      <div className="relative container mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <img
              src="/dssa-logo.png"
              alt="Digital Solutions SA Logo"
              className="mb-5 object-contain"
              style={{ height: "48px", filter: `drop-shadow(0 0 12px rgba(5,18,206,0.3))` }}
            />
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Empowering businesses through innovative digital solutions and
              cutting-edge technology.
            </p>
            <div className="flex gap-3">
              {[
                {
                  href: "https://www.facebook.com/profile.php?id=61574721767434",
                  label: "Facebook",
                  icon: <Facebook className="h-4 w-4" />,
                },
                {
                  href: "https://www.instagram.com/digitalsolutions.sa?igsh=MTBqa3I1ejk4ZnBzdg==",
                  label: "Instagram",
                  icon: <Instagram className="h-4 w-4" />,
                },
                {
                  href: "https://www.tiktok.com/@digitalsolutionssa?_r=1&_t=ZS-93kA254ZFmn",
                  label: "TikTok",
                  icon: <TikTokIcon className="h-4 w-4" />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    border: "1px solid rgba(5,18,206,0.3)",
                    background: "rgba(5,18,206,0.1)",
                    color: "#fff",
                    clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
                    transition: "background 200ms ease, box-shadow 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `rgba(5,18,206,0.3)`;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 14px rgba(5,18,206,0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(5,18,206,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3
              className="font-stencil text-white mb-5 tracking-wider"
              style={{ fontSize: "0.9rem", letterSpacing: "0.15em" }}
            >
              SERVICES
            </h3>
            <ul className="space-y-3">
              {[
                ["Web Development", "web-development"],
                ["Brand & Design", "brand-and-design"],
                ["App Development", "app-development"],
                ["Marketing", "digital-marketing"],
              ].map(([label, id]) => (
                <li key={id}>
                  <button
                    onClick={() => openServiceDialog(id)}
                    className="text-white/50 hover:text-white transition-colors text-sm text-left font-inter"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="font-stencil text-white mb-5 tracking-wider"
              style={{ fontSize: "0.9rem", letterSpacing: "0.15em" }}
            >
              COMPANY
            </h3>
            <ul className="space-y-3">
              {[
                ["About Us", "#about"],
                ["Contact", "#contact"],
                ["Support", "#"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-white/50 hover:text-white transition-colors text-sm font-inter">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="font-stencil text-white mb-5 tracking-wider"
              style={{ fontSize: "0.9rem", letterSpacing: "0.15em" }}
            >
              LEGAL
            </h3>
            <ul className="space-y-3">
              {[
                ["Terms of Service", () => setTermsOpen(true)],
                ["Privacy Policy", () => setPrivacyOpen(true)],
                ["Cookie Policy", () => setCookieOpen(true)],
              ].map(([label, fn]) => (
                <li key={label as string}>
                  <button
                    onClick={fn as () => void}
                    className="text-white/50 hover:text-white transition-colors text-sm font-inter text-left"
                  >
                    {label as string}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/30 text-xs font-inter">
            © {new Date().getFullYear()} Digital Solutions SA. All rights reserved.
          </p>
          <p className="font-marker text-white/25 text-sm" style={{ letterSpacing: "0.05em" }}>
            Three Rivers, Vereeniging, Gauteng
          </p>
        </div>
      </div>

      <PrivacyPolicy open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <TermsOfService open={termsOpen} onOpenChange={setTermsOpen} />
      <CookiePolicy open={cookieOpen} onOpenChange={setCookieOpen} />
    </footer>
  );
};

export default Footer;
