import PBImage from "./PBImage";
import PBVideo from "./PBVideo";

export default function HomeHero({
  image = "/images/hero/evel-hero.jpg",
  video = "/uploads/videos/hero-video.mp4",
  poster,
  title = "Evel Protect™",
  showPlayButton = true,
}) {
  return (
    <section className="evelHero">
      <div className="evelHeroMedia">
        {video ? (
          <>
              <PBVideo
              className="evelHeroBg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={poster || image}
            >
              <source src={video} type="video/mp4" />
            </PBVideo>

            {showPlayButton && (
              <span className="marketingVideoPlay">
                ||
              </span>
            )}
          </>
        ) : (
          <PBImage
            src={image}
            alt={title}
            fill
            priority
            className="evelHeroBg"
          />
        )}
      </div>

      <div className="evelHeroOverlay" />

      <div className="evelHeroInner" />
    </section>
  );
}