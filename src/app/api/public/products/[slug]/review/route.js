import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  try {
    const body = await req.json();

    const rating = Number(body.rating);

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Invalid rating." },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found." },
        { status: 404 }
      );
    }

    await prisma.productReview.create({
      data: {
        productId: product.id,
        rating,
        name: body.name || null,
        message: body.message || null,
      },
    });

    const reviews = await prisma.productReview.findMany({
      where: { productId: product.id },
    });

    const ratingAvg =
      reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;

    await prisma.product.update({
      where: { id: product.id },
      data: {
        rating: ratingAvg,
        ratingCount: reviews.length,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to submit review." },
      { status: 500 }
    );
  }
}