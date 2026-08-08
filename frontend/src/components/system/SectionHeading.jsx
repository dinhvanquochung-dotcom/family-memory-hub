// Editorial section heading with eyebrow label + serif title.
export function SectionHeading({ eyebrow, title, italicTitle, description, align = "left", className = "", testId }) {
  return (
    <header
      data-testid={testId}
      className={
        (align === "center" ? "text-center mx-auto max-w-2xl " : "") +
        "flex flex-col gap-4 " +
        className
      }
    >
      {eyebrow && <span className="eyebrow text-brass">{eyebrow}</span>}
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
        {title}
        {italicTitle && <em className="text-navy"> {italicTitle}</em>}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-ink/70">{description}</p>
      )}
    </header>
  );
}
