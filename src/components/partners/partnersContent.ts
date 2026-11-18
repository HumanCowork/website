/*
 * Data for the partners band: the words and the marks. How it looks is
 * PartnersSection.css and PartnersMarquee.css, and every number they use is a
 * --partners-* token from globals.css.
 */

/*
 * The label says what the relationship IS, and "partners" is the word the owner
 * asked for: this is a community, and "empresas" describes what these
 * organisations are on paper, not what they are doing here.
 *
 * The one thing a label like this must not be is a bare "Nuestros partners",
 * which claims nothing in particular. "De la comunidad" attaches it to something
 * specific, which is the point of the label.
 */
export const PARTNERS_LABEL = "Partners de la comunidad";

/*
 * The widest a mark is ever drawn: the tallest a mark goes (40px, the top of
 * --partners-logo-height) times the widest aspect in the set (Wavetrail, at
 * 510x80, is 6.375 to 1), so 255px.
 *
 * This is a `sizes` hint, not a style, which is why it lives here rather than in
 * the CSS: it only tells the browser how large a file to fetch. Without it,
 * next/image assumes a mark may span the viewport and offers a srcset running to
 * 1920px, and the browser happily downloads that for a 255px logo -- sixteen
 * times.
 *
 * It has to move with --partners-logo-height. Declare 255 and the sixteen marks
 * come down the wire in 21.6KB instead of 128KB.
 */
export const PARTNERS_MARK_MAX_WIDTH = "255px";

export type Partner = {
  id: string;
  /** The real company's name. It is the alt text, not decoration. */
  name: string;
  /** Repository path, relative to public/. PNG, monochrome, transparent. */
  logo: string;
  /** Natural pixel size of the file, so the browser reserves the right box. */
  width: number;
  height: number;
};

/*
 * THESE ARE PLACEHOLDERS AND THE SECTION MUST NOT GO LIVE WITH THEM.
 *
 * They are fictional companies from fakelogo.com -- 200 invented brand marks,
 * free for personal and commercial use with no attribution, self-hosting
 * allowed, no real trademarks involved. They are convincing on purpose, and that
 * is the danger: a visitor reads a logo wall as "these companies are partners",
 * and with invented names that claim would be false. Swap every one for a real
 * partner with written permission before publishing.
 *
 * Why fictional at all: a real company's logo is its trademark. Displaying one
 * to imply a partnership that does not exist is the classic cease-and-desist, and
 * even with a real partner, recolouring it to monochrome breaks most brand
 * guidelines -- "do not alter colour outside the brand's allowed palette". So the
 * monochrome treatment this band needs is only legitimate on marks that are ours
 * to treat that way.
 *
 * All sixteen files are the same 80px tall with different widths, which is why
 * they already line up by optical height. Keep that property when replacing them,
 * and do not force them all to one width: mixed widths read as a group of
 * companies, one uniform width reads as a template.
 *
 * The split into two rows is not arbitrary. Both rows carry eight marks and the
 * rows are interleaved by width so they total 3246px and 3240px -- a 0.2%
 * difference. A CSS marquee cannot measure itself, so the two rows share one
 * duration token; that only works if the two rows travel the same distance in the
 * same time. Rebalance the lists if the marks change.
 */

export const PARTNERS_ROW_LEFT: Partner[] = [
  { id: "partner-1", name: "Wavetrail", logo: "/images/partners/wavetrail.webp", width: 510, height: 80 },
  { id: "partner-2", name: "Stratosync", logo: "/images/partners/stratosync.webp", width: 447, height: 80 },
  { id: "partner-3", name: "Plexicore", logo: "/images/partners/plexicore.webp", width: 428, height: 80 },
  { id: "partner-4", name: "Frostfield", logo: "/images/partners/frostfield.webp", width: 427, height: 80 },
  { id: "partner-5", name: "Polystack", logo: "/images/partners/polystack.webp", width: 398, height: 80 },
  { id: "partner-6", name: "Lumivox", logo: "/images/partners/lumivox.webp", width: 390, height: 80 },
  { id: "partner-7", name: "Trionex", logo: "/images/partners/trionex.webp", width: 344, height: 80 },
  { id: "partner-8", name: "Opticflow", logo: "/images/partners/opticflow.webp", width: 302, height: 80 },
];

export const PARTNERS_ROW_RIGHT: Partner[] = [
  { id: "partner-9", name: "Glintnode", logo: "/images/partners/glintnode.webp", width: 487, height: 80 },
  { id: "partner-10", name: "Cyphervault", logo: "/images/partners/cyphervault.webp", width: 472, height: 80 },
  { id: "partner-11", name: "Cruxware", logo: "/images/partners/cruxware.webp", width: 427, height: 80 },
  { id: "partner-12", name: "Driftmind", logo: "/images/partners/driftmind.webp", width: 422, height: 80 },
  { id: "partner-13", name: "Voltshift", logo: "/images/partners/voltshift.webp", width: 406, height: 80 },
  { id: "partner-14", name: "Pivotera", logo: "/images/partners/pivotera.webp", width: 385, height: 80 },
  { id: "partner-15", name: "Zeroline", logo: "/images/partners/zeroline.webp", width: 369, height: 80 },
  { id: "partner-16", name: "Phasely", logo: "/images/partners/phasely.webp", width: 272, height: 80 },
];
