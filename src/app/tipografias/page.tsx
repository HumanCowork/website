import type { Metadata } from "next";

import { TYPE_GROUPS } from "./candidates";
import { TypeCheck } from "./TypeCheck";

export const metadata: Metadata = {
  title: "Comparación de tipografías · Human Cowork",
  robots: { index: false, follow: false },
};

/*
 * The exact strings from the curtain, so the choice is made on the real copy
 * and not on a lorem ipsum that reads differently at display size.
 */
const TITLE_LINES = [
  "El punto de encuentro",
  "para emprendedores",
  "del desarrollo en Córdoba.",
];

const SUBTITLE = "Sumate a la nueva generación de futuros empresarios.";

export default function TipografiasPage() {
  return (
    <main className="min-h-screen bg-primary px-6 py-16 text-white sm:px-10 lg:px-16">
      <header className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Elegí la tipografía de los títulos
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
          Trece opciones sin serif, agrupadas por familia. Todas muestran la
          misma frase, en el mismo tamaño, el mismo color y sobre el mismo azul
          de la cortina. Lo único que cambia es la tipografía.
        </p>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-white/60">
          El subtítulo queda siempre en Geist, la fuente del cuerpo: cuando se
          comparan tipografías se cambia una sola cosa por vez.
        </p>
      </header>

      <TypeCheck />

      {TYPE_GROUPS.map((group) => (
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
                The candidate class comes from next/font and is not inside a CSS
                layer, so it wins over the base h1..h4 rule that points headings
                at the current display token.
              */}
              <h2
                className={`${candidate.className} mt-8 text-4xl font-extrabold leading-tight tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl`}
              >
                {TITLE_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <p className="mt-8 text-lg font-medium leading-relaxed text-white/85 sm:text-xl md:text-2xl">
                {SUBTITLE}
              </p>
            </section>
          ))}
        </div>
      ))}
    </main>
  );
}
