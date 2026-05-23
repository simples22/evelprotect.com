import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const item = await prisma.marketingAudience.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description || "",
        source: body.source || "custom",
      },
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to update audience." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.marketingAudience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to delete audience." },
      { status: 500 }
    );
  }
}