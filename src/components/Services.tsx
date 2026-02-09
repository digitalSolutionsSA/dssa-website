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

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  detailedFeatures: string[];
};

const Services = () => {
  // Brand palette (same as Hero)
  const COLORS = {
    bgA: "#000000",
    bgB: "#061B2D",
    ink: "#071627",
    cyan: "#2BC7D6",
    cyan2: "#6FE9F3",
  };

  const serviceData: Service[] = [
    {
      title: "Web Development",
      description:
        "Custom, responsive websites and web applications built for speed, clarity, and conversion.",
      icon: <Globe className="h-10 w-10" />,
      features: [
        "Responsive design for all devices",
        "Custom CMS solutions",
        "E-commerce integration",
        "Progressive Web Apps (PWA)",
      ],
      detailedFeatures: [
        "Custom website design and development",
        "E-commerce platforms with payment gateway integration",
        "Web application development",
        "Content Management Systems (WordPress, headless CMS, etc.)",
        "Progressive Web Apps (PWA)",
        "Website maintenance and support",
        "Performance optimization",
        "SEO-friendly development practices",
      ],
    },
    {
      title: "Brand & Design",
      description:
        "Visual identity and brand systems that make your business instantly recognizable and hard to ignore.",
      icon: <ShieldCheck className="h-10 w-10" />,
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
        "Marketing collateral (ads, banners, social media)",
        "Print design (business cards, signage, packaging)",
        "Brand guidelines and consistency systems",
        "Rebranding and brand refresh projects",
      ],
    },
    {
      title: "App Development",
      description:
        "Modern mobile and web apps designed for performance, usability, and real-world business needs.",
      icon: <MonitorSmartphone className="h-10 w-10" />,
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
      title: "Digital Marketing",
      description:
        "Marketing that’s measured, optimized, and built to grow your pipeline, not your stress levels.",
      icon: <BarChartBig className="h-10 w-10" />,
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openServiceDialog = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const openWhatsApp = () => {
    const phoneNumber = "+27639034514";
    const message = `Hi, I'm interested in learning more about ${selectedService?.title} services.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 md:py-24 bg-black"
      style={{
        // GPU stability (reduces shimmer/aliasing on scroll)
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Thin gradient divider between Hero and Services (matches navbar gradient) */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.cyan2} 100%)`,
          opacity: 0.95,
        }}
      />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[620px] w-[620px] rounded-full blur-3xl opacity-25"
        style={{
          background: `radial-gradient(circle at center, ${COLORS.cyan2} 0%, transparent 60%)`,
          transform: "translateZ(0)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[720px] w-[720px] rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${COLORS.cyan} 0%, transparent 55%)`,
          transform: "translateZ(0)",
        }}
      />

      {/* Subtle grid (larger + calmer to avoid moire flicker) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          transform: "translateZ(0)",
        }}
      />

      {/* Soft vignette to replace harsh mask/grain combos */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.07) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.9) 100%)",
          opacity: 0.55,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Removed "Our Expertise" pill */}

          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            SERVICES BUILT FOR{" "}
            <span
              style={{
                color: COLORS.cyan,
                textShadow: "0 0 26px rgba(43,199,214,0.35)",
              }}
            >
              REAL GROWTH
            </span>
            .
          </h2>

          <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl mx-auto">
            Clean builds, sharp design, and reliable systems that move your business
            forward. Pick a service to see what’s included.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {serviceData.map((service, index) => (
            <div
              key={index}
              id={service.title.toLowerCase().replace(/\s+/g, "-")}
              className={[
                "group relative rounded-2xl border border-white/10 p-6 md:p-7 overflow-hidden",
                // IMPORTANT: no backdrop-blur here (it’s a shimmer magnet)
                "bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_45%,rgba(0,0,0,0.20)_100%)]",
              ].join(" ")}
              style={{
                boxShadow:
                  "0 20px 70px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.04)",
                transform: "translateZ(0)",
              }}
            >
              {/* Card glow accent */}
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${COLORS.cyan2} 0%, transparent 60%)`,
                  transform: "translateZ(0)",
                }}
              />

              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="flex items-center justify-between">
                  <div
                    className="inline-flex items-center justify-center rounded-2xl p-3 border border-white/10 bg-black/25"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 24px rgba(43,199,214,0.08)",
                    }}
                  >
                    <span
                      className="text-white"
                      style={{
                        color: COLORS.cyan,
                        filter: "drop-shadow(0 0 10px rgba(43,199,214,0.25))",
                      }}
                    >
                      {service.icon}
                    </span>
                  </div>

                  <div
                    className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
                    title="More"
                  >
                    <ChevronRight className="h-4 w-4 text-white/80" />
                  </div>
                </div>

                <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm md:text-base text-white/70">
                  {service.description}
                </p>

                <div className="mt-5 flex-grow">
                  <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle2
                          className="h-5 w-5 flex-shrink-0 mt-0.5"
                          style={{ color: COLORS.cyan }}
                        />
                        <span className="text-sm text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <Button
                    onClick={() => openServiceDialog(service)}
                    className="w-full text-white"
                    style={{
                      background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.cyan2} 100%)`,
                    }}
                  >
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-3xl text-white border-white/10"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(6,27,45,0.92) 60%, rgba(7,22,39,0.92) 100%)`,
            boxShadow: "0 30px 120px rgba(0,0,0,0.75)",
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3 text-white">
              <span
                className="inline-flex items-center justify-center rounded-xl p-2 border border-white/10 bg-white/5"
                style={{
                  boxShadow: "0 0 26px rgba(43,199,214,0.15)",
                }}
              >
                {selectedService?.icon &&
                  React.cloneElement(selectedService.icon as React.ReactElement, {
                    className: "h-5 w-5",
                    style: { color: COLORS.cyan },
                  })}
              </span>
              {selectedService?.title}
            </DialogTitle>

            <DialogDescription className="text-white/70 mt-2">
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <h4
              className="font-semibold text-lg mb-3"
              style={{ color: COLORS.cyan }}
            >
              What’s included:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedService?.detailedFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: COLORS.cyan }}
                  />
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5">
              <h4 className="font-semibold text-lg flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5" style={{ color: COLORS.cyan }} />
                Ready to chat about {selectedService?.title}?
              </h4>
              <p className="text-white/70 mb-4">
                Send us a quick message and we’ll help you pick the best approach.
              </p>

              <Button
                onClick={openWhatsApp}
                className="w-full text-white"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.cyan2} 100%)`,
                }}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="text-sm text-white/50">
              Digital Solutions SA • {selectedService?.title}
            </span>

            <Button
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => setDialogOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
