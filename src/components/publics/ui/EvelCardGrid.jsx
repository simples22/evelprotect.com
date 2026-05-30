export default function EvelCardGrid({
  children,
  className = "",
  columns = "2",
}) {
  return (
    <div className={`evelCardGrid is-${columns} ${className}`}>
      {children}
    </div>
  );
}