import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const item = await prisma.marketingCampaign.update({
      where: { id },
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
      },
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to update campaign." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.marketingCampaign.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to delete campaign." },
      { status: 500 }
    );
  }
}