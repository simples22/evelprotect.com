import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

import EvelButton from "@/components/publics/ui/EvelButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US");
}

function paragraphs(text = "") {
  return String(text)
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

async function getMember(slug) {
  try {
    return await prisma.leadershipMember.findFirst({
      where: {
        slug,
        isPublished: true,
      },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = await getMember(slug);

  return {
    title: member
      ? `${member.name} | Leadership | EVEL Protect`
      : "Leadership Profile | EVEL Protect",
    description: member?.heroDescription || member?.functionTitle || "",
  };
}

export default async function LeadershipProfilePage({ params }) {
  const { slug } = await params;
  const member = await getMember(slug);

  if (!member) notFound();

  const bioParagraphs = paragraphs(member.bio);
  const positions = Array.isArray(member.positions) ? member.positions : [];

  return (
    <main className="leadershipProfilePage">
      <section className="leadershipProfileTop">
        <div className="evelContainer">
          <EvelButton href="/leadership" variant="secondary" align="left">
            Back to Leadership
          </EvelButton>

          <div className="leadershipProfileGrid">
            <div className="leadershipProfileMedia">
              <Image
                src={member.imageUrl || "/images/company/leader-placeholder.jpg"}
                alt={member.name}
                fill
                priority
                sizes="(max-width:768px) 100vw, 40vw"
                className="leadershipProfileImg"
              />
            </div>

            <div className="leadershipProfileMeta">
              <span>{member.division || "Enterprise Division"}</span>

              <h1>{member.name}</h1>

              <div className="leadershipProfileFunction">
                <h2>{member.functionTitle}</h2>

                {member.heroDescription && <p>{member.heroDescription}</p>}
              </div>

                <div className="leadershipProfileFacts">

                <div>
                    <strong>Formation 1</strong>
                    <span>{member.formationOne}</span>
                </div>

                <div>
                    <strong>Formation 2</strong>
                    <span>{member.formationTwo}</span>
                </div>

                <div className="leadershipProfileJoined">
                    <strong>Join our company</strong>
                    <span>{formatDate(member.joinedAt)}</span>
                </div>

                </div>

              <LeadershipSocials member={member} />
            </div>
          </div>
        </div>
      </section>

      <section className="leadershipProfileBody">
        <div className="evelContainer leadershipProfileBodyInner">
          <div className="leadershipProfileTitle">
            <div>
              <span>Name of the member</span>
              <h2>{member.name}</h2>
            </div>

            <div>
              <span>Function</span>
              <h3>{member.functionTitle}</h3>
            </div>
          </div>

          {bioParagraphs.length > 0 && (
            <div className="leadershipProfileBio">
              <h2>Description or Bio</h2>

              {bioParagraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          )}

          {member.careerSummary && (
            <div className="leadershipProfileCareer">
              <h2>Career Summary</h2>
              <p>{member.careerSummary}</p>
            </div>
          )}


         {positions.length > 0 && (
            <div className="leadershipProfilePositions">
                <h2>Positions History</h2>

                <div className="leadershipPositionsTable">

                <div className="leadershipPositionsHead">
                    <strong>Position</strong>
                    <strong>Date</strong>
                </div>

                {positions.map((position, index) => (
                    <div
                    key={`${position.title}-${index}`}
                    className="leadershipPositionsRow"
                    >
                    <span>{position.title}</span>

                    <span>
                        {position.date || "00 Month 0000"}
                    </span>
                    </div>
                ))}
                </div>
            </div>
            )}

          {member.bioFileUrl && (
            <EvelButton
              href={member.bioFileUrl}
              variant="primary"
              align="center"
              target="_blank"
            >
              Download Bio
            </EvelButton>
          )}
        </div>
      </section>
    </main>
  );
}

function LeadershipSocials({ member }) {
  const hasSocials =
    member.linkedinUrl ||
    member.facebookUrl ||
    member.instagramUrl ||
    member.xUrl;

  if (!hasSocials) return null;

  return (
    <div className="leadershipProfileSocials">
      {member.linkedinUrl && (
        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      )}

      {member.facebookUrl && (
        <a href={member.facebookUrl} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
      )}

      {member.instagramUrl && (
        <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      )}

      {member.xUrl && (
        <a href={member.xUrl} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
      )}
    </div>
  );
}