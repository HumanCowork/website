/*
 * The community photographs, in one place. The tilted tiles of the hero and the
 * photo cards of the about section both read from this list, so replacing or
 * renaming a file happens once instead of once per consumer.
 *
 * They are all 600x600 squares, shot for the hero's tile grid. Anything that needs
 * portrait or landscape frames takes a crop with `object-cover`; see AboutSection.css.
 */
export const COMMUNITY_IMAGES = [
  "/images/community/tile-9.webp",
  "/images/community/tile-10.webp",
  "/images/community/tile-11.webp",
  "/images/community/tile-12.webp",
  "/images/community/tile-13.webp",
  "/images/community/tile-14.webp",
  "/images/community/tile-15.webp",
  "/images/community/tile-16.webp",
  "/images/community/tile-17.webp",
  "/images/community/tile-18.webp",
];
