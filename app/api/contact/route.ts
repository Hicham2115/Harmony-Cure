import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[
      character
    ] ?? character,
  );
}

export async function POST(request: Request) {
  try {
    const input = contactSchema.safeParse(await request.json());
    if (!input.success) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs correctement." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL ?? "contact@harmonycure.fr";
    if (!apiKey) {
      return NextResponse.json({ error: "Le service email n'est pas configuré." }, { status: 500 });
    }

    const { firstName, lastName, email, message } = input.data;
    const safeName = `${escapeHtml(firstName)} ${escapeHtml(lastName)}`;
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["contact@harmonycure.fr"],
        reply_to: email,
        subject: `Nouveau message de ${firstName} ${lastName}`,
        text: `Nom : ${firstName} ${lastName}\nEmail : ${email}\n\n${message}`,
        html: `<div style="margin:0;background:#f7f3eb;padding:32px 16px;font-family:Arial,sans-serif;color:#171715"><div style="max-width:620px;margin:auto;background:#fff;border:1px solid #e3d8c5;border-radius:16px;overflow:hidden"><div style="background:#0e3927;padding:26px 30px;color:#fff"><div style="font-size:12px;letter-spacing:3px;color:#e2c589">HARMONY CURE</div><h1 style="margin:10px 0 0;font-size:24px">Nouveau message</h1></div><div style="padding:30px"><p style="margin:0 0 18px;color:#68655d">Vous avez reçu un nouveau message depuis le formulaire de contact.</p><div style="border-bottom:1px solid #eee;padding:12px 0"><strong>Nom</strong><br />${safeName}</div><div style="border-bottom:1px solid #eee;padding:12px 0"><strong>Email</strong><br /><a href="mailto:${safeEmail}" style="color:#0e3927">${safeEmail}</a></div><div style="padding:18px 0 0;line-height:1.7"><strong>Message</strong><p style="margin:8px 0 0">${safeMessage}</p></div></div></div></div>`,
      }),
    });

    if (!response.ok) {
      const providerError = await response.json().catch(() => null);
      console.error("Resend contact error", providerError);
      return NextResponse.json(
        {
          error:
            providerError?.message ??
            "Impossible d'envoyer le message. Vérifiez la configuration Resend.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error", error);
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez." }, { status: 500 });
  }
}
