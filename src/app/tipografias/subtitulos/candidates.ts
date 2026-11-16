/*
 * Type candidates for the BODY / subtitle role.
 *
 * The heading role is already decided (Outfit). This module is for the quiet
 * second voice: the curtain subtitle, the "quiénes somos" paragraph, and every
 * other piece of running text on the site.
 *
 * Body text has different requirements from a display face: a generous x-height,
 * open shapes, and a regular weight that stays comfortable over several lines.
 *
 * Picking a face here changes exactly one line of globals.css afterwards:
 *
 *   --font-sans: var(--font-<chosen>);
 *
 * Nothing else in the codebase names a typeface, so nothing else has to change.
 */
import {
  DM_Sans,
  Figtree,
  Geist,
  Inter,
  Lexend,
  Manrope,
  Nunito_Sans,
  Outfit,
  Plus_Jakarta_Sans,
  Public_Sans,
  Rubik,
  Work_Sans,
} from "next/font/google";

const geist = Geist({ subsets: ["latin"], display: "swap" });
const outfit = Outfit({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
const figtree = Figtree({ subsets: ["latin"], display: "swap" });
const rubik = Rubik({ subsets: ["latin"], display: "swap" });
const workSans = Work_Sans({ subsets: ["latin"], display: "swap" });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], display: "swap" });
const publicSans = Public_Sans({ subsets: ["latin"], display: "swap" });
const lexend = Lexend({ subsets: ["latin"], display: "swap" });

export type BodyCandidate = {
  id: number;
  name: string;
  className: string;
  note: string;
};

export type BodyGroup = {
  title: string;
  hint: string;
  candidates: BodyCandidate[];
};

export const BODY_GROUPS: BodyGroup[] = [
  {
    title: "La que está puesta ahora",
    hint: "el punto de partida, para comparar contra todo lo demás",
    candidates: [
      {
        id: 1,
        name: "Geist",
        className: geist.className,
        note: "neutra, técnica; la del cuerpo hoy",
      },
    ],
  },
  {
    title: "Misma familia que el título",
    hint: "una sola tipografía para todo; el sitio queda muy coherente",
    candidates: [
      {
        id: 2,
        name: "Outfit",
        className: outfit.className,
        note: "la misma del título; geométrica y limpia",
      },
    ],
  },
  {
    title: "Neutras y probadas",
    hint: "las que usa medio internet; no fallan y no se hacen notar",
    candidates: [
      {
        id: 3,
        name: "Inter",
        className: inter.className,
        note: "el estándar de facto; máxima neutralidad",
      },
      {
        id: 4,
        name: "DM Sans",
        className: dmSans.className,
        note: "geométrica neutra, algo más cálida que Inter",
      },
      {
        id: 5,
        name: "Public Sans",
        className: publicSans.className,
        note: "institucional, hecha para gobierno; sobria",
      },
    ],
  },
  {
    title: "Geométricas modernas",
    hint: "con más carácter que las neutras, sin gritar",
    candidates: [
      {
        id: 6,
        name: "Manrope",
        className: manrope.className,
        note: "moderna, formas cerradas, muy legible",
      },
      {
        id: 7,
        name: "Plus Jakarta Sans",
        className: jakarta.className,
        note: "curvas propias, aire contemporáneo",
      },
      {
        id: 8,
        name: "Figtree",
        className: figtree.className,
        note: "amable y redonda, muy abierta",
      },
      {
        id: 9,
        name: "Work Sans",
        className: workSans.className,
        note: "grotesca cálida, buen ritmo de lectura",
      },
    ],
  },
  {
    title: "Redondeadas y accesibles",
    hint: "más blandas o más legibles; cambian el tono del sitio",
    candidates: [
      {
        id: 10,
        name: "Rubik",
        className: rubik.className,
        note: "esquinas suaves, cercana",
      },
      {
        id: 11,
        name: "Nunito Sans",
        className: nunitoSans.className,
        note: "redondeada cálida, la más amable",
      },
      {
        id: 12,
        name: "Lexend",
        className: lexend.className,
        note: "diseñada para legibilidad; letras muy separadas",
      },
    ],
  },
];

export const BODY_CANDIDATES: BodyCandidate[] = BODY_GROUPS.flatMap(
  (group) => group.candidates,
);
