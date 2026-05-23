import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const product = await prisma.product.update({
      where: { slug: params.slug },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      include: {
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({ success: true, product });
  } catch {
    return NextResponse.json(
      { success: false, message: "Product not found." },
      { status: 404 }
    );
  }
}