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

    const item = await prisma.marketingVideo.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug || makeSlug(body.title),
        excerpt: body.excerpt || "",
        videoUrl: body.videoUrl,
        thumbnail: body.thumbnail || "",
        productName: body.productName || "",
        category: body.category || "",
        isPublished: Boolean(body.isPublished),
        isFeatured: Boolean(body.isFeatured),
      },
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to update video." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  await prisma.marketingVideo.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}