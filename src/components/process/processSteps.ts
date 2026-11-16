/**
 * The process steps, as data.
 *
 * The only place the steps are written down: the section's markup does not know
 * how many there are and its CSS does not know what they say. Editing the list
 * is all it takes to change the content; if the count changes, raise
 * `--process-count` in `globals.css` to match.
 *
 * The copy is the client's and he set its substance: the stages must state that
 * the community connects a project with companies and with investors, and that a
 * project can scale from here. Do not soften those two claims, and do not add
 * others: an invented turnaround time or deliverable would put a promise on the
 * page that nobody made.
 *
 * Register: neutral professional Spanish, no voseo. He asked for this
 * explicitly -- the Rioplatense voice used in other sections does not suit these
 * texts.
 *
 * One open thread: the heading says "De la idea a la ejecucion" while step 4 goes
 * past execution, to scale. He has not decided whether to keep the heading as he
 * wrote it or move it to "De la idea a la escala", so it is left as it was.
 *
 * The rules the copy holds:
 *   1. Three to five steps. Fewer is not a process; more and people stop reading.
 *   2. Each step leads with a verb or a result and says what the person does or
 *      receives, not the internal workflow. "Discover" tells nobody anything;
 *      "Reservar una llamada de 20 minutos y salir con un plan" tells them
 *      everything.
 *   3. Titles name the outcome, not an internal artifact. Research on how these
 *      programs name their stages found incubators naming artifacts
 *      (Idea-to-PoC), studios naming the build (Design, Build, Spinout) and
 *      communities naming outcomes (validation, traction, scale). Human Cowork is
 *      a community.
 */

export type ProcessStep = {
  /** Position in the process, shown as the step's large numeral. */
  number: string;
  /** Short name. A verb or a result, not a department. */
  title: string;
  /** One or two sentences: what happens, and what the person walks away with. */
  body: string;
};

export const PROCESS_HEADING = "De la idea a la ejecución";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Punto de partida",
    body: "Se trae una idea incipiente o un proyecto ya en marcha, sin necesidad de que esté terminado. El paso consiste en ponerlo en común y definir hacia dónde va.",
  },
  {
    number: "02",
    title: "Mirada técnica",
    body: "Otras personas que construyen devuelven preguntas y riesgos que solo se ven desde afuera del proyecto. Una intuición se convierte en un plan defendible.",
  },
  {
    number: "03",
    title: "Producto en marcha",
    body: "El proyecto baja a código y a producto, con la inteligencia artificial como herramienta diaria y el criterio humano a cargo de las decisiones.",
  },
  {
    number: "04",
    title: "Escala y conexiones",
    body: "El proyecto se escala con el respaldo de la comunidad. Se abren conexiones con empresas y con inversores, y el crecimiento deja de ser un esfuerzo aislado.",
  },
];
