import prisma from "@/lib/prisma";

const pixel = Buffer.from(
  "R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
  "base64"
);

export async function GET(req, { params }) {
  const { id } = await params;

  await prisma.marketingEmailLog.updateMany({
    where: { id },
    data: { openedAt: new Date() },
  });

  return new Response(pixel, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store",
    },
  });
}