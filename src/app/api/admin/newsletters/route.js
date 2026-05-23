import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.newsletterSubscriber.findMany({
      orderBy: {
        subscribedAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to load subscribers.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}