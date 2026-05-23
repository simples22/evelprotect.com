"use client";

export default function AdminTable({
  title,
  description,
  columns = [],
  data = [],
  emptyText = "No records found.",
  actions,
}) {
  return (
    <section className="adminTableCard">
      {(title || description) && (
        <div className="adminTableHeader">
          <div>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
        </div>
      )}

      {/* Desktop / tablet table */}
      <div className="adminTableScroll">
        <table className="adminTable">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    <div className="adminTableCell">
                      {col.render ? col.render(row) : row[col.key]}
                    </div>
                  </td>
                ))}

                {actions && (
                  <td>
                    <div className="adminTableActions">{actions(row)}</div>
                  </td>
                )}
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)}>
                  <span className="adminTableEmpty">{emptyText}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile carousel cards */}
      <div className="adminTableMobileCarousel">
        {data.map((row) => (
          <article className="adminTableMobileCard" key={row.id}>
            {columns.map((col) => (
              <div className="adminTableMobileField" key={col.key}>
                <span className="adminTableMobileLabel">{col.label}</span>
                <div className="adminTableMobileValue">
                  {col.render ? col.render(row) : row[col.key]}
                </div>
              </div>
            ))}

            {actions && (
              <div className="adminTableMobileActions">{actions(row)}</div>
            )}
          </article>
        ))}

        {data.length === 0 && (
          <div className="adminTableMobileEmpty">{emptyText}</div>
        )}
      </div>
    </section>
  );
}