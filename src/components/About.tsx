import React from "react";
import { MapPin, Users, Award, Globe, ShieldCheck, MonitorSmartphone, BarChartBig } from "lucide-react";

const BLUE = "#0512ce";
const BLUE_LIGHT = "#4d7fff";

const stats = [
  { num: "14+", label: "CLIENTS SERVED" },
  { num: "4", label: "CORE SERVICES" },
  { num: "100%", label: "SATISFACTION" },
];

const About = () => {
  return (
    <section
      id="about"
      className="ds-wall relative overflow-hidden py-20 md:py-28"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Top drip divider */}
      <div className="ds-drip-divider" />

      {/* Background spray */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "0",
          right: "-10%",
          width: "55%",
          height: "60%",
          background: `radial-gradient(ellipse at top right, ${BLUE}15 0%, transparent 55%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="ds-label-tag mb-6">ABOUT US</div>
          <h2
            className="font-stencil leading-none ds-spray-white ds-grunge-heading"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", letterSpacing: "0.04em" }}
          >
            WHO
            <br />
            <span className="ds-spray-blue">WE ARE.</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — text on the wall */}
          <div>
            <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-5">
              At Digital Solutions SA, we're passionate about leveraging technology
              to solve complex business challenges. We've been dedicated to providing
              innovative digital solutions that help businesses thrive in an increasingly
              connected world.
            </p>
            <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-10">
              Our team combines technical expertise with creative thinking to deliver
              tailored solutions that meet the unique needs of each client. We build
              things that actually work.
            </p>

            {/* Info tags */}
            <div className="space-y-4">
              {[
                { icon: <MapPin className="h-5 w-5" />, title: "LOCATION", text: "Three Rivers, Vereeniging, Gauteng" },
                { icon: <Users className="h-5 w-5" />, title: "TEAM", text: "Experienced Professionals" },
                { icon: <Award className="h-5 w-5" />, title: "STANDARD", text: "Quality Service Delivery" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                  style={{
                    borderLeft: `2px solid ${BLUE}`,
                    paddingLeft: "16px",
                  }}
                >
                  <div
                    style={{ color: BLUE_LIGHT }}
                    className="flex-shrink-0"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="font-stencil text-white"
                      style={{ fontSize: "0.85rem", letterSpacing: "0.12em" }}
                    >
                      {item.title}
                    </p>
                    <p className="text-white/50 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — spray-painted stats + service grid */}
          <div className="space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="relative text-center py-6 px-3"
                  style={{
                    background: "rgba(5,18,206,0.1)",
                    border: `1px solid rgba(5,18,206,0.3)`,
                    boxShadow: `0 0 20px rgba(5,18,206,0.08)`,
                  }}
                >
                  <p
                    className="font-stencil ds-spray-blue leading-none"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
                  >
                    {s.num}
                  </p>
                  <p
                    className="font-stencil text-white/50 mt-1"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Service grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Globe className="h-5 w-5" />, label: "Web Development" },
                { icon: <ShieldCheck className="h-5 w-5" />, label: "Brand & Design" },
                { icon: <MonitorSmartphone className="h-5 w-5" />, label: "App Development" },
                { icon: <BarChartBig className="h-5 w-5" />, label: "Digital Marketing" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="ds-card flex flex-col items-center justify-center text-center py-8 px-4"
                  style={{ borderRadius: 0 }}
                >
                  <div className="ds-icon-badge mb-3">
                    {React.cloneElement(item.icon as React.ReactElement, { className: "h-5 w-5" })}
                  </div>
                  <span
                    className="font-stencil text-white/80 text-sm tracking-wider"
                    style={{ letterSpacing: "0.06em" }}
                  >
                    {item.label.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom tag */}
            <div
              className="p-5 text-center"
              style={{
                background: `linear-gradient(90deg, ${BLUE} 0%, ${BLUE_LIGHT} 100%)`,
                boxShadow: `0 0 30px rgba(5,18,206,0.35)`,
              }}
            >
              <p className="font-stencil text-white tracking-wider" style={{ fontSize: "0.9rem", letterSpacing: "0.1em" }}>
                TRANSFORMING BUSINESSES THROUGH TECHNOLOGY
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
