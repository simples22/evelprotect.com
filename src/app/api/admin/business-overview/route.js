import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const item = await prisma.businessOverview.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to load business overview." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const existing = await prisma.businessOverview.findFirst();

    const data = {
      title: body.title || "Business Overview",
      description: body.description || null,
      currentYear: Number(body.currentYear),
      currentUnitsSold: Number(body.currentUnitsSold || 0),
      currentRevenueUsd: Number(body.currentRevenueUsd || 0),
      previousYear: Number(body.previousYear),
      previousChangePct: Number(body.previousChangePct || 0),
      previousUnitsSold: Number(body.previousUnitsSold || 0),
      previousRevenueUsd: Number(body.previousRevenueUsd || 0),
      isPublished: Boolean(body.isPublished),
    };

    const item = existing
      ? await prisma.businessOverview.update({
          where: { id: existing.id },
          data,
        })
      : await prisma.businessOverview.create({ data });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to save business overview." },
      { status: 500 }
    );
  }
}