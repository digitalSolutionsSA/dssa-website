import { useState, type MouseEvent } from "react";
import { scrollToId } from "@/lib/lenis";
import { EMAIL, NAV_LINKS, SOCIALS, waLink } from "@/config/site";
import Flashlight from "@/components/motion/Flashlight";
import BrandLogo from "@/components/BrandLogo";
import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import TermsOfService from "@/components/legal/TermsOfService";
import CookiePolicy from "@/components/legal/CookiePolicy";

const socialIcon = "h-4 w-4";

const SOCIAL_LINKS = [
  {
    href: SOCIALS.facebook,
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={socialIcon}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: SOCIALS.instagram,
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={socialIcon}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: SOCIALS.tiktok,
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={socialIcon}>
        <path d="M19.321 5.562a5.109 5.109 0 0 1-3.01-1.003 5.12 5.12 0 0 1-1.845-2.526h-2.91v13.03a2.792 2.792 0 1 1-2.79-2.793c.24 0 .475.03.703.083V9.21a5.71 5.71 0 0 0-.703-.043A5.903 5.903 0 0 0 .875 15.07a5.905 5.905 0 0 0 11.664 1.01c.015-.113.025-.228.032-.343V8.345a8.01 8.01 0 0 0 4.69 1.504V6.99c.683.34 1.45.53 2.26.53V5.562z" />
      </svg>
    ),
  },
];

const colLabel = "label mb-5 text-white/35";
const link = "mb-3 block text-left text-sm text-white/55 transition-colors hover:text-pink";

/** A wordmark layer for the footer flashlight — identical box in both layers */
const Wordmark = ({ live = false }: { live?: boolean }) => (
  <div className={`absolute inset-0 flex items-end justify-center ${live ? "bg-[#050207]" : "bg-ink-2"}`}>
    {live && <div className="absolute inset-0 bg-grid [background-size:28px_28px]" />}
    <span
      className={`display relative block translate-y-[12%] text-[clamp(6rem,30vw,30rem)] leading-[0.8] tracking-[-0.06em] ${
        live ? "text-signal" : "text-stroke-dim"
      }`}
    >
      DSSA
    </span>
    {live && <span className="label absolute right-6 top-6 text-cyan">/* made in the Vaal */</span>}
  </div>
);

/** Footer: columns tip in via ScrollReveal; the giant wordmark is a flashlight — outline on top, signal underneath. */
export default function Footer() {
  const [pp, setPp] = useState(false);
  const [tos, setTos] = useState(false);
  const [cp, setCp] = useState(false);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-2">
      <div className="relative mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div data-sr-children="rise" data-sr-interval="100" className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <BrandLogo className="mb-6 h-16" />
            <p className="mb-6 max-w-[17rem] text-sm leading-relaxed text-white/45">
              Websites, apps and marketing for businesses that refuse to blend in.
            </p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/55 transition-colors hover:border-pink hover:bg-pink hover:text-black"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className={colLabel}>Navigate</p>
            {NAV_LINKS.map(({ label, id }) => (
              <a key={id} href={`#${id}`} onClick={go(id)} className={link}>
                {label}
              </a>
            ))}
          </div>

          <div>
            <p className={colLabel}>Legal</p>
            <button type="button" onClick={() => setTos(true)} className={link}>
              Terms of Service
            </button>
            <button type="button" onClick={() => setPp(true)} className={link}>
              Privacy Policy
            </button>
            <button type="button" onClick={() => setCp(true)} className={link}>
              Cookie Policy
            </button>
          </div>

          <div>
            <p className={colLabel}>Start something</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="display mb-4 inline-block text-2xl text-white transition-colors hover:text-cyan"
            >
              WhatsApp us →
            </a>
            <a href={`mailto:${EMAIL}`} className={link}>
              {EMAIL}
            </a>
            <p className="text-xs text-white/35">Three Rivers, Vereeniging, GP</p>
          </div>
        </div>
      </div>

      <Flashlight
        className="mt-16 h-[clamp(9rem,26vw,26rem)] w-full"
        radius={220}
        roam
        cursorLabel="Light it up"
        base={<Wordmark />}
        reveal={<Wordmark live />}
      />

      <div className="relative mx-auto flex max-w-7xl flex-wrap justify-between gap-3 border-t border-white/10 px-5 py-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/35 sm:px-8">
        <span>© {new Date().getFullYear()} Digital Solutions SA</span>
        <span>Made with care in South Africa</span>
      </div>

      <PrivacyPolicy open={pp} onOpenChange={setPp} />
      <TermsOfService open={tos} onOpenChange={setTos} />
      <CookiePolicy open={cp} onOpenChange={setCp} />
    </footer>
  );
}
