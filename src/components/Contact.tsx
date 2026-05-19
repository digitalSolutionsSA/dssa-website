import React, { useState } from "react";
import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";
import ContactSuccess from "./contact/ContactSuccess";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    // After 3 seconds, reset the submitted state
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // Brand gradient + accent (match Hero/Services)
  const BG_GRADIENT =
    "linear-gradient(135deg, #000000 0%, #061B2D 60%, #071627 100%)";
  const ACCENT_GRADIENT = "linear-gradient(90deg, #2BC7D6 0%, #6FE9F3 100%)";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20"
      style={{ background: BG_GRADIENT }}
    >
      {/* subtle glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[620px] w-[620px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(111,233,243,0.55) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[720px] w-[720px] rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle at center, rgba(43,199,214,0.45) 0%, transparent 55%)",
        }}
      />

      {/* grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:3px_3px]" />

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          {/* badge removed */}

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Get In{" "}
            <span
              style={{
                background: ACCENT_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Touch
            </span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Ready to transform your digital presence? Contact us today and let's
            discuss how we can help your business grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <ContactInfo />
          </div>

          <div className="lg:col-span-3">
            {/* Match ContactInfo card (no blur, no stripe) */}
            <div
              className="p-8 rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background: "rgba(7, 22, 39, 0.88)",
                boxShadow:
                  "0 20px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Send us a message
                </h3>

                {/* tiny accent square */}
                <span
                  className="h-9 w-9 rounded-xl border border-white/10"
                  style={{
                    background: ACCENT_GRADIENT,
                    boxShadow: "0 0 22px rgba(43,199,214,0.25)",
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
