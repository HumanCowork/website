/*
 * One contact, as a card.
 *
 * The surface is the spotlight card recovered from git history -- the one the
 * client asked for twice and the agent talked them out of. It was deleted in
 * 6df3827 as "codigo zombie" while it was, in fact, the thing being requested. It
 * is back, on white, doing what it always did: a soft light follows the pointer
 * across the surface and the edge catches it.
 *
 * The anchor WRAPS the card rather than being it, and that is deliberate. The
 * spotlight tracks the pointer from its own root element, so the surface has to be
 * the element it measures. Making the anchor itself the tracked element would mean
 * rewriting how the light reads its position. Wrapping costs one div and keeps the
 * recovered component untouched, which matters more: the client wanted THIS card,
 * not a version of it.
 *
 * On the size: the grid gives every card the same box. The four items below are
 * laid out inside it, and the shape comes from the grid, so nothing about the
 * length of a summary can make one card taller than another -- which is exactly
 * what went wrong on the previous attempt, where a `min-height` acted as a floor
 * and a longer summary pushed past it.
 */

import { ContactSpotlightCard } from "./ContactSpotlightCard"
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
      data-contact={contact.network}
    >
      <ContactSpotlightCard className="contact-card__surface">
        <span className="contact-card__icon">
          <ContactIcon network={contact.network} />
        </span>

        <span className="contact-card__text">
          <span className="contact-card__name">{contact.name}</span>
          <span className="contact-card__summary">{contact.summary}</span>
        </span>

        {/* Decorative: it points at the same place the card already goes, and the
            card is the link. Announcing it would only add noise. */}
        <span className="contact-card__arrow" aria-hidden="true" />
      </ContactSpotlightCard>
    </a>
  )
}
