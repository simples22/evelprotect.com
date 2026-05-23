import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { getMarketingRecipients } from "@/lib/marketing/buildAudience";
import { buildMarketingEmail } from "@/lib/marketing/emailTemplate";
import { personalizeText } from "@/lib/marketing/personalization";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      title,
      subject,
      previewText,
      bodyHtml,
      heroImage,
      ctaLabel,
      ctaUrl,
      audience = "all",
      singleRecipient,
      status = "sent",
      scheduledAt,
    } = data;

    if (!title || !subject || !bodyHtml) {
      return NextResponse.json(
        { success: false, message: "Title, subject and body are required." },
        { status: 400 }
      );
    }

    const campaign = await prisma.marketingCampaign.create({
      data: {
        title,
        subject,
        previewText: previewText || "",
        bodyHtml,
        heroImage: heroImage || "",
        ctaLabel: ctaLabel || "",
        ctaUrl: ctaUrl || "",
        audience,
        status,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        sentAt: status === "sent" ? new Date() : null,
      },
    });

    if (status === "draft" || status === "scheduled") {
      return NextResponse.json({
        success: true,
        message: `Campaign seveld as ${status}.`,
        campaign,
      });
    }

    let recipients = singleRecipient
      ? [
          {
            email: singleRecipient.email,
            fullName: singleRecipient.fullName || "",
            phone: singleRecipient.phone || "",
            source: singleRecipient.source || "manual",
          },
        ]
      : await getMarketingRecipients(audience);

    recipients = recipients.filter((item) => isValidEmail(item.email));

    const maxRecipients = Number(process.env.MARKETING_MAX_RECIPIENTS || 100);

    if (recipients.length > maxRecipients) {
      return NextResponse.json(
        {
          success: false,
          message: `Recipient limit exceeded. Max allowed: ${maxRecipients}. Selected: ${recipients.length}.`,
        },
        { status: 400 }
      );
    }

    const batchSize = Number(process.env.MARKETING_BATCH_SIZE || 20);
    const results = [];

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      for (const recipient of batch) {
        const personalizedBody = personalizeText(bodyHtml, recipient);

        let unsubscribeToken = recipient.unsubscribeToken;

        if (recipient.source === "newsletter" && !unsubscribeToken) {
          unsubscribeToken = crypto.randomUUID();

          await prisma.newsletterSubscriber.update({
            where: { email: recipient.email },
            data: { unsubscribeToken },
          });
        }

        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(
          recipient.email
        )}${unsubscribeToken ? `&token=${unsubscribeToken}` : ""}`;

        const html = buildMarketingEmail({
          subject,
          previewText,
          bodyHtml: personalizedBody,
          heroImage,
          ctaLabel,
          ctaUrl,
          recipientName: recipient.fullName || "there",
          unsubscribeUrl,
        });

        try {
          await sendMail({
            to: recipient.email,
            subject,
            html,
          });

          await prisma.marketingEmailLog.create({
            data: {
              campaignId: campaign.id,
              recipient: recipient.email,
              fullName: recipient.fullName || "",
              subject,
              bodyHtml: html,
              status: "sent",
              source: recipient.source,
            },
          });

          results.push({ email: recipient.email, status: "sent" });
        } catch (error) {
          await prisma.marketingEmailLog.create({
            data: {
              campaignId: campaign.id,
              recipient: recipient.email,
              fullName: recipient.fullName || "",
              subject,
              bodyHtml: personalizedBody,
              status: "failed",
              source: recipient.source,
              error: error.message,
            },
          });

          results.push({ email: recipient.email, status: "failed" });
        }
      }

      if (i + batchSize < recipients.length) {
        await wait(1200);
      }
    }

    return NextResponse.json({
      success: true,
      campaignId: campaign.id,
      total: results.length,
      sent: results.filter((r) => r.status === "sent").length,
      failed: results.filter((r) => r.status === "failed").length,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Marketing email failed.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}