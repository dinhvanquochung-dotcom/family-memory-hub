import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarSearch, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/system/SectionHeading";
import { EventBadge } from "@/components/system/EventBadge";
import { MemorySkeleton, EmptyState, ErrorState } from "@/components/system/States";
import { memories, events, decades, formatViDate, branchById } from "@/data/mockData";

export default function Timeline() {
  const [state, setState] = useState("loading");
  const [decadeFilter, setDecadeFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");

  useEffect(() => {
    setState("loading");
    const t = setTimeout(() => setState("ready"), 650);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...memories].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (decadeFilter !== "all") {
      const d = decades.find((x) => x.id === decadeFilter);
      list = list.filter((m) => m.year >= d.from && m.year <= d.to);
    }
    if (eventFilter !== "all") list = list.filter((m) => m.eventId === eventFilter);
    return list;
  }, [decadeFilter, eventFilter]);

  const byYear = useMemo(() => {
    const groups = {};
    filtered.forEach((m) => {
      (groups[m.year] = groups[m.year] || []).push(m);
    });
    return Object.entries(groups).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const resetFilters = () => {
    setDecadeFilter("all");
    setEventFilter("all");
  };

  return (
    <div className="mx-auto max-w-editorial px-6 py-14 md:px-8 md:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Dòng thời gian"
          title="Lần theo"
          italicTitle="từng năm tháng"
          description="Duyệt ký ức theo năm, thập niên và sự kiện. Mỗi mốc thời gian mở ra một chương của gia đình."
          testId="timeline-heading"
        />
      </Reveal>

      {/* Lightweight filters */}
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col gap-5 border-y border-parchment py-6">
          <FilterRow label="Thập niên">
            <Chip active={decadeFilter === "all"} onClick={() => setDecadeFilter("all")} testId="filter-decade-all">Tất cả</Chip>
            {decades.map((d) => (
              <Chip key={d.id} active={decadeFilter === d.id} onClick={() => setDecadeFilter(d.id)} testId={`filter-decade-${d.id}`}>
                {d.label.replace("Thập niên ", "")}
              </Chip>
            ))}
          </FilterRow>
          <FilterRow label="Sự kiện">
            <Chip active={eventFilter === "all"} onClick={() => setEventFilter("all")} testId="filter-event-all">Tất cả</Chip>
            {events.map((e) => (
              <Chip key={e.id} active={eventFilter === e.id} onClick={() => setEventFilter(e.id)} testId={`filter-event-${e.id}`} dot={e.color}>
                {e.label}
              </Chip>
            ))}
          </FilterRow>
        </div>
      </Reveal>

      <div className="mt-14" aria-live="polite" data-testid="timeline-results">
        {state === "loading" && <MemorySkeleton count={6} />}

        {state === "error" && <ErrorState onRetry={() => setState("ready")} />}

        {state === "ready" && byYear.length === 0 && (
          <EmptyState
            icon={CalendarSearch}
            title="Chưa có ký ức nào ở đây"
            description="Không tìm thấy kỷ niệm nào khớp với bộ lọc này. Thử nới rộng lựa chọn hoặc xem tất cả."
            actionLabel="Xoá bộ lọc"
            onAction={resetFilters}
            testId="timeline-empty"
          />
        )}

        {state === "ready" &&
          byYear.map(([year, items], gi) => (
            <Reveal key={year} delay={gi * 0.05}>
              <section className="mb-16" aria-label={`Năm ${year}`}>
                <div className="mb-8 flex items-baseline gap-4">
                  <h2 className="font-display text-5xl text-navy sm:text-6xl">{year}</h2>
                  <span className="h-px flex-1 bg-parchment" aria-hidden="true" />
                  <span className="text-sm text-ink/50">{items.length} kỷ niệm</span>
                </div>
                <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
                  {items.map((m) => (
                    <TimelineEntry key={m.id} memory={m} />
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
      </div>
    </div>
  );
}

function TimelineEntry({ memory }) {
  const branch = branchById(memory.branchId);
  return (
    <Link
      to={`/ky-niem/${memory.id}`}
      data-testid={`timeline-entry-${memory.id}`}
      className="group grid grid-cols-[7rem_1fr] gap-5 sm:grid-cols-[9rem_1fr]"
    >
      <div className="overflow-hidden bg-parchment" style={{ aspectRatio: "1 / 1" }}>
        <img src={memory.image} alt={memory.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-[300ms] group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <EventBadge eventId={memory.eventId} />
        </div>
        <h3 className="font-display text-xl leading-snug text-ink transition-colors duration-200 group-hover:text-lacquer">{memory.title}</h3>
        <p className="text-sm text-ink/45">{formatViDate(memory.date)}</p>
        <p className="text-sm leading-relaxed text-ink/65 line-clamp-2">{memory.caption}</p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-navy opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {branch?.name} <ArrowRight size={13} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function FilterRow({ label, children }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="w-24 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-ink/45">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ children, active, onClick, testId, dot }) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      aria-pressed={active}
      className={
        "inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 " +
        (active
          ? "border-navy bg-navy text-ivory"
          : "border-parchment bg-card text-ink/70 hover:border-brass hover:text-ink")
      }
    >
      {dot && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dot }} aria-hidden="true" />}
      {children}
    </button>
  );
}
