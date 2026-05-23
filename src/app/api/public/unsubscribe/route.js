import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { email, token } = await req.json();

    if (!email && !token) {
      return NextResponse.json(
        { success: false, message: "Missing unsubscribe information." },
        { status: 400 }
      );
    }

    const where = token ? { unsubscribeToken: token } : { email };

    await prisma.newsletterSubscriber.update({
      where,
      data: { isActive: false },
    });

    return NextResponse.json({
      success: true,
      message: "You hevel been unsubscribed.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to unsubscribe." },
      { status: 500 }
    );
  }
}