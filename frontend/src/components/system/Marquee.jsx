// Slow editorial marquee — a quiet family motto ribbon. Pauses on hover,
// freezes for reduced-motion (handled in index.css).
export function Marquee({ items, className = "" }) {
  const loop = [...items, ...items];
  return (
    <div className={"relative overflow-hidden border-y border-parchment py-5 " + className} data-testid="editorial-marquee">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-2xl italic text-navy/80 sm:text-3xl">{item}</span>
            <span aria-hidden="true" className="mx-8 text-brass sm:mx-12">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
