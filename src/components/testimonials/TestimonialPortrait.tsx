/*
 * The square photograph of the person giving the testimonial.
 *
 * One job: show a square portrait, cropped so the subject is not distorted. It
 * knows nothing about the panel beside it, nothing about the carousel that moves
 * it, and nothing about where the content comes from.
 *
 * On the crop: community photographs are 600x600 squares already, but a
 * replacement portrait will not be, so `object-cover` does the cropping rather
 * than the source having to be pre-cut. The square comes from the aspect ratio,
 * not from the file.
 */

import Image from "next/image"

export interface TestimonialPortraitProps {
  /** Square portrait. */
  src: string
  /** Describes the person: their name, nothing more. */
  alt: string
  /** Draw the image eagerly. Set on the slide in view, not on the others. */
  priority?: boolean
}

export function TestimonialPortrait({
  src,
  alt,
  priority = false,
}: TestimonialPortraitProps) {
  return (
    <div className="testimonial-portrait">
      <Image
        className="testimonial-portrait__image"
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 90vw, 40vw"
        priority={priority}
      />
    </div>
  )
}
