/*
 * One contact, as a card, on the celeste band.
 *
 * The whole card is the link: the icon, the network name and the handle are one
 * target, so there is no small word to hit and no separate "ver más". It is an
 * anchor rather than a button because it navigates, and it carries `rel` and
 * `target` because it leaves the site.
 *
 * The effect is built for this background and is worth stating, because the card
 * this replaces did something else. That one tracked the mouse with a light spot,
 * which reads on a dark field and washes out on saturated celeste. Here the card
 * lifts, its border brightens and its icon grows slightly, all on the card's own
 * colour tokens. No JavaScript, so there is nothing to hydrate and nothing to go
 * wrong on a slow connection.
 *
 * The card knows nothing about the carousel, the testimonials, or how many other
 * contacts there are. It is handed one and it draws it.
 */

import { ContactIcon } from "./ContactIcon"
import type { Contact } from "./contacts"

export interface ContactCardProps {
  contact: Contact
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <a
      className="contact-card"
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      /* The handle is the useful part for a screen reader user deciding where this
         goes, and it is visible text inside, so no aria-label is needed -- one
         would override the content rather than describe it. */
      data-contact={contact.network}
    >
      <span className="contact-card__icon">
        <ContactIcon network={contact.network} />
      </span>

      <span className="contact-card__text">
        <span className="contact-card__name">{contact.name}</span>
        <span className="contact-card__handle">{contact.handle}</span>
      </span>
    </a>
  )
}
