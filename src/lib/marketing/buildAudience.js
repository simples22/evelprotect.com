import prisma from "@/lib/prisma";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export async function getMarketingRecipients(audience = "all") {
  const recipients = [];

  if (audience === "newsletter" || audience === "all") {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      select: {
        id: true,
        email: true,
        fullName: true,
        unsubscribeToken: true,
      },
    });

    subscribers.forEach((item) => {
      if (!isValidEmail(item.email)) return;

      recipients.push({
        email: item.email.trim().toLowerCase(),
        fullName: item.fullName || "",
        phone: "",
        source: "newsletter",
        sourceId: item.id,
        unsubscribeToken: item.unsubscribeToken,
      });
    });
  }

  if (audience === "contacts" || audience === "all") {
    const contacts = await prisma.contactMessage.findMany({
      where: {
        email: {
          not: null,
        },
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
      },
    });

    contacts.forEach((item) => {
      if (!isValidEmail(item.email)) return;

      recipients.push({
        email: item.email.trim().toLowerCase(),
        fullName: item.fullName || "",
        phone: item.phone || "",
        source: "contact",
        sourceId: item.id,
      });
    });
  }

  const unique = new Map();

  recipients.forEach((item) => {
    unique.set(item.email, item);
  });

  return Array.from(unique.values());
}