import { useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { EMAIL, LOCATION, PHONE_DISPLAY, SOCIALS, WHATSAPP_NUMBER } from "@/config/site";
import ContactForm from "@/components/contact/ContactForm";
import ContactSuccess from "@/components/contact/ContactSuccess";

const icon = "h-4 w-4";

const CHANNELS: { href: string; label: string; value: string; icon: ReactNode }[] = [
  {
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={icon}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M11.946 0C5.356 0 0 5.356 0 11.946c0 2.098.546 4.07 1.501 5.782L0 24l6.462-1.479A11.898 11.898 0 0 0 11.946 23.892C18.536 23.892 23.892 18.536 23.892 11.946 23.892 5.356 18.536 0 11.946 0zm0 21.879a9.928 9.928 0 0 1-5.051-1.374l-.362-.215-3.753.985.999-3.647-.235-.374A9.912 9.912 0 0 1 2.013 11.946c0-5.482 4.451-9.933 9.933-9.933 5.482 0 9.933 4.451 9.933 9.933 0 5.482-4.451 9.933-9.933 9.933z" />
      </svg>
    ),
  },
  {
    href: `mailto:${EMAIL}`,
    label: "Email",
    value: EMAIL,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={icon}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    href: SOCIALS.facebook,
    label: "Facebook",
    value: "digitalsolutions.sa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={icon}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: SOCIALS.instagram,
    label: "Instagram",
    value: "@digitalsolutions.sa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={icon}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

/** Contact: the form panel wipes in diagonally, channels slide in one after another. */
export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-14">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl md:mb-20">
          <p className="label mb-8 flex items-center gap-3 text-pink">
            <span className="h-px w-10 bg-current" />
            <span data-scramble>Get in touch</span>
          </p>
          <h2 data-glitch className="display text-[clamp(3rem,7vw,6.5rem)] text-white">
            Tell us about
            <br />
            <span className="text-signal">your project.</span>
          </h2>
          <p data-sr="rise" className="mt-8 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Fill in the form and it opens straight in WhatsApp — or reach us on any channel below. We reply within 24 hours.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div data-clip className="spot rounded-[2rem] border border-white/10 bg-ink-3 p-6 sm:p-10">
            {sent ? <ContactSuccess /> : <ContactForm onSuccess={() => setSent(true)} />}
          </div>

          <div>
            <div data-sr-children="left" data-sr-interval="100" className="flex flex-col">
              {CHANNELS.map(({ href, label, value, icon: ic }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-b border-white/10 py-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/15 text-white transition-colors duration-300 group-hover:border-pink group-hover:bg-pink group-hover:text-black">
                    {ic}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label block text-white/35" data-sr-scramble>
                      {label}
                    </span>
                    <span className="mt-1 block truncate text-sm text-white/75 transition-colors group-hover:text-white">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-white/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
                  />
                </a>
              ))}
            </div>
            <div data-sr="rise" className="mt-8 flex items-start gap-4">
              <span className="pulse-dot mt-1.5" />
              <div>
                <p className="label text-white/35">Based in</p>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{LOCATION}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
