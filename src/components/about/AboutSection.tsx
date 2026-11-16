import "./AboutSection.css";
import { AboutPhotoGrid } from "./AboutPhotoGrid";
import { AboutTextBlock } from "./AboutTextBlock";
import {
  ABOUT_GRID_LEFT,
  ABOUT_GRID_RIGHT,
  ABOUT_STORY,
  ABOUT_WORKPLACE,
} from "./aboutContent";

/*
 * The section itself: composition only. Two columns, the right one pushed down,
 * each holding a text block and a photo grid. Every dimension it uses is an
 * --about-* token from globals.css, so tuning happens there and never here.
 *
 * It lives inside the curtain's phase-two slot, so the celeste backdrop and the
 * `que-hacemos` anchor both belong to the curtain; this file owns neither.
 */
export function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-inner">
        <div className="about-column about-column--lowered">
          <AboutTextBlock {...ABOUT_STORY} align="right" />
          <AboutPhotoGrid subcolumns={ABOUT_GRID_LEFT} align="centered" />
        </div>
        <div className="about-column about-column--offset">
          <AboutPhotoGrid subcolumns={ABOUT_GRID_RIGHT} align="centered" />
          <AboutTextBlock {...ABOUT_WORKPLACE} align="left" />
        </div>
      </div>
    </section>
  );
}
