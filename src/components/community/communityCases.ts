/**
 * The community cases, as data.
 *
 * The only place the cases are written down: the section's markup does not know
 * how many there are and its CSS does not know what they say. Editing the list
 * is all it takes to change the content.
 *
 * The copy below is PLACEHOLDER. It was invented to review the design -- the
 * names, the sectors and the results are not a claim about real members, and not
 * one of them belongs to a real company. It must be replaced with the client's
 * real cases, with each member's written permission, before this page is
 * published. See S4 of odd/tasks/community-cases.md: the name, the mark and the
 * words each need that member's express consent for this exact use, and a
 * fabricated success case loses exactly the trust the section exists to earn.
 *
 * One open thread: the heading is a WORKING PLACEHOLDER. The client has not been
 * convinced by any of the proposed titles and asked to settle the exact one
 * later, picturing a short phrase along the lines of "Los que confiaron en
 * nosotros" or "proyectos que triunfaron", without the word "triunfar". Until he
 * decides, this candidate is used -- it names the origin, which is the
 * community's actual claim, without claiming success. The others recorded for
 * the next pass: "De acá salieron", "Crecieron con la comunidad".
 *
 * The rules the copy holds:
 *   1. Three to six cases. Fewer is not a section; more becomes wallpaper, and
 *      nobody reads past the first row.
 *   2. Each case says what it is and what the community did for it -- that
 *      second part is the whole point of the section. A name and a sector alone
 *      would be a logo wall with better manners.
 *   3. Three to five words per line, and the whole case within a line length a
 *      reader can hold: 45-75 characters. Long process copy here competes with
 *      the section below it.
 *   4. `url` is empty until the real case, and the member's permission, exist.
 *      The card renders its link only when there is something to link to: no
 *      `href="#"` placeholder, ever.
 */

export type CommunityCase = {
  /** Working name of the project. Replaced once the real cases are cleared. */
  name: string;
  /**
   * The mark, built from the name's initials in a tinted square. Typographic on
   * purpose: a real logo needs the member's written approval to be published,
   * and an invented one risks colliding with a real company's mark.
   */
  initials: string;
  /** One short line on what the project does. */
  summary: string;
  /** What the community did for it. The reason the case is on this page. */
  contribution: string;
  /** The "in the community since" label, muted under the rest of the card. */
  since: string;
  /** The outbound link, once there is one. Empty means no link is rendered. */
  url: string;
};

export const COMMUNITY_HEADING = "Proyectos que empezaron acá";


export const COMMUNITY_CASES: CommunityCase[] = [
  {
    name: "Nutria",
    initials: "NU",
    summary: "Trazabilidad de alimentos para restaurantes y proveedores.",
    contribution: "La comunidad ayudó a validar el modelo y abrió las primeras cocinas.",
    since: "En la comunidad desde 2023",
    url: "",
  },
  {
    name: "Balseiro",
    initials: "BA",
    summary: "Software de gestión para estudios contables pequeños.",
    contribution: "Dos personas del espacio revisaron el producto antes de lanzarlo.",
    since: "En la comunidad desde 2023",
    url: "",
  },
  {
    name: "Orbita",
    initials: "OR",
    summary: "Monitoreo satelital de cultivos con imágenes abiertas.",
    contribution: "El equipo encontró acá su primer cliente del sector agro.",
    since: "En la comunidad desde 2024",
    url: "",
  },
  {
    name: "Cantera",
    initials: "CA",
    summary: "Materiales de construcción con trazabilidad de origen.",
    contribution: "Salió de una conversación en el espacio y creció en la comunidad.",
    since: "En la comunidad desde 2024",
    url: "",
  },
  {
    name: "Lumen",
    initials: "LU",
    summary: "Iluminación eficiente para locales comerciales.",
    contribution: "Otros miembros del espacio acompañaron la puesta en marcha.",
    since: "En la comunidad desde 2025",
    url: "",
  },
  {
    name: "Tregua",
    initials: "TR",
    summary: "Reservas y turnos para centros de salud.",
    contribution: "El grupo le dio criterio técnico en la primera etapa del producto.",
    since: "En la comunidad desde 2025",
    url: "",
  },
];
