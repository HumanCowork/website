/*
 * The hero's photographs, and only the hero's.
 *
 * The tilted mosaic behind the title is the one section that wants a crowd, so it
 * owns the biggest pile: ten pictures that tile the background. They live in
 * public/images/hero/.
 *
 * This list is deliberately separate from the ones the other sections keep. The
 * photographs started as a single shared pile that four sections sliced by index,
 * which meant replacing one file changed the hero, the about section, the cases
 * and the testimonials at once, and removing one picture shifted every section
 * after it. Each section now names its own files, so replacing a picture here
 * replaces it here and nowhere else.
 *
 * They are 600x600 squares. Anything that wants another frame takes a crop with
 * `object-cover`; see HeroBackground.tsx.
 */
export const HERO_IMAGES = [
  "/images/hero/tile-1.webp",
  "/images/hero/tile-2.webp",
  "/images/hero/tile-3.webp",
  "/images/hero/tile-4.webp",
  "/images/hero/tile-5.webp",
  "/images/hero/tile-6.webp",
  "/images/hero/tile-7.webp",
  "/images/hero/tile-8.webp",
  "/images/hero/tile-9.webp",
  "/images/hero/tile-10.webp",
];
