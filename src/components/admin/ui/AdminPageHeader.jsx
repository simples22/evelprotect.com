export default function AdminPageHeader({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <div className="adminPageHeader">
      <div className="adminPageHeaderText">
        {eyebrow && <span className="adminPageEyebrow">{eyebrow}</span>}
        {title && <h1>{title}</h1>}
        {description && <p>{description}</p>}
      </div>

      {children && (
        <div className="adminPageHeaderActions">
          {children}
        </div>
      )}
    </div>
  );
}