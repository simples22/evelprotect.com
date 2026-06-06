import LeaderCard from "./LeaderCard";

export default function LeadershipGrid({
  members = [],
  loading = false,
}) {
  if (loading) {
    return (
      <section className="leadershipGridSection">
        <div className="evelContainer">
          <div className="leadershipTopGrid">
            {Array.from({ length: 2 }).map((_, index) => (
              <article
                className="evelSkeletonCard"
                key={`leader-top-skeleton-${index}`}
              >
                <div className="evelSkeletonMedia" />

                <div className="evelSkeletonBody">
                  <span className="evelSkeletonLine is-small" />
                  <span className="evelSkeletonLine is-title" />
                  <span className="evelSkeletonLine" />
                  <span className="evelSkeletonLine is-short" />
                </div>
              </article>
            ))}
          </div>

          <div className="leadershipMembersGrid">
            {Array.from({ length: 6 }).map((_, index) => (
              <article
                className="evelSkeletonCard"
                key={`leader-skeleton-${index}`}
              >
                <div className="evelSkeletonMedia" />

                <div className="evelSkeletonBody">
                  <span className="evelSkeletonLine is-small" />
                  <span className="evelSkeletonLine is-title" />
                  <span className="evelSkeletonLine" />
                  <span className="evelSkeletonLine is-short" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!members.length) {
    return (
      <section className="leadershipGridSection">
        <div className="evelContainer">
          <div className="evelContentEmpty">
            No leadership members available.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="leadershipGridSection">
      <div className="evelContainer">
        <div className="leadershipTopGrid">
          {members.slice(0, 2).map((member, index) => (
            <LeaderCard
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </div>

        <div className="leadershipMembersGrid">
          {members.slice(2).map((member, index) => (
            <LeaderCard
              key={member.id}
              member={member}
              index={index + 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}