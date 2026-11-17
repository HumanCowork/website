/*
 * Splitting a testimonial into its lead and the rest.
 *
 * Why this lives in code and not in the data: the lead's weight is a visual
 * decision, and the moment it is written into the content as `**bold**` or as two
 * separate fields, every consumer has to know how to read it. A search index
 * sees asterisks, a screen reader reads them out, and rewording the quote means
 * editing markup instead of editing a sentence. So the testimonial stays plain
 * prose and the split is computed.
 *
 * The rule is deliberately simple: the lead is everything up to and including the
 * first sentence-ending mark that is followed by a space or by the end of the
 * string. That covers the three cases that actually occur in real copy:
 *
 *   "Human Cowork tiene una comunidad muy atractiva. Vine por un proyecto y me
 *   quedé." -> lead "…muy atractiva.", rest "Vine por un proyecto y me quedé."
 *
 *   "Una sola frase sin punto final" -> lead is the whole thing, rest is empty,
 *   and the caller renders one span instead of two.
 *
 *   "¿Te acordás? Yo sí." -> the lead ends on the question mark, not on the
 *   period later in the sentence.
 *
 * The two cases it deliberately does not try to be clever about: an abbreviation
 * ("Sr. Pérez") and a decimal ("1.5 millones") would both be read as a sentence
 * end. Both are rare in an opinion and both are visible when they happen, which
 * beats a paragraph of heuristics that silently gets other cases wrong.
 */

/** Sentence-ending marks, in the three sets the language uses. */
const SENTENCE_END = /[.!?…]/

/** Closing marks that belong to the sentence they close. */
const CLOSERS = new Set(['"', "'", '”', '’', ')', ']', '»'])

export type SplitQuote = {
  /** The first sentence, the part that carries the weight. Empty if there is no quote. */
  lead: string
  /** Everything after it. Empty when the quote is a single sentence. */
  rest: string
}

export function splitQuote(quote: string): SplitQuote {
  const text = quote.trim()

  if (text === '') return { lead: '', rest: '' }

  for (let i = 0; i < text.length; i += 1) {
    if (!SENTENCE_END.test(text[i])) continue

    /*
     * Absorb a run of sentence marks, so "…de verdad?!" or an ellipsis "…" ends
     * the lead once rather than leaving a stray mark at the start of the rest.
     */
    let end = i
    while (end + 1 < text.length && SENTENCE_END.test(text[end + 1])) end += 1

    /*
     * Absorb closing quotes and brackets, so the lead keeps the mark that closes
     * its own quotation rather than leaving `"` dangling at the start of the rest.
     */
    while (end + 1 < text.length && CLOSERS.has(text[end + 1])) end += 1

    const next = text[end + 1]

    // A sentence ends here only if what follows is a space or nothing at all.
    // That is what stops "1.5" and "www.human.com" from splitting mid-word.
    if (next !== undefined && next !== ' ' && next !== '\n') continue

    return {
      lead: text.slice(0, end + 1),
      rest: text.slice(end + 1).trim(),
    }
  }

  // No sentence end at all: the whole quote is the lead.
  return { lead: text, rest: '' }
}
