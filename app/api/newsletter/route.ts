import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email().max(254),
});

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
        text: `Nouvelle adresse inscrite : ${input.data.email}`,
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
