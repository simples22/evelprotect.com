export default function EvelContentLayout({
  topbar,
  filter,
  children,
  className = "",
}) {
  return (
    <div className={`evelContentLayout ${className}`}>
      <div className="evelContentMain">
        {topbar && <div className="evelContentTopbar">{topbar}</div>}

        <div className="evelContentBody">{children}</div>
      </div>

      {filter && <aside className="evelContentSidebar">{filter}</aside>}
    </div>
  );
}