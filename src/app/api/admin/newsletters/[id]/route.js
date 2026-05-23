import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const data = await req.json();

    const item = await prisma.newsletterSubscriber.update({
      where: {
        id: params.id,
      },
      data: {
        isActive:
          typeof data.isActive === "boolean" ? data.isActive : undefined,
        isRead: typeof data.isRead === "boolean" ? data.isRead : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to update subscriber.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.newsletterSubscriber.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete subscriber.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}