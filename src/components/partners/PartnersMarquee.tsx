import Image from "next/image";

import "./PartnersMarquee.css";
import {
  PARTNERS_MARK_MAX_WIDTH,
  PARTNERS_ROW_LEFT,
  PARTNERS_ROW_RIGHT,
  type Partner,
} from "./partnersContent";

/*
 * NO PAUSE CONTROL -- a deliberate deviation from WCAG 2.2.2 (Level A).
 *
 * That criterion says content which moves on its own for more than five seconds
 * beside other content needs a mechanism to pause, stop or hide it. It also says,
 * in the same breath, that honouring prefers-reduced-motion does not count as
 * that mechanism: it only reaches visitors who went and turned that setting on,
 * while everyone else still has to watch. And pausing on hover, the usual
 * shortcut, is not it either -- a phone has no hover, so on a phone it is not
 * there at all.
 *
 * The owner weighed the requirement against putting a control in the trust
 * section and chose the movement. The reduced-motion branch below is what remains
 * as an accommodation, and it is a real one: those visitors get a still grid, not
 * a slower marquee.
 *
 * If this page ever has to meet Level A, this is the whole fix: one keyboard-
 * operable button whose name changes between Pausar and Reanudar, toggling a
 * `data-motion` attribute on the container, with one CSS rule pointing both
 * tracks at `animation-play-state: paused`. It was built and verified that way --
 * both rows read `running`, `paused`, `running` across two real clicks -- and
 * removed only because it was asked for.
 */

type Direction = "left" | "right";

/*
 * One row: the partner list, rendered twice.
 *
 * The second copy is what makes the loop seamless -- the track travels half its
 * own width, and at that point the duplicate sits exactly where the original
 * began. It is aria-hidden because it is the same eight companies again, and a
 * screen reader must hear them once.
 */
function Row({ partners, direction }: { partners: Partner[]; direction: Direction }) {
  return (
    <div className="partners-row" data-direction={direction}>
      <div className="partners-track">
        {[false, true].map((duplicate) => (
          <ul
            className="partners-group"
            key={duplicate ? "duplicate" : "source"}
            aria-hidden={duplicate || undefined}
          >
            {partners.map((partner) => (
              <li className="partners-slot" key={partner.id}>
                <Image
                  className="partners-mark"
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  sizes={PARTNERS_MARK_MAX_WIDTH}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function PartnersMarquee() {
  return (
    <div className="partners-marquee">
      <Row partners={PARTNERS_ROW_LEFT} direction="left" />
      <Row partners={PARTNERS_ROW_RIGHT} direction="right" />
    </div>
  );
}
