import nodemailer from "nodemailer";

export const prerender = false;

export async function POST({ request }) {
  try {
    const data = await request.formData();
    const unternehmen = data.get("unternehmen")?.toString() || "";
    const name = data.get("name")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const telefon = data.get("telefon")?.toString() || "";
    const nachricht = data.get("nachricht")?.toString() || "";
    const rueckruf = data.get("rueckruf") === "on";
    const datenschutz = data.get("datenschutz") === "on";

    if (!name || !email || !telefon || !datenschutz) {
      return new Response(JSON.stringify({ error: "Pflichtfelder fehlen." }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: Number(import.meta.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Royall Kontaktformular" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `Neue Anfrage von ${name}${unternehmen ? " (" + unternehmen + ")" : ""}`,
      text: `Unternehmen: ${unternehmen}
Name: ${name}
E-Mail: ${email}
Telefon: ${telefon}
Rückruf gewünscht: ${rueckruf ? "Ja" : "Nein"}

Nachricht:
${nachricht}`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Fehler beim Senden." }), { status: 500 });
  }
}
