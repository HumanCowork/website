import Image from "next/image";

import {
  COMMUNITY_CASES,
  COMMUNITY_HEADING,
  COMMUNITY_MARK_SLOT_WIDTH,
  COMMUNITY_PHOTO_SLOT_WIDTH,
} from "./communityCases";
import "./CommunityCases.css";

/*
 * The community cases: the band between the process stages and the partners row,
 * showing the projects that started or grew inside the community.
 *
 * It is the middle step of a staircase of surfaces -- stages white, this band a
 * pale celeste tint over white, partners #eef2f7 -- so it never merges with
 * either neighbour.
 *
 * The cases are an unordered list because they are one: a peer set of projects,
 * with no order among them, and a screen reader announces how many there are.
 *
 * A card no longer carries an invented project name. The client rejected those
 * names, so the card shows the mark, the photograph, the summary, the
 * contribution, and the referent's name and role. The identity of a case is the
 * neutral `id` in the data, used for the React key and rendered nowhere.
 *
 * The heading outline survives the removal: the `h3` that used to hold the
 * project name now holds the referent's name, which is the card's remaining real
 * text identity. The section's `h2` heads a list of six `h3`s -- one per person
 * -- with the role as plain text under each. Nothing is announced twice and no
 * card is left headingless.
 *
 * The photograph is the community's own, from CASE_IMAGES: a 600x600 square
 * cropped into the portrait frame with `object-cover`, exactly as AboutPhotoCard
 * does. The two read from separate lists even though the frames crop the same way,
 * so that a picture here is not a picture there. Its alt is empty and it is `aria-hidden`, deliberately: it shows a real
 * person, the source says nothing about what it shows, and the referent's name
 * is already real text right below it, so a second announcement would only
 * repeat the heading. The initials placeholder is gone -- every card shows a
 * photograph.
 *
 * The mark beside the project is a fictional brand mark from fakelogo.com,
 * exactly like the partners band's: convincing on purpose, so it is swapped for
 * the member's real, permissioned mark before publishing. It is rendered small
 * (a 28px-tall slot) and it is DECORATIVE -- nothing names it -- so it is drawn
 * `alt=""` and `aria-hidden`. The file is downscaled to twice the slot, not the
 * source size, so the browser is not made to download pixels nobody sees (see
 * the note in communityCases.ts).
 */
export function CommunityCases() {
  return (
    <section
      className="community-band"
      aria-labelledby="community-heading"
      data-community-section="true"
    >
      <div className="community-inner">
        <h2 className="community-heading" id="community-heading">
          {COMMUNITY_HEADING}
        </h2>

        <ul className="community-grid">
          {COMMUNITY_CASES.map((item) => (
            <li className="community-card" key={item.id}>
              {/*
               * The portrait frame, holding the community's own photograph of
               * the referent. Decoration over a name that is already written out
               * below as the card's heading, so it is empty and hidden from
               * assistive technology.
               */}
              <div className="community-portrait">
                <Image
                  className="community-portrait-image"
                  src={item.photo}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes={COMMUNITY_PHOTO_SLOT_WIDTH}
                />
              </div>

              {/*
               * The mark alone, at the head of the card's text. Decorative: the
               * mark names nothing, and with the invented name gone there is no
               * text to repeat it as.
               */}
              <div className="community-card-head">
                <Image
                  className="community-card-logo"
                  src={item.logo}
                  alt=""
                  aria-hidden="true"
                  width={item.logoWidth}
                  height={item.logoHeight}
                  sizes={COMMUNITY_MARK_SLOT_WIDTH}
                />
              </div>

              <p className="community-card-summary">{item.summary}</p>
              <p className="community-card-contribution">{item.contribution}</p>

              {/*
               * The referent: name as the card's heading, role as plain text
               * under it. The name carries the heading structure now that the
               * project name is gone, and both lines stay present whatever the
               * photograph is.
               */}
              <div className="community-referent">
                <h3 className="community-referent-name">
                  {item.referent.name}
                </h3>
                <p className="community-referent-role">
                  {item.referent.role}
                </p>
              </div>

              {item.url !== "" && (
                <a
                  className="community-card-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver el caso
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
