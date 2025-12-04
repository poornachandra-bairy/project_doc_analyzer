import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      designation,
      companyName,
      email,
      telephone,
      mobile,
      address,
      enquiry,
    } = body;

    // Basic validation
    if (!name || !email || !mobile || !enquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, Email, Mobile and Enquiry are required.",
        },
        { status: 400 }
      );
    }

    const toEmail =
      process.env.ENQUIRY_TO_EMAIL || "poorna.fsdev@gmail.com";

    const fromEmail =
      process.env.ENQUIRY_FROM_EMAIL || "no-reply@example.com";

    const fromName =
      process.env.ENQUIRY_FROM_NAME || "Website Enquiry";

    const subject = `New Online Enquiry – ${name}`;

    const textBody = `
New enquiry received from the website:

Name: ${name}
Designation: ${designation || "-"}
Company Name: ${companyName || "-"}
E-mail ID: ${email}
Telephone No.: ${telephone || "-"}
Mobile No.: ${mobile}
Address: ${address || "-"}

Feedback / Enquiry:
${enquiry}
`;

    const addressHtml =
      (address && address.replace(/\n/g, "<br/>")) || "-";

    const enquiryHtml =
      (enquiry && enquiry.replace(/\n/g, "<br/>")) || "-";

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${subject}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#020617; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617; padding:24px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(145deg,#020617,#030712); border-radius:18px; border:1px solid #1e293b; overflow:hidden; color:#e5e7eb;">
            
            <!-- Header bar -->
            <tr>
              <td style="padding:18px 24px; border-bottom:1px solid #1e293b; background:linear-gradient(90deg,#0ea5e9,#22c55e);">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:18px; font-weight:700; color:#020617;">
                      Paramount Hydraulics – Online Enquiry
                    </td>
                    <td align="right" style="font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:#020617;">
                      Since 2007 · Peenya, Bangalore
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Intro -->
            <tr>
              <td style="padding:22px 24px 10px 24px;">
                <p style="margin:0; font-size:13px; letter-spacing:0.18em; text-transform:uppercase; color:#38bdf8;">
                  New website enquiry
                </p>
                <h2 style="margin:6px 0 10px 0; font-size:20px; font-weight:700; color:#e5e7eb;">
                  ${name} has submitted an enquiry
                </h2>
                <p style="margin:0; font-size:13px; line-height:1.6; color:#cbd5f5;">
                  You have received a new enquiry from the <strong>Paramount Hydraulics</strong> website. 
                  The details shared by the visitor are given below.
                </p>
              </td>
            </tr>

            <!-- Details card -->
            <tr>
              <td style="padding:16px 24px 8px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0; background-color:#020617; border-radius:12px; border:1px solid #1e293b;">
                  <tr>
                    <td style="padding:14px 16px; border-bottom:1px solid #1e293b; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.16em; color:#94a3b8;">
                      Contact Details
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px 16px 16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px; color:#e5e7eb;">
                        <tr>
                          <td width="40%" style="padding:4px 0; color:#9ca3af;">Name</td>
                          <td style="padding:4px 0; font-weight:500; color:#e5e7eb;">${name}</td>
                        </tr>
                        <tr>
                          <td width="40%" style="padding:4px 0; color:#9ca3af;">Designation</td>
                          <td style="padding:4px 0; color:#e5e7eb;">${designation || "-"}</td>
                        </tr>
                        <tr>
                          <td width="40%" style="padding:4px 0; color:#9ca3af;">Company Name</td>
                          <td style="padding:4px 0; color:#e5e7eb;">${companyName || "-"}</td>
                        </tr>
                        <tr>
                          <td width="40%" style="padding:4px 0; color:#9ca3af;">E-mail ID</td>
                          <td style="padding:4px 0; color:#e5e7eb;">
                            <a href="mailto:${email}" style="color:#38bdf8; text-decoration:none;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td width="40%" style="padding:4px 0; color:#9ca3af;">Telephone No.</td>
                          <td style="padding:4px 0; color:#e5e7eb;">${telephone || "-"}</td>
                        </tr>
                        <tr>
                          <td width="40%" style="padding:4px 0; color:#9ca3af;">Mobile No.</td>
                          <td style="padding:4px 0; font-weight:500; color:#fbbf24;">${mobile}</td>
                        </tr>
                        <tr>
                          <td width="40%" style="padding:8px 0 0 0; color:#9ca3af; vertical-align:top;">Address</td>
                          <td style="padding:8px 0 0 0; color:#e5e7eb;">
                            ${addressHtml}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Enquiry block -->
            <tr>
              <td style="padding:8px 24px 20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0; background-color:#020617; border-radius:12px; border:1px solid #1e293b;">
                  <tr>
                    <td style="padding:14px 16px; border-bottom:1px solid #1e293b; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.16em; color:#94a3b8;">
                      Feedback / Enquiry
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px; font-size:13px; line-height:1.7; color:#e5e7eb;">
                      ${enquiryHtml}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer hint -->
            <tr>
              <td style="padding:16px 24px 20px 24px; border-top:1px solid #1e293b;">
                <p style="margin:0 0 4px 0; font-size:11px; color:#6b7280;">
                  You can reply directly to this email to contact the customer: 
                  <a href="mailto:${email}" style="color:#38bdf8; text-decoration:none;">${email}</a>
                </p>
                <p style="margin:0; font-size:11px; color:#4b5563;">
                  This message was generated from the <strong>Paramount Hydraulics</strong> website enquiry form.
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

    // 1️⃣ Send email via Brevo
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY || "",
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: fromEmail,
          name: fromName,
        },
        to: [
          {
            email: toEmail,
          },
        ],
        replyTo: {
          email,
          name,
        },
        subject,
        textContent: textBody,
        htmlContent: htmlBody,
      }),
    });

    if (!brevoRes.ok) {
      const errorText = await brevoRes.text().catch(() => "");
      console.error("Brevo API error:", brevoRes.status, errorText);

      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      );
    }

    // 2️⃣ Send WhatsApp notification via Twilio (best-effort)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const waFrom = process.env.TWILIO_WHATSAPP_FROM;
    const waTo = process.env.TWILIO_WHATSAPP_TO;

    if (accountSid && authToken && waFrom && waTo) {
      const client = twilio(accountSid, authToken);

      const waBody = `
📩 *NEW WEBSITE ENQUIRY RECEIVED*

🏢 *Paramount Hydraulics – Online Enquiry*

───────────────────────────────
👤 *Visitor Details*
• *Name:* ${name}
• *Designation:* ${designation || "-"}
• *Company:* ${companyName || "-"}
• *Email:* ${email}
• *Telephone:* ${telephone || "-"}
• *Mobile:* ${mobile}
• *Address:* ${address ? address.replace(/\n/g, ", ") : "-"
        }
───────────────────────────────

📝 *Enquiry / Feedback*
${enquiry}

───────────────────────────────
📅 Received on: ${new Date().toLocaleString("en-IN")}
      `;

      try {
        const msg = await client.messages.create({
          from: waFrom, // e.g. 'whatsapp:+14155238886'
          to: waTo,     // e.g. 'whatsapp:+919900173018'
          body: waBody,
        });

        console.log("Twilio WhatsApp message sent, SID:", msg.sid);
      } catch (waErr) {
        console.error("Twilio WhatsApp send error:", waErr);
        // Don't fail the whole request – email already sent
      }
    } else {
      console.warn(
        "Twilio env vars missing – skipping WhatsApp notification"
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/send-enquiry:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send enquiry" },
      { status: 500 }
    );
  }
}
