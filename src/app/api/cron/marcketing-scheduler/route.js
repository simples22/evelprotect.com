import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const campaigns = await prisma.marketingCampaign.findMany({
    where: {
      status: "scheduled",
      scheduledAt: {
        lte: new Date(),
      },
    },
    take: 5,
  });

  for (const campaign of campaigns) {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/marketing/send`, {
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

    await prisma.marketingCampaign.update({
      where: { id: campaign.id },
      data: {
        status: "sent",
        sentAt: new Date(),
      },
    });
  }

  return NextResponse.json({
    success: true,
    processed: campaigns.length,
  });
}