import React from "react";
import { createRoot } from "react-dom/client";

function SummaryCards({ title, items, accent }) {
  if (!items || items.length === 0) {
    return null;
  }

  const accepted = items.filter((item) => item.accepted).length;
  const pending = items.length - accepted;
  const nextDate = items[0] ? items[0].date : "No upcoming workshops";

  const cards = [
    { label: "Total", value: items.length },
    { label: "Accepted", value: accepted },
    { label: "Pending", value: pending },
    { label: "Next activity", value: nextDate },
  ];

  return (
    <section className="table-card p-3 p-md-4" aria-label={title}>
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <div>
          <h2 className="h4 mb-1">{title}</h2>
          <p className="text-muted mb-0">A quick at-a-glance summary before you dive into the tables below.</p>
        </div>
        <div className="pill-badge" style={{ background: accent.background, color: accent.color }}>
          React summary cards
        </div>
      </div>
      <div className="stats-grid">
        {cards.map((card) => (
          <div className="stat-card" key={card.label}>
            <div className="stat-value">{card.value}</div>
            <div className="stat-label">{card.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkshopTypeExplorer({ items }) {
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("duration");

  const normalized = query.trim().toLowerCase();
  const filteredItems = items
    .filter((item) => {
      if (!normalized) {
        return true;
      }
      return [item.name, item.description].join(" ").toLowerCase().includes(normalized);
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.duration - b.duration || a.name.localeCompare(b.name);
    });

  return (
    <div>
      <div className="react-filter-bar">
        <input
          className="react-filter-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search workshop names or descriptions"
          aria-label="Search workshop types"
        />
        <select
          className="react-filter-select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort workshop types"
        >
          <option value="duration">Sort by duration</option>
          <option value="name">Sort alphabetically</option>
        </select>
      </div>
      {filteredItems.length === 0 ? (
        <div className="empty-state">No workshops matched your search. Try a broader keyword.</div>
      ) : (
        <div className="workshop-grid">
          {filteredItems.map((item) => (
            <article className="workshop-card" key={item.id}>
              <div className="workshop-meta">
                <span className="meta-chip">{item.duration} day{item.duration === 1 ? "" : "s"}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="mt-auto">
                <a className="btn btn-primary" href={item.url}>
                  View details
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function mountComponent(id, element) {
  const rootElement = document.getElementById(id);
  if (!rootElement) {
    return;
  }
  createRoot(rootElement).render(element);
}

mountComponent(
  "workshop-type-explorer",
  <WorkshopTypeExplorer items={window.workshopTypeCards || []} />
);

mountComponent(
  "coordinator-dashboard-summary",
  <SummaryCards
    title="Coordinator Summary"
    items={window.coordinatorDashboardData || []}
    accent={{ background: "#fff4d7", color: "#8c5a02" }}
  />
);

mountComponent(
  "instructor-dashboard-summary",
  <SummaryCards
    title="Instructor Summary"
    items={window.instructorDashboardData || []}
    accent={{ background: "#e7f5fb", color: "#14506a" }}
  />
);
