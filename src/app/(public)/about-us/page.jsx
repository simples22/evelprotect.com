import AboutHero from "@/components/publics/company/AboutHero";

export const metadata = {
  title: "About Us | EVEL Cosmetics Companies",
  description:
    "EVEL Cosmetics Companies is a beauty and personal care company focused on brand development, consumer care, and modern beauty direction.",
};

const pillars = [
  {
    title: "Brand Development",
    text: "EVEL Cosmetics Companies develops beauty and personal care concepts focused on modern identity, premium presentation, and long-term brand positioning. The company’s direction combines visual consistency, consumer trust, clean communication, and scalable beauty-oriented branding designed for future growth across multiple personal care categories.",
  },
  {
    title: "Consumer Care",
    text: "Our approach is centered around everyday confidence, accessible premium care, and modern consumer expectations. EVEL focuses on creating a professional beauty environment that supports personal care routines, product accessibility, lifestyle-oriented wellness, and a clean user experience across digital and future retail channels.",
  },
  {
    title: "Beauty Platform",
    text: "EVEL Cosmetics Companies operates as a modern beauty platform supporting cosmetics, grooming, skincare, body care, wellness, and future lifestyle-oriented beauty initiatives. The platform is structured to support future product expansion, digital presentation, consumer engagement, and long-term development within the beauty and personal care industry.",
  },
];

const divisions = [
  "EVEL Cosmetics",
  "EVEL Beauty",
  "EVEL Body & Care",
  "EVEL Men Care",
  "EVEL Pure Care",
];

const operations = [
  {
    title: "Brand strategy",
    text: "EVEL Cosmetics Companies develops a clear brand direction built around modern beauty, personal care, and consumer confidence. This includes the company’s identity, tone of voice, visual presentation, market positioning, and the long-term structure needed to support future EVEL beauty categories.",
  },
  {
    title: "Beauty product direction",
    text: "The company studies consumer needs, beauty routines, packaging direction, product categories, and market opportunities to guide future product development. The goal is to create beauty and personal care concepts that feel premium, practical, and aligned with everyday consumer lifestyles.",
  },
  {
    title: "Consumer experience",
    text: "EVEL focuses on building a consumer experience that is simple, trustworthy, and easy to understand. From website presentation to product communication, the company aims to make beauty discovery clear, accessible, and professional for customers, partners, and future retail opportunities.",
  },
  {
    title: "Affiliate and referral oversight",
    text: "The company may support affiliate, referral, or partner-based beauty programs with transparency and responsible communication. This includes clear product information, honest consumer guidance, and organized oversight of how third-party products or partner selections are presented through the platform.",
  },
  {
    title: "Retail and digital presentation",
    text: "EVEL Cosmetics Companies manages how the brand is presented across digital channels, product pages, retail concepts, and investor-facing materials. The focus is on clean visual standards, professional messaging, strong brand consistency, and a premium presentation suitable for online and future retail environments.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="evelAboutPage">
   <AboutHero />

      <section className="evelAboutSection">
        <div className="evelContainer evelNumberLayout">
          <aside className="evelNumberSide">
            <span className="evelSectionNumber">01</span>
          </aside>

          <div className="evelNumberContent">
            <div className="evelMobileTitleRow">
              <span className="evelMobileNumber">01</span>
              <h2>Company Overview</h2>
            </div>

            <p>
              EVEL™ Cosmetics Companies, operates as a beauty-focused company
              dedicated to brand development, consumer product direction, and
              modern personal care presentation.
            </p>
            <p>
              The company’s mission is to create a trusted beauty identity that
              connects quality, simplicity, and everyday confidence.
            </p>
            <p>
              The EVEL™ identity is designed to support future growth across
              beauty, cosmetics, body care, grooming, wellness, and digital
              consumer discovery.
            </p>
          </div>
        </div>
      </section>

      <section className="evelAboutSection evelAboutLight">
        <div className="evelContainer evelNumberLayout">
          <aside className="evelNumberSide">
            <span className="evelSectionNumber">02</span>
          </aside>

          <div className="evelNumberContent">
            <div className="evelMobileTitleRow">
              <span className="evelMobileNumber">02</span>
              <h2>Core Direction</h2>
            </div>

            <div className="evelPillarGrid">
              {pillars.map((item) => (
                <article className="evelPillarCard" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="evelAboutSection">
        <div className="evelContainer evelNumberLayout">
          <aside className="evelNumberSide">
            <span className="evelSectionNumber">03</span>
          </aside>

          <div className="evelNumberContent">
            <div className="evelMobileTitleRow">
              <span className="evelMobileNumber">03</span>
              <h2>Brand Architecture</h2>
            </div>

            <p>
              The EVEL brand architecture is organized to support one corporate
              identity with multiple beauty and personal care directions. Each
              division can grow independently while remaining connected to the
              same premium EVEL ecosystem.
            </p>

            <div className="evelDivisionGrid">
              {divisions.map((item) => (
                <div className="evelDivisionItem" key={item}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="evelAboutSection evelAboutDark">
        <div className="evelContainer evelNumberLayout">
          <aside className="evelNumberSide">
            <span className="evelSectionNumber evelSectionNumberLight">04</span>
          </aside>

          <div className="evelNumberContent">
            <span className="evelEyebrow">Our Position</span>

            <div className="evelMobileTitleRow">
              <span className="evelMobileNumber evelMobileNumberLight">04</span>
              <h2> Premium beauty made simple, modern, and accessible.</h2>
            </div>

            <p>
              EVEL Cosmetics Companies aims to create a professional beauty
              presence that can serve consumers, partners, retailers, and future
              brand opportunities with clarity and consistency.
            </p>
          </div>
        </div>
      </section>

      <section className="evelAboutSection">
        <div className="evelContainer evelNumberLayout">
          <aside className="evelNumberSide">
            <span className="evelSectionNumber">05</span>
          </aside>

          <div className="evelNumberContent">
            <div className="evelMobileTitleRow">
              <span className="evelMobileNumber">05</span>
              <h2>Management Focus</h2>
            </div>

            <p>
              The management direction supports platform operations, beauty
              brand development, consumer communication, and responsible product
              presentation.
            </p>

            <div className="evelAccordionList">
              {operations.map((item) => (
                <details className="evelAccordionItem" key={item.title}>
                  <summary>
                    <span>{item.title}</span>
                    <strong>+</strong>
                  </summary>
                  <p>{item.text}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="evelAboutSection evelAboutLight">
        <div className="evelContainer evelNumberLayout">
          <aside className="evelNumberSide">
            <span className="evelSectionNumber">06</span>
          </aside>

          <div className="evelNumberContent">
            <span className="evelEyebrow">EVEL</span>

            <div className="evelMobileTitleRow">
                <span className="evelMobileNumber">06</span>
                <h2>Building a modern beauty ecosystem </h2>
                </div>

                <p>
                EVEL Cosmetics Companies is structured to support the long-term
                development of beauty, personal care, grooming, and lifestyle-oriented
                initiatives through a modern and scalable brand ecosystem. The company’s
                direction combines thoughtful branding, consumer-focused presentation,
                accessible premium positioning, and future expansion opportunities designed
                to support sustainable growth across digital, retail, and beauty-related
                markets.
                </p>
          </div>
        </div>
      </section>
    </main>
  );
}