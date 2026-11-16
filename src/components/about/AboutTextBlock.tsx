/*
 * A heading and its paragraphs. The section uses it twice — once for the story (an
 * h2) and once for the members (an h3) — which is why the level is a prop instead
 * of two near-identical components. `align` says which edge of its own block the
 * text hugs, so the two columns can point at each other instead of both centring.
 */
export function AboutTextBlock({
  heading,
  level,
  paragraphs,
  align,
}: {
  heading: string;
  level: 2 | 3;
  paragraphs: readonly string[];
  align: "left" | "right";
}) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <div className={`about-text about-text--${align}`}>
      <Heading className={`about-heading about-heading--${level}`}>{heading}</Heading>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="about-paragraph">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
