import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function makeSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[™®©]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toFloat(value, fallback = null) {
  if (value === "" || value === null || value === undefined) return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toInt(value, fallback = 0) {
  if (value === "" || value === null || value === undefined) return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? Math.trunc(number) : fallback;
}

function cleanString(value, fallback = "") {
  return value === null || value === undefined ? fallback : String(value);
}

export async function PATCH(req, context) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required.",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const title = cleanString(body.title).trim();
    const slug = cleanString(body.slug || makeSlug(title)).trim();

    if (!title || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and slug are required.",
        },
        { status: 400 }
      );
    }

    const item = await prisma.product.update({
      where: { id },
      data: {
        title,
        slug,

        category: cleanString(body.category),
        subCategory: cleanString(body.subCategory, null),
        shortDescription: cleanString(body.shortDescription, null),
        description: cleanString(body.description, null),
        packDescription: cleanString(body.packDescription, null),
        ingredientsText: cleanString(body.ingredientsText, null),

        price: toFloat(body.price, 0),
        compareAtPrice: toFloat(body.compareAtPrice, null),
        currency: cleanString(body.currency || "USD"),

        sizeValue: toFloat(body.sizeValue, null),
        sizeUnit: cleanString(body.sizeUnit, null),
        packSize: toInt(body.packSize, 1),
        pricePerBottle: toFloat(body.pricePerBottle, null),

        image1: cleanString(body.image1),
        image2: cleanString(body.image2, null),
        image3: cleanString(body.image3, null),
        image4: cleanString(body.image4, null),

        tags: cleanString(body.tags, null),

        isPublished: Boolean(body.isPublished),
        isFeatured: Boolean(body.isFeatured),
        isBestSeller: Boolean(body.isBestSeller),

        status: body.isPublished ? "PUBLISHED" : "DRAFT",
      },
    });

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("PATCH product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update product.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required.",
        },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete product.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}