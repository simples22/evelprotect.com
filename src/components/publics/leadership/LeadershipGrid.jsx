import LeaderCard from "./LeaderCard";

export default function LeadershipGrid({ members = [] }) {
  if (!members.length) return null;

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