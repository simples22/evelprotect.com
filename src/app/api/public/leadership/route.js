import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const members = await prisma.leadershipMember.findMany({
      where: {
        isPublished: true,
      },
      orderBy: [
        { displayOrder: "asc" },
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({
      success: true,
      items: members,
    });
  } catch (error) {
    console.error("Leadership API Error:", error);

    return NextResponse.json(
      {
        success: false,
        items: [],
      },
      { status: 500 }
    );
  }
}