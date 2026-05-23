import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function makeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const title = body.title?.trim();

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }

    const item = await prisma.sustainabilityPost.update({
      where: { id },
      data: {
        ...body,
        title,
        slug: body.slug?.trim() || makeSlug(title),
        isPublished: Boolean(body.isPublished),
        isFeatured: Boolean(body.isFeatured),
      },
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to update sustainability post." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  await prisma.sustainabilityPost.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}