import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const item = await prisma.contactRequest.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone || null,
        country: body.country || null,
        city: body.city || null,
        company: body.company || null,
        service: body.service || null,
        subject: body.subject || null,
        message: body.message,
        type: "CONTACT",
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Contact request failed." },
      { status: 500 }
    );
  }
}