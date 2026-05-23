import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/™/g, "")
    .replace(/®/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function cleanDate(value) {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing news id." },
        { status: 400 }
      );
    }

    if (!data.title) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }

    const item = await prisma.newsArticle.update({
      where: { id },
      data: {
        title: data.title,
        slug: slugify(data.slug || data.title),

        excerpt: data.excerpt || "",
        body: data.body || "",
        imageUrl: data.imageUrl || "",
        category: data.category || "",

        introTitle: data.introTitle || "",
        introduction: data.introduction || "",

        authorTitle: data.authorTitle || "",
        authorFunction: data.authorFunction || "",
        authorCompany: data.authorCompany || "",
        authorBio: data.authorBio || "",
        authorImageUrl: data.authorImageUrl || "",

        approachTitle: data.approachTitle || "",
        approachBody: data.approachBody || "",

        sourceLabel: data.sourceLabel || "",
        sourceUrl: data.sourceUrl || "",

        conclusionTitle: data.conclusionTitle || "",
        conclusionBody: data.conclusionBody || "",

        isPublished: Boolean(data.isPublished),
        isFeatured: Boolean(data.isFeatured),
        publishedAt: data.isPublished
          ? cleanDate(data.publishedAt) || new Date()
          : null,
      },
    });

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("PATCH /api/admin/news/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update news article.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing news id." },
        { status: 400 }
      );
    }

    await prisma.newsArticle.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE /api/admin/news/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete news article.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}