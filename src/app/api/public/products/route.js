import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.product.findMany({
      where: {
        isPublished: true,
      },
      orderBy: [
        { clickCount: "desc" },
        { viewCount: "desc" },
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ success: true, items });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to load products." },
      { status: 500 }
    );
  }
}