/*
 * Type candidates for the curtain headings.
 *
 * This module exists so a typeface can be chosen by looking at the real
 * headline, at the real size, over the real backdrop — one variable at a time.
 * Every candidate is the SAME string in the SAME colour at the SAME size; only
 * the typeface differs.
 *
 * Serif faces were removed: they were tried and rejected. What is left is the
 * sans territory — heavy condensed display, and modern geometric.
 *
 * Picking a face here changes exactly one line of globals.css afterwards:
 *
 *   --font-display: var(--font-<chosen>);
 *
 * Nothing else in the codebase names a typeface, so nothing else has to change.
 */
import {
  Anton,
  Archivo_Black,
  Bebas_Neue,
  Figtree,
  Montserrat,
  Oswald,
  Outfit,
  Plus_Jakarta_Sans,
  Poppins,
  Rubik,
  Sora,
  Space_Grotesk,
  Unbounded,
} from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], display: "swap" });
const unbounded = Unbounded({ subsets: ["latin"], display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const outfit = Outfit({ subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
const sora = Sora({ subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const figtree = Figtree({ subsets: ["latin"], display: "swap" });
const rubik = Rubik({ subsets: ["latin"], display: "swap" });

export type TypeCandidate = {
  id: number;
  name: string;
  className: string;
  note: string;
};

export type TypeGroup = {
  title: string;
  hint: string;
  candidates: TypeCandidate[];
};

export const TYPE_GROUPS: TypeGroup[] = [
  {
    title: "Las que te gustaron",
    hint: "el punto de partida, para comparar contra todo lo demás",
    candidates: [
      {
        id: 1,
        name: "Anton",
        className: anton.className,
        note: "peso extremo y condensada; grita de lejos",
      },
      {
        id: 2,
        name: "Poppins",
        className: poppins.className,
        note: "geométrica redondeada; amable y ancha",
      },
    ],
  },
  {
    title: "Pesadas y condensadas",
    hint: "más impacto por centímetro, letra apretada y maciza",
    candidates: [
      {
        id: 3,
        name: "Archivo Black",
        className: archivoBlack.className,
        note: "grotesca pesada; la más ancha de todas",
      },
      {
        id: 4,
        name: "Bebas Neue",
        className: bebasNeue.className,
        note: "todo mayúsculas, vertical; la más compacta",
      },
      {
        id: 5,
        name: "Oswald",
        className: oswald.className,
        note: "condensada tipo afiche; más liviana que Anton",
      },
      {
        id: 6,
        name: "Unbounded",
        className: unbounded.className,
        note: "geométrica expandida muy distinta; la más rara",
      },
    ],
  },
  {
    title: "Geométricas modernas",
    hint: "mismo territorio que Poppins, con otros acentos",
    candidates: [
      {
        id: 7,
        name: "Montserrat",
        className: montserrat.className,
        note: "geométrica clásica; la más neutra y sólida",
      },
      {
        id: 8,
        name: "Outfit",
        className: outfit.className,
        note: "geométrica actual; Poppins más limpia y fina",
      },
      {
        id: 9,
        name: "Plus Jakarta Sans",
        className: jakarta.className,
        note: "moderna con curvas propias; muy usada hoy",
      },
      {
        id: 10,
        name: "Sora",
        className: sora.className,
        note: "técnica y geométrica; tono producto digital",
      },
      {
        id: 11,
        name: "Space Grotesk",
        className: spaceGrotesk.className,
        note: "técnica con detalles raros; tono dev",
      },
      {
        id: 12,
        name: "Figtree",
        className: figtree.className,
        note: "geométrica amable, redonda y suave",
      },
      {
        id: 13,
        name: "Rubik",
        className: rubik.className,
        note: "redondeada con esquinas suaves; cercana",
      },
    ],
  },
];

export const TYPE_CANDIDATES: TypeCandidate[] = TYPE_GROUPS.flatMap(
  (group) => group.candidates,
);
