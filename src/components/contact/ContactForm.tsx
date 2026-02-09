import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type ServiceOption =
  | "Web Development"
  | "Brand & Design"
  | "App Development"
  | "Marketing"
  | "General Enquiry";

const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const ACCENT_GRADIENT = "linear-gradient(90deg, #2BC7D6 0%, #6FE9F3 100%)";
  const ACCENT = "#2BC7D6";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [service, setService] = useState<ServiceOption>("Web Development");
  const [generalEnquiry, setGeneralEnquiry] = useState("");

  const [message, setMessage] = useState("");

  const inputBase =
    "w-full rounded-md bg-black/30 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:ring-2";

  const focusHandlers = {
    onFocus: (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      e.currentTarget.style.borderColor = ACCENT;
    },
    onBlur: (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
    },
  };

  const getServiceLine = () => {
    return service === "General Enquiry"
      ? `General Enquiry${generalEnquiry ? `: ${generalEnquiry}` : ""}`
      : service;
  };

  const buildWhatsAppMessage = () => {
    const serviceLine = getServiceLine();

    return [
      "Hi Digital Solutions SA 👋",
      "",
      "I’d like to get in touch via the website contact form:",
      "",
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Phone: ${phone || "-"}`,
      `Service: ${serviceLine}`,
      "",
      "Message:",
      message || "-",
    ].join("\n");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setService("Web Development");
    setGeneralEnquiry("");
    setMessage("");
  };

  return (
    <form
      // KEY: fill parent height + flex column so we can stretch the message area
      className="h-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();

        // Build WhatsApp URL
        const waNumber = "27639034514"; // no +, no spaces
        const waText = encodeURIComponent(buildWhatsAppMessage());
        const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

        // Open WhatsApp
        window.open(waUrl, "_blank", "noopener,noreferrer");

        // Success UI + clear form
        onSuccess();
        resetForm();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70 mb-1">
            Name <span className="text-white/70">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputBase}
            {...focusHandlers}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">
            Email <span className="text-white/70">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            type="email"
            className={inputBase}
            {...focusHandlers}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1">Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+27 63 903 4514"
          inputMode="tel"
          className={inputBase}
          {...focusHandlers}
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1">
          Service <span className="text-white/70">*</span>
        </label>

        <select
          value={service}
          onChange={(e) => setService(e.target.value as ServiceOption)}
          className={`${inputBase} appearance-none`}
          {...focusHandlers}
          required
        >
          <option value="Web Development" className="bg-[#071627]">
            Web Development
          </option>
          <option value="Brand & Design" className="bg-[#071627]">
            Brand & Design
          </option>
          <option value="App Development" className="bg-[#071627]">
            App Development
          </option>
          <option value="Marketing" className="bg-[#071627]">
            Marketing
          </option>
          <option value="General Enquiry" className="bg-[#071627]">
            General Enquiry
          </option>
        </select>

        {/* Inline field (NOT a popup) */}
        {service === "General Enquiry" && (
          <div className="mt-3">
            <label className="block text-sm text-white/70 mb-1">
              Please specify
            </label>
            <input
              value={generalEnquiry}
              onChange={(e) => setGeneralEnquiry(e.target.value)}
              placeholder="e.g. Pricing, Support, Consultation..."
              className={inputBase}
              {...focusHandlers}
            />
          </div>
        )}
      </div>

      {/* KEY: this block grows to fill remaining height */}
      <div className="flex-1 flex flex-col min-h-0">
        <label className="block text-sm text-white/70 mb-1">
          Message <span className="text-white/70">*</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message"
          className={`${inputBase} flex-1 h-full resize-none`}
          {...focusHandlers}
          required
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          className="w-full text-black font-semibold"
          style={{
            background: ACCENT_GRADIENT,
            boxShadow: "0 0 22px rgba(43,199,214,0.22)",
          }}
        >
          <Send className="mr-2 h-4 w-4" />
          Send on WhatsApp
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
