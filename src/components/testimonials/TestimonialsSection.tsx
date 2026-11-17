"use client"

/*
 * The testimonials band: what people who belong to the community, or passed
 * through it, say about it.
 *
 * It sits between the cases band and the partners band, and it is the third step
 * of the same staircase of surfaces (stages white, cases celeste, testimonials
 * the page's own background, partners #eef2f7).
 *
 * Three Lego pieces compose here and nothing else does:
 *
 *   - the carousel primitive (src/components/ui/carousel.tsx), which moves the
 *     track and knows nothing about what is on it;
 *   - the spotlight card (src/components/ui/SpotlightCard.tsx), which is the
 *     lit surface and knows nothing about testimonials;
 *   - the content (./testimonials.ts), which knows nothing about layout.
 *
 * This file is the only one of the four that knows all three exist. That is what
 * lets the card be replaced, or the carousel swapped, without touching the data.
 *
 * On the arrows: they are outside the card, one at each side of the track,
 * because on top of a card they cover the photograph or the text and on a phone
 * they end up under the thumb. They are also the thing that tells a reader on a
 * phone that there are two more opinions to swipe to, which is why they are
 * always visible and not just on hover.
 */

import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import {
  TESTIMONIALS,
  TESTIMONIALS_HEADING,
  type Testimonial,
} from "./testimonials"
import "./TestimonialsSection.css"

/*
 * One opinion, as a card. Split out for the same reason the section is: the
 * carousel does not need to know this shape, and this shape does not need to
 * know it is inside a carousel.
 */
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <SpotlightCard className="testimonial-card">
      <div className="testimonial-card__head">
        <Image
          className="testimonial-card__photo"
          src={item.photo}
          alt={item.photoAlt}
          width={192}
          height={192}
          sizes="(max-width: 639px) 96px, 128px"
        />
        <p className="testimonial-card__name">{item.name}</p>
        <p className="testimonial-card__role">{item.role}</p>
      </div>

      {/*
        * The stack row is omitted entirely when the list is empty, rather than
        * rendered as an empty box: a gap where badges should be reads as a
        * loading failure.
        */}
      {item.stack.length > 0 && (
        <ul className="testimonial-card__stack">
          {item.stack.map((tool) => (
            <li className="testimonial-card__badge" key={tool}>
              {tool}
            </li>
          ))}
        </ul>
      )}

      <blockquote className="testimonial-card__quote">
        {item.quote.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>

      {/*
        * The one action. There is deliberately no second button on a card: the
        * section has one thing to ask of a reader, and two would mean neither.
        */} 
      <a className="testimonial-card__action" href="#contacto">
        Contáctame
      </a>
    </SpotlightCard>
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
             * No loop: with three opinions, wrapping around hides where the list
             * begins and ends, and the arrows going dead at each end is exactly
             * the feedback that tells a reader they have seen everything.
             */
            loop: false,
            containScroll: "trimSnaps",
          }}
        >
          <CarouselPrevious className="testimonials-carousel__control" />

          <CarouselContent>
            {TESTIMONIALS.map((item) => (
              <CarouselItem key={item.id} className="testimonials-carousel__item">
                <TestimonialCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="testimonials-carousel__control" />
        </Carousel>
      </div>
    </section>
  )
}
