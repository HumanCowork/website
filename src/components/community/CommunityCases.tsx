import Image from "next/image";

import {
  COMMUNITY_CASES,
  COMMUNITY_HEADING,
  COMMUNITY_MARK_SLOT_WIDTH,
} from "./communityCases";
import "./CommunityCases.css";

/*
 * The community cases: the band between the process stages and the partners row,
 * showing the projects that started or grew inside the community.
 *
 * It is the middle step of a staircase of surfaces -- stages white, cases
 * #f8fafc, partners #eef2f7 -- so it never merges with either neighbour while
 * asking for no new colour.
 *
 * The cases are an unordered list because they are one: a peer set of projects,
 * with no order among them, and a screen reader announces how many there are.
 *
 * The mark beside each project name is a fictional brand mark from
 * fakelogo.com, exactly like the partners band's: convincing on purpose, so it
 * is swapped for the member's real, permissioned mark before publishing. It is
 * rendered small (a 28px-tall slot) and it is DECORATIVE -- the project name is
 * already real text in the same line -- so it is drawn `alt=""` and
 * `aria-hidden`, never a second announcement of the same name. The file is
 * downscaled to twice the slot, not the source size, so the browser is not made
 * to download pixels nobody sees (see the note in communityCases.ts).
 *
 * The portrait frame is the person, not the project: a mark is not a portrait,
 * so it lives with the project name, never inside the frame.
 *
 * Each card carries a portrait frame for the person behind the project. Until
 * their real, authorised photograph exists, `photo` is empty and the frame
 * shows the referent's initials over a tinted surface -- drawn in CSS, no file,
 * no stock photography, no invented face and no borrowed logo: a typographic
 * placeholder is finished on purpose and cannot 404. The name and the role are
 * always real text under the frame, so nothing the reader needs is carried by
 * the image alone. When a real photo arrives, only the `photo` field changes;
 * the layout does not move.
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
          {COMMUNITY_CASES.map((item) => {
            const hasPhoto = item.photo !== "";
            const referentInitials = referentInitialsFor(item.referent.name);

            return (
              <li className="community-card" key={item.name}>
                {/*
                 * The portrait frame. With a photo it holds the referent's own
                 * image, described by the alt. Without one it holds their
                 * initials -- decoration over a name that is already written
                 * out below, so it is hidden from assistive technology.
                 */}
                <div className="community-portrait">
                  {hasPhoto ? (
                    <img
                      className="community-portrait-image"
                      src={item.photo}
                      alt={`Retrato de ${item.referent.name}, ${item.referent.role} de ${item.name}`}
                    />
                  ) : (
                    <span
                      className="community-portrait-initials"
                      aria-hidden="true"
                    >
                      {referentInitials}
                    </span>
                  )}
                </div>

                {/*
                 * The mark and the project name, on one line: the mark as a
                 * small decorative image, the name as the real text. The image
                 * is alt="" and aria-hidden because the name right beside it
                 * already says everything it could.
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
                  <h3 className="community-card-title">{item.name}</h3>
                </div>

                <p className="community-card-summary">{item.summary}</p>
                <p className="community-card-contribution">{item.contribution}</p>

                {/*
                 * The referent: name and role as plain text, last on the card.
                 * The name is not a heading -- the project name is -- and both
                 * lines stay present whether or not a photo exists.
                 */}
                <p className="community-referent">
                  <span className="community-referent-name">
                    {item.referent.name}
                  </span>
                  <span className="community-referent-role">
                    {item.referent.role}
                  </span>
                </p>

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
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/*
 * Up to two initials from the referent's name, for the CSS placeholder. A helper
 * rather than a second field in the data: the initials are a fact about the name
 * that is already written down, so they cannot drift out of sync with it.
 */
function referentInitialsFor(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}
