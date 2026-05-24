import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req, context) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing application id." },
        { status: 400 }
      );
    }

    const body = await req.json();

    const item = await prisma.jobApplication.update({
      where: { id },
      data: {
        status: body.status || "NEW",
        isRead: Boolean(body.isRead),
        adminNotes: body.adminNotes || "",
        candidateScore:
          body.candidateScore !== undefined &&
          body.candidateScore !== null &&
          body.candidateScore !== ""
            ? Number(body.candidateScore)
            : null,
        tags: body.tags || "",
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("PATCH /api/admin/applications/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update application.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing application id." },
        { status: 400 }
      );
    }

    await prisma.jobApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/applications/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete application.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}