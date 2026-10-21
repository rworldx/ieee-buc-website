"use client";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Section from "../layout/Section";
import EventCard from "../cards/EventCard";
import type { Event } from "@/lib/content";
import { useSite } from "../providers/SiteProvider";
export default function EventsFilter({ events }: { events: Event[] }) {
  const { locale, t } = useSite();
  const params = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const raw = params.get("status");
  const filter = raw === "past" || raw === "upcoming" ? raw : "all";
  function setFilter(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete("status");
    else next.set("status", value);
    window.history.replaceState(
      null,
      "",
      `${pathname}${next.size ? `?${next}` : ""}${window.location.hash}`,
    );
  }
  const results = events.filter(
    (e) =>
      (filter === "all" || e.status === filter) &&
      `${e.title} ${e.description} ${e.type}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <Section>
      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2" aria-label={t.events}>
          {[
            ["all", t.allEvents],
            ["upcoming", t.upcoming],
            ["past", t.past],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className="filter-button"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-xs">
          <label htmlFor="event-search" className="sr-only">
            {t.search}
          </label>
          <Search
            size={18}
            className="pointer-events-none absolute start-4 top-3.5 text-muted"
            aria-hidden="true"
          />
          <input
            id="event-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="form-field ps-11 text-sm"
          />
        </div>
      </div>
      <p className="mb-6 text-sm text-muted" role="status">
        {t.results}: {new Intl.NumberFormat(locale).format(results.length)}
      </p>
      {results.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              locale={locale}
              headingLevel={2}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <p className="text-xl font-semibold">{t.noEvents}</p>
          <p className="mx-auto mt-3 max-w-md text-muted">
            {filter === "upcoming" ? t.noUpcoming : t.searchPlaceholder}
          </p>
          <button
            className="button-secondary mt-6"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            {t.clear}
          </button>
        </div>
      )}
    </Section>
  );
}
