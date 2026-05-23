import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const member = await prisma.marketingAudienceMember.upsert({
      where: {
        audienceId_email: {
          audienceId: id,
          email: body.email,
        },
      },
      update: {
        fullName: body.fullName || "",
        phone: body.phone || "",
        source: body.source || "manual",
        isActive: Boolean(body.isActive ?? true),
      },
      create: {
        audienceId: id,
        email: body.email,
        fullName: body.fullName || "",
        phone: body.phone || "",
        source: body.source || "manual",
        isActive: Boolean(body.isActive ?? true),
      },
    });

    return NextResponse.json({ success: true, member });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to add member." },
      { status: 500 }
    );
  }
}