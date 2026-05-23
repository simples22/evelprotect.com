import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const [
    campaigns,
    videos,
    audiences,
    sent,
    failed,
    opened,
    clicked,
    unsubscribed,
    activeSubscribers,
  ] = await Promise.all([
    prisma.marketingCampaign.count(),
    prisma.marketingVideo.count(),
    prisma.marketingAudience.count(),
    prisma.marketingEmailLog.count({ where: { status: "sent" } }),
    prisma.marketingEmailLog.count({ where: { status: "failed" } }),
    prisma.marketingEmailLog.count({ where: { openedAt: { not: null } } }),
    prisma.marketingEmailLog.count({ where: { clickedAt: { not: null } } }),
    prisma.marketingEmailLog.count({ where: { unsubscribed: true } }),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
  ]);

  return NextResponse.json({
    success: true,
    stats: {
      campaigns,
      videos,
      audiences,
      sent,
      failed,
      opened,
      clicked,
      unsubscribed,
      activeSubscribers,
      openRate: sent ? Math.round((opened / sent) * 100) : 0,
      clickRate: sent ? Math.round((clicked / sent) * 100) : 0,
    },
  });
}