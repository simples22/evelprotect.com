import EvelSkeletonCard from "@/components/publics/ui/EvelSkeletonCard";

export default function Loading() {
  return (
    <main>
      <section className="evelContainer">
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <EvelSkeletonCard
              key={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}