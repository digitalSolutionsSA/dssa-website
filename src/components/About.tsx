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

const GRADIENT = "linear-gradient(135deg, #000000 0%, #061B2D 100%)";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            {/* About pill */}
            <span
              className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ background: GRADIENT }}
            >
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black leading-tight">
  <span className="block">DIGITAL SOLUTIONS</span>
  <span
    className="block"
    style={{
      background: "linear-gradient(135deg, #000000 0%, #061B2D 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    FOR TOMORROW
  </span>
</h2>


            <p className="text-black/70 mb-6">
              At Digital Solutions SA, we're passionate about leveraging
              technology to solve complex business challenges. Since our
              inception, we've been dedicated to providing innovative digital
              solutions that help businesses thrive in an increasingly connected
              world.
            </p>

            <p className="text-black/70 mb-8">
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
                    className="mr-4 p-3 rounded-full"
                    style={{ background: GRADIENT }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{item.title}</h4>
                    <p className="text-sm text-black/60">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="rounded-2xl border border-black/10 bg-white shadow-xl">
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
                      className="p-4 rounded-lg border border-black/10 bg-black/5 flex flex-col items-center justify-center text-center h-40"
                    >
                      <div
                        className="mb-3 w-12 h-12 flex items-center justify-center rounded-full text-white"
                        style={{ background: GRADIENT }}
                      >
                        {React.cloneElement(item.icon, {
                          className: "h-6 w-6 text-white",
                        })}
                      </div>
                      <span className="text-sm font-medium text-black">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div
                  className="mt-4 p-4 rounded-lg text-center text-white"
                  style={{ background: GRADIENT }}
                >
                  <p className="font-medium">
                    Transforming businesses through technology
                  </p>
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
