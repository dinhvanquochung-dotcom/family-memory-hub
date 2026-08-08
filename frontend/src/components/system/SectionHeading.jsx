// Editorial section heading with eyebrow label + serif title.
// `as` controls the heading level so each page can own exactly one <h1>.
export function SectionHeading({
  eyebrow,
  title,
  italicTitle,
  description,
  align = "left",
  className = "",
  titleClassName = "text-3xl leading-tight sm:text-4xl",
  as: Tag = "h2",
  testId,
}) {
  return (
    <header
      data-testid={testId}
      className={(align === "center" ? "text-center mx-auto max-w-2xl " : "") + "flex flex-col gap-4 " + className}
    >
      {eyebrow && <span className="eyebrow text-brass">{eyebrow}</span>}
      <Tag className={"font-display text-ink " + titleClassName}>
        {title}
        {italicTitle && <em className="text-navy"> {italicTitle}</em>}
      </Tag>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-ink/70">{description}</p>
      )}
    </header>
  );
}
