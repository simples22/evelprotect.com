export function buildMarketingEmail({
  subject,
  previewText = "",
  bodyHtml = "",
  heroImage = "",
  ctaLabel = "",
  ctaUrl = "",
  recipientName = "there",
  companyName = "EVEL Cosmetics Group",
  unsubscribeUrl = "#",
}) {
  const year = new Date().getFullYear();

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>${subject}</title>
    </head>

    <body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,sans-serif;color:#111827;">
      <div style="display:none;opacity:0;visibility:hidden;">
        ${previewText}
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:30px 0;">
        <tr>
          <td align="center">
            <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;">
              
              <tr>
                <td style="background:#05061a;padding:26px 34px;color:#ffffff;">
                  <strong style="font-size:20px;letter-spacing:.04em;">${companyName}</strong>
                  <p style="margin:8px 0 0;color:rgba(255,255,255,.72);font-size:13px;">
                    Beauty, skincare, body care and personal care company.
                  </p>
                </td>
              </tr>

              ${
                heroImage
                  ? `
              <tr>
                <td>
                  <img src="${heroImage}" alt="" width="640" style="width:100%;display:block;" />
                </td>
              </tr>`
                  : ""
              }

              <tr>
                <td style="padding:34px;">
                  <p style="font-size:15px;line-height:1.7;margin:0 0 18px;">
                    Hello ${recipientName},
                  </p>

                  <div style="font-size:15px;line-height:1.8;color:#1f2937;">
                    ${bodyHtml}
                  </div>

                  ${
                    ctaLabel && ctaUrl
                      ? `
                  <div style="margin-top:28px;">
                    <a href="${ctaUrl}" style="display:inline-block;background:#05061a;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:bold;">
                      ${ctaLabel}
                    </a>
                  </div>`
                      : ""
                  }
                </td>
              </tr>

              <tr>
                <td style="padding:26px 34px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                  <h3 style="margin:0 0 10px;font-size:15px;color:#111827;">
                    Notice About Our Company
                  </h3>
                  <p style="margin:0;font-size:13px;line-height:1.7;color:#6b7280;">
                    ${companyName} is a Beauty and personal care company preparing beauty, skincare,
                    deodorant, fragrance, body care and wellness-related product directions. This message may include
                    company updates, product announcements, marketing information, or support communication.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:22px 34px;background:#05061a;color:rgba(255,255,255,.7);font-size:12px;line-height:1.7;">
                  <p style="margin:0 0 8px;">
                    © ${year} ${companyName}. All rights reserved.
                  </p>
                  <p style="margin:0;">
                    You received this email because you subscribed, contacted us, or requested information from our company.
                    <br />
                    <a href="${unsubscribeUrl}" style="color:#ffffff;">Unsubscribe</a>
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