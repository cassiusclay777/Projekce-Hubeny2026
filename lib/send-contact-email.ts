import { Resend } from "resend";
import type { ContactMailConfig } from "@/lib/server-env";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
};

export async function sendContactNotification(
  cfg: ContactMailConfig,
  data: ContactPayload,
  options?: { pdfBuffer?: Buffer }
): Promise<void> {
  const resend = new Resend(cfg.resendKey);
  const phoneHtml = data.phone
    ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Telefon</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(data.phone)}</td></tr>`
    : "";

  const html = `
    <h2 style="font-family:system-ui,sans-serif">Nová poptávka z webu</h2>
    <table style="font-family:system-ui,sans-serif;font-size:15px;max-width:560px">
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee;width:140px"><strong>Jméno</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>E-mail</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      ${phoneHtml}
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Typ projektu</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(data.projectType)}</td></tr>
      <tr><td colspan="2" style="padding:16px 0 8px"><strong>Zpráva</strong></td></tr>
      <tr><td colspan="2" style="padding:8px 12px;background:#f6f6f6;border-radius:8px;white-space:pre-wrap">${escapeHtml(data.message)}</td></tr>
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:13px;color:#666;margin-top:24px">Odesláno z kontaktního formuláře na webu (nezávazná poptávka).</p>
  `.trim();

  const attachments = options?.pdfBuffer?.length
    ? [
        {
          filename: "nezavazna-poptavka.pdf",
          content: options.pdfBuffer,
          contentType: "application/pdf" as const,
        },
      ]
    : undefined;

  const { error } = await resend.emails.send({
    from: cfg.from,
    to: [cfg.notifyTo],
    replyTo: data.email,
    subject: `Web — poptávka: ${data.projectType} — ${data.name}`,
    html,
    attachments,
  });

  if (error) {
    throw new Error(
      typeof error.message === "string" ? error.message : "Resend error"
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
