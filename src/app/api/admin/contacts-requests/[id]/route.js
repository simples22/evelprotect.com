import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  return trimmed.length ? trimmed : null;
}

export async function PATCH(req, context) {
  try {
    const { params } = context;
    const { id } = await params;

    const body = await req.json();

    const item = await prisma.contactRequest.update({
      where: {
        id,
      },

      data: {
        status: clean(body.status) || "PENDING",

        isRead:
          typeof body.isRead === "boolean"
            ? body.isRead
            : undefined,

        adminNotes: clean(body.adminNotes),
      },
    });

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    console.error(
      "PATCH /api/admin/contacts-requests/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update contact request.",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { params } = context;
    const { id } = await params;

    await prisma.contactRequest.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE /api/admin/contacts-requests/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete contact request.",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}