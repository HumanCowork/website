import { VENUE_ADDRESS, VENUE_EMBED_URL, VENUE_HEADING } from "./venue"

/*
 * The venue block: a heading naming the place, and the map under it.
 *
 * Two things here are not decoration.
 *
 * The address is stated in the heading rather than under the frame. A map is an
 * iframe: a search engine cannot read it, and a reader who cannot use one has no way
 * to know where this is from the frame alone. Naming the place in text above it is
 * what keeps the map an improvement on the address instead of a replacement for it.
 *
 * The frame carries a `title`, because an iframe without one is announced as just
 * "frame". That title describes the place rather than saying "map", so it is still
 * useful when the map itself never loads.
 *
 * `loading="lazy"` keeps Google's script, its cookies and a few hundred kilobytes
 * out of the first paint. The map is below the fold on every screen this site is
 * built for, so nothing is lost by waiting until someone scrolls to it.
 */
export function VenueMap() {
  return (
    <div className="venue" data-venue="true">
      <h3 className="venue__heading">{VENUE_HEADING}</h3>

      <div className="venue__frame">
        <iframe
          className="venue__map"
          src={VENUE_EMBED_URL}
          title={`Mapa con la ubicación de ${VENUE_ADDRESS}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  )
}
