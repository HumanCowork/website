/*
 * Where the community can be reached.
 *
 * One entry per destination, and nothing about how a card looks. A card is drawn
 * from this, never the other way round.
 *
 * On what is real here, because it matters that a visitor cannot be sent to a
 * stranger's account:
 *
 *   - Discord is real. The invite already lived in src/lib/links.ts and is read
 *     from there rather than copied, so there is one place to change it.
 *   - GitHub is real, and verified before it was written down: the repository
 *     returns 200 and its public API reports it as public.
 *   - WhatsApp, Instagram and LinkedIn are PLACEHOLDERS. A made-up phone number
 *     can be somebody's real number and a made-up profile can belong to a person
 *     who never agreed to appear here, so they are obviously fake and obviously
 *     unfinished rather than plausible. Replace the three `href`/`handle` pairs
 *     below and delete this paragraph when they are real.
 *
 * The placeholder marker is the word PLACEHOLDER in the handle, so the section
 * never looks finished while it is not. A card that shows a real-looking handle
 * for a link that goes nowhere is worse than one that shows it is waiting.
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
  /** Where the card goes. */
  href: string
  /** The handle or address shown under the name. */
  handle: string
  /** True while the handle above is not the real one. Drives nothing visual yet. */
  placeholder: boolean
}

export const CONTACT_HEADING = "Dónde encontrarnos"

export const CONTACTS: Contact[] = [
  {
    id: "contact-whatsapp",
    network: "whatsapp",
    name: "WhatsApp",
    /* PLACEHOLDER. Replace with the community's real number in international
       format, without spaces or dashes: https://wa.me/5493511234567 */
    href: "https://wa.me/5490000000000",
    handle: "+54 9 000 000-0000 (a confirmar)",
    placeholder: true,
  },
  {
    id: "contact-instagram",
    network: "instagram",
    name: "Instagram",
    /* PLACEHOLDER. Replace with the real profile. */
    href: "https://instagram.com/humancowork",
    handle: "@humancowork (a confirmar)",
    placeholder: true,
  },
  {
    id: "contact-linkedin",
    network: "linkedin",
    name: "LinkedIn",
    /* PLACEHOLDER. Replace with the real company page. */
    href: "https://linkedin.com/company/human-cowork",
    handle: "human-cowork (a confirmar)",
    placeholder: true,
  },
  {
    id: "contact-github",
    network: "github",
    name: "GitHub",
    /* Real, and verified public before being written down. */
    href: "https://github.com/HumanCowork/awesome-human-cowork",
    handle: "HumanCowork/awesome-human-cowork",
    placeholder: false,
  },
  {
    id: "contact-discord",
    network: "discord",
    name: "Discord",
    /* Real, and read from the one place the site already keeps it. */
    href: DISCORD_INVITE_URL,
    handle: "Invitación a la comunidad",
    placeholder: false,
  },
]
