/*
 * The about section's photographs, and only its.
 *
 * The cards that introduce the people behind Human Cowork show six portraits.
 * They live in public/images/about/, one file per person, and the list is
 * addressed by position: aboutContent.ts asks for `aboutPhoto(0)` and gets the
 * first file.
 *
 * Keeping the list here rather than sharing one with the rest of the page is what
 * makes replacing a face a local edit. These six pictures were once the same six
 * files the cases band showed -- both sections did `slice(0, 6)` over one shared
 * pile -- so a new face in a case changed the about section too. They are their
 * own files now.
 *
 * They are 600x600 squares; the cards take a crop with `object-cover`.
 */
export const ABOUT_IMAGES = [
  "/images/about/about-1.webp",
  "/images/about/about-2.webp",
  "/images/about/about-3.webp",
  "/images/about/about-4.webp",
  "/images/about/about-5.webp",
  "/images/about/about-6.webp",
];
