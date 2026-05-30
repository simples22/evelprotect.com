import EvelButton from "@/components/publics/ui/EvelButton";

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function number(value) {
  return new Intl.NumberFormat("en-US").format(
    Number(value || 0)
  );
}

export default function BusinessOverview({ data }) {
  if (!data) return null;

  const isUp =
    Number(data.previousChangePct || 0) >= 0;

  return (
    <section className="businessOverviewSection">
      <div className="evelContainer">
        <div className="businessOverviewPanel">
          <div className="businessOverviewGrid">
            <div className="businessOverviewIntro">

              <h2>{data.title}</h2>

              {data.description && (
                <p>{data.description}</p>
              )}
            </div>

            <div className="businessOverviewCards">
              <article className="businessOverviewCard">
                <span>{data.currentYear}</span>

                <h3>
                  {number(data.currentUnitsSold)}
                </h3>

                <p>Sales units</p>

                <strong>
                  {money(data.currentRevenueUsd)}
                </strong>

                <small>Global revenues</small>
              </article>

              <article className="businessOverviewCard">
                <span>{data.previousYear}</span>

                <h3
                  className={
                    isUp ? "isUp" : "isDown"
                  }
                >
                  {isUp ? "+" : ""}
                  {data.previousChangePct}%
                </h3>

                <p>Sales performance</p>

                <strong>
                  {number(data.previousUnitsSold)}
                </strong>

                <small>
                  Products sold ·{" "}
                  {money(data.previousRevenueUsd)}
                </small>
              </article>
            </div>
          </div>

          <div className="businessOverviewBtn">
            <EvelButton
              href="/financial-hightligh"
              variant="primary"
              align="center"
            >
              View more
            </EvelButton>
          </div>
        </div>
      </div>
    </section>
  );
}