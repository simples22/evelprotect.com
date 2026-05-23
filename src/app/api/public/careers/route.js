import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.position || !body.consent) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const item = await prisma.jobApplication.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone || null,
        city: body.city || null,
        country: body.country || null,
        address: body.address || null,

        linkedinUrl: body.linkedinUrl || null,
        portfolioUrl: body.portfolioUrl || null,

        position: body.position,
        department: body.department || null,
        employmentType: body.employmentType || null,
        workMode: body.workMode || null,

        availability: body.availability || null,
        salaryExpected: body.salaryExpected || null,

        resumeUrl: body.resumeUrl || null,
        coverLetter: body.coverLetter || null,
        portfolioFileUrl: body.portfolioFileUrl || null,
        extraDocumentUrl: body.extraDocumentUrl || null,

        experienceYears: body.experienceYears
          ? Number(body.experienceYears)
          : null,

        currentCompany: body.currentCompany || null,
        currentRole: body.currentRole || null,
        skills: body.skills || null,
        languages: body.languages || null,

        whyJoin: body.whyJoin || null,
        whyGoodCandidate: body.whyGoodCandidate || null,
        workedInIndustry: body.workedInIndustry || null,
        authorizedWork: body.authorizedWork === "yes",
        needSponsorship: body.needSponsorship === "yes",

        consent: Boolean(body.consent),
        status: "NEW",
        isRead: false,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Application failed." },
      { status: 500 }
    );
  }
}