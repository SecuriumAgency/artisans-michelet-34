import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml({
  name,
  email,
  phone,
  service,
  message,
}: Required<ContactPayload>): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 6px 0; color: #0066FF; font-weight: bold; font-size: 14px; white-space: nowrap;">${label}</td>
      <td style="padding: 6px 0 6px 16px; color: #ffffff; font-size: 14px;">${escapeHtml(value)}</td>
    </tr>`;

  return `
<div style="background-color: #050B14; padding: 32px; font-family: Arial, Helvetica, sans-serif;">
  <div style="max-width: 480px; margin: 0 auto; background-color: #0A1626; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="margin: 0 0 24px; color: #0066FF; font-size: 20px;">Nouvelle demande de devis</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      ${row("Nom", name)}
      ${row("Email", email)}
      ${row("Téléphone", phone)}
      ${row("Service", service)}
    </table>
    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.15); margin: 24px 0;" />
    <p style="margin: 0 0 8px; color: #0066FF; font-weight: bold; font-size: 14px;">Message</p>
    <p style="margin: 0; color: #ffffff; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message) || "(aucun message)"}</p>
  </div>
</div>`;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const service = payload.service?.trim() || "Non précisé";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Nom, email et téléphone sont requis." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    console.error(
      "Contact API misconfigured: SMTP_USER, SMTP_PASS or CONTACT_EMAIL is missing."
    );
    return NextResponse.json(
      { error: "Service momentanément indisponible." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "ssl0.ovh.net",
    port: Number(SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Artisans Michelet" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nouvelle demande de devis — ${name}`,
      html: buildEmailHtml({ name, email, phone, service, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SMTP send failed", error);
    return NextResponse.json({ error: "Échec de l'envoi." }, { status: 502 });
  }
}
