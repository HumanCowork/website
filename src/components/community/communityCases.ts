import { CASE_IMAGES } from "@/lib/caseImages";

/**
 * The community cases, as data.
 *
 * The only place the cases are written down: the section's markup does not know
 * how many there are and its CSS does not know what they say. Editing the list
 * is all it takes to change the content.
 *
 * The copy below is PLACEHOLDER. It was invented to review the design -- the
 * sectors, the referents and the results are not a claim about real members, and
 * not one of them belongs to a real company. It must be replaced with the
 * client's real cases, with each member's written permission, before this page
 * is published. See S4 of odd/tasks/community-cases.md: the name, the mark and
 * the words each need that member's express consent for this exact use, and a
 * fabricated success case loses exactly the trust the section exists to earn.
 *
 * The invented project names are GONE, on the client's instruction. A case used
 * to carry a fictional company name beside its mark; the client rejected the
 * invented names, so the field that held one was replaced by a neutral `id`
 * ("case-1"..."case-6"). The id exists for the React key and for nothing else:
 * it never renders, and no invented company name survives anywhere on the page,
 * in an alt, or in an aria-label. What a card shows is the mark, the
 * photograph, the summary, the contribution, and the referent's name and role.
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
 *      second part is the whole point of the section. A sector alone would be a
 *      logo wall with better manners.
 *   3. Three to five words per line, and the whole case within a line length a
 *      reader can hold: 45-75 characters. Long process copy here competes with
 *      the section below it.
 *   4. `url` is empty until the real case, and the member's permission, exist.
 *      The card renders its link only when there is something to link to: no
 *      `href="#"` placeholder, ever.
 *
 * The photographs are the community's own, from `public/images/community/`, read
 * through src/lib/caseImages.ts -- the band's own list, next to the project marks
 * that live in the same folder. Each card takes a distinct one and the initials
 * placeholder is gone. They are 600x600 squares; the frame crops with `object-cover`
 * rather than stretching them.
 *
 * They used to come from a pile shared with the hero, the about cards and the
 * testimonials, sliced by index. That made this band and the about cards show the
 * same six files -- both did `slice(0, 6)` -- so a new picture in a case changed the
 * about section too, and deleting one shifted every section after it.
 *
 * The marks themselves are fictional brand marks from fakelogo.com -- the same
 * source as the partners band's, and the same warning applies: they are
 * convincing on purpose and must be swapped for the member's own approved mark,
 * with written permission, before publishing. None of them borrows a real
 * company's name or mark.
 *
 * ON FILE WEIGHT, and it is the partners band's lesson paid for once already.
 * A mark here is drawn small -- a 28px-tall slot in the card's head -- so
 * downloading the source PNGs as served would be the "1920px image in a 255px
 * slot" mistake again, sixteen times the pixels. The source files are 80px tall
 * and 251-726px wide; each has been downscaled to 56px tall, exactly 2x the
 * display box for crisp rendering on a 2x screen, and no wider than its own
 * artwork needs. Pick a file whose intrinsic size matches the slot: 7-8KB each
 * now, against 8-15KB from the source. The `logoWidth`/`logoHeight` below are the
 * downscaled numbers, so they must be rewritten whenever a mark is replaced.
 */

export type CommunityCase = {
  /**
   * Internal identity of the case, and nothing else. It is the React key. It is
   * deliberately neutral ("case-1"..."case-6"): the invented company name that
   * used to live here was rejected by the client and must not come back, and an
   * id that is never rendered cannot leak one into the page.
   */
  id: string;
  /**
   * The mark, rendered small at the head of the card. Repository path relative
   * to public/, PNG with transparency. Decorative: nothing names it, so it is
   * drawn `alt=""` and `aria-hidden`.
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
   * text under the photograph. Both are placeholder copy until the real member
   * is named with their written permission.
   */
  referent: {
    name: string;
    role: string;
  };
  /**
   * The referent's photograph, from CASE_IMAGES, never a bare path, and
   * never empty: every card shows a photograph. It fills the portrait frame and
   * carries an empty alt -- these are photographs of real people and nothing in
   * the source can describe what they show, and the referent is already named as
   * real text right below it, so a second announcement would only repeat it.
   */
  photo: string;
  /** The outbound link, once there is one. Empty means no link is rendered. */
  url: string;
};

