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
 *
 * The marks themselves are fictional brand marks from fakelogo.com -- the same
 * source as the partners band's, and the same warning applies: they are
 * convincing on purpose and must be swapped for the member's own approved mark,
 * with written permission, before publishing. None of them borrows a real
 * company's name or mark.
 *
 * ON FILE WEIGHT, and it is the partners band's lesson paid for once already.
 * A mark here is drawn small -- a 28px-tall slot beside the project name -- so
 * downloading the source PNGs as served would be the "1920px image in a 255px
 * slot" mistake again, sixteen times the pixels. The source files are 80px tall
 * and 251-726px wide; each has been downscaled to 56px tall, exactly 2x the
 * display box for crisp rendering on a 2x screen, and no wider than its own
 * artwork needs. Pick a file whose intrinsic size matches the slot: 7-8KB each
 * now, against 8-15KB from the source. The `logoWidth`/`logoHeight` below are the
 * downscaled numbers, so they must be rewritten whenever a mark is replaced.
 */

export type CommunityCase = {
  /** Working name of the project. Replaced once the real cases are cleared. */
  name: string;
  /**
   * The mark, rendered small beside the project name. Repository path relative
   * to public/, PNG with transparency. Decorative here -- the project name is
   * already real text right next to it -- so it is drawn `alt=""` and
   * `aria-hidden`: never a second announcement of the same name.
   */
  logo: string;
  /**
   * Intrinsic pixel size of the file, so the browser reserves the right box
   * and never reflows once the mark arrives.
   */
  logoWidth: number;
  logoHeight: number;
  /** One short line on what the project does. */
  summary: string;
  /** What the community did for it. The reason the case is on this page. */
  contribution: string;
  /**
   * The person behind the project: their name and their role, shown as plain
   * text under the media frame. Both are placeholder copy until the real member
   * is named with their written permission.
   */
  referent: {
    name: string;
    role: string;
  };
  /**
   * The referent's portrait, shown in the frame above the project name. Empty
   * for now: the placeholder below is what renders until the real, authorised
   * photograph exists. The placeholder is a disclosure for the code, never for
   * the page -- nothing here explains itself to the reader (see L4 of
   * odd/tasks/community-cases.md).
   */
  photo: string;
  /** The outbound link, once there is one. Empty means no link is rendered. */
  url: string;
};

export const COMMUNITY_HEADING = "Proyectos que empezaron acá";

/*
 * The widest a mark is ever drawn: the tallest a mark goes (28px, the top of
 * --community-card-logo-height) times the widest aspect in the set (Lumen, at
 * 321x56, is 5.73 to 1), so 160px.
 *
 * This is a `sizes` hint, not a style: it lives here, not in the CSS, because it
 * only tells the browser how large a file to fetch. Without it, next/image
 * assumes a mark may span the viewport and offers a srcset running to 1920px.
 * It has to move with --community-card-logo-height.
 */
export const COMMUNITY_MARK_SLOT_WIDTH = "160px";


export const COMMUNITY_CASES: CommunityCase[] = [
  {
    name: "Nutria",
    logo: "/images/community/nutria.png",
    logoWidth: 276,
    logoHeight: 56,
    summary: "Trazabilidad de alimentos para restaurantes y proveedores.",
    contribution: "La comunidad ayudó a validar el modelo y abrió las primeras cocinas.",
    referent: { name: "Camila Ferrer", role: "Fundadora" },
    photo: "",
    url: "",
  },
  {
    name: "Balseiro",
    logo: "/images/community/balseiro.png",
    logoWidth: 282,
    logoHeight: 56,
    summary: "Software de gestión para estudios contables pequeños.",
    contribution: "Dos personas del espacio revisaron el producto antes de lanzarlo.",
    referent: { name: "Martín Ibarra", role: "Socio fundador" },
    photo: "",
    url: "",
  },
  {
    name: "Orbita",
    logo: "/images/community/orbita.png",
    logoWidth: 251,
    logoHeight: 56,
    summary: "Monitoreo satelital de cultivos con imágenes abiertas.",
    contribution: "El equipo encontró acá su primer cliente del sector agro.",
    referent: { name: "Sofía Aguirre", role: "Cofundadora" },
    photo: "",
    url: "",
  },
  {
    name: "Cantera",
    logo: "/images/community/cantera.png",
    logoWidth: 270,
    logoHeight: 56,
    summary: "Materiales de construcción con trazabilidad de origen.",
    contribution: "Salió de una conversación en el espacio y creció en la comunidad.",
    referent: { name: "Diego Salas", role: "Fundador" },
    photo: "",
    url: "",
  },
  {
    name: "Lumen",
    logo: "/images/community/lumen.png",
    logoWidth: 321,
    logoHeight: 56,
    summary: "Iluminación eficiente para locales comerciales.",
    contribution: "Otros miembros del espacio acompañaron la puesta en marcha.",
    referent: { name: "Lucía Benítez", role: "Fundadora" },
    photo: "",
    url: "",
  },
  {
    name: "Tregua",
    logo: "/images/community/tregua.png",
    logoWidth: 291,
    logoHeight: 56,
    summary: "Reservas y turnos para centros de salud.",
    contribution: "El grupo le dio criterio técnico en la primera etapa del producto.",
    referent: { name: "Tomás Vidal", role: "Fundador" },
    photo: "",
    url: "",
  },
];
