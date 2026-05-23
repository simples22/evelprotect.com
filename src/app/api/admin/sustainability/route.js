import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function makeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const items = await prisma.sustainabilityPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, items });
}

export async function POST(req) {
  try {
    const body = await req.json();

    const title = body.title?.trim();

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }

    const item = await prisma.sustainabilityPost.create({
      data: {
        ...body,
        title,
        slug: body.slug?.trim() || makeSlug(title),
        isPublished: Boolean(body.isPublished),
        isFeatured: Boolean(body.isFeatured),
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to create sustainability post." },
      { status: 500 }
    );
  }
}