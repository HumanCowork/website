/*
 * Outbound destinations in one place, so no component repeats a URL and an invite
 * can never go stale in one spot while the others keep pointing at the old one.
 */

/** The community invite. Every "sumate" affordance on the site points here. */
export const DISCORD_INVITE_URL = "https://discord.gg/BXcWzan8x";
