import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const item = await prisma.businessOverview.findFirst({
      where: { isPublished: true },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to load overview." },
      { status: 500 }
    );
  }
}