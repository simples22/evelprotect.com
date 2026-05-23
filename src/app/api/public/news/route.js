import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.min(Number(searchParams.get("limit") || 6), 24);
    const search = searchParams.get("search") || "";
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const sort = searchParams.get("sort") || "latest";
    const types = searchParams.get("types")?.split(",").filter(Boolean) || [];

    const where = {
      isPublished: true,

      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } },
          { body: { contains: search, mode: "insensitive" } },
        ],
      }),

      ...(types.length && {
        category: { in: types },
      }),

      ...(from || to
        ? {
            publishedAt: {
              ...(from ? { gte: new Date(from) } : {}),
              ...(to ? { lte: new Date(to) } : {}),
            },
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.newsArticle.findMany({
        where,
        orderBy: [
          { isFeatured: "desc" },
          {
            publishedAt: sort === "oldest" ? "asc" : "desc",
          },
          {
            createdAt: sort === "oldest" ? "asc" : "desc",
          },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.newsArticle.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      items,
      total,
      page,
      limit,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to load news.", error: error.message },
      { status: 500 }
    );
  }
}