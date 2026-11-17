/*
 * The testimonials: what people who belong to the community, or passed through
 * it, say about it.
 *
 * PLACEHOLDER CONTENT. The three people below are invented and the opinions are
 * written to review the design. They are not statements by anyone real, and the
 * photographs are the community's own pictures borrowed for the layout, not
 * portraits of these people. Replace every field before publishing: a quote
 * attributed to a real person needs that person's permission for this exact use,
 * in writing, the same rule the cases band carries.
 *
 * What a real replacement needs, per person:
 *   - the quote in their own words, at most two short paragraphs. It reads
 *     better when it says what the community did, not how good it is;
 *   - their name and where they work now, as they want it to appear;
 *   - the stack badges: the tools they actually use, three or four at most, or
 *     none at all. An empty list renders no badge row;
 *   - a portrait, square, at least 400x400, at public/images/testimonials/.
 *
 * The gear each person names is deliberately narrow -- a couple of tools each --
 * because a row of eight languages reads as a résumé and stops being a portrait.
 *
 * On the photographs: the cases band above takes COMMUNITY_IMAGES.slice(0, 6),
 * which is tiles 9 to 14. These three are deliberately taken from the tail of the
 * list, so no face appears twice on the same page. Reusing COMMUNITY_IMAGES
 * instead of writing bare paths keeps that rule checkable in one place.
 */

import { COMMUNITY_IMAGES } from "@/lib/communityImages"

export type Testimonial = {
  /** Stable key for the list. Not shown. */
  id: string
  name: string
  /** Where they work or which project they are in. */
  role: string
  /** The tools they actually use, or an empty list for no badges. */
  stack: string[]
  /**
   * The opinion, one or two short paragraphs. Each string is its own paragraph;
   * keep the total under roughly 300 characters so the cards stay the same
   * height and the carousel does not jump.
   */
  quote: string[]
  /** Square portrait, at least 400x400. */
  photo: string
  /** Alt text for the portrait: the person's name, nothing more. */
  photoAlt: string
}

export const TESTIMONIALS_HEADING = "Testimonios que nos avalan"

/*
 * Chosen from the tail of the community list, the part the cases band does not
 * use, so the same face never runs twice down the page.
 */
const PORTRAITS = COMMUNITY_IMAGES.slice(6)

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Camila Ferrer",
    role: "Fundadora, estudio de producto digital",
    stack: ["TypeScript", "Figma", "Supabase"],
    quote: [
      "Llegué con una idea que no lograba bajar a tierra. Lo que cambió no fue una herramienta: fue tener a alguien enfrente que me hiciera las preguntas incómodas en el momento justo.",
      "Hoy el proyecto está en pie y facturando. Sigo viniendo porque acá se trabaja distinto.",
    ],
    photo: PORTRAITS[0],
    photoAlt: "Retrato de Camila Ferrer",
  },
  {
    id: "testimonial-2",
    name: "Martín Ibarra",
    role: "Desarrollador, plataforma de logística",
    stack: ["Go", "Postgres"],
    quote: [
      "Vengo de trabajar solo durante años y acá encontré lo que me faltaba: gente que discute decisiones técnicas en serio, sin competir.",
      "Con el tiempo, dos de esas conversaciones se convirtieron en clientes.",
    ],
    photo: PORTRAITS[1],
    photoAlt: "Retrato de Martín Ibarra",
  },
  {
    id: "testimonial-3",
    name: "Sofía Aguirre",
    role: "Cofundadora, plataforma de salud",
    stack: ["Next.js", "Python", "Notion"],
    quote: [
      "Lo que más me sirvió fue el grupo: no estás sola tomando decisiones que después te cuesta caro sostener.",
      "Pasé de tener un prototipo a tener pacientes reales, y en el medio hubo manos que ayudaron.",
    ],
    photo: PORTRAITS[2],
    photoAlt: "Retrato de Sofía Aguirre",
  },
]
