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
  try {
    const items = await prisma.marketingVideo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("GET marketing videos error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load videos.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title || !body.videoUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and video are required.",
        },
        {
          status: 400,
        }
      );
    }

    const item = await prisma.marketingVideo.create({
      data: {
        title: body.title,
        slug: body.slug || makeSlug(body.title),
        excerpt: body.excerpt || "",
        videoUrl: body.videoUrl || "",
        thumbnail: body.thumbnail || "",
        productName: body.productName || "",
        category: body.category || "",
        isPublished: Boolean(body.isPublished),
        isFeatured: Boolean(body.isFeatured),
      },
    });

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("POST marketing videos error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create video.",
      },
      {
        status: 500,
      }
    );
  }
}