import "./PartnersSection.css";
import { PartnersMarquee } from "./PartnersMarquee";
import { PARTNERS_LABEL } from "./partnersContent";

/*
 * The partners band: its own surface, outside the curtain, below the About.
 *
 * The section is labelled by its own heading, so the strip is announced as what
 * it is rather than as a loose row of names. The label and the moving rows are
 * siblings on purpose: the label stays inside the measured container, while the
 * marquee runs the full width of the screen. That is not a layout slip -- a strip
 * clipped at the container edge would say the list ends there, which is the
 * opposite of what the movement is carrying.
 */
export function PartnersSection() {
  return (
    <section className="partners-band" aria-labelledby="partners-label">
      <div className="partners-inner">
        <h2 className="partners-label" id="partners-label">
          {PARTNERS_LABEL}
        </h2>
      </div>
      <PartnersMarquee />
    </section>
  );
}
