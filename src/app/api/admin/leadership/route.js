import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  try {
    const items = await prisma.leadershipMember.findMany({
      orderBy: [
        { displayOrder: "asc" },
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Leadership GET error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to load leadership members." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required." },
        { status: 400 }
      );
    }

    const slug = body.slug?.trim() || slugify(name);

    const item = await prisma.leadershipMember.create({
      data: {
        name,
        slug,
        functionTitle: body.functionTitle || "",
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
    console.error("Leadership POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.code === "P2002"
            ? "This slug already exists. Please use another slug."
            : error?.message || "Unable to create leadership profile.",
      },
      { status: 500 }
    );
  }
}