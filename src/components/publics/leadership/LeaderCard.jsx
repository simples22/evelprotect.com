import Link from "next/link";
import PBImage from "@/components/PBImage";

export default function LeaderCard({
  member,
  index = 0,
  loading = false,
}) {
  if (loading || !member) {
    return (
      <article className="evelSkeletonCard">
        <div className="evelSkeletonMedia" />

        <div className="evelSkeletonBody">
          <span className="evelSkeletonLine is-small" />
          <span className="evelSkeletonLine is-title" />
          <span className="evelSkeletonLine" />
          <span className="evelSkeletonLine is-short" />
        </div>
      </article>
    );
  }

  return (
    <article
      className={`leaderCard ${
        index < 2 ? "isTopLeader" : ""
      }`}
    >
      <Link
        href={`/leadership/${member.slug}`}
        className="leaderCardLink"
      >
        <div className="leaderCardMedia">
          <PBImage
            src={
              member.imageUrl ||
              "/images/company/leader-placeholder.jpg"
            }
            alt={member.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="leaderCardImg"
          />
        </div>

        <div className="leaderCardBody">
          <span>
            {member.division || "Leadership"}
          </span>

          <h3>{member.name}</h3>

          <p>
            {member.functionTitle ||
              "Executive Leadership"}
          </p>

          <strong className="leaderCardView">
            View Profile →
          </strong>
        </div>
      </Link>
    </article>
  );
}