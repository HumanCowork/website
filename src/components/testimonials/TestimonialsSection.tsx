"use client"

/*
 * The testimonials band.
 *
 * The row is two blocks side by side and nothing else: the square photograph on
 * the left, the celeste panel on the right. Both are invented elsewhere and know
 * nothing about each other; this file is the one place that knows they sit
 * together, and the one place that knows a carousel moves them.
 *
 * On dragging: the client wants to hold the left mouse button and slide sideways
 * to reach the other two testimonials. Embla already does exactly that -- the drag
 * is on by default -- so this is configuration, not an event handler. `watchDrag`
 * takes a function, and it returns true only for a mouse, which leaves touch
 * alone: a finger already scrolls the row natively with its own momentum, and
 * hijacking that is how carousels end up feeling worse on a phone than in a
 * browser.
 *
 * The cost of that choice, recorded so it is not discovered later as a bug: with
 * the drag active Embla prevents the default action on mousedown and mousemove,
 * so a mouse user cannot select the testimonial text to copy it. If that turns
 * out to matter more than the drag, the fix is to move the drag to the photograph
 * only -- one line here, changing which element the pointer must start on.
 */

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { TestimonialPanel } from "./TestimonialPanel"
import { TestimonialPortrait } from "./TestimonialPortrait"
import { TESTIMONIALS, TESTIMONIALS_HEADING } from "./testimonials"
import "./TestimonialsSection.css"

/*
 * One testimonial: the two blocks, in the order they read. The photograph is
 * eager on the first slide only, so the row has something painted the moment it
 * scrolls into view and the other two cost nothing until they are reached.
 */
function TestimonialRow({ index }: { index: number }) {
  const person = TESTIMONIALS[index]

  return (
    <div className="testimonial-row">
      <TestimonialPortrait
        src={person.photo}
        alt={`Retrato de ${person.name}`}
        priority={index === 0}
      />
      <TestimonialPanel person={person} />
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section
      className="testimonials-band"
      aria-labelledby="testimonials-heading"
      data-testimonials-section="true"
    >
      <div className="testimonials-inner">
        <h2 className="testimonials-heading" id="testimonials-heading">
          {TESTIMONIALS_HEADING}
        </h2>

        <Carousel
          className="testimonials-carousel"
          opts={{
            align: "start",
            /*
             * Infinite in both directions: past the last testimonial comes the
             * first, and before the first comes the last. The client asked for it
             * in those words, and it is the right call for three slides -- getting
             * stuck at an end reads as broken when there are so few.
             *
             * containScroll is deliberately absent. In Embla's own engine the two
             * are mutually exclusive: `const containSnaps = !loop && !!containScroll`.
             * Leaving trimSnaps here would have been silently ignored, and the next
             * person would have found it and wondered which of the two was winning.
             *
             * Two things Embla does with loop that are worth knowing before
             * someone reports them as bugs: it repositions slides with translateX,
             * so a slide cannot animate its own arrival without fighting it; and it
             * disables the fade at the leading and trailing edges, because with a
             * loop there are no edges to fade. The arrows no longer going dead is
             * the intended trade: they used to be the signal that you had reached
             * the end, and now there is no end.
             */
            loop: true,
            /*
             * Hold the left mouse button and slide. Touch keeps its own
             * scrolling, which is already better than anything we would add.
             *
             * The event here is a TouchEvent or a MouseEvent, not a PointerEvent:
             * that is Embla's own type, so there is no pointerType to read and
             * the discriminator is 'touches'.
             */
            watchDrag: (_api, event) => !("touches" in event),
          }}
        >
          <CarouselContent>
            {TESTIMONIALS.map((person, index) => (
              <CarouselItem key={person.id} className="testimonials-carousel__item">
                <TestimonialRow index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* The two controls, below the row and belonging to the carousel rather than
              to any one testimonial: they stay put while the slides move under them. */}
          <div className="testimonials-carousel__controls">
            <CarouselPrevious className="testimonials-carousel__control" />
            <CarouselNext className="testimonials-carousel__control" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
