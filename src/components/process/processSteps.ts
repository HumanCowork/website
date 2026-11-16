/**
 * The process steps, as data.
 *
 * The only place the steps are written down: the section's markup does not know
 * how many there are and its CSS does not know what they say. Editing the list
 * is all it takes to change the content; if the count changes, raise
 * `--process-count` in `globals.css` to match.
 *
 * PLACEHOLDER CONTENT. The wording is generic on purpose. It describes a
 * plausible shape for a process so the motion can be reviewed now; it is not a
 * claim about how Human Cowork actually works and must be replaced before this
 * section is published. Invented specifics -- a real turnaround time, a real
 * deliverable -- would put a promise on the page that nobody made.
 *
 * Two rules hold once the real copy lands:
 *   1. Three to five steps. Fewer is not a process; more and people stop reading.
 *   2. Each step leads with a verb or a result and says what the person does or
 *      receives, not the internal workflow. "Discover" tells nobody anything;
 *      "Reservá una llamada de 20 minutos y te llevás un plan" tells them
 *      everything.
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
    title: "Etapa uno",
    body: "Texto de relleno. Acá va el primer paso del proceso, dicho desde el lado de quien llega: qué hace, qué se le pide y con qué se va.",
  },
  {
    number: "02",
    title: "Etapa dos",
    body: "Texto de relleno. Acá va el segundo paso. Conviene nombrar el tiempo que insume y qué recibe la persona al terminarlo.",
  },
  {
    number: "03",
    title: "Etapa tres",
    body: "Texto de relleno. Acá va el tercer paso, con el mismo criterio: verbos concretos y nada de nombres de áreas internas.",
  },
  {
    number: "04",
    title: "Etapa cuatro",
    body: "Texto de relleno. Acá va el paso final, el que cierra el proceso y deja el proyecto en ejecución.",
  },
];
