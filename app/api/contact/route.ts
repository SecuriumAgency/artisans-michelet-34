import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

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
  const service = payload.service?.trim() ?? "Non précisé";
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "Contact API misconfigured: RESEND_API_KEY or CONTACT_TO_EMAIL is missing."
    );
    return NextResponse.json(
      { error: "Service momentanément indisponible." },
      { status: 500 }
    );
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "Artisans Michelet <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouvelle demande de devis — ${name}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        `Téléphone : ${phone}`,
        `Service : ${service}`,
        "",
        "Message :",
        message || "(aucun message)",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend send failed", error);
      return NextResponse.json({ error: "Échec de l'envoi." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend send failed", error);
    return NextResponse.json({ error: "Échec de l'envoi." }, { status: 502 });
  }
}
