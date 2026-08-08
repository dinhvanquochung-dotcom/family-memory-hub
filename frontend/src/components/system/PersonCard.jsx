import { branchById } from "@/data/mockData";

// People-first card, readable on mobile. Circular portrait keeps faces intact.
export function PersonCard({ person, className = "" }) {
  const branch = branchById(person.branchId);
  return (
    <div
      data-testid={`person-card-${person.id}`}
      className={"flex items-center gap-4 border-b border-parchment py-5 " + className}
    >
      <img
        src={person.photo}
        alt={`Ảnh chân dung ${person.name}`}
        loading="lazy"
        className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
        style={{ objectPosition: "center top" }}
      />
      <div className="min-w-0">
        <p className="truncate font-display text-lg text-ink">{person.name}</p>
        <p className="text-sm text-ink/60">
          {person.role} · {branch?.place} · sinh {person.born}
        </p>
      </div>
    </div>
  );
}
