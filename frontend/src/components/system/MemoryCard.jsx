import { Link } from "react-router-dom";
import { EventBadge } from "./EventBadge";
import { SafeImage } from "./SafeImage";
import { branchById, formatViDate } from "@/data/mockData";

// Primary content unit. Photography is the hero; caption + meta sit below.
export function MemoryCard({ memory, className = "", index = 0 }) {
  const branch = branchById(memory.branchId);
  return (
    <article className={"group flex flex-col " + className} data-testid={`memory-card-${memory.id}`}>
      <Link
        to={`/ky-niem/${memory.id}`}
        className="block"
        aria-label={`Xem kỷ niệm: ${memory.title}`}
        data-testid={`memory-card-link-${memory.id}`}
      >
        <div
          className="relative overflow-hidden bg-parchment clip-frame"
          style={{ aspectRatio: memory.ratio || "4 / 3" }}
        >
          <SafeImage
            src={memory.image}
            alt={memory.caption}
            loading={index > 2 ? "lazy" : "eager"}
            className="h-full w-full object-cover transition-transform duration-[300ms] ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <EventBadge eventId={memory.eventId} />
          <span className="text-xs font-medium uppercase tracking-wider text-ink/45">
            {memory.year}
          </span>
        </div>
        <Link to={`/ky-niem/${memory.id}`} data-testid={`memory-title-${memory.id}`}>
          <h3 className="font-display text-xl leading-snug text-ink transition-colors duration-200 group-hover:text-lacquer sm:text-2xl">
            {memory.title}
          </h3>
        </Link>
        <p className="text-sm leading-relaxed text-ink/65 line-clamp-2">{memory.caption}</p>
        <p className="mt-1 text-xs text-ink/45">
          {formatViDate(memory.date)} · {branch?.name}
        </p>
      </div>
    </article>
  );
}
