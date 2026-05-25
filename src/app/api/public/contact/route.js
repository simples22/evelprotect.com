import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  return trimmed.length ? trimmed : null;
}

export async function POST(req) {
  try {
    const body = await req.json();

    const fullName = clean(body.fullName);
    const email = clean(body.email);
    const message = clean(body.message);

    if (!fullName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Full name, email and message are required.",
        },
        { status: 400 }
      );
    }

    const item = await prisma.contactRequest.create({
      data: {
        fullName,
        email,

        phone: clean(body.phone),
        country: clean(body.country),
        city: clean(body.city),

        company: clean(body.company),
        service: clean(body.service),
        subject: clean(body.subject),

        message,

        type: "CONTACT",

        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("PUBLIC CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Contact request failed.",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}