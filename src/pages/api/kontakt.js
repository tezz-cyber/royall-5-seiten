import nodemailer from "nodemailer";

export const prerender = false;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST({ request, url }) {
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
      return new Response(JSON.stringify({ error: "Pflichtfelder fehlen." }), {
        status: 400,
      });
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

    const betreff = `Neue Anfrage von ${name}${unternehmen ? " (" + unternehmen + ")" : ""}`;

    const textVersion = `Unternehmen: ${unternehmen}
Name: ${name}
E-Mail: ${email}
Telefon: ${telefon}
Rückruf gewünscht: ${rueckruf ? "Ja" : "Nein"}

Nachricht:
${nachricht}`;

    const htmlVersion = `
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:#0b1220;padding:24px 32px;">
              <span style="color:#e5b23a;font-size:20px;font-weight:bold;letter-spacing:0.5px;">Royall Security</span>
              <div style="color:#c9ccd1;font-size:13px;margin-top:4px;">Neue Kontaktanfrage über die Website</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#1f2430;">
                <tr>
                  <td style="padding:8px 0;width:150px;color:#6b7280;">Unternehmen</td>
                  <td style="padding:8px 0;font-weight:bold;">${escapeHtml(unternehmen) || "–"}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6b7280;">Name</td>
                  <td style="padding:8px 0;font-weight:bold;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6b7280;">E-Mail</td>
                  <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#0b5fff;text-decoration:none;">${escapeHtml(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6b7280;">Telefon</td>
                  <td style="padding:8px 0;">${escapeHtml(telefon)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6b7280;">Rückruf gewünscht</td>
                  <td style="padding:8px 0;">
                    <span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:bold;background-color:${rueckruf ? "#e7f6ec" : "#f1f2f4"};color:${rueckruf ? "#1a7f37" : "#6b7280"};">
                      ${rueckruf ? "Ja" : "Nein"}
                    </span>
                  </td>
                </tr>
              </table>

              <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb;">
                <div style="color:#6b7280;font-size:13px;margin-bottom:8px;">Nachricht</div>
                <div style="font-size:14px;color:#1f2430;white-space:pre-wrap;line-height:1.6;">${escapeHtml(nachricht) || "–"}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8f9fa;padding:16px 32px;font-size:12px;color:#9aa1ab;">
              Diese Nachricht wurde automatisch über das Kontaktformular auf royall-ssd.de generiert.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Royall Security Kontaktformular" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.SMTP_TO,
      replyTo: `"${name}" <${email}>`,
      subject: betreff,
      text: textVersion,
      html: htmlVersion,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Mail-Fehler:", err);
    return new Response(JSON.stringify({ error: "Fehler beim Senden." }), {
      status: 500,
    });
  }
}
