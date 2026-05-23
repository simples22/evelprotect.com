import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET() {
  try {
    const items = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, items });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to load products." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const title = body.title?.trim();
    const slug = body.slug?.trim() || makeSlug(title);

    if (!title || !body.category || !body.price || !body.image1) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const item = await prisma.product.create({
      data: {
        title,
        slug,
        category: body.category,
        subCategory: body.subCategory || null,

        shortDescription: body.shortDescription || null,
        description: body.description || null,
        packDescription: body.packDescription || null,
        ingredientsText: body.ingredientsText || null,

        price: Number(body.price),
        compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null,
        currency: body.currency || "USD",

        sizeValue: body.sizeValue ? Number(body.sizeValue) : null,
        sizeUnit: body.sizeUnit || null,
        packSize: body.packSize ? Number(body.packSize) : 1,
        pricePerBottle: body.pricePerBottle ? Number(body.pricePerBottle) : null,

        image1: body.image1,
        image2: body.image2 || null,
        image3: body.image3 || null,
        image4: body.image4 || null,

        tags: body.tags || null,

        isPublished: Boolean(body.isPublished),
        isFeatured: Boolean(body.isFeatured),
        isBestSeller: Boolean(body.isBestSeller),

        status: body.isPublished ? "PUBLISHED" : "DRAFT",
      },
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to create product." },
      { status: 500 }
    );
  }
}