import React from "react";
import { MessageSquarePlus } from "lucide-react";

/**
 * Floating WhatsApp button in the site's pink → cyan signal colours. It springs in, then keeps
 * attracting the eye: a spinning colour ring, sonar pulses, and every few seconds a nudge with a
 * light sweep and a "Let's chat" tag. Everything animates transform/opacity only, so the GPU does
 * the work and the page never repaints for it.
 */
const FloatingWhatsApp = () => {
  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Contact us on WhatsApp"
        className="wa-btn fixed bottom-6 right-6 z-[9999] md:bottom-8 md:right-8"
      >
        <span className="wa-glow" aria-hidden />
        <span className="wa-sonar" aria-hidden />
        <span className="wa-sonar wa-sonar--late" aria-hidden />
        <span className="wa-tag" aria-hidden>
          Let's chat
        </span>

        <span className="wa-body" aria-hidden>
          <span className="wa-ring" />
          <span className="wa-core">
            <span className="wa-sheen" />
            <MessageSquarePlus className="wa-icon" strokeWidth={2.2} />
          </span>
        </span>
      </button>

      <style>{`
        .wa-btn {
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: wa-in 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }
        .wa-btn:hover { transform: scale(1.12); }
        .wa-btn:active { transform: scale(0.94); }

        .wa-btn > *,
        .wa-body > * {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }

        .wa-glow {
          inset: -70%;
          background:
            radial-gradient(closest-side at 35% 40%, rgb(255 102 196 / 0.6), transparent),
            radial-gradient(closest-side at 65% 60%, rgb(1 255 255 / 0.5), transparent);
          animation: wa-glow 2.4s ease-in-out infinite;
        }

        .wa-sonar {
          inset: 0;
          opacity: 0;
          border: 2px solid #ff66c4;
          animation: wa-sonar 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .wa-sonar--late {
          border-color: #01ffff;
          animation-delay: 1.3s;
        }

        .wa-body {
          position: absolute;
          inset: 0;
          animation: wa-nudge 6s ease-in-out infinite;
        }

        .wa-ring {
          inset: -3px;
          background: conic-gradient(#ff66c4, #01ffff, #ffffff, #ff66c4, #01ffff, #ff66c4);
          animation: wa-spin 2.2s linear infinite;
        }

        .wa-core {
          inset: 0;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: linear-gradient(135deg, #ff66c4 0%, #01ffff 100%);
        }

        .wa-sheen {
          position: absolute;
          top: -20%;
          bottom: -20%;
          left: 0;
          width: 45%;
          background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.85), transparent);
          transform: translateX(-180%) skewX(-20deg);
          animation: wa-sheen 6s ease-in-out infinite;
        }

        .wa-icon {
          position: relative;
          width: 26px;
          height: 26px;
          color: #fff;
          animation: wa-wiggle 6s ease-in-out infinite;
        }

        .wa-tag {
          top: 50%;
          right: calc(100% + 16px);
          margin-top: -15px;
          height: 30px;
          padding: 0 14px;
          line-height: 30px;
          white-space: nowrap;
          color: #000;
          background: linear-gradient(95deg, #ff66c4, #01ffff);
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          transform-origin: right center;
          animation: wa-tag 12s cubic-bezier(0.16, 1, 0.3, 1) 2s infinite;
        }
        .wa-btn:hover .wa-tag {
          animation: none;
          opacity: 1;
          transform: none;
        }

        @media (min-width: 768px) {
          .wa-btn { width: 64px; height: 64px; }
          .wa-icon { width: 30px; height: 30px; }
        }

        @keyframes wa-in {
          from { opacity: 0; transform: scale(0) rotate(-180deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes wa-glow {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50%      { opacity: 1;    transform: scale(1.1); }
        }
        @keyframes wa-sonar {
          0%   { opacity: 0.9; transform: scale(1); }
          100% { opacity: 0;   transform: scale(2.3); }
        }
        @keyframes wa-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes wa-nudge {
          0%, 70%, 100% { transform: scale(1) rotate(0deg); }
          74% { transform: scale(1.2) rotate(-12deg); }
          78% { transform: scale(1.2) rotate(10deg); }
          82% { transform: scale(1.16) rotate(-7deg); }
          86% { transform: scale(1.1) rotate(4deg); }
          92% { transform: scale(0.96) rotate(0deg); }
        }
        @keyframes wa-sheen {
          0%, 72%  { transform: translateX(-180%) skewX(-20deg); }
          92%, 100% { transform: translateX(300%) skewX(-20deg); }
        }
        @keyframes wa-wiggle {
          0%, 70%, 100% { transform: scale(1); }
          76% { transform: scale(1.18); }
          88% { transform: scale(0.95); }
        }
        @keyframes wa-tag {
          0%, 42%, 100% { opacity: 0; transform: translateX(14px) scale(0.8); }
          4%, 36%       { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wa-btn, .wa-glow, .wa-sonar, .wa-body, .wa-ring, .wa-sheen, .wa-icon, .wa-tag {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;
