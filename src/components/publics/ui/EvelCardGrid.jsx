export default function EvelCardGrid({
  children,
  className = "",
  columns = "3",
}) {
  return (
    <div className={`evelCardGrid is-${columns} ${className}`}>
      {children}
    </div>
  );
}