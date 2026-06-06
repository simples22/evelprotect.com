import prisma from "@/lib/prisma";

import CompanyHero from "@/components/publics/company/CompanyHero";
import BusinessOverview from "@/components/publics/business/BusinessOverview";
import CompanyExploreCards from "@/components/publics/about/CompanyExploreCards";
import EvelCareerCard from "@/components/publics/contacts/EvelCareerCard";

export const metadata = {
  title: "Our Company | Evel Protect™",
  description:
    "Learn more about Evel Protect™ Company, our business direction, leadership, and beauty and personal care vision.",
};

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
      <CompanyHero />

      {businessOverview && <BusinessOverview data={businessOverview} />}

      <CompanyExploreCards />

      <EvelCareerCard />
    </main>
  );
}