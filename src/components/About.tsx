import React from "react";
import {
  MapPin,
  Users,
  Award,
  Globe,
  ShieldCheck,
  MonitorSmartphone,
  BarChartBig,
} from "lucide-react";

const COLORS = {
  blue: "#0512ce",
  blueLight: "#4d7fff",
  dark: "#030822",
};

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 bg-black"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Thin gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${COLORS.blue} 0%, ${COLORS.blueLight} 100%)`,
          opacity: 0.95,
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${COLORS.blueLight} 0%, transparent 60%)`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            {/* About pill */}
            <span
              className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold text-white border border-white/10"
              style={{ background: `${COLORS.blue}33` }}
            >
              About Us
            </span>

            <h2
              className="font-display tracking-wide leading-none text-white mb-6 ds-grunge-heading"
              style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
            >
              <span className="block">DIGITAL SOLUTIONS</span>
              <span className="block" style={{ color: COLORS.blueLight }}>
                FOR TOMORROW
              </span>
            </h2>

            <p className="text-white/70 mb-6">
              At Digital Solutions SA, we're passionate about leveraging
              technology to solve complex business challenges. Since our
              inception, we've been dedicated to providing innovative digital
              solutions that help businesses thrive in an increasingly connected
              world.
            </p>

            <p className="text-white/70 mb-8">
              Our team of experts combines technical expertise with creative
              thinking to deliver tailored solutions that meet the unique needs
              of each client.
            </p>

            {/* Info row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <MapPin className="h-5 w-5 text-white" />,
                  title: "Location",
                  text: "Three Rivers, Vereeniging, Gauteng",
                },
                {
                  icon: <Users className="h-5 w-5 text-white" />,
                  title: "Team",
                  text: "Experienced Professionals",
                },
                {
                  icon: <Award className="h-5 w-5 text-white" />,
                  title: "Excellence",
                  text: "Quality Service Delivery",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className="mr-4 p-3 rounded-full border border-white/10"
                    style={{ background: `${COLORS.blue}55` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-white/60">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div
              className="rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 45%, rgba(0,0,0,0.20) 100%)",
                boxShadow: "0 20px 70px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Globe />, label: "Web Development" },
                    { icon: <ShieldCheck />, label: "Brand & Design" },
                    { icon: <MonitorSmartphone />, label: "App Development" },
                    { icon: <BarChartBig />, label: "Digital Marketing" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center h-40"
                    >
                      <div
                        className="mb-3 w-12 h-12 flex items-center justify-center rounded-full border border-white/10"
                        style={{ background: `${COLORS.blue}55` }}
                      >
                        {React.cloneElement(item.icon, {
                          className: "h-6 w-6 text-white",
                        })}
                      </div>
                      <span className="text-sm font-medium text-white/80">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div
                  className="mt-4 p-4 rounded-lg text-center text-white font-semibold"
                  style={{
                    background: `linear-gradient(90deg, ${COLORS.blue} 0%, ${COLORS.blueLight} 100%)`,
                  }}
                >
                  Transforming businesses through technology
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
