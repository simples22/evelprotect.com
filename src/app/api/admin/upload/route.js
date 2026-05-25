import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",

  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",

  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function safeName(name = "file") {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getFolder(type = "") {
  if (type.startsWith("image/")) return "images";
  if (type.startsWith("video/")) return "videos";
  return "documents";
}

export async function POST(req) {
  try {
    console.log("=== UPLOAD STARTED ===");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      console.error("No file received.");

      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded.",
        },
        { status: 400 }
      );
    }

    console.log("FILE INFO:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    if (!allowedTypes.includes(file.type)) {
      console.error("Blocked file type:", file.type);

      return NextResponse.json(
        {
          success: false,
          message: `File type not allowed: ${file.type}`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      console.error("File too large:", file.size);

      return NextResponse.json(
        {
          success: false,
          message: "File is too large. Max allowed is 100MB.",
        },
        { status: 400 }
      );
    }

    const folder = getFolder(file.type);

    const filename = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}-${safeName(file.name)}`;

    console.log("Uploading to Blob:", filename);

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    console.log("UPLOAD SUCCESS:", blob.url);

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      type: file.type,
      size: file.size,
    });
  } catch (error) {
    console.error("=== UPLOAD FAILED ===");
    console.error(error);
    console.error("MESSAGE:", error?.message);
    console.error("STACK:", error?.stack);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed. Please try again.",
        error: String(error?.message || error),
      },
      { status: 500 }
    );
  }
}