import prisma from "@/lib/prisma";
import { AdminDashboard } from "@/components/admin/ui/AdminDashboard";

async function safeCount(model, args) {
  try {
    if (!model?.count) return 0;
    return await model.count(args);
  } catch {
    return 0;
  }
}

async function getMarketingStats() {
  const [
    campaigns,
    sentLogs,
    failedLogs,
    audiences,
    videos,
    subscribers,
  ] = await Promise.all([
    safeCount(prisma.marketingCampaign),

    safeCount(prisma.marketingEmailLog, {
      where: { status: "sent" },
    }),

    safeCount(prisma.marketingEmailLog, {
      where: { status: "failed" },
    }),

    safeCount(prisma.marketingAudience),

    safeCount(prisma.marketingVideo),

    safeCount(prisma.newsletterSubscriber, {
      where: { isActive: true },
    }),
  ]);

  return {
    campaigns,
    sentLogs,
    failedLogs,
    audiences,
    videos,
    subscribers,
  };
}

const marketingCards = [
  {
    title: "Compose Message",
    text: "Create targeted emails, newsletters, promotional launches and direct campaigns.",
    href: "/admin/marketing/compose",
    meta: "Campaign builder",
  },

  {
    title: "Audiences",
    text: "Manage subscribers, contact groups and marketing audience segments.",
    href: "/admin/marketing/audiences",
    meta: "Audience manager",
  },

  {
    title: "Campaigns",
    text: "Review sent campaigns, drafts, scheduled emails and publication history.",
    href: "/admin/marketing/campaigns",
    meta: "Campaign history",
  },

  {
    title: "Marketing Videos",
    text: "Publish promotional videos and public marketing product media.",
    href: "/admin/marketing/videos",
    meta: "Public marketing",
  },

  {
    title: "Sent Logs",
    text: "Monitor delivery status, failed emails and recipient activity.",
    href: "/admin/marketing/logs",
    meta: "Email logs",
  },
];

export default async function MarketingPage() {
  const stats = await getMarketingStats();

  return (
    <AdminDashboard
      eyebrow="Marketing Center"
      title="Manage campaigns, promotional media and customer communication."
      description="Centralized dashboard for campaigns, audiences, newsletters, product marketing videos and public communication tools."
      actionLabel="Create campaign →"
      actionHref="/admin/marketing/compose"
      stats={[
        
        {
          badge: "01",
          value: stats.campaigns,
          text: "Total marketing campaigns created.",
        },

        {
          badge: "02",
          value: stats.sentLogs,
          text: "Successfully delivered marketing emails.",
        },

        {
          badge: "03",
          value: stats.failedLogs,
          text: "Failed or rejected email deliveries.",
        },

        {
          badge: "04",
          value: stats.audiences,
          text: "Audience groups available for targeting.",
        },

        {
          badge: "05",
          value: stats.videos,
          text: "Published promotional marketing videos.",
        },

        {
          badge: "06",
          value: stats.subscribers,
          text: "Active newsletter subscribers available.",
        },
      ]}
      cards={marketingCards}
    />
  );
}