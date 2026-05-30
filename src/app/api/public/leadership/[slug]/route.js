import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    const member = await prisma.leadershipMember.findFirst({
      where: {
        slug,
        isPublished: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      item: member,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}