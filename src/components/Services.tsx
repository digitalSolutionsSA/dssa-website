import React, { useState } from "react";
import {
  Globe,
  ShieldCheck,
  MonitorSmartphone,
  BarChartBig,
  ChevronRight,
  CheckCircle2,
  X,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const BLUE = "#0512ce";
const BLUE_LIGHT = "#4d7fff";

type Service = {
  num: string;
  title: string;
  fullTitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  detailedFeatures: string[];
};

const serviceData: Service[] = [
  {
    num: "01",
    title: "WEB DEV",
    fullTitle: "Web Development",
    description:
      "Custom, responsive websites and web applications built for speed, clarity, and conversion.",
    icon: <Globe className="h-7 w-7" />,
    features: [
      "Responsive design for all devices",
      "Custom CMS solutions",
      "E-commerce integration",
      "Progressive Web Apps (PWA)",
    ],
    detailedFeatures: [
      "Custom website design and development",
      "E-commerce with payment gateway integration",
      "Web application development",
      "Content Management Systems",
      "Progressive Web Apps (PWA)",
      "Website maintenance and support",
      "Performance optimization",
      "SEO-friendly development practices",
    ],
  },
  {
    num: "02",
    title: "BRAND",
    fullTitle: "Brand & Design",
    description:
      "Visual identity and brand systems that make your business instantly recognizable and hard to ignore.",
    icon: <ShieldCheck className="h-7 w-7" />,
    features: [
      "Brand identity design",
      "Logo & visual systems",
      "UI / UX design",
      "Marketing & print assets",
    ],
    detailedFeatures: [
      "Brand strategy and positioning",
      "Logo design and brand identity systems",
      "UI and UX design for web and apps",
      "Marketing collateral (ads, banners, social)",
      "Print design (business cards, signage)",
      "Brand guidelines and consistency systems",
      "Rebranding and brand refresh projects",
    ],
  },
  {
    num: "03",
    title: "APP DEV",
    fullTitle: "App Development",
    description:
      "Modern mobile and web apps designed for performance, usability, and real-world business needs.",
    icon: <MonitorSmartphone className="h-7 w-7" />,
    features: [
      "Mobile & web applications",
      "Custom business logic",
      "API & backend integration",
      "Scalable architecture",
    ],
    detailedFeatures: [
      "Custom mobile app development",
      "Web app and SaaS platforms",
      "Backend APIs and integrations",
      "Authentication and user systems",
      "Database design and optimization",
      "Cloud deployment and scaling",
      "Ongoing maintenance and updates",
    ],
  },
  {
    num: "04",
    title: "MARKETING",
    fullTitle: "Digital Marketing",
    description:
      "Marketing that's measured, optimized, and built to grow your pipeline — not your stress.",
    icon: <BarChartBig className="h-7 w-7" />,
    features: [
      "SEO strategy development",
      "Social media management",
      "PPC advertising campaigns",
      "Analytics & performance reporting",
    ],
    detailedFeatures: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click (PPC) advertising",
      "Social media marketing and management",
      "Content marketing strategy",
      "Email marketing campaigns",
      "Analytics and performance reporting",
      "Conversion rate optimization",
      "Brand growth strategy",
    ],
  },
];

