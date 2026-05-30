import Link from "next/link";
import Image from "next/image";

export default function LeaderCard({ member, index = 0 }) {
  return (
    <article className={`leaderCard ${index < 2 ? "isTopLeader" : ""}`}>
      <Link href={`/leadership/${member.slug}`} className="leaderCardLink">
        <div className="leaderCardMedia">
          <Image
            src={member.imageUrl || "/images/company/leader-placeholder.jpg"}
            alt={member.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="leaderCardImg"
          />
        </div>

        <div className="leaderCardBody">
          <span>{member.division || "Leadership"}</span>
          <h3>{member.name}</h3>
          <p>{member.functionTitle}</p>

          <strong className="leaderCardView">View profile →</strong>
        </div>
      </Link>
    </article>
  );
}