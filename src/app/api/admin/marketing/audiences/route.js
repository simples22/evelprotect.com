import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.marketingAudience.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        members: true,
      },
    });

    return NextResponse.json({ success: true, items });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to load audiences." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, message: "Audience name is required." },
        { status: 400 }
      );
    }

    const item = await prisma.marketingAudience.create({
      data: {
        name: body.name,
        description: body.description || "",
        source: body.source || "custom",
      },
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to create audience." },
      { status: 500 }
    );
  }
}