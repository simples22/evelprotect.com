import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.marketingEmailLog.findMany({
      orderBy: { sentAt: "desc" },
      take: 300,
    });

    return NextResponse.json({ success: true, items });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to load logs." },
      { status: 500 }
    );
  }
}