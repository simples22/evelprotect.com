import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await prisma.contactRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("GET /api/admin/contacts-requests error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load contact requests.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}