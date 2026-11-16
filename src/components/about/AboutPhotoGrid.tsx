import { AboutPhotoCard } from "./AboutPhotoCard";
import type { AboutSubcolumns } from "./aboutContent";

/*
 * The staggered photo grid: two sub-columns, each holding whatever the content
 * module put there. `align` says how they sit against each other: "staggered"
 * (the default) drops the second one, "centered" puts the shorter one in the
 * middle of the taller one. The section uses it twice, so it knows nothing about
 * which photographs those are.
 */
export function AboutPhotoGrid({
  subcolumns,
  align = "staggered",
}: {
  subcolumns: AboutSubcolumns;
  align?: "staggered" | "centered";
}) {
  return (
    <div className={align === "centered" ? "about-grid about-grid--centered" : "about-grid"}>
      {subcolumns.map((subcolumn, index) => (
        <div key={index} className="about-subcolumn">
          {subcolumn.map((photo) => (
            <AboutPhotoCard key={photo.src} photo={photo} />
          ))}
        </div>
      ))}
    </div>
  );
}
