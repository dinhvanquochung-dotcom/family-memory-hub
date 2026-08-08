import { eventById } from "@/data/mockData";

// Small, restrained event tag. Uses a color dot + label — never color alone.
export function EventBadge({ eventId, className = "", testId }) {
  const ev = eventById(eventId);
  if (!ev) return null;
  return (
    <span
      data-testid={testId || `event-badge-${eventId}`}
      className={
        "inline-flex items-center gap-2 border border-parchment bg-ivory/60 px-3 py-1 text-xs font-medium tracking-wide text-ink " +
        className
      }
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: ev.color }}
      />
      {ev.label}
    </span>
  );
}
