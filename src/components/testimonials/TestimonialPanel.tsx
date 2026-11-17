/*
 * The celeste panel: everything the testimonial says.
 *
 * Three things and nothing else, in the order the client asked for: the name as
 * the title, the company or project with the role after a colon as the subtitle,
 * and the testimonial itself, whose first sentence opens the panel on its own
 * line, heavier, before the rest.
 *
 * It knows nothing about the photograph beside it or the carousel moving it. It
 * takes a person and prints them.
 *
 * On that first sentence: it is a separate <p>, not a run of text followed by the
 * rest on the same line. The client was explicit -- the first sentence is the
 * title of the testimonial, an isolated line, and not a full stop followed by
 * more words. Two paragraphs inside the blockquote is also how it reads for a
 * screen reader: two thoughts, one after the other.
 *
 * The weight itself is applied by the stylesheet, to text split out in
 * splitQuote.ts and markEmphasis.ts, never written into the content. Why that was
 * worth two modules is documented in each of them.
 */

import { markEmphasis } from "./markEmphasis"
import { splitQuote } from "./splitQuote"
import type { TestimonialPerson } from "./testimonials"

/* Keyed by index: these are text runs rebuilt on every render and have no identity
   of their own. */
function PlainRuns({ text }: { text: string }) {
  return <>{text}</>
}

export interface TestimonialPanelProps {
  person: TestimonialPerson
}

export function TestimonialPanel({ person }: TestimonialPanelProps) {
  const { lead, rest } = splitQuote(person.quote)

  /*
   * The picked-out passages are searched inside the rest, not inside the whole
   * quote: the lead is already the heaviest thing in the panel and emphasising a
   * phrase inside it on top of that would say nothing.
   */
  const body = markEmphasis(rest, person.emphasise)

  return (
    <div className="testimonial-panel">
      <p className="testimonial-panel__name">{person.name}</p>
      <p className="testimonial-panel__role">
        {person.company}: {person.role}
      </p>

      <blockquote className="testimonial-panel__quote">
        <p className="testimonial-panel__lead">{lead}</p>

        {body.length > 0 && (
          <p className="testimonial-panel__rest">
            {body.map((segment, index) =>
              segment.emphasis ? (
                <span className="testimonial-panel__marked" key={index}>
                  {segment.text}
                </span>
              ) : (
                <PlainRuns text={segment.text} key={index} />
              )
            )}
          </p>
        )}
      </blockquote>
    </div>
  )
}