const Services = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);

  const openServiceDialog = (service: Service) => {
    setSelected(service);
    setDialogOpen(true);
  };

  const openWhatsApp = () => {
    const phoneNumber = "+27639034514";
    const msg = `Hi, I'm interested in learning more about ${selected?.fullTitle} services.`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="services"
      className="ds-wall relative overflow-hidden py-20 md:py-28"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Top paint drip divider */}
      <div className="ds-drip-divider" />

      {/* Background spray glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-10%",
          left: "-5%",
          width: "50%",
          height: "60%",
          background: `radial-gradient(ellipse at top left, ${BLUE}18 0%, transparent 55%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-5%",
          right: "-5%",
          width: "45%",
          height: "55%",
          background: `radial-gradient(ellipse at bottom right, ${BLUE_LIGHT}10 0%, transparent 55%)`,
          filter: "blur(50px)",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <div className="ds-label-tag mb-6">OUR SERVICES</div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6">
            <h2
              className="font-stencil leading-none ds-spray-white ds-grunge-heading"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", letterSpacing: "0.04em" }}
            >
              WHAT
              <br />
              <span className="ds-spray-blue">WE DO.</span>
            </h2>
            <p
              className="font-marker text-white/45 pb-2 sm:pb-4"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}
            >
              pick a service — see what's inside.
            </p>
          </div>
        </div>

        {/* 2×2 service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {serviceData.map((service) => (
            <div
              key={service.num}
              className="ds-card group cursor-pointer"
              style={{ borderRadius: 0 }}
              onClick={() => openServiceDialog(service)}
            >
              {/* Number watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-4 right-5 font-stencil text-white/[0.06] leading-none select-none"
                style={{ fontSize: "6rem" }}
              >
                {service.num}
              </span>

              {/* Hover spray glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at top left, ${BLUE}14 0%, transparent 55%)`,
                }}
              />

              <div className="relative z-10 p-7 md:p-9">
                {/* Icon + tag line */}
                <div className="flex items-start justify-between mb-5">
                  <div className="ds-icon-badge">{service.icon}</div>
                  <span
                    className="font-marker text-white/30 text-sm"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    #{service.num}
                  </span>
                </div>

                <h3
                  className="font-stencil text-white leading-none mb-3"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", letterSpacing: "0.05em" }}
                >
                  {service.title}
                </h3>

                <p className="text-white/55 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-7">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/65">
                      <span
                        className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: BLUE_LIGHT, boxShadow: `0 0 6px ${BLUE_LIGHT}` }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="ds-btn-stencil w-full" style={{ fontSize: "0.8rem", padding: "10px 0" }}>
                  SEE FULL SERVICE <ChevronRight className="inline h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service detail dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-2xl border-0 text-white"
          style={{
            background: "#0d0d0d",
            boxShadow: `0 0 0 1px rgba(5,18,206,0.4), 0 30px 100px rgba(0,0,0,0.8), 0 0 60px rgba(5,18,206,0.1)`,
            borderRadius: 0,
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-stencil text-white flex items-center gap-3" style={{ fontSize: "1.8rem", letterSpacing: "0.05em" }}>
              <div className="ds-icon-badge">{selected?.icon}</div>
              {selected?.fullTitle?.toUpperCase()}
            </DialogTitle>
            <DialogDescription className="text-white/55 font-inter">
              {selected?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <p
              className="font-marker mb-4"
              style={{ color: BLUE_LIGHT, fontSize: "1.1rem" }}
            >
              what's included:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selected?.detailedFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-4 w-4 flex-shrink-0 mt-0.5"
                    style={{ color: BLUE_LIGHT }}
                  />
                  <span className="text-sm text-white/70">{f}</span>
                </div>
              ))}
            </div>

            <div
              className="mt-8 p-5"
              style={{
                border: `1px solid rgba(5,18,206,0.3)`,
                background: `rgba(5,18,206,0.08)`,
              }}
            >
              <p className="font-stencil text-white text-lg mb-1 tracking-wider">
                READY TO TALK?
              </p>
              <p className="text-white/55 text-sm mb-4">
                Send us a quick message and we'll help you get started.
              </p>
              <button onClick={openWhatsApp} className="ds-btn-spray w-full" style={{ padding: "12px 0" }}>
                <MessageSquare className="inline mr-2 h-4 w-4" />
                WHATSAPP US
              </button>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2">
            <span className="font-marker text-white/30 text-sm">
              Digital Solutions SA
            </span>
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/5"
              onClick={() => setDialogOpen(false)}
            >
              <X className="mr-2 h-4 w-4" /> CLOSE
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
