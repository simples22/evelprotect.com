import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Public newsletter API is working.",
  });
}

export async function POST(req) {
  try {
    const data = await req.json();

    const email = String(data.email || "")
      .trim()
      .toLowerCase();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        isActive: true,
        source: data.source || "public-newsletter-form",
      },
      create: {
        email,
        source: data.source || "public-newsletter-form",
        isActive: true,
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully.",
    });
  } catch (error) {
    console.error("PUBLIC_NEWSLETTER_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unable to subscribe right now.",
      },
      { status: 500 }
    );
  }
}