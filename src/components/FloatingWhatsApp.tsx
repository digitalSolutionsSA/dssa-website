import React from "react";
import { MessageSquarePlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingWhatsApp = () => {
  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const isMobile = useIsMobile();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Contact us on WhatsApp"
        className={`fixed ${
          isMobile ? "bottom-6 right-6 p-3" : "bottom-8 right-8 p-4"
        } z-[9999] rounded-full flex items-center justify-center ds-flicker-strong`}
        style={{
          background: "#ffffff",
          boxShadow:
            "0 0 14px rgba(255,255,255,0.55), 0 0 36px rgba(255,255,255,0.45)",
        }}
      >
        <MessageSquarePlus
          size={isMobile ? 24 : 28}
          style={{ color: "#061B2D" }}
        />
      </button>

      <style>{`
        @keyframes ds-flicker-strong {
          0%   { opacity: 1;   filter: drop-shadow(0 0 6px rgba(255,255,255,.35)); }
          8%   { opacity: .75; filter: drop-shadow(0 0 24px rgba(255,255,255,.75)); }
          16%  { opacity: 1;   filter: drop-shadow(0 0 14px rgba(255,255,255,.45)); }
          24%  { opacity: .7;  filter: drop-shadow(0 0 32px rgba(255,255,255,.85)); }
          32%  { opacity: 1;   filter: drop-shadow(0 0 18px rgba(255,255,255,.55)); }
          40%  { opacity: .8;  filter: drop-shadow(0 0 28px rgba(255,255,255,.75)); }
          48%  { opacity: 1;   filter: drop-shadow(0 0 22px rgba(255,255,255,.6)); }
          56%  { opacity: .75; filter: drop-shadow(0 0 34px rgba(255,255,255,.9)); }
          64%  { opacity: 1;   filter: drop-shadow(0 0 18px rgba(255,255,255,.55)); }
          72%  { opacity: .85; filter: drop-shadow(0 0 26px rgba(255,255,255,.7)); }
          80%  { opacity: 1;   filter: drop-shadow(0 0 20px rgba(255,255,255,.6)); }
          100% { opacity: 1;   filter: drop-shadow(0 0 12px rgba(255,255,255,.4)); }
        }

        .ds-flicker-strong {
          animation: ds-flicker-strong 1.6s infinite;
          will-change: opacity, filter;
        }

        @media (prefers-reduced-motion: reduce) {
          .ds-flicker-strong {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;
