import React, { useState } from "react";
import { Send } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config/site";
import Button from "@/components/motion/Button";

type ServiceOption = "Web Development" | "Brand & Design" | "App Development" | "Marketing" | "General Enquiry";

const SERVICE_OPTIONS: ServiceOption[] = ["Web Development", "Brand & Design", "App Development", "Marketing", "General Enquiry"];

const inputBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-white/30 transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20";

const SELECT_CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%2301ffff' stroke-width='1.5'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`;

const labelBase ="mb-2 block font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/50";

const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [service, setService] = useState<ServiceOption>("Web Development");
  const [generalEnquiry, setGeneralEnquiry] = useState("");

  const [message, setMessage] = useState("");

  const getServiceLine = () => {
    return service === "General Enquiry" ? `General Enquiry${generalEnquiry ? `: ${generalEnquiry}` : ""}` : service;
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
      className="flex h-full flex-col gap-5"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();

        const waText = encodeURIComponent(buildWhatsAppMessage());
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank", "noopener,noreferrer");

        // Success UI + clear form
        onSuccess();
        resetForm();
      }}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelBase}>
            Name *
          </label>
          <input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputBase} required />
        </div>

        <div>
          <label htmlFor="cf-email" className={labelBase}>
            Email *
          </label>
          <input
            id="cf-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            type="email"
            className={inputBase}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={labelBase}>
            Phone number
          </label>
          <input
            id="cf-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+27 63 903 4514"
            inputMode="tel"
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="cf-service" className={labelBase}>
            Service *
          </label>
          <select
            id="cf-service"
            value={service}
            onChange={(e) => setService(e.target.value as ServiceOption)}
            className={`${inputBase} appearance-none pr-10`}
            style={{ backgroundImage: SELECT_CHEVRON, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "12px" }}
            required
          >
            {SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o} className="bg-ink-3">
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inline field (NOT a popup) */}
      {service === "General Enquiry" && (
        <div>
          <label htmlFor="cf-general" className={labelBase}>
            Please specify
          </label>
          <input
            id="cf-general"
            value={generalEnquiry}
            onChange={(e) => setGeneralEnquiry(e.target.value)}
            placeholder="e.g. Pricing, Support, Consultation..."
            className={inputBase}
          />
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col">
        <label htmlFor="cf-message" className={labelBase}>
          Message *
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a bit about your business and what you need"
          className={`${inputBase} min-h-[9rem] flex-1 resize-none`}
          required
        />
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" fullWidth>
          <Send size={16} />
          Send on WhatsApp
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
