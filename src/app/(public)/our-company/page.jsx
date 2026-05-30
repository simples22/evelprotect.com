import prisma from "@/lib/prisma";

import BusinessOverview from "@/components/publics/business/BusinessOverview";
import HeroCompany from "@/components/publics/company/HeroCompany";
import EvelCareerCard from "@/components/publics/contacts/EvelCareerCard";
import CompanyExploreCards from "@/components/publics/about/CompanyExploreCards";

async function safeQuery(query, fallback = null) {
  try {
    return await query();
  } catch (error) {
    console.error("Company page query failed:", error);
    return fallback;
  }
}

async function getBusinessOverview() {
  return safeQuery(() =>
    prisma.businessOverview.findFirst({
      where: {
        isPublished: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
  );
}

export default async function OurCompanyPage() {
  const businessOverview = await getBusinessOverview();

  return (
    <main>
      <HeroCompany />

      {businessOverview && (
        <BusinessOverview data={businessOverview} />
      )}

      <CompanyExploreCards />

      <EvelCareerCard />
    </main>
  );
}