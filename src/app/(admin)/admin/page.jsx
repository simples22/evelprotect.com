import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  faChartLine,
  faNewspaper,
  faEnvelopeOpenText,
  faBullhorn,
  faLeaf,
  faAddressBook,
  faUsers,
  faBoxOpen,
  faBriefcase,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminCompareChart from "@/components/admin/ui/AdminCompareChart";

async function safeCount(model, args) {
  try {
    if (!model?.count) return 0;
    return await model.count(args);
  } catch {
    return 0;
  }
}

async function getDashboardStats() {
  const [
    news,
    publishedNews,
    subscribers,
    marketingCampaigns,
    marketingLogs,
    sustainability,
    contacts,
    applications,
    leadership,
    products,
    publishedProducts,
  ] = await Promise.all([
    safeCount(prisma.newsArticle),
    safeCount(prisma.newsArticle, { where: { isPublished: true } }),
    safeCount(prisma.newsletterSubscriber, { where: { isActive: true } }),
    safeCount(prisma.marketingCampaign),
    safeCount(prisma.marketingEmailLog),
    safeCount(prisma.sustainabilityPost),
    safeCount(prisma.contactRequest),
    safeCount(prisma.applicationRequest),
    safeCount(prisma.leadership),
    safeCount(prisma.product),
    safeCount(prisma.product, { where: { isPublished: true } }),
  ]);

  return {
    news,
    publishedNews,
    subscribers,
    marketingCampaigns,
    marketingLogs,
    sustainability,
    contacts,
    applications,
    leadership,
    products,
    publishedProducts,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      title: "News",
      text: "Manage articles, company updates and public announcements.",
      href: "/admin/news",
      value: stats.news,
      icon: faNewspaper,
    },
    {
      title: "Newsletters",
      text: "Review active subscribers and newsletter audience growth.",
      href: "/admin/newsletters",
      value: stats.subscribers,
      icon: faEnvelopeOpenText,
    },
    {
      title: "Marketing",
      text: "Campaigns, emails, logs, videos and promotional publishing.",
      href: "/admin/marketing",
      value: stats.marketingCampaigns,
      icon: faBullhorn,
    },
    {
      title: "Sustainability",
      text: "Publish sustainability resources, documents and company topics.",
      href: "/admin/sustainability",
      value: stats.sustainability,
      icon: faLeaf,
    },
    {
      title: "Contacts",
      text: "Manage customer, supplier and business contact requests.",
      href: "/admin/contacts-requests",
      value: stats.contacts,
      icon: faAddressBook,
    },
    {
      title: "Applications Requests",
      text: "Review employment, partnership or applicant submissions.",
      href: "/admin/applications",
      value: stats.applications,
      icon: faBriefcase,
    },
    {
      title: "Leadership",
      text: "Manage leadership profiles and company people content.",
      href: "/admin/leadership",
      value: stats.leadership,
      icon: faUsers,
    },
    {
      title: "Products",
      text: "Manage product catalog, pricing, publishing and product details.",
      href: "/admin/products",
      value: stats.products,
      icon: faBoxOpen,
    },
  ];

  const maxValue = Math.max(...cards.map((card) => card.value), 1);

  return (
    <main className="adminMainDashboard">

      <section className="adminMainStats">
        <article>
          <span>Published News</span>
          <strong>{stats.publishedNews}</strong>
          <p>{stats.news} total articles</p>
        </article>

        <article>
          <span>Active Subscribers</span>
          <strong>{stats.subscribers}</strong>
          <p>Newsletter audience</p>
        </article>

        <article>
          <span>Published Products</span>
          <strong>{stats.publishedProducts}</strong>
          <p>{stats.products} total products</p>
        </article>

        <article>
          <span>Email Logs</span>
          <strong>{stats.marketingLogs}</strong>
          <p>Marketing delivery history</p>
        </article>
      </section>

      <section className="adminMainSection">
        <details className="adminMainOverviewAccordion" open>
          <summary>
            <div className="adminMainSectionHead">
              <div>
                <span>Workspace</span>
                <h2>Admin modules and company operations.</h2>
              </div>

              <p>
                Open each department to create, edit, publish, review and manage
                the live website system.
              </p>
            </div>

            <span className="adminMainOverviewIcon">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </summary>

          <div className="adminMainOverviewBody">
            <div className="adminMainCards">
              {cards.map((card) => (
                <Link href={card.href} className="adminMainCard" key={card.href}>
                  <div className="adminMainCardTop">
                    <span>
                      <FontAwesomeIcon icon={card.icon} />
                    </span>

                    <strong>{card.value}</strong>
                  </div>

                  <h3>{card.title}</h3>

                  <p>{card.text}</p>

                  <em>Open →</em>
                </Link>
              ))}
            </div>
          </div>
        </details>
      </section>

     <section className="adminMainSection">
        <details className="adminMainOverviewAccordion">
          <summary>
            <div className="adminMainSectionHead">
              <div>
                <span>Overview</span>
                <h2>Activity distribution by admin module.</h2>
              </div>

              <p>
                A simple operational chart showing where most content and activity
                currently lives.
              </p>
            </div>

            <span className="adminMainOverviewIcon">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </summary>

          <div className="adminMainOverviewBody">
            <div className="adminMainChart">
              {cards.map((card) => (
                <div className="adminMainChartRow" key={card.title}>
                  <span>{card.title}</span>

                  <div>
                    <i
                      style={{
                        width: `${Math.max(6, (card.value / maxValue) * 100)}%`,
                      }}
                    />
                  </div>

                  <strong>{card.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </details>
      </section>


      <AdminCompareChart
        title="Compare admin modules one by one."
        subtitle="Select one section to view its total activity and compare its behavior against the rest of the admin workspace."
        items={cards.map((card) => ({
          label: card.title,
          value: card.value,
          title: `${card.title} activity`,
          description: card.text,
        }))}
      />
    </main>
  );
}