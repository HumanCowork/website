/*
 * The celeste panel: everything the testimonial says.
 *
 * Three things and nothing else, in the order the client asked for: the name as
 * the title, the company or project with the role after a colon as the subtitle,
 * and the testimonial itself with its first sentence carrying the weight.
 *
 * It knows nothing about the photograph beside it or the carousel moving it. It
 * takes a person and prints them.
 *
 * On the lead: the weight is applied here, by the stylesheet, to a sentence
 * computed from the prose -- not written into the content. See splitQuote.ts for
 * why that distinction was worth code.
 *
 * The subtitle is one line, not two fields, because that is how it reads: the
 * company or project, then a colon, then the role.
 */

import { splitQuote } from "./splitQuote"
import type { TestimonialPerson } from "./testimonials"

export interface TestimonialPanelProps {
  person: TestimonialPerson
}

export function TestimonialPanel({ person }: TestimonialPanelProps) {
  const { lead, rest } = splitQuote(person.quote)

  return (
    <div className="testimonial-panel">
      <p className="testimonial-panel__name">{person.name}</p>
      <p className="testimonial-panel__role">
        {person.company}: {person.role}
      </p>

      {/*
        * The quote is one blockquote. When there is a lead and a rest they are two
        * spans inside it, so the paragraph is announced once and reads as one
        * sentence flowing into the next. When the quote is a single sentence the
        * rest is empty and only the lead renders -- no empty element left behind.
        */}
      <blockquote className="testimonial-panel__quote">
        {rest === "" ? (
          <span className="testimonial-panel__lead">{lead}</span>
        ) : (
          <>
            <span className="testimonial-panel__lead">{lead}</span>{" "}
            <span className="testimonial-panel__rest">{rest}</span>
          </>
        )}
      </blockquote>
    </div>
  )
}
