/*
 * The testimonials band's portraits, and only its.
 *
 * One file per person, in public/images/testimonials/, named `portrait-N` in the
 * order the testimonials are declared in testimonials.ts.
 *
 * The folder name is not new: testimonials.ts has always told whoever replaces
 * the placeholder data to put a real portrait in public/images/testimonials/. The
 * folder did not exist, because the portraits were borrowed from the shared pile
 * the rest of the page drew from -- `COMMUNITY_IMAGES.slice(6)`. Now they are
 * where that comment always said they would be.
 *
 * They are 600x600 squares. The cards crop them with `object-cover`: into a 4:3
 * frame on a phone and a square one on a desktop.
 */
export const TESTIMONIAL_IMAGES = [
  "/images/testimonials/portrait-1.webp",
  "/images/testimonials/portrait-2.webp",
  "/images/testimonials/portrait-3.webp",
];
