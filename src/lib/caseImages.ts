/*
 * The cases band's photographs, and only its.
 *
 * Each card in the band shows the project's picture above its mark. The
 * photographs live in public/images/community/ next to the marks, named `case-N`
 * so they are not confused with the small project logos, which are `mark-N`.
 *
 * Keeping the list here rather than sharing one with the rest of the page is what
 * makes replacing a project's picture a local edit. These six files were once six
 * of a shared pile that four sections sliced by index: replacing one changed the
 * hero, the about section and the testimonials as well, and deleting one shifted
 * every section that came after it.
 *
 * They are 600x600 squares. The cards show them in a 4:3 frame, which takes a
 * crop with `object-cover` rather than a second file; see CommunityCases.css.
 */
export const CASE_IMAGES = [
  "/images/community/case-1.webp",
  "/images/community/case-2.webp",
  "/images/community/case-3.webp",
  "/images/community/case-4.webp",
  "/images/community/case-5.webp",
  "/images/community/case-6.webp",
];
