import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
});

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
