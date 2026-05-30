import prisma from "@/lib/prisma";
import EvelButton from "@/components/publics/ui/EvelButton";
import LeadershipHero from "@/components/publics/company/LeadershipHero";
import LeadershipGrid from "@/components/publics/leadership/LeadershipGrid";

async function getMembers() {
  try {
    return await prisma.leadershipMember.findMany({
      where: { isPublished: true },
      orderBy: [
        { displayOrder: "asc" },
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    });
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Leadership | Evel Protect™ Official Web",
  description:
    "Meet the leadership team supporting EVEL Protect™ Beauty and Personal Care direction.",
};

export default async function LeadershipPage() {
  const members = await getMembers();

  return (
    <main>
<LeadershipHero />

      <section className="leadershipHero">
        <div className="evelContainer leadershipHeroGrid">
          <div>
            <h1>Our Team worker's</h1>
          </div>

          <div>
            <p>
              Evel Protect™ Company is building a modern Beauty and Personal
              Care organization through responsible leadership, product vision,
              operational discipline, and long-term consumer trust.
            </p>

            <p className="leadershipHeroItalic">
              For more information or help, contact our consumer relations team.
            </p>

            <EvelButton href="/contact" variant="primary" align="left">
              Join Us Now (US, EN)
            </EvelButton>
          </div>
        </div>
      </section>
      <LeadershipGrid members={members} />
    </main>
  );
}

