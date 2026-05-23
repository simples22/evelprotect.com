import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();

    const item = await prisma.jobApplication.update({
      where: { id: params.id },
      data: {
        status: body.status,
        isRead: body.isRead,
        adminNotes: body.adminNotes,
        candidateScore: body.candidateScore
          ? Number(body.candidateScore)
          : null,
        tags: body.tags,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update application." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.jobApplication.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete application." },
      { status: 500 }
    );
  }
}