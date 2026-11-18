/*
 * The testimonials: what people who belong to the community, or passed through
 * it, say about it.
 *
 * PROVISIONAL CONTENT. The three people are invented, the quotes are written to
 * review the design and the photographs are the community's own pictures borrowed
 * for the layout, not portraits of these people. Every field is replaced before
 * publishing; a quote attributed to a real person needs that person's permission
 * for this exact use, in writing.
 *
 * What a real replacement needs, per person:
 *   - the quote in their own words, as plain prose;
 *   - `emphasise`: a few short passages copied out of that quote, word for word,
 *     to be picked out inside it. Three or four words each is the useful size;
 *     the whole sentence in bold is the same as nothing in bold;
 *   - their name;
 *   - the company or project they belong to, and their role in it, kept apart so
 *     the panel can join them with a colon;
 *   - a square portrait, at least 600x600, in public/images/testimonials/.
 *
 * On the photographs: these three come from the band's own list, TESTIMONIAL_IMAGES,
 * and from nowhere else. They used to be the tail of a pile shared with the hero,
 * the about cards and the cases band, which meant replacing a face here replaced it
 * in three other sections as well. The list is local now so that a swap is local.
 */

import { TESTIMONIAL_IMAGES } from "@/lib/testimonialImages"

/** The speaker, and nothing about how they are displayed. */
export type TestimonialPerson = {
  /** Stable key for the list. Not shown. */
  id: string
  name: string
  /** The company they work for or the project they are in. */
  company: string
  /** Their role there. Joined to the company with a colon when rendered. */
  role: string
  /**
   * The testimonial, as plain prose. Its first sentence becomes the lead and is
   * rendered on its own line, heavier; the rest follows as a paragraph.
   *
   * Do not put markup in here. The weight lives in the stylesheet and the passages
   * to pick out live in `emphasise`, so this stays a sentence a search index can
   * read and a screen reader can speak.
   */
  quote: string
  /**
   * Passages of `quote` to render heavier inside the rest of it, copied exactly as
   * they appear there. A passage that does not match is dropped rather than
   * approximated; see markEmphasis.ts.
   */
  emphasise: string[]
  /** Square portrait. */
  photo: string
}

export const TESTIMONIALS_HEADING = "Testimonios que nos avalan"

/*
 * Chosen from the tail of the community list, the part the cases band does not
 * use, so the same face never runs twice down the page.
 */
const PORTRAITS = TESTIMONIAL_IMAGES

export const TESTIMONIALS: TestimonialPerson[] = [
  {
    id: "testimonial-1",
    name: "Camila Ferrer",
    company: "Estudio de producto digital",
    role: "Fundadora",
    quote:
      "Human Cowork tiene una comunidad muy atractiva. Llegué con una idea que no lograba bajar a tierra y lo que cambió no fue una herramienta: fue tener a alguien enfrente que me hiciera las preguntas incómodas en el momento justo. Hoy el proyecto está en pie y facturando, y sigo viniendo porque acá se trabaja distinto.",
    emphasise: ["en pie y facturando", "se trabaja distinto"],
    photo: PORTRAITS[0],
  },
  {
    id: "testimonial-2",
    name: "Martín Ibarra",
    company: "Plataforma de logística",
    role: "Desarrollador",
    quote:
      "Vengo de trabajar solo durante años y acá encontré lo que me faltaba. Gente que discute decisiones técnicas en serio, sin competir, y que te devuelve una pregunta mejor de la que hiciste. Con el tiempo, dos de esas conversaciones se convirtieron en clientes.",
    emphasise: ["discute decisiones técnicas en serio", "se convirtieron en clientes"],
    photo: PORTRAITS[1],
  },
  {
    id: "testimonial-3",
    name: "Sofía Aguirre",
    company: "Plataforma de salud",
    role: "Cofundadora",
    quote:
      "Lo que más me sirvió fue el grupo. No estás sola tomando decisiones que después te cuesta caro sostener, y eso cambia el ánimo con el que encarás la semana. Pasé de tener un prototipo a tener pacientes reales, y en el medio hubo manos que ayudaron.",
    emphasise: ["pacientes reales"],
    photo: PORTRAITS[2],
  },
]
