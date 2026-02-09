import React, { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import TermsOfService from "./legal/TermsOfService";
import CookiePolicy from "./legal/CookiePolicy";

// Simple TikTok icon (no extra deps)
const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.321 5.562a5.109 5.109 0 0 1-3.01-1.003 5.12 5.12 0 0 1-1.845-2.526h-2.91v13.03a2.792 2.792 0 1 1-2.79-2.793c.24 0 .475.03.703.083V9.21a5.71 5.71 0 0 0-.703-.043A5.903 5.903 0 0 0 .875 15.07a5.905 5.905 0 0 0 11.664 1.01c.015-.113.025-.228.032-.343V8.345a8.01 8.01 0 0 0 4.69 1.504V6.99c.683.34 1.45.53 2.26.53V5.562z" />
  </svg>
);

const Footer = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  // Brand (match Hero/Services)
  const BG_GRADIENT =
    "linear-gradient(135deg, #000000 0%, #000000 65%, #061826 100%)";
  const ACCENT = "#2BC7D6";
  const ACCENT_GRADIENT = "linear-gradient(90deg, #2BC7D6 0%, #6FE9F3 100%)";

  const openServiceDialog = (serviceId: string) => {
    const serviceCard = document.querySelector(`#${serviceId}`);
    const learnMoreButton = serviceCard?.querySelector("button");
    learnMoreButton?.click();
  };

  const goToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = "/work";
  };

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ background: BG_GRADIENT }}
    >
      {/* subtle glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle at center, rgba(111,233,243,0.50) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(43,199,214,0.45) 0%, transparent 55%)",
        }}
      />

      {/* grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:3px_3px]" />

      <div className="relative container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <img
              src="/dssa-logo.png"
              alt="Digital Solutions SA Logo"
              className="h-12 mb-4 object-contain"
            />

            <p className="text-white/70 mb-4">
              Empowering businesses through innovative digital solutions and
              cutting-edge technology.
            </p>

            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=61574721767434"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>

              <a
                href="https://www.instagram.com/digitalsolutions.sa?igsh=MTBqa3I1ejk4ZnBzdg=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>

              <a
                href="https://www.tiktok.com/@digitalsolutionssa?_r=1&_t=ZS-93kA254ZFmn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="TikTok"
                title="TikTok"
              >
                <TikTokIcon className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
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
                    className="text-white/70 hover:text-white transition-colors text-left"
                    style={{ outlineColor: ACCENT }}
                  >
                    {label}
                  </button>
                </li>
              ))}

              <li className="pt-2">
                <button
                  onClick={goToWork}
                  className="text-left font-medium"
                  style={{
                    background: ACCENT_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                 
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-white/70 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setTermsOpen(true)}
                  className="text-white/70 hover:text-white"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="text-white/70 hover:text-white"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCookieOpen(true)}
                  className="text-white/70 hover:text-white"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Digital Solutions SA. All rights
            reserved.
          </p>
          <p className="mt-4 md:mt-0 text-white/50 text-sm">
            Three Rivers, Vereeniging, Gauteng, South Africa
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
