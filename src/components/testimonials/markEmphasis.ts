/*
 * Picking out words inside a testimonial.
 *
 * The client wants a few words of the rest of the quote to stand out. The safe
 * way to do that is not to put markup in the content: the moment a quote contains
 * `**más usuarios**`, every consumer has to know how to read it -- a search index
 * sees asterisks, a screen reader reads them out, and the CMS eventually escapes
 * them and the page shows the asterisks to a visitor.
 *
 * So the content stays plain prose and the emphasis is computed, the same decision
 * as the lead in splitQuote. Each testimonial carries a list of the passages to
 * pick out, written exactly as they appear in its quote, and this walks the text
 * once splitting it into marked and unmarked runs.
 *
 * Deliberately literal: a passage that does not appear in the quote is dropped
 * rather than fuzzy-matched. A silent near-match would put the weight on a phrase
 * nobody chose, and a phrase that changed when the quote was edited should be
 * noticed, not guessed at.
 */

export type QuoteSegment = {
  text: string
  /** True when this run is one of the picked-out passages. */
  emphasis: boolean
}

/**
 * Walks `quote` and returns it as alternating runs of plain and picked-out text,
 * in order. Passages that are not found, or that overlap one already matched, are
 * skipped.
 */
export function markEmphasis(quote: string, passages: string[]): QuoteSegment[] {
  if (quote === "") return []

  /*
   * Longer passages first, so that "más usuarios" cannot be matched before
   * "un 60% más usuarios" and leave the start of the longer one stranded.
   */
  const wanted = passages
    .map((passage) => passage.trim())
    .filter((passage) => passage !== "")
    .sort((a, b) => b.length - a.length)

  const segments: QuoteSegment[] = []
  let rest = quote

  for (const passage of wanted) {
    const at = rest.indexOf(passage)

    // Not in the remaining text: dropped, as decided above.
    if (at === -1) continue

    const before = rest.slice(0, at)
    if (before !== "") segments.push({ text: before, emphasis: false })

    segments.push({ text: passage, emphasis: true })
    rest = rest.slice(at + passage.length)
  }

  if (rest !== "") segments.push({ text: rest, emphasis: false })

  return segments
}
