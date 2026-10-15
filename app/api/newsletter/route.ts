import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email().max(254),
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
    const input = newsletterSchema.safeParse(await request.json());
    if (!input.success) {
      return NextResponse.json({ error: "Veuillez entrer une adresse email valide." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL ?? "contact@harmonycure.fr";
    if (!apiKey) {
      return NextResponse.json({ error: "Le service email n'est pas configuré." }, { status: 500 });
    }

    const email = input.data.email;
    const safeEmail = escapeHtml(email);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["contact@harmonycure.fr"],
        subject: "Nouvelle inscription à la newsletter",
        text: `Nouvelle adresse inscrite : ${email}`,
        html: `<div style="margin:0;background:#f7f3eb;padding:32px 16px;font-family:Arial,sans-serif;color:#171715"><div style="max-width:620px;margin:auto;background:#fff;border:1px solid #e3d8c5;border-radius:16px;overflow:hidden"><div style="background:#0e3927;padding:26px 30px;color:#fff"><div style="font-size:12px;letter-spacing:3px;color:#e2c589">HARMONY CURE</div><h1 style="margin:10px 0 0;font-size:24px">Nouvelle inscription</h1></div><div style="padding:30px"><p style="margin:0;color:#68655d">Une nouvelle personne s’est inscrite à votre newsletter.</p><div style="margin-top:22px;border:1px solid #e3d8c5;border-radius:10px;padding:16px;font-size:18px"><a href="mailto:${safeEmail}" style="color:#0e3927">${safeEmail}</a></div></div></div></div>`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Impossible d'enregistrer l'inscription." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez." }, { status: 500 });
  }
}
