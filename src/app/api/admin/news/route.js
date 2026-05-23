import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function slugify(value = "") {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const items = await prisma.newsArticle.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to load news.", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.title) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }

    const item = await prisma.newsArticle.create({
      data: {
        title: data.title,
        slug: data.slug ? slugify(data.slug) : slugify(data.title),
        excerpt: data.excerpt || "",
        body: data.body || "",
        imageUrl: data.imageUrl || "",
        category: data.category || "Company",

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
        publishedAt: data.isPublished ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to create news.", error: error.message },
      { status: 500 }
    );
  }
}