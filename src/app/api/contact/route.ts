import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema, type ContactPayload } from "@/lib/contact-validation";



// ---------------------------------------------------------------------------
// Resend client (initialised once per cold start)
// ---------------------------------------------------------------------------

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Email template
// ---------------------------------------------------------------------------

function buildHtmlEmail({ name, email, subject, message }: Omit<ContactPayload, "honeypot">): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Portfolio Contact – ${esc(subject)}</title>
      </head>
      <body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:16px;overflow:hidden;
                       border:1px solid #e2e8f0;max-width:600px;width:100%;">

                <!-- Header -->
                <tr>
                  <td style="background:#3b82f6;padding:32px 40px;">
                    <p style="margin:0;color:#bfdbfe;font-size:12px;
                               font-weight:600;letter-spacing:0.1em;
                               text-transform:uppercase;">
                      Portfolio Contact Form
                    </p>
                    <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;
                               font-weight:700;line-height:1.3;">
                      ${esc(subject)}
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px;">

                    <!-- Sender info -->
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc;border-radius:12px;
                             border:1px solid #e2e8f0;margin-bottom:28px;">
                      <tr>
                        <td style="padding:20px 24px;">
                          <p style="margin:0 0 12px;font-size:11px;font-weight:600;
                                     color:#64748b;letter-spacing:0.08em;
                                     text-transform:uppercase;">
                            Sender
                          </p>
                          <p style="margin:0 0 4px;color:#0f172a;
                                     font-size:16px;font-weight:600;">
                            ${esc(name)}
                          </p>
                          <a href="mailto:${esc(email)}"
                            style="color:#3b82f6;font-size:14px;text-decoration:none;">
                            ${esc(email)}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <p style="margin:0 0 10px;font-size:11px;font-weight:600;
                               color:#64748b;letter-spacing:0.08em;
                               text-transform:uppercase;">
                      Message
                    </p>
                    <div style="background:#f8fafc;border-radius:12px;
                                border:1px solid #e2e8f0;padding:20px 24px;">
                      <p style="margin:0;color:#1e293b;font-size:15px;
                                 line-height:1.8;white-space:pre-wrap;">
                        ${esc(message)}
                      </p>
                    </div>

                    <!-- Reply CTA -->
                    <div style="margin-top:28px;text-align:center;">
                      <a href="mailto:${esc(email)}"
                        style="display:inline-block;background:#3b82f6;
                               color:#ffffff;font-size:14px;font-weight:600;
                               padding:12px 28px;border-radius:10px;
                               text-decoration:none;">
                        Reply to ${esc(name)}
                      </a>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:20px 40px;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                      Sent via the Contact form on
                      <a href="https://atakanardacelik.dev"
                        style="color:#3b82f6;text-decoration:none;">
                        atakanardacelik.dev
                      </a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // 1. IP-based rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, resetInMs } = checkRateLimit(ip);

  if (!allowed) {
    const retryAfterSecs = Math.ceil(resetInMs / 1000);
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSecs) },
      }
    );
  }

  // 2. Parse body
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // 3. Zod validation (type-safe, trims whitespace, enforces max lengths)
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    // Return the first validation error message to the client.
    const firstError = parsed.error.issues[0]?.message ?? "Validation failed.";

    // Honeypot triggered — silently return 200 to confuse bots.
    if (firstError === "Bot detected.") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, error: firstError },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  // 4. Guard: API key must be configured
  if (
    !process.env.RESEND_API_KEY ||
    process.env.RESEND_API_KEY === "re_your_api_key_here"
  ) {
    console.error("[contact/route] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { success: false, error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  // 5. Send via Resend
  const recipient = process.env.CONTACT_EMAIL ?? "celikatakanarda@gmail.com";

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipient],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: buildHtmlEmail({ name, email, subject, message }),
    });

    if (error) {
      console.error("[contact/route] Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
