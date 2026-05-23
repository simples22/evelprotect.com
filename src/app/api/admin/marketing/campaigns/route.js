import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.marketingCampaign.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        logs: true,
      },
    });

    return NextResponse.json({ success: true, items });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to load campaigns." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title || !body.subject || !body.bodyHtml) {
      return NextResponse.json(
        { success: false, message: "Title, subject and body are required." },
        { status: 400 }
      );
    }

    const item = await prisma.marketingCampaign.create({
      data: {
        title: body.title,
        subject: body.subject,
        previewText: body.previewText || "",
        bodyHtml: body.bodyHtml,
        bodyText: body.bodyText || "",
        heroImage: body.heroImage || "",
        ctaLabel: body.ctaLabel || "",
        ctaUrl: body.ctaUrl || "",
        audience: body.audience || "newsletter",
        status: body.status || "draft",
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
        createdBy: body.createdBy || "admin",
      },
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to create campaign." },
      { status: 500 }
    );
  }
}