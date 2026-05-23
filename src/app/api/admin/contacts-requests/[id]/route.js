import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();

    const item = await prisma.contactRequest.update({
      where: { id: params.id },
      data: {
        status: body.status,
        isRead: body.isRead,
        adminNotes: body.adminNotes,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update contact request." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.contactRequest.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete contact request." },
      { status: 500 }
    );
  }
}