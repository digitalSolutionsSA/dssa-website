import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactInfo = () => {
  const ACCENT_GRADIENT = "linear-gradient(90deg, #2BC7D6 0%, #6FE9F3 100%)";

  return (
    <div
      className="rounded-2xl p-6 border border-white/10 overflow-hidden"
      style={{
        // IMPORTANT: remove backdrop-filter to kill the stripe artifact
        background: "rgba(7, 22, 39, 0.88)", // deep-azure "glass" without blur
        boxShadow:
          "0 20px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <h3 className="text-lg font-bold text-white mb-6">
        Contact Information
      </h3>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-full"
            style={{
              background: ACCENT_GRADIENT,
              boxShadow: "0 0 18px rgba(43,199,214,0.22)",
            }}
          >
            <Phone className="h-5 w-5 text-black" />
          </div>
          <div>
            <p className="text-sm text-white/60">Phone</p>
            <p className="text-white font-medium">+27 63 903 4514</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-full"
            style={{
              background: ACCENT_GRADIENT,
              boxShadow: "0 0 18px rgba(43,199,214,0.22)",
            }}
          >
            <Mail className="h-5 w-5 text-black" />
          </div>
          <div>
            <p className="text-sm text-white/60">Email</p>
            <p className="text-white font-medium">
              info@digitalsolutionssa.co.za
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-full"
            style={{
              background: ACCENT_GRADIENT,
              boxShadow: "0 0 18px rgba(43,199,214,0.22)",
            }}
          >
            <MapPin className="h-5 w-5 text-black" />
          </div>
          <div>
            <p className="text-sm text-white/60">Address</p>
            <p className="text-white font-medium">
              41 Spey Street
              <br />
              Three Rivers, Vereeniging
              <br />
              Gauteng, South Africa
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl overflow-hidden border border-white/10 bg-black">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=41%20Spey%20Street%20Three%20Rivers&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="block w-full h-48"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactInfo;
