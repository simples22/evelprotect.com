import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");

    if (!process.env.CRON_SECRET) {
      return NextResponse.json(
        { success: false, message: "Missing CRON_SECRET." },
        { status: 500 }
      );
    }

    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!siteUrl) {
      return NextResponse.json(
        { success: false, message: "Missing NEXT_PUBLIC_SITE_URL." },
        { status: 500 }
      );
    }

    const campaigns = await prisma.marketingCampaign.findMany({
      where: {
        status: "scheduled",
        scheduledAt: {
          lte: new Date(),
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
      take: 5,
    });

    let processed = 0;
    const errors = [];

    for (const campaign of campaigns) {
      try {
        const res = await fetch(`${siteUrl}/api/admin/marketing/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-cron-secret": process.env.CRON_SECRET,
          },
          body: JSON.stringify({
            title: campaign.title,
            subject: campaign.subject,
            previewText: campaign.previewText,
            bodyHtml: campaign.bodyHtml,
            heroImage: campaign.heroImage,
            ctaLabel: campaign.ctaLabel,
            ctaUrl: campaign.ctaUrl,
            audience: campaign.audience,
            status: "sent",
          }),
        });

        const json = await res.json().catch(() => null);

        if (!res.ok || json?.success === false) {
          errors.push({
            id: campaign.id,
            title: campaign.title,
            message: json?.message || "Send request failed.",
          });

          continue;
        }

        await prisma.marketingCampaign.update({
          where: { id: campaign.id },
          data: {
            status: "sent",
            sentAt: new Date(),
          },
        });

        processed += 1;
      } catch (error) {
        errors.push({
          id: campaign.id,
          title: campaign.title,
          message: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      failed: errors.length,
      errors,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Cron failed.",
      },
      { status: 500 }
    );
  }
}