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
 *   - the quote in their own words. Its first sentence becomes the lead and is
 *     rendered heavier, so write it as a sentence that carries the rest;
 *   - their name;
 *   - the company or project they belong to, and their role in it, kept apart so
 *     the panel can join them with a colon;
 *   - a square portrait, at least 600x600, in public/images/testimonials/.
 *
 * On the photographs: the cases band above takes COMMUNITY_IMAGES.slice(0, 6),
 * which is tiles 9 to 14. These three come from the tail of the list, so no face
 * appears twice on the same page. Reading through COMMUNITY_IMAGES rather than
 * writing bare paths keeps that rule checkable in one place.
 */

import { COMMUNITY_IMAGES } from "@/lib/communityImages"

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
   * The testimonial, as plain prose. Its first sentence is the lead and the rest
   * follows at the same size without the weight. Do not put markup in here.
   */
  quote: string
  /** Square portrait. */
  photo: string
}

export const TESTIMONIALS_HEADING = "Testimonios que nos avalan"

/*
 * Chosen from the tail of the community list, the part the cases band does not
 * use, so the same face never runs twice down the page.
 */
const PORTRAITS = COMMUNITY_IMAGES.slice(6)

export const TESTIMONIALS: TestimonialPerson[] = [
  {
    id: "testimonial-1",
    name: "Camila Ferrer",
    company: "Estudio de producto digital",
    role: "Fundadora",
    quote:
      "Human Cowork tiene una comunidad muy atractiva. Llegué con una idea que no lograba bajar a tierra y lo que cambió no fue una herramienta: fue tener a alguien enfrente que me hiciera las preguntas incómodas en el momento justo. Hoy el proyecto está en pie y facturando, y sigo viniendo porque acá se trabaja distinto.",
    photo: PORTRAITS[0],
  },
  {
    id: "testimonial-2",
    name: "Martín Ibarra",
    company: "Plataforma de logística",
    role: "Desarrollador",
    quote:
      "Vengo de trabajar solo durante años y acá encontré lo que me faltaba. Gente que discute decisiones técnicas en serio, sin competir, y que te devuelve una pregunta mejor de la que hiciste. Con el tiempo, dos de esas conversaciones se convirtieron en clientes.",
    photo: PORTRAITS[1],
  },
  {
    id: "testimonial-3",
    name: "Sofía Aguirre",
    company: "Plataforma de salud",
    role: "Cofundadora",
    quote:
      "Lo que más me sirvió fue el grupo. No estás sola tomando decisiones que después te cuesta caro sostener, y eso cambia el ánimo con el que encarás la semana. Pasé de tener un prototipo a tener pacientes reales, y en el medio hubo manos que ayudaron.",
    photo: PORTRAITS[2],
  },
]
