/*
 * The venue: where the community physically meets.
 *
 * Same rule as contacts.ts -- this holds the place and nothing about how it looks.
 *
 * The values were not typed from the link alone. The share link was followed and
 * Google's own payload answered with the name, the street and the pair of
 * coordinates below, so the map and the label cannot disagree about where this is.
 */

/** The place, as Google resolves it: name, street, postal code and city. */
export const VENUE_ADDRESS =
  "Fundación La Casa Universitaria de Córdoba, Buenos Aires 1120, X5000 Córdoba"

/**
 * The heading, in the client's words: the venue and the address in one line, so the
 * address is stated where it is read first rather than only under the map.
 */
export const VENUE_HEADING =
  "Conocé nuestra nueva sede en Buenos Aires 1120, Nueva Córdoba"

/**
 * Where the pin goes, kept as numbers so the map frame does not depend on a place
 * name resolving the same way twice.
 */
export const VENUE_LAT = -31.4292396
export const VENUE_LNG = -64.1881927

/**
 * The keyless embed.
 *
 * `output=embed` is Google's own public embed endpoint and needs no API key and no
 * billing account, unlike the documented Embed API. The query carries the place name
 * because that is what makes Google render the label with the name and the street;
 * a bare pair of coordinates draws the pin but leaves the label empty.
 *
 * The address is stated in full in the heading above the frame, so the frame is a
 * view of a place that has already been named. Nothing here depends on Google's
 * label to tell a visitor where this is.
 */
export const VENUE_EMBED_URL =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(VENUE_ADDRESS) +
  "&z=16&output=embed"
