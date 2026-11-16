/*
 * The words the curtain title cycles through, in order. Content, not layout: the
 * component's parameters live with the component usage and the colours live in
 * globals.css, so this file is the only place a word is added or reordered.
 *
 * Each word keeps ONE trailing space, on purpose. The white block behind them is
 * clipped at its own edges and its width is measured from the text, so without
 * that space the block closes on the last glyph and the letter reads as cut off.
 * The space is preserved because the component renders with `white-space: pre`.
 * Removing it makes every word look clipped again.
 */
export const CURTAIN_ROTATING_WORDS = [
  "emprendedores ",
  "empresarios ",
  "fundadores ",
  "desarrolladores ",
  "diseñadores ",
  "profesionales ",
  "estudiantes ",
];
