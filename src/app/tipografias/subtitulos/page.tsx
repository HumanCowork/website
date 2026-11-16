import type { Metadata } from "next";

import { TypeCheck } from "../TypeCheck";
import { BODY_GROUPS } from "./candidates";

export const metadata: Metadata = {
  title: "Comparación de tipografías de subtítulo · Human Cowork",
  robots: { index: false, follow: false },
};

/*
 * The real strings, in the roles they play in the curtain: the title (already
 * decided, Outfit) sits above every sample so the pairing can be judged, then
 * the subtitle and the running paragraph that follow it.
 */
const TITLE_LINES = [
  "El punto de encuentro",
  "para emprendedores",
  "del desarrollo en Córdoba.",
];

const SUBTITLE = "Sumate a la nueva generación de futuros empresarios.";

const PARAGRAPH =
  "Somos una comunidad autónoma donde empresarios, fundadores y desarrolladores compartimos ideas, potenciamos proyectos y sentamos las bases de las próximas generaciones de emprendedores de la región.";

export default function SubtitulosPage() {
  return (
    <main className="min-h-screen bg-primary px-6 py-16 text-white sm:px-10 lg:px-16">
      <header className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Elegí la tipografía del subtítulo y el cuerpo
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
          Doce opciones sin serif. El título va siempre arriba en <strong>Outfit</strong>,
          la que ya elegiste, y abajo el subtítulo y un párrafo corrido en cada
          candidata. Así se juzga el par completo y no la fuente sola.
        </p>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-white/60">
          El título va reducido acá para que la página se pueda escanear de una
          pasada; en la cortina sale mucho más grande. Decime el número.
        </p>
      </header>

      <TypeCheck selector="section[data-candidate] [data-type-sample]" />

      {BODY_GROUPS.map((group) => (
        <div key={group.title} className="mx-auto mt-20 max-w-5xl">
          <div className="border-b-2 border-white/70 pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {group.title}
            </h2>
            <p className="mt-1 text-base text-white/60">{group.hint}</p>
          </div>

          {group.candidates.map((candidate) => (
            <section
              key={candidate.id}
              data-candidate={candidate.name}
              className="border-b border-white/20 py-14"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
                {candidate.id} — {candidate.name}
                <span className="ml-2 font-normal normal-case tracking-normal text-white/45">
                  · {candidate.note}
                </span>
              </p>

              {/*
                The decided heading face, above every sample. This is a <p>, not
                a heading, so the base h1..h4 rule does not reach it: the display
                token has to be applied explicitly.
              */}
              <p
                data-type-title
                className="font-display mt-8 text-4xl font-extrabold leading-tight tracking-tight text-white/65 sm:text-5xl md:text-6xl"
              >
                {TITLE_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>

              {/* The candidate, in the subtitle role. */}
              <p
                data-type-sample
                className={`${candidate.className} mt-8 text-xl font-medium leading-relaxed sm:text-2xl md:text-3xl`}
              >
                {SUBTITLE}
              </p>

              {/* The candidate, in the running-text role. */}
              <p
                className={`${candidate.className} mt-6 text-base leading-relaxed text-white/85 sm:text-lg md:text-xl`}
              >
                {PARAGRAPH}
              </p>
            </section>
          ))}
        </div>
      ))}
    </main>
  );
}
