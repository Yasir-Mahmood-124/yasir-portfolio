import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(name: string, email: string, message: string) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F172A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;background:linear-gradient(135deg,#1E293B 0%,#0F172A 100%);border-radius:24px 24px 0 0;border:1px solid rgba(248,250,252,0.08);border-bottom:none;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#22C55E;margin-right:8px;"></span>
                    <span style="font-size:11px;font-weight:700;color:#22C55E;text-transform:uppercase;letter-spacing:2px;">New Portfolio Message</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;">
                    <h1 style="margin:0;font-size:24px;font-weight:700;color:#F8FAFC;">You have a new message</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:6px;">
                    <p style="margin:0;font-size:14px;color:#94A3B8;">from your portfolio contact form</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Info -->
          <tr>
            <td style="padding:0 40px;background-color:rgba(30,41,59,0.5);border-left:1px solid rgba(248,250,252,0.08);border-right:1px solid rgba(248,250,252,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(248,250,252,0.06);">
                <tr>
                  <td style="padding:24px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="vertical-align:top;padding-right:12px;">
                          <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:1.5px;">From</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#F8FAFC;">${safeName}</p>
                        </td>
                        <td width="50%" style="vertical-align:top;padding-left:12px;">
                          <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:1.5px;">Email</p>
                          <a href="mailto:${safeEmail}" style="font-size:15px;font-weight:600;color:#22C55E;text-decoration:none;">${safeEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding:24px 40px 32px;background-color:rgba(30,41,59,0.5);border-left:1px solid rgba(248,250,252,0.08);border-right:1px solid rgba(248,250,252,0.08);">
              <p style="margin:0 0 12px;font-size:10px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:1.5px;">Message</p>
              <div style="padding:20px;background-color:rgba(15,23,42,0.6);border:1px solid rgba(248,250,252,0.06);border-radius:16px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#CBD5E1;">${safeMessage}</p>
              </div>
            </td>
          </tr>

          <!-- Reply Button -->
          <tr>
            <td style="padding:0 40px 32px;background-color:rgba(30,41,59,0.5);border-left:1px solid rgba(248,250,252,0.08);border-right:1px solid rgba(248,250,252,0.08);">
              <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 28px;background-color:#22C55E;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:12px;">Reply to ${safeName}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background-color:rgba(15,23,42,0.4);border-radius:0 0 24px 24px;border:1px solid rgba(248,250,252,0.08);border-top:none;">
              <p style="margin:0;font-size:12px;color:#64748B;text-align:center;">
                Sent from <span style="color:#94A3B8;">yasirmahmood.dev</span> — Portfolio Contact Form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "yasir.mahmood.3795@gmail.com",
    replyTo: email,
    subject: `Portfolio Contact from ${name}`,
    html: buildEmailHtml(name, email, message),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
