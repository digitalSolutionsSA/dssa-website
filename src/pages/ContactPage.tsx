import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Contact from "@/sections/Contact";

/**
 * Standalone contact page — the Google Ads landing URL:
 *   https://digitalsolutionssa.co.za/contact
 * Opens straight on the contact form: no preloader, no scrolling through the home page.
 */
const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "Contact us | Digital Solutions SA";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-black text-white">
      <header className="px-5 pt-5 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" aria-label="Digital Solutions SA — home" className="shrink-0">
            <BrandLogo eager className="h-10 sm:h-12" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-cyan hover:text-cyan"
          >
            <ArrowLeft size={12} />
            Visit website
          </Link>
        </div>
      </header>

      <main className="relative flex-1 [&>section]:pt-12 sm:[&>section]:pt-16">
        <Contact />
      </main>

      <footer className="border-t border-white/10 px-5 py-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/40">
        © {new Date().getFullYear()} Digital Solutions SA
      </footer>

      <FloatingWhatsApp />
    </div>
  );
};

export default ContactPage;