/*
 * Nombra el origen y no el resultado: lo que la comunidad puede reclamar es de
 * donde salieron estos proyectos, no que hayan triunfado.
 */
export const COMMUNITY_HEADING = "Proyectos que empezaron en Human Cowork";

/*
 * The widest a mark is ever drawn: the tallest a mark goes (28px, the top of
 * --community-card-logo-height) times the widest aspect in the set (a mark at
 * 321x56 is 5.73 to 1), so 160px.
 *
 * This is a `sizes` hint, not a style: it lives here, not in the CSS, because it
 * only tells the browser how large a file to fetch. Without it, next/image
 * assumes a mark may span the viewport and offers a srcset running to 1920px.
 * It has to move with --community-card-logo-height.
 */
export const COMMUNITY_MARK_SLOT_WIDTH = "160px";

/*
 * The photograph's `sizes` hint, mirroring AboutPhotoCard: the frame is one
 * column wide, three columns on a desktop, two on a tablet and one on a phone,
 * so the browser fetches a file close to the drawn size instead of a viewport's
 * worth. A `sizes` hint, not a style, which is why it lives here.
 */
export const COMMUNITY_PHOTO_SLOT_WIDTH =
  "(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 92vw";

/* Six of the ten community photographs, taken in the list's own order. */
const PICKED = CASE_IMAGES;

const photo = (index: number): string => PICKED[index];

export const COMMUNITY_CASES: CommunityCase[] = [
  {
    id: "case-1",
    logo: "/images/community/mark-1.webp",
    logoWidth: 276,
    logoHeight: 56,
    summary: "Trazabilidad de alimentos para restaurantes y proveedores.",
    contribution: "La comunidad ayudó a validar el modelo y abrió las primeras cocinas.",
    referent: { name: "Camila Ferrer", role: "Fundadora" },
    photo: photo(0),
    url: "",
  },
  {
    id: "case-2",
    logo: "/images/community/mark-2.webp",
    logoWidth: 282,
    logoHeight: 56,
    summary: "Software de gestión para estudios contables pequeños.",
    contribution: "Dos personas del espacio revisaron el producto antes de lanzarlo.",
    referent: { name: "Martín Ibarra", role: "Socio fundador" },
    photo: photo(1),
    url: "",
  },
  {
    id: "case-3",
    logo: "/images/community/mark-3.webp",
    logoWidth: 251,
    logoHeight: 56,
    summary: "Monitoreo satelital de cultivos con imágenes abiertas.",
    contribution: "El equipo encontró acá su primer cliente del sector agro.",
    referent: { name: "Sofía Aguirre", role: "Cofundadora" },
    photo: photo(2),
    url: "",
  },
  {
    id: "case-4",
    logo: "/images/community/mark-4.webp",
    logoWidth: 270,
    logoHeight: 56,
    summary: "Materiales de construcción con trazabilidad de origen.",
    contribution: "Salió de una conversación en el espacio y creció en la comunidad.",
    referent: { name: "Diego Salas", role: "Fundador" },
    photo: photo(3),
    url: "",
  },
  {
    id: "case-5",
    logo: "/images/community/mark-5.webp",
    logoWidth: 321,
    logoHeight: 56,
    summary: "Iluminación eficiente para locales comerciales.",
    contribution: "Otros miembros del espacio acompañaron la puesta en marcha.",
    referent: { name: "Lucía Benítez", role: "Fundadora" },
    photo: photo(4),
    url: "",
  },
  {
    id: "case-6",
    logo: "/images/community/mark-6.webp",
    logoWidth: 291,
    logoHeight: 56,
    summary: "Reservas y turnos para centros de salud.",
    contribution: "El grupo le dio criterio técnico en la primera etapa del producto.",
    referent: { name: "Tomás Vidal", role: "Fundador" },
    photo: photo(5),
    url: "",
  },
];
