import prisma from "@/lib/prisma";

import BusinessOverview from "@/components/publics/business/BusinessOverview";
import FinancialHero from "@/components/publics/company/FinancialHero";

async function safeQuery(query, fallback = null) {
  try {
    return await query();
  } catch (error) {
    console.error("Financial page query failed:", error);
    return fallback;
  }
}

async function getBusinessOverview() {
  return safeQuery(
    () =>
      prisma.businessOverview.findFirst({
        where: {
          isPublished: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),
    null
  );
}

export default async function FinancialHightLighPage() {
  const businessOverview = await getBusinessOverview();

  return (
    <main>
      <FinancialHero />

      <BusinessOverview data={businessOverview} />
    </main>
  );
}