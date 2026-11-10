import { Resend } from "resend";

/**
 * Contact form → email via Resend.
 * Runs server-side on Netlify so the RESEND_API_KEY never reaches the browser.
 *
 * Env vars (set in Netlify → Site configuration → Environment variables):
 *   RESEND_API_KEY   required
 *   CONTACT_TO       optional, defaults to info@digitalsolutionssa.co.za
 *   CONTACT_FROM     optional, must be on a domain verified in Resend
 */

const TO = process.env.CONTACT_TO || "info@digitalsolutionssa.co.za";
const FROM = process.env.CONTACT_FROM || "Digital Solutions SA Website <website@digitalsolutionssa.co.za>";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json(500, { error: "Email service is not configured" });

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json(400, { error: "Invalid request" });
  }

  // Honeypot: real users never fill this hidden field
  if (clean(data.company_website, 200)) return json(200, { ok: true });

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 40);
  const service = clean(data.service, 200);
  const message = clean(data.message, 5000);

  if (!name || !email || !message) return json(400, { error: "Please fill in your name, email and message." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: "Please enter a valid email address." });

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "-"],
    ["Service", service || "-"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;max-width:600px">
      <h2 style="margin:0 0 16px">New website enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:bold;vertical-align:top;padding-right:16px">${k}</td><td>${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Message</h3>
      <div style="white-space:pre-wrap;border-left:3px solid #01ffff;padding-left:12px">${escapeHtml(message)}</div>
    </div>`;

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", message].join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: email,
    subject: `New enquiry from ${name}${service ? ` – ${service}` : ""}`,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return json(502, { error: "Could not send your message. Please try again or contact us on WhatsApp." });
  }

  return json(200, { ok: true });
};

export const config = { path: "/api/contact" };
