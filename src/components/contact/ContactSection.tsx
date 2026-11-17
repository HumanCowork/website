/*
 * Where to find the community: the last band on the page, on the official celeste.
 *
 * It is the closing step of the staircase of surfaces that runs down the page, and
 * the third celeste field on it (the cases band, the testimonial panel, and this).
 * On celeste the cards are white, which is the inverse of every other card on the
 * site and the reason this section reads as the end rather than as one more row.
 *
 * The cards are an unordered list because they are one: a peer set of destinations
 * with no order among them, and a screen reader announces how many there are. Each
 * card's target is a list item, so the count is the useful information rather than
 * decoration.
 */

import { ContactCard } from "./ContactCard"
import { CONTACTS, CONTACT_HEADING } from "./contacts"
import { VenueMap } from "./VenueMap"
import "./ContactSection.css"
import "./VenueMap.css"

export function ContactSection() {
  return (
    <section
      className="contact-band"
      aria-labelledby="contact-heading"
      data-contact-section="true"
    >
      <div className="contact-inner">
        <h2 className="contact-heading" id="contact-heading">
          {CONTACT_HEADING}
        </h2>

        <ul className="contact-grid">
          {CONTACTS.map((contact) => (
            <li className="contact-grid__item" key={contact.id}>
              <ContactCard contact={contact} />
            </li>
          ))}
        </ul>

        {/*
          The venue: the same band, one step further down. Inside this section rather
          than beside it, so the celeste is one field rather than two that have to be
          kept in sync.
        */}
        <VenueMap />
      </div>
    </section>
  )
}
