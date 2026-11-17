/*
 * Where the community can be reached.
 *
 * One entry per destination, and nothing about how a card looks. A card is drawn
 * from this, never the other way round.
 *
 * All five destinations are the community's own, given by the client: the Discord
 * invite, the GitHub organisation, the Instagram profile, the LinkedIn page and the
 * WhatsApp number. Nothing here is a guess, so nothing here is marked as pending.
 */

import { DISCORD_INVITE_URL } from "@/lib/links"

/** Which icon a card draws. The icon is chosen by this, never by the label. */
export type ContactNetwork =
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "github"
  | "discord"

export type Contact = {
  /** Stable key for the list and the icon lookup. Not shown. */
  id: string
  network: ContactNetwork
  /** What the visitor reads as the card's title. */
  name: string
  /**
   * One short line saying what the destination is for. Written by the agent and
   * awaiting the client's correction: it is visible copy, so it is the client's
   * to word. Keep it to two or three words -- the card has room for one line.
   */
  summary: string
  /** Where the card goes. */
  href: string
}

export const CONTACT_HEADING = "Dónde encontrarnos"

export const CONTACTS: Contact[] = [
  {
    id: "contact-whatsapp",
    network: "whatsapp",
    name: "WhatsApp",
    summary: "Consultas rápidas",
    /* The number the client gave is 1173703465 -- a local Cordoba line, dialled as
       11 7370 3465. `wa.me` wants it in international format with no punctuation, so
       the country code 54 and the 9 that marks a mobile go in front. Read the digits
       as 54 9 11 7370 3465; the client's own 11 is already the area code and is not
       repeated here. */
    href: "https://wa.me/5491173703465",
  },
  {
    id: "contact-instagram",
    network: "instagram",
    name: "Instagram",
    summary: "Lo que pasa en la comunidad",
    href: "https://www.instagram.com/humancoworkcba/",
  },
  {
    id: "contact-linkedin",
    network: "linkedin",
    name: "LinkedIn",
    summary: "Novedades y equipo",
    href: "https://www.linkedin.com/in/humancowork/",
  },
  {
    id: "contact-github",
    network: "github",
    name: "GitHub",
    summary: "Recursos y automatizaciones",
    /* Real, and verified public before being written down. */
    href: "https://github.com/HumanCowork/awesome-human-cowork",
  },
  {
    id: "contact-discord",
    network: "discord",
    name: "Discord",
    summary: "La comunidad, en vivo",
    /* Real, and read from the one place the site already keeps it. */
    href: DISCORD_INVITE_URL,
  },
]
