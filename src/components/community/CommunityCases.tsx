import {
  COMMUNITY_CASES,
  COMMUNITY_HEADING,
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
 * The mark on each card is built from the case's initials in CSS. That is not an
 * illustration placeholder waiting for art: a member's real logo needs their
 * written approval to publish, and an invented one risks reading as a real
 * company's. A typographic mark carries the same information without either
 * problem, and it cannot 404.
 *
 * The link under each case is rendered only when the case has a url. Six empty
 * `href="#"` anchors would be a section that looks finished and goes nowhere.
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
            <li className="community-card" key={item.name}>
              {/*
                * The mark is the case's initials, not a picture: no image is
                * loaded and none is described, so it carries no information the
                * case's own name does not already state. It is hidden from
                * assistive technology for exactly that reason.
                */}
              <span className="community-mark" aria-hidden="true">
                {item.initials}
              </span>
              <h3 className="community-card-title">{item.name}</h3>
              <p className="community-card-summary">{item.summary}</p>
              <p className="community-card-contribution">{item.contribution}</p>
              <p className="community-card-meta">{item.since}</p>

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
        </ul>      </div>
    </section>
  );
}
