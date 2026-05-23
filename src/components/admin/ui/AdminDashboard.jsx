"use client";

import Link from "next/link";

export function AdminDashboard({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  actionOnClick,
  stats = [],
  cards = [],
  sections = [],
  children,
}) {
  return (
    <main className="adminDashboard">
      <section className="adminDashboardHero">
        <div>
          {eyebrow && <span>{eyebrow}</span>}
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
        </div>

        {actionHref && actionLabel && (
          <Link href={actionHref} className="adminDashboardHeroBtn">
            {actionLabel}
          </Link>
        )}

        {!actionHref && actionOnClick && actionLabel && (
          <button
            type="button"
            className="adminDashboardHeroBtn"
            onClick={actionOnClick}
          >
            {actionLabel}
          </button>
        )}
      </section>

      {stats.length > 0 && (
        <section className="adminDashboardStats">
          {stats.map((stat, index) => (
            <article key={`${stat.label}-${index}`}>
              <span>{stat.badge || String(index + 1).padStart(2, "0")}</span>
              <strong>{stat.value || stat.label}</strong>
              {stat.text && <p>{stat.text}</p>}
            </article>
          ))}
        </section>
      )}

      {cards.length > 0 && (
        <section className="adminDashboardResources">
          <div className="adminDashboardSectionHead">
            <div>
              <span>Resources</span>
              <h2>Manage tools, actions and operational resources.</h2>
            </div>

            <p>
              Access important workflows, reports, content modules and admin
              resources from one organized workspace.
            </p>
          </div>

          <div className="adminDashboardGrid">
            {cards.map((card) => (
              <Link
                href={card.href}
                className="adminDashboardCard"
                key={card.href}
              >
                {card.meta && <span>{card.meta}</span>}
                <h2>{card.title}</h2>
                {card.text && <p>{card.text}</p>}
                <strong>{card.cta || "Open →"}</strong>
              </Link>
            ))}
          </div>
        </section>
      )}

      {sections.map((section, index) => (
        <section className="adminDashboardSection" key={`${section.title}-${index}`}>
          <div className="adminDashboardSectionHead">
            <div>
              {section.eyebrow && <span>{section.eyebrow}</span>}
              {section.title && <h2>{section.title}</h2>}
            </div>

            {section.description && <p>{section.description}</p>}
          </div>

          {section.children}
        </section>
      ))}

      {children}
    </main>
  );
}

export function AdminDashboardSkeleton({ count = 6 }) {
  return (
    <div className="adminDashboardSkeletonGrid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="adminDashboardSkeleton" key={index} />
      ))}
    </div>
  );
}

export function AdminDashboardAccordion({ items = [] }) {
  return (
    <div className="adminDashboardAccordion">
      {items.map((item, index) => (
        <details key={`${item.title}-${index}`}>
          <summary>
            <span>{item.title}</span>
            <strong>+</strong>
          </summary>

          <div>{item.content}</div>
        </details>
      ))}
    </div>
  );
}