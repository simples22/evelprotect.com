import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const item = await prisma.leadershipMember.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        functionTitle: body.functionTitle,
        displayOrder: Number(body.displayOrder || 0),

        positions: Array.isArray(body.positions) ? body.positions : [],

        linkedinUrl: body.linkedinUrl || null,
        facebookUrl: body.facebookUrl || null,
        instagramUrl: body.instagramUrl || null,
        xUrl: body.xUrl || null,

        division: body.division || null,
        imageUrl: body.imageUrl || null,
        heroDescription: body.heroDescription || null,
        bio: body.bio || null,
        careerSummary: body.careerSummary || null,
        formationOne: body.formationOne || null,
        formationTwo: body.formationTwo || null,
        joinedAt: body.joinedAt ? new Date(body.joinedAt) : null,
        bioFileUrl: body.bioFileUrl || null,

        isPublished: Boolean(body.isPublished),
        isFeatured: Boolean(body.isFeatured),
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Leadership PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.code === "P2002"
            ? "This slug already exists. Please use another slug."
            : error?.message || "Unable to update leadership profile.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.leadershipMember.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Leadership DELETE error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete leadership profile." },
      { status: 500 }
    );
  }
}