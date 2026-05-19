import React, { useState } from "react";
import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";
import ContactSuccess from "./contact/ContactSuccess";

const BLUE = "#0512ce";
const BLUE_LIGHT = "#4d7fff";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="ds-wall relative overflow-hidden py-20 md:py-28"
    >
      {/* Top drip divider */}
      <div className="ds-drip-divider" />

      {/* Background spray */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "50%",
          height: "65%",
          background: `radial-gradient(ellipse at bottom left, ${BLUE}18 0%, transparent 55%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-5%",
          right: "-5%",
          width: "40%",
          height: "50%",
          background: `radial-gradient(ellipse at top right, ${BLUE_LIGHT}10 0%, transparent 55%)`,
          filter: "blur(50px)",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="ds-label-tag mb-6">CONTACT</div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6">
            <h2
              className="font-stencil leading-none ds-spray-white ds-grunge-heading"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", letterSpacing: "0.04em" }}
            >
              HIT
              <br />
              <span className="ds-spray-blue">US UP.</span>
            </h2>
            <p
              className="font-marker text-white/45 pb-2 sm:pb-4"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
            >
              let's build something together.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl">
          <div className="lg:col-span-2 space-y-4">
            <ContactInfo />
          </div>

          <div className="lg:col-span-3">
            <div
              style={{
                background: "rgba(13,13,13,0.9)",
                border: `1px solid rgba(5,18,206,0.3)`,
                boxShadow: `0 0 0 1px rgba(5,18,206,0.08), 0 20px 70px rgba(0,0,0,0.55)`,
                padding: "2rem",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="font-stencil text-white tracking-wider"
                  style={{ fontSize: "1.3rem", letterSpacing: "0.1em" }}
                >
                  SEND A MESSAGE
                </h3>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})`,
                    boxShadow: `0 0 16px rgba(5,18,206,0.4)`,
                    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
                  }}
                />
              </div>

              {isSubmitted ? (
                <ContactSuccess />
              ) : (
                <ContactForm onSuccess={handleSubmitSuccess} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
