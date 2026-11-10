import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config/site";

/**
 * Shown after a successful contact form submission.
 * Google Ads conversion URL: https://digitalsolutionssa.co.za/thank-you
 */
const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "Thank you | Digital Solutions SA";

    // Keep this page out of search results
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);

    return () => {
      document.title = prevTitle;
      robots.remove();
    };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-28 sm:px-8">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] glow glow-cyan [--glow-a:0.1]" />

      <div className="relative mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-ink-3 p-8 text-center sm:p-14">
        <div className="mx-auto mb-8 inline-flex items-center justify-center rounded-full bg-cyan/10 p-4">
          <CheckCircle2 className="h-10 w-10 text-cyan" />
        </div>

        <p className="label mb-6 flex items-center justify-center gap-3 text-pink">
          <span className="h-px w-10 bg-current" />
          Enquiry sent
          <span className="h-px w-10 bg-current" />
        </p>

        <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)] text-white">
          Thank <span className="text-signal">you.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
          We've received your message and will get back to you within 24 hours. Need us sooner? Chat to us on{" "}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan underline underline-offset-4"
          >
            WhatsApp
          </a>
          .
        </p>

        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:border-cyan hover:text-cyan"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default ThankYou;
