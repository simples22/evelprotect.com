import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = await params;
  const url = req.nextUrl.searchParams.get("url") || "/";

  await prisma.marketingEmailLog.updateMany({
    where: { id },
    data: { clickedAt: new Date() },
  });

  return NextResponse.redirect(url);
}