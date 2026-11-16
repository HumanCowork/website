import { COMMUNITY_IMAGES } from "@/lib/communityImages";

/*
 * Content for the about section: the words, and which photograph goes in which
 * frame. Data only. How it looks is AboutSection.css; which files exist is
 * src/lib/communityImages.ts.
 */

/*
 * The community's own sentence, written by its owner. It is the story paragraph.
 * The space block below it now has its own copy, adapted from the text the owner
 * handed over and grounded in HANDOFF.md.
 */
const COMMUNITY_SENTENCE =
  "Somos una comunidad autónoma donde empresarios, fundadores y desarrolladores compartimos ideas, potenciamos proyectos y sentamos las bases de las próximas generaciones de emprendedores de la región.";

export type AboutAspect = "portrait" | "square" | "landscape";

export type AboutPhoto = {
  /** Comes from COMMUNITY_IMAGES, never a bare path. */
  src: string;
  /**
   * Empty on purpose. These are photographs of real people and nothing here can
   * describe what they show. Fill them in with the final copy.
   */
  alt: string;
  aspect: AboutAspect;
};

/** Two sub-columns per grid, which is the layout the block calls for. */
export type AboutSubcolumns = readonly (readonly AboutPhoto[])[];

/* Six of the ten community photographs, taken in the list's own order. */
const PICKED = COMMUNITY_IMAGES.slice(0, 6);

const photo = (index: number, aspect: AboutAspect): AboutPhoto => ({
  src: PICKED[index],
  alt: "",
  aspect,
});

export const ABOUT_STORY = {
  heading: "Quiénes somos",
  level: 2 as const,
  paragraphs: [COMMUNITY_SENTENCE],
};

/*
 * The owner's own final copy, pasted verbatim. Do not rewrite it: it closed a
 * drafting round in which earlier versions were too long, too abstract, or broke
 * the "no solo… sino también…" parallel. Only the heading is a proposal.
 */
export const ABOUT_WORKPLACE = {
  heading: "Nuestros Miembros",
  level: 3 as const,
  paragraphs: [
    "Human Cowork está conformado por una gran variedad de personas y profesionales. Pero todos compartimos algo en común: el espíritu emprendedor que nos moviliza a seguir creando e innovando.",
    "Sus miembros no solo encuentran un lugar donde potenciar sus proyectos, sino también un lugar donde crecer como personas.",
  ],
};

export const ABOUT_GRID_LEFT: AboutSubcolumns = [
  [photo(0, "portrait")],
  [photo(1, "square"), photo(2, "landscape")],
];

/*
 * Same disposition as the left grid, which is what the owner asked for: one
 * portrait alone in the first sub-column, a square and a landscape stacked in the
 * second. Each photograph keeps its own shape; only its place changes.
 */
export const ABOUT_GRID_RIGHT: AboutSubcolumns = [
  [photo(4, "portrait")],
  [photo(3, "square"), photo(5, "landscape")],
];
